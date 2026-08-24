/**
 * Application Controller & Event Handlers
 */

class AppController {
  constructor() {
    this.editingTaskId = null;
    this.editingWeekId = null;
    this.editingMonthId = null;
    this.uploadedImageBase64 = null;
  }

  async init() {
    // 1. Load data from storage
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
    // Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
        this.closeLightbox();
      }
    });

    // Global Clipboard Paste (Ctrl+V) for image upload
    window.addEventListener('paste', (e) => {
      const taskModal = document.getElementById('task-modal');
      if (taskModal && taskModal.classList.contains('active')) {
        const items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for (const item of items) {
          if (item.kind === 'file' && item.type.startsWith('image/')) {
            const blob = item.getAsFile();
            this.handleImageFile(blob);
            break;
          }
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

  openLightbox(imageUrl, caption = '') {
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const captionElem = document.getElementById('lightbox-caption');

    if (modal && img) {
      img.src = imageUrl;
      if (captionElem) captionElem.textContent = caption;
      modal.classList.add('active');
    }
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
    this.uploadedImageBase64 = null;
  }

  populateWeekSelect(selectedWeekId) {
    const select = document.getElementById('task-select-week');
    if (!select) return;

    const state = window.appState;
    const months = state.months || [];
    const weeks = state.weeks || [];

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
  // TASK MODAL (1 Image + 1 Description)
  // =========================================================================
  openAddTaskModal(targetWeekId) {
    this.editingTaskId = null;
    this.uploadedImageBase64 = null;

    const form = document.getElementById('task-form');
    if (form) form.reset();

    const dateInput = document.getElementById('task-date');
    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }

    const previewContainer = document.getElementById('task-image-preview');
    if (previewContainer) {
      previewContainer.innerHTML = '';
      previewContainer.style.display = 'none';
    }

    const dropzone = document.getElementById('task-image-dropzone');
    if (dropzone) dropzone.style.display = 'flex';

    document.getElementById('task-modal-title').innerHTML = '📝 เพิ่มบันทึกงานประจำวัน (Daily Task)';

    const currentWeekId = targetWeekId || window.appState.currentWeekId || (window.appState.weeks[0]?.id || '');
    this.populateWeekSelect(currentWeekId);

    document.getElementById('task-modal').classList.add('active');
  }

  openEditTaskModal(taskId) {
    const state = window.appState;
    const task = state.tasks.find(t => t.id === taskId);
    if (!task) return;

    this.editingTaskId = taskId;
    this.uploadedImageBase64 = task.imageUrl || null;

    document.getElementById('task-modal-title').innerHTML = '✏️ แก้ไขบันทึกงานประจำวัน';
    this.populateWeekSelect(task.weekId);

    document.getElementById('task-title').value = task.title || '';
    document.getElementById('task-date').value = task.date || new Date().toISOString().split('T')[0];
    document.getElementById('task-description').value = task.description || '';

    const previewContainer = document.getElementById('task-image-preview');
    const dropzone = document.getElementById('task-image-dropzone');

    if (task.imageUrl && previewContainer) {
      previewContainer.style.display = 'block';
      previewContainer.innerHTML = `
        <div class="image-preview-box">
          <img src="${task.imageUrl}" alt="preview">
          <button type="button" class="remove-image-btn" onclick="window.appController.removeTaskImage()">❌ ลบรูปภาพ</button>
        </div>
      `;
      if (dropzone) dropzone.style.display = 'none';
    } else {
      if (previewContainer) {
        previewContainer.innerHTML = '';
        previewContainer.style.display = 'none';
      }
      if (dropzone) dropzone.style.display = 'flex';
    }

    document.getElementById('task-modal').classList.add('active');
  }

  setupImageDropzone() {
    const dropzone = document.getElementById('task-image-dropzone');
    const fileInput = document.getElementById('task-image-file');

    if (!dropzone || !fileInput) return;

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
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        this.handleImageFile(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        this.handleImageFile(e.target.files[0]);
      }
    });
  }

  handleImageFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      this.showToast('กรุณาเลือกไฟล์รูปภาพเท่านั้น', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDimension = 1200;
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

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        this.uploadedImageBase64 = compressedDataUrl;

        const previewContainer = document.getElementById('task-image-preview');
        const dropzone = document.getElementById('task-image-dropzone');

        if (previewContainer) {
          previewContainer.style.display = 'block';
          previewContainer.innerHTML = `
            <div class="image-preview-box">
              <img src="${compressedDataUrl}" alt="uploaded preview">
              <button type="button" class="remove-image-btn" onclick="window.appController.removeTaskImage()">❌ ลบรูปภาพ</button>
            </div>
          `;
        }
        if (dropzone) dropzone.style.display = 'none';
        this.showToast('แนบรูปภาพเรียบร้อยแล้ว');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  removeTaskImage() {
    this.uploadedImageBase64 = null;
    const fileInput = document.getElementById('task-image-file');
    if (fileInput) fileInput.value = '';
    
    const previewContainer = document.getElementById('task-image-preview');
    if (previewContainer) {
      previewContainer.innerHTML = '';
      previewContainer.style.display = 'none';
    }

    const dropzone = document.getElementById('task-image-dropzone');
    if (dropzone) dropzone.style.display = 'flex';
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
            imageUrl: this.uploadedImageBase64 || state.tasks[taskIdx].imageUrl || '',
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
          imageUrl: this.uploadedImageBase64 || '',
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
}

window.appController = new AppController();
document.addEventListener('DOMContentLoaded', () => {
  window.appController.init();
});
