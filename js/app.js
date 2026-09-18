/**
 * Application Controller & Event Handlers
 */

class AppController {
  constructor() {
    this.editingTaskId = null;
    this.editingWeekId = null;
    this.editingMonthId = null;
    this.uploadedImages = []; // Array of Base64 strings
    this.cardSlideIndex = {}; // taskId -> current slide index
    this.lightboxImages = [];
    this.lightboxCurrentIndex = 0;
    this.lightboxCaption = '';
  }

  async init() {
    // 0. Setup Cloud Sync listener
    this.setupCloudSyncListener();

    // 1. Load data from storage (syncs with Firestore Cloud if available)
    await window.appState.load();

    // 2. Subscribe to state changes for re-rendering
    window.appState.subscribe(() => {
      this.render();
    });

    // 3. Bind event listeners
    this.bindEvents();

    // 4. Initial render
    this.render();
  }

  render() {
    const state = window.appState;
    try {
      UI.renderBreadcrumbs(state);
      UI.renderSidebar(state);
      this.updateFilterUI();

      const mainContainer = document.getElementById('view-container');
      if (!mainContainer) return;

      if (state.view === 'months') {
        mainContainer.innerHTML = UI.renderMonthsView(state);
      } else if (state.view === 'weeks') {
        mainContainer.innerHTML = UI.renderWeeklyView(state);
      } else if (state.view === 'days') {
        mainContainer.innerHTML = UI.renderDailyTasksView(state);
      }
    } catch (e) {
      console.error('Render error:', e);
    }
  }

  bindEvents() {
    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      const lb = document.getElementById('lightbox-modal');
      const isLbActive = lb && lb.classList.contains('active');

      if (e.key === 'Escape') {
        this.closeAllModals();
        this.closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        if (isLbActive) {
          this.lightboxPrev(e);
        }
      } else if (e.key === 'ArrowRight') {
        if (isLbActive) {
          this.lightboxNext(e);
        }
      }
    });

    // Global Clipboard Paste (Ctrl+V) for image upload
    window.addEventListener('paste', (e) => {
      const taskModal = document.getElementById('task-modal');
      if (taskModal && taskModal.classList.contains('active')) {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        const files = [];
        for (const item of items) {
          if (item.kind === 'file' && item.type.startsWith('image/')) {
            const blob = item.getAsFile();
            if (blob) files.push(blob);
          }
        }
        if (files.length > 0) {
          this.handleImageFiles(files);
        }
      }
    });

    this.setupImageDropzone();
  }

  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${type === 'success' ? '✅' : '⚠️'}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // =========================================================================
  // CARD SLIDER CONTROLS (ON DAILY TASK CARDS)
  // =========================================================================
  getCardSlideIndex(taskId) {
    return this.cardSlideIndex[taskId] || 0;
  }

  setCardSlide(taskId, newIndex, e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const state = window.appState;
    const task = state.tasks.find(t => t.id === taskId);
    if (!task) return;

    const images = (task.images && Array.isArray(task.images) && task.images.length > 0)
      ? task.images
      : (task.imageUrl ? [task.imageUrl] : []);

    if (images.length <= 1) return;

    const total = images.length;
    const validIndex = ((newIndex % total) + total) % total;
    this.cardSlideIndex[taskId] = validIndex;

    const card = document.getElementById(`task-card-${taskId}`);
    if (!card) return;

    const mainImg = card.querySelector('.card-slide-main-img');
    const counter = card.querySelector('.card-slide-counter');
    const thumbs = card.querySelectorAll('.card-thumb-item');

    if (mainImg) {
      mainImg.src = images[validIndex];
    }
    if (counter) {
      counter.textContent = `📷 ${validIndex + 1} / ${total}`;
    }
    thumbs.forEach((th, idx) => {
      if (idx === validIndex) {
        th.classList.add('active');
      } else {
        th.classList.remove('active');
      }
    });
  }

  prevCardSlide(taskId, e) {
    const current = this.getCardSlideIndex(taskId);
    this.setCardSlide(taskId, current - 1, e);
  }

  nextCardSlide(taskId, e) {
    const current = this.getCardSlideIndex(taskId);
    this.setCardSlide(taskId, current + 1, e);
  }

  // =========================================================================
  // LIGHTBOX GALLERY (HIGH CONTRAST & THUMBNAILS)
  // =========================================================================
  openLightboxGallery(taskId, activeIndex = 0) {
    const state = window.appState;
    const task = state.tasks.find(t => t.id === taskId);
    if (!task) return;

    const images = (task.images && Array.isArray(task.images) && task.images.length > 0)
      ? task.images
      : (task.imageUrl ? [task.imageUrl] : []);

    if (images.length === 0) return;

    this.lightboxImages = images;
    this.lightboxCurrentIndex = Math.max(0, Math.min(activeIndex, images.length - 1));
    this.lightboxCaption = task.description || task.title || 'ภาพการปฏิบัติงาน';

    this.updateLightboxUI();

    const modal = document.getElementById('lightbox-modal');
    if (modal) modal.classList.add('active');
  }

  openLightbox(imageUrl, caption = '') {
    if (!imageUrl) return;
    this.lightboxImages = [imageUrl];
    this.lightboxCurrentIndex = 0;
    this.lightboxCaption = caption;

    this.updateLightboxUI();

    const modal = document.getElementById('lightbox-modal');
    if (modal) modal.classList.add('active');
  }

  setLightboxIndex(index) {
    if (index >= 0 && index < this.lightboxImages.length) {
      this.lightboxCurrentIndex = index;
      this.updateLightboxUI();
    }
  }

  updateLightboxUI() {
    const img = document.getElementById('lightbox-img');
    const captionElem = document.getElementById('lightbox-caption');
    const counterElem = document.getElementById('lightbox-counter');
    const prevBtn = document.getElementById('lightbox-prev-btn');
    const nextBtn = document.getElementById('lightbox-next-btn');
    const thumbsContainer = document.getElementById('lightbox-thumbs-container');

    const total = this.lightboxImages.length;
    const currentUrl = this.lightboxImages[this.lightboxCurrentIndex] || '';

    if (img) img.src = currentUrl;
    if (captionElem) captionElem.textContent = this.lightboxCaption;

    if (counterElem) {
      if (total > 1) {
        counterElem.style.display = 'block';
        counterElem.textContent = `📷 รูปที่ ${this.lightboxCurrentIndex + 1} จาก ${total}`;
      } else {
        counterElem.style.display = 'none';
      }
    }

    if (prevBtn && nextBtn) {
      if (total > 1) {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
      } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
      }
    }

    if (thumbsContainer) {
      if (total > 1) {
        thumbsContainer.style.display = 'flex';
        thumbsContainer.innerHTML = this.lightboxImages.map((u, idx) => `
          <div class="lightbox-thumb-item ${idx === this.lightboxCurrentIndex ? 'active' : ''}" onclick="window.appController.setLightboxIndex(${idx})" title="ดูรูปที่ ${idx + 1}">
            <img src="${u}" alt="thumb ${idx + 1}">
          </div>
        `).join('');
      } else {
        thumbsContainer.style.display = 'none';
        thumbsContainer.innerHTML = '';
      }
    }
  }

  lightboxPrev(e) {
    if (e) e.stopPropagation();
    if (this.lightboxImages.length <= 1) return;
    this.lightboxCurrentIndex = (this.lightboxCurrentIndex - 1 + this.lightboxImages.length) % this.lightboxImages.length;
    this.updateLightboxUI();
  }

  lightboxNext(e) {
    if (e) e.stopPropagation();
    if (this.lightboxImages.length <= 1) return;
    this.lightboxCurrentIndex = (this.lightboxCurrentIndex + 1) % this.lightboxImages.length;
    this.updateLightboxUI();
  }

  closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) modal.classList.remove('active');
  }

  closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
    this.editingTaskId = null;
    this.editingWeekId = null;
    this.editingMonthId = null;
    this.uploadedImages = [];
  }

  populateWeekSelect(selectedWeekId) {
    const select = document.getElementById('task-select-week');
    if (!select) return;

    const state = window.appState;
    const months = state.getVisibleMonths ? state.getVisibleMonths() : (state.months || []);
    const weeks = state.getVisibleWeeks ? state.getVisibleWeeks() : (state.weeks || []);

    if (weeks.length === 0) {
      select.innerHTML = '<option value="">(จะสร้างสัปดาห์ที่ 1 อัตโนมัติ)</option>';
      return;
    }

    let html = '';
    months.forEach(m => {
      const monthWeeks = weeks.filter(w => w.monthId === m.id);
      if (monthWeeks.length > 0) {
        html += `<optgroup label="📅 ${m.title}">`;
        monthWeeks.forEach(w => {
          const isSelected = selectedWeekId ? (selectedWeekId === w.id) : (w.id === weeks[0].id);
          html += `<option value="${w.id}" ${isSelected ? 'selected' : ''}>📆 ${w.title}</option>`;
        });
        html += `</optgroup>`;
      }
    });

    select.innerHTML = html;
  }

  // =========================================================================
  // TEACHER SUBMISSION MODE (<= 18 SEP 2026)
  // =========================================================================
  toggleFilterSep18() {
    window.appState.toggleFilterSep18();
    this.updateFilterUI();
    if (window.appState.filterUpToSep18) {
      this.showToast('เปิดโหมดส่งอาจารย์: แสดงข้อมูลถึง 18 ก.ย. 2569 แล้ว', 'success');
    } else {
      this.showToast('แสดงข้อมูลทั้งหมด: ครบ 44 สัปดาห์ (ถึง ก.พ. 2570) แล้ว', 'success');
    }
  }

  updateFilterUI() {
    const card = document.getElementById('filter-mode-card');
    const desc = document.getElementById('filter-mode-desc');
    const badge = document.getElementById('filter-mode-badge');
    if (!card || !desc || !badge) return;

    const isFiltered = window.appState.filterUpToSep18;
    if (isFiltered) {
      card.classList.remove('mode-all');
      desc.textContent = 'แสดงถึง 18 ก.ย. (ซ่อนสัปดาห์ 19+)';
      badge.textContent = 'เปิดอยู่';
      badge.className = 'filter-mode-badge active';
    } else {
      card.classList.add('mode-all');
      desc.textContent = 'แสดงทั้งหมด (44 สัปดาห์)';
      badge.textContent = 'แสดงทั้งหมด';
      badge.className = 'filter-mode-badge';
    }
  }

  // =========================================================================
  // TASK MODAL (MULTIPLE IMAGES + 1 DESCRIPTION)
  // =========================================================================
  openAddTaskModal(targetWeekId) {
    this.editingTaskId = null;
    this.uploadedImages = [];

    const form = document.getElementById('task-form');
    if (form) form.reset();

    const dateInput = document.getElementById('task-date');
    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }

    this.renderImagePreviews();

    document.getElementById('task-modal-title').innerHTML = '📝 เพิ่มบันทึกงานประจำวัน (Daily Task)';

    const visibleWeeks = window.appState.getVisibleWeeks ? window.appState.getVisibleWeeks() : (window.appState.weeks || []);
    const currentWeekId = targetWeekId || window.appState.currentWeekId || (visibleWeeks[0]?.id || '');
    this.populateWeekSelect(currentWeekId);

    document.getElementById('task-modal').classList.add('active');
  }

  openEditTaskModal(taskId) {
    const state = window.appState;
    const task = state.tasks.find(t => t.id === taskId);
    if (!task) return;

    this.editingTaskId = taskId;
    this.uploadedImages = (task.images && Array.isArray(task.images) && task.images.length > 0)
      ? [...task.images]
      : (task.imageUrl ? [task.imageUrl] : []);

    document.getElementById('task-modal-title').innerHTML = '✏️ แก้ไขบันทึกงานประจำวัน';
    this.populateWeekSelect(task.weekId);

    document.getElementById('task-title').value = task.title || '';
    document.getElementById('task-date').value = task.date || new Date().toISOString().split('T')[0];
    document.getElementById('task-description').value = task.description || '';

    this.renderImagePreviews();

    document.getElementById('task-modal').classList.add('active');
  }

  renderImagePreviews() {
    const previewContainer = document.getElementById('task-image-preview');
    const dropzone = document.getElementById('task-image-dropzone');
    const countLabel = document.getElementById('task-image-count-label');

    if (countLabel) {
      countLabel.textContent = this.uploadedImages.length > 0 ? `(แนบแล้ว ${this.uploadedImages.length} รูป)` : '';
    }

    if (this.uploadedImages.length === 0) {
      if (previewContainer) {
        previewContainer.innerHTML = '';
        previewContainer.style.display = 'none';
      }
      if (dropzone) dropzone.style.display = 'flex';
      return;
    }

    if (dropzone) dropzone.style.display = 'none';
    if (previewContainer) {
      previewContainer.style.display = 'block';
      let html = `<div class="modal-images-grid">`;
      this.uploadedImages.forEach((imgUrl, index) => {
        html += `
          <div class="modal-image-card">
            <span class="modal-img-num">รูปที่ #${index + 1}</span>
            <img src="${imgUrl}" alt="preview ${index + 1}">
            <button type="button" class="modal-img-del-btn" onclick="window.appController.removeTaskImage(${index})" title="ลบรูปภาพนี้">
              🗑️ ลบ
            </button>
          </div>
        `;
      });
      html += `
        </div>
        <div class="modal-add-more-zone" onclick="document.getElementById('task-image-file').click()">
          <span style="font-size: 1.2rem;">➕</span>
          <span>คลิกเพื่อเลือกรูปภาพเพิ่ม (หรือลากไฟล์มาวาง / กด Ctrl+V)</span>
        </div>
      `;
      previewContainer.innerHTML = html;
    }
  }

  setupImageDropzone() {
    const dropzone = document.getElementById('task-image-dropzone');
    const previewContainer = document.getElementById('task-image-preview');
    const fileInput = document.getElementById('task-image-file');

    if (!fileInput) return;

    if (dropzone) {
      dropzone.addEventListener('click', () => fileInput.click());

      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });

      dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
      });

      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          this.handleImageFiles(e.dataTransfer.files);
        }
      });
    }

    if (previewContainer) {
      previewContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      previewContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          this.handleImageFiles(e.dataTransfer.files);
        }
      });
    }

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        this.handleImageFiles(e.target.files);
        fileInput.value = ''; // Reset to allow selecting same files again if needed
      }
    });
  }

  async handleImageFiles(fileList) {
    const files = Array.from(fileList).filter(f => f && f.type && f.type.startsWith('image/'));

    if (files.length === 0) {
      this.showToast('กรุณาเลือกไฟล์รูปภาพเท่านั้น', 'error');
      return;
    }

    this.showToast(`กำลังโหลดและบีบอัดรูปภาพ (${files.length} รูป)...`);

    const processSingleImage = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const maxDimension = 1000;
            let width = img.width;
            let height = img.height;

            if (width > maxDimension || height > maxDimension) {
              if (width > height) {
                height = Math.round((height * maxDimension) / width);
                width = maxDimension;
              } else {
                width = Math.round((width * maxDimension) / height);
                height = maxDimension;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.80);
            resolve(compressedDataUrl);
          };
          img.onerror = () => resolve(null);
          img.src = event.target.result;
        };
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
      });
    };

    try {
      const results = await Promise.all(files.map(f => processSingleImage(f)));
      const validResults = results.filter(Boolean);

      if (validResults.length > 0) {
        this.uploadedImages.push(...validResults);
        this.renderImagePreviews();
        this.showToast(`แนบรูปภาพเรียบร้อยแล้ว (+${validResults.length} รูป)`);
      }
    } catch (err) {
      console.error('Image processing error:', err);
      this.showToast('เกิดข้อผิดพลาดในการประมวลผลภาพ', 'error');
    }
  }

  removeTaskImage(index) {
    if (index >= 0 && index < this.uploadedImages.length) {
      this.uploadedImages.splice(index, 1);
      this.renderImagePreviews();
      this.showToast('ลบรูปภาพเรียบร้อย');
    }
  }

  async saveTaskForm(e) {
    if (e) e.preventDefault();

    try {
      const state = window.appState;
      let weekId = document.getElementById('task-select-week')?.value;
      const title = document.getElementById('task-title').value.trim() || 'บันทึกการปฏิบัติงาน';
      const date = document.getElementById('task-date').value || new Date().toISOString().split('T')[0];
      const description = document.getElementById('task-description').value.trim();

      if (!description) {
        this.showToast('กรุณากรอกคำอธิบายใต้ภาพ', 'error');
        return;
      }

      // Auto-create default Month & Week if empty
      if (!weekId || state.weeks.length === 0) {
        let month = state.months[0];
        if (!month) {
          month = {
            id: 'month_' + Date.now(),
            title: 'เดือนที่ 1: การฝึกงาน',
            goal: 'บันทึกการฝึกงาน'
          };
          state.months.push(month);
        }
        const newWeek = {
          id: 'week_' + Date.now(),
          monthId: month.id,
          title: 'สัปดาห์ที่ 1',
          summary: 'บันทึกสัปดาห์แรก'
        };
        state.weeks.push(newWeek);
        weekId = newWeek.id;
      }

      const daysThai = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
      const dayIndex = new Date(date).getDay();
      const dayName = daysThai[dayIndex] || 'จันทร์';

      const taskImages = [...this.uploadedImages];
      const primaryImageUrl = taskImages[0] || '';

      if (this.editingTaskId) {
        // Edit existing task
        const taskIdx = state.tasks.findIndex(t => t.id === this.editingTaskId);
        if (taskIdx >= 0) {
          state.tasks[taskIdx] = {
            ...state.tasks[taskIdx],
            weekId,
            title,
            date,
            dayName,
            images: taskImages,
            imageUrl: primaryImageUrl,
            description
          };
        }
      } else {
        // Create new task
        const newTask = {
          id: 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
          weekId,
          title,
          date,
          dayName,
          images: taskImages,
          imageUrl: primaryImageUrl,
          description
        };
        state.tasks.push(newTask);
      }

      await state.saveCurrentData();

      // Navigate to the target week view
      const targetWeek = state.weeks.find(w => w.id === weekId);
      if (targetWeek) {
        state.goToWeek(weekId, targetWeek.monthId);
      }

      this.closeAllModals();
      this.showToast('บันทึกข้อมูลเรียบร้อยแล้ว!');
    } catch (err) {
      console.error('Save error:', err);
      this.showToast('เกิดข้อผิดพลาดในการบันทึก', 'error');
    }
  }

  async deleteTask(taskId) {
    if (confirm('คุณต้องการลบบันทึกงานนี้ใช่หรือไม่?')) {
      const state = window.appState;
      state.tasks = state.tasks.filter(t => t.id !== taskId);
      await state.saveCurrentData();
      this.showToast('ลบบันทึกงานเรียบร้อยแล้ว');
    }
  }

  // =========================================================================
  // MONTH MODAL
  // =========================================================================
  openAddMonthModal() {
    this.editingMonthId = null;
    const form = document.getElementById('month-form');
    if (form) form.reset();
    document.getElementById('month-modal-title').innerHTML = '➕ เพิ่มรอบเดือนใหม่';
    document.getElementById('month-modal').classList.add('active');
  }

  openEditMonthModal(monthId) {
    const state = window.appState;
    const month = state.months.find(m => m.id === monthId);
    if (!month) return;

    this.editingMonthId = monthId;
    document.getElementById('month-modal-title').innerHTML = '✏️ แก้ไขรอบเดือน';
    document.getElementById('month-title').value = month.title || '';
    document.getElementById('month-goal').value = month.goal || '';
    document.getElementById('month-modal').classList.add('active');
  }

  async saveMonthForm(e) {
    if (e) e.preventDefault();
    const state = window.appState;
    const title = document.getElementById('month-title').value.trim();
    const goal = document.getElementById('month-goal').value.trim();

    if (!title) {
      this.showToast('กรุณาระบุชื่อเดือน', 'error');
      return;
    }

    if (this.editingMonthId) {
      const idx = state.months.findIndex(m => m.id === this.editingMonthId);
      if (idx >= 0) {
        state.months[idx].title = title;
        state.months[idx].goal = goal;
      }
    } else {
      const newMonth = {
        id: 'month_' + Date.now(),
        title,
        goal
      };
      state.months.push(newMonth);
    }

    await state.saveCurrentData();
    this.closeAllModals();
    this.showToast('บันทึกข้อมูลเดือนเรียบร้อย');
  }

  // =========================================================================
  // WEEK MODAL
  // =========================================================================
  openAddWeekModal(monthId) {
    this.editingWeekId = null;
    const form = document.getElementById('week-form');
    if (form) form.reset();
    document.getElementById('week-modal-title').innerHTML = '➕ เพิ่มสัปดาห์ใหม่';
    document.getElementById('week-modal-month-id').value = monthId || window.appState.currentMonthId || window.appState.months[0]?.id;
    document.getElementById('week-modal').classList.add('active');
  }

  openEditWeekModal(weekId) {
    const state = window.appState;
    const week = state.weeks.find(w => w.id === weekId);
    if (!week) return;

    this.editingWeekId = weekId;
    document.getElementById('week-modal-title').innerHTML = '✏️ แก้ไขสัปดาห์';
    document.getElementById('week-modal-month-id').value = week.monthId;
    document.getElementById('week-title').value = week.title || '';
    document.getElementById('week-summary').value = week.summary || '';
    document.getElementById('week-modal').classList.add('active');
  }

  async saveWeekForm(e) {
    if (e) e.preventDefault();
    const state = window.appState;
    const monthId = document.getElementById('week-modal-month-id').value || state.currentMonthId || state.months[0]?.id;
    const title = document.getElementById('week-title').value.trim();
    const summary = document.getElementById('week-summary').value.trim();

    if (!title) {
      this.showToast('กรุณาระบุชื่อสัปดาห์', 'error');
      return;
    }

    if (this.editingWeekId) {
      const idx = state.weeks.findIndex(w => w.id === this.editingWeekId);
      if (idx >= 0) {
        state.weeks[idx].title = title;
        state.weeks[idx].summary = summary;
      }
    } else {
      const newWeek = {
        id: 'week_' + Date.now(),
        monthId,
        title,
        summary
      };
      state.weeks.push(newWeek);
    }

    await state.saveCurrentData();
    this.closeAllModals();
    this.showToast('บันทึกสัปดาห์เรียบร้อย');
  }

  // =========================================================================
  // BACKUP & RESTORE
  // =========================================================================
  async exportBackup() {
    const data = {
      months: window.appState.months,
      weeks: window.appState.weeks,
      tasks: window.appState.tasks,
      exportedAt: new Date().toISOString()
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `Internship_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('สำรองข้อมูล JSON สำเร็จ!');
  }

  importBackupPrompt() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const json = JSON.parse(event.target.result);
          if (json && json.months) {
            window.appState.months = json.months || [];
            window.appState.weeks = json.weeks || [];
            window.appState.tasks = json.tasks || [];
            await window.appState.saveCurrentData();
            this.showToast('นำเข้าข้อมูลสำเร็จแล้ว!');
          }
        } catch (err) {
          this.showToast('ไฟล์ JSON ไม่ถูกต้อง', 'error');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  async resetData() {
    if (confirm('คุณต้องการรีเซ็ตข้อมูลตัวอย่างใหม่หรือไม่?')) {
      const sample = JSON.parse(JSON.stringify(window.DEFAULT_SAMPLE_DATA));
      window.appState.months = sample.months;
      window.appState.weeks = sample.weeks;
      window.appState.tasks = sample.tasks;
      await window.appState.saveCurrentData();
      window.appState.goToMonths();
      this.showToast('รีเซ็ตข้อมูลตัวอย่างเรียบร้อย');
    }
  }

  // =========================================================================
  // CLOUD SYNC CONTROLLER
  // =========================================================================
  setupCloudSyncListener() {
    if (!window.firebaseService) return;

    window.firebaseService.onStatusChange((status, error) => {
      const badge = document.getElementById('cloud-status-badge');
      const dot = document.getElementById('cloud-modal-dot');
      const title = document.getElementById('cloud-modal-status-title');
      const desc = document.getElementById('cloud-modal-status-desc');

      if (badge) {
        badge.className = `cloud-badge cloud-badge-${status}`;
        if (status === 'connected' || status === 'synced') {
          badge.textContent = 'ออนไลน์';
        } else if (status === 'syncing') {
          badge.textContent = 'กำลังซิงค์...';
        } else if (status === 'connecting') {
          badge.textContent = 'เชื่อมต่อ...';
        } else if (status === 'error') {
          badge.textContent = 'ติดสิทธิ์ / ข้อผิดพลาด';
        } else {
          badge.textContent = 'ออฟไลน์';
        }
      }

      if (dot) {
        dot.className = `cloud-status-indicator-dot ${status}`;
      }

      if (title && desc) {
        if (status === 'synced') {
          title.textContent = '🟢 ซิงค์กับ Cloud Firestore สำเร็จ';
          desc.textContent = 'ข้อมูลและรูปภาพทั้งหมดอัปเดตตรงกับคลาวด์แล้ว';
        } else if (status === 'connected') {
          title.textContent = '🟢 เชื่อมต่อ Cloud สำเร็จแล้ว';
          desc.textContent = 'พร้อมซิงค์และบันทึกข้อมูลแบบเรียลไทม์';
        } else if (status === 'syncing') {
          title.textContent = '🔄 กำลังส่ง/รับข้อมูลกับ Cloud...';
          desc.textContent = 'กรุณารอสักครู่ กำลังประมวลผลข้อมูล';
        } else if (status === 'error') {
          title.textContent = '⚠️ เกิดข้อผิดพลาดในการเชื่อมต่อ Cloud';
          desc.textContent = error || 'ตรวจสอบการเชื่อมต่ออินเทอร์เน็ตหรือ Security Rules ใน Firebase Console';
        } else {
          title.textContent = '🟡 กำลังเชื่อมต่อ...';
          desc.textContent = 'ระบบกำลังเริ่มต้นการทำงานกับ Firebase';
        }
      }
    });
  }

  openCloudModal() {
    const modal = document.getElementById('cloud-modal');
    if (modal) {
      modal.classList.add('active');
    }
  }

  async syncNow() {
    if (!window.firebaseService) {
      this.showToast('ยังไม่ได้เปิดใช้งาน Firebase', 'error');
      return;
    }
    this.showToast('กำลังซิงค์ข้อมูลกับ Cloud...');
    const cloudData = await window.firebaseService.loadData();
    if (cloudData && cloudData.months && cloudData.months.length > 0) {
      window.appState.months = cloudData.months;
      window.appState.weeks = cloudData.weeks;
      window.appState.tasks = cloudData.tasks;
      window.storageManager.saveLocalData(cloudData);
      await window.storageManager.saveIdbData(cloudData);
      window.appState.notify();
      this.showToast('ซิงค์ข้อมูลสำเร็จ!', 'success');
    } else {
      await this.forcePushLocalToCloud();
    }
  }

  async forcePushLocalToCloud() {
    if (!window.firebaseService) return;
    this.showToast('กำลังอัปโหลดข้อมูลในเครื่องขึ้น Cloud...');
    const data = {
      months: window.appState.months,
      weeks: window.appState.weeks,
      tasks: window.appState.tasks
    };
    const success = await window.firebaseService.saveData(data);
    if (success) {
      this.showToast('อัปโหลดข้อมูลขึ้น Cloud สำเร็จเรียบร้อย!', 'success');
    } else {
      this.showToast('อัปโหลดไม่สำเร็จ: ' + (window.firebaseService.lastError || ''), 'error');
    }
  }

  async forcePullCloudToLocal() {
    if (!window.firebaseService) return;
    if (!confirm('ต้องการดึงข้อมูลล่าสุดจาก Cloud มาเขียนทับข้อมูลในเครื่องนี้หรือไม่?')) return;

    this.showToast('กำลังดึงข้อมูลจาก Cloud...');
    const cloudData = await window.firebaseService.loadData();
    if (cloudData && cloudData.months) {
      window.appState.months = cloudData.months;
      window.appState.weeks = cloudData.weeks;
      window.appState.tasks = cloudData.tasks;
      window.storageManager.saveLocalData(cloudData);
      await window.storageManager.saveIdbData(cloudData);
      window.appState.notify();
      this.showToast('ดึงข้อมูลจาก Cloud สำเร็จ!', 'success');
    } else {
      this.showToast('ไม่พบข้อมูลบน Cloud หรือการเชื่อมต่อมีปัญหา: ' + (window.firebaseService.lastError || ''), 'error');
    }
  }
}

window.appController = new AppController();
document.addEventListener('DOMContentLoaded', () => {
  window.appController.init();
});
