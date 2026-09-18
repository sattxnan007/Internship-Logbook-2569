/**
 * UI Components Renderer (Clean Minimalist White Style)
 */

const UI = {
  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  formatDateThai(dateStr) {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const monthsThai = [
        'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
        'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
      ];
      return `${d.getDate()} ${monthsThai[d.getMonth()]} ${d.getFullYear() + 543}`;
    } catch (e) {
      return dateStr;
    }
  },

  renderBreadcrumbs(state) {
    const container = document.getElementById('breadcrumb-nav');
    if (!container) return;

    let html = `
      <div class="breadcrumb-item ${state.view === 'months' ? 'active' : ''}" onclick="window.appState.goToMonths()">
        <span>🏠</span>
        <span>รายเดือน</span>
      </div>
    `;

    if (state.currentMonthId) {
      const month = state.getCurrentMonth();
      if (month) {
        html += `
          <span class="breadcrumb-separator">/</span>
          <div class="breadcrumb-item ${state.view === 'weeks' ? 'active' : ''}" onclick="window.appState.goToMonth('${month.id}')">
            <span>📅</span>
            <span>${this.escapeHtml(month.title)}</span>
          </div>
        `;
      }
    }

    if (state.currentWeekId) {
      const week = state.getCurrentWeek();
      if (week) {
        html += `
          <span class="breadcrumb-separator">/</span>
          <div class="breadcrumb-item active">
            <span>📆</span>
            <span>${this.escapeHtml(week.title)}</span>
          </div>
        `;
      }
    }

    container.innerHTML = html;
  },

  renderSidebar(state) {
    const treeContainer = document.getElementById('sidebar-tree');
    if (!treeContainer) return;

    let html = '';
    const months = state.getVisibleMonths ? state.getVisibleMonths() : (state.months || []);

    months.forEach((month, idx) => {
      const weeks = state.getWeeksForMonth(month.id);
      const isExpanded = state.currentMonthId === month.id || state.view === 'months';

      html += `
        <div class="tree-node ${isExpanded ? 'expanded' : ''}" id="tree-month-${month.id}">
          <div class="tree-node-header ${state.currentMonthId === month.id && state.view === 'weeks' ? 'active' : ''}"
               onclick="window.appState.goToMonth('${month.id}')">
            <span class="tree-toggle-arrow" onclick="event.stopPropagation(); UI.toggleTreeNode('tree-month-${month.id}')">▶</span>
            <span>📅</span>
            <span style="flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${this.escapeHtml(month.title)}</span>
            <span class="badge-count">${weeks.length}w</span>
          </div>
          <div class="tree-children">
            ${weeks.map((week, wIdx) => `
              <div class="nav-item ${state.currentWeekId === week.id ? 'active' : ''}"
                   style="font-size:0.84rem; padding: 5px 8px;"
                   onclick="window.appState.goToWeek('${week.id}', '${month.id}')">
                <span>📆</span>
                <span style="flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${this.escapeHtml(week.title)}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    });

    treeContainer.innerHTML = html;
  },

  toggleTreeNode(nodeId) {
    const node = document.getElementById(nodeId);
    if (node) node.classList.toggle('expanded');
  },

  // --------------------------------------------------------------------------
  // LEVEL 1: MONTHLY VIEW
  // --------------------------------------------------------------------------
  renderMonthsView(state) {
    const months = state.getVisibleMonths ? state.getVisibleMonths() : (state.months || []);

    let html = `
      <div class="section-header">
        <div>
          <h2 class="section-title">📅 สรุปผลการปฏิบัติงานรายเดือน</h2>
          <p class="section-subtitle">คลิกเลือกเดือนเพื่อเข้าสู่มุมมองรายสัปดาห์ (Weekly) และบันทึกงานรายวัน (Daily)</p>
        </div>
        ${state.isAdmin ? `
          <button class="btn btn-primary" onclick="window.appController.openAddMonthModal()">
            <span>➕ เพิ่มเดือนใหม่</span>
          </button>
        ` : ''}
      </div>

      <div class="months-grid">
    `;

    if (months.length === 0) {
      html += `
        <div style="grid-column: 1/-1; text-align: center; padding: 48px; background: #ffffff; border: 1px dashed var(--border-medium); border-radius: var(--radius-md);">
          <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 1rem;">ยังไม่มีข้อมูลเดือน</p>
          ${state.isAdmin ? `<button class="btn btn-primary" onclick="window.appController.openAddMonthModal()">➕ เพิ่มเดือนแรก</button>` : ''}
        </div>
      `;
    }

    months.forEach((month, index) => {
      const weeks = state.getWeeksForMonth(month.id);
      const weekIds = weeks.map(w => w.id);
      const tasksInMonth = (state.tasks || []).filter(t => weekIds.includes(t.weekId) && (!state.isTaskHidden || !state.isTaskHidden(t)));

      html += `
        <div class="month-card" onclick="window.appState.goToMonth('${month.id}')">
          <div class="month-card-header">
            <span class="month-icon">📅</span>
            <span class="month-badge">เดือนที่ ${index + 1}</span>
          </div>

          <h3 class="month-card-title">${this.escapeHtml(month.title)}</h3>
          
          <div class="month-card-desc">
            ${month.goal ? this.escapeHtml(month.goal) : '<span style="color: var(--text-tertiary); font-style: italic;">ไม่มีคำอธิบาย</span>'}
          </div>

          <div class="month-card-footer">
            <span>📆 ${weeks.length} สัปดาห์ &nbsp;|&nbsp; 📝 ${tasksInMonth.length} บันทึก</span>
            <span style="color: var(--accent-blue); font-weight: 700;">เปิดดู ➔</span>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    return html;
  },

  // --------------------------------------------------------------------------
  // LEVEL 2: WEEKLY VIEW
  // --------------------------------------------------------------------------
  renderWeeklyView(state) {
    const month = state.getCurrentMonth();
    if (!month) {
      return `<div style="padding: 40px; text-align: center;">ไม่พบข้อมูลเดือน <button class="btn btn-primary" onclick="window.appState.goToMonths()">กลับหน้ารายเดือน</button></div>`;
    }

    const weeks = state.getWeeksForMonth(month.id);

    let html = `
      <div class="section-header">
        <div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <button class="btn btn-secondary btn-sm" onclick="window.appState.goToMonths()">⬅️ ย้อนกลับ</button>
            <h2 class="section-title">📅 ${this.escapeHtml(month.title)}</h2>
          </div>
          ${month.goal ? `<p class="section-subtitle" style="margin-top: 4px;">🎯 ${this.escapeHtml(month.goal)}</p>` : ''}
        </div>
        ${state.isAdmin ? `
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary" onclick="window.appController.openEditMonthModal('${month.id}')">✏️ แก้ไขเดือน</button>
            <button class="btn btn-primary" onclick="window.appController.openAddWeekModal('${month.id}')">➕ เพิ่มสัปดาห์</button>
          </div>
        ` : ''}
      </div>

      <div class="weeks-container">
    `;

    if (weeks.length === 0) {
      html += `
        <div style="text-align: center; padding: 48px; background: #ffffff; border: 1px dashed var(--border-medium); border-radius: var(--radius-md);">
          <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 1rem;">ยังไม่มีสัปดาห์ในเดือนนี้</p>
          ${state.isAdmin ? `<button class="btn btn-primary" onclick="window.appController.openAddWeekModal('${month.id}')">➕ เพิ่มสัปดาห์ที่ 1</button>` : ''}
        </div>
      `;
    }

    weeks.forEach((week, index) => {
      const tasks = (state.tasks || []).filter(t => t.weekId === week.id);
      const imagesCount = tasks.reduce((sum, t) => {
        if (t.images && Array.isArray(t.images)) {
          return sum + t.images.length;
        }
        return sum + (t.imageUrl ? 1 : 0);
      }, 0);

      html += `
        <div class="week-card" onclick="window.appState.goToWeek('${week.id}', '${month.id}')">
          <div class="week-info">
            <span class="week-number-tag">Week ${index + 1}</span>
            <div>
              <div class="week-title">${this.escapeHtml(week.title)}</div>
              ${week.summary ? `<div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 3px;">${this.escapeHtml(week.summary)}</div>` : ''}
            </div>
          </div>

          <div class="week-stats">
            <span>📝 ${tasks.length} วัน (${imagesCount} รูป)</span>
            ${state.isAdmin ? `<button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); window.appController.openEditWeekModal('${week.id}')">✏️ แก้ไข</button>` : ''}
            <button class="btn btn-primary btn-sm" onclick="window.appState.goToWeek('${week.id}', '${month.id}')">เข้าดู ➔</button>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    return html;
  },

  // --------------------------------------------------------------------------
  // LEVEL 3: DAILY TASKS VIEW (MULTIPLE IMAGES + 1 DESCRIPTION UNDER IMAGES)
  // --------------------------------------------------------------------------
  renderDailyTasksView(state) {
    const month = state.getCurrentMonth();
    const week = state.getCurrentWeek();

    if (!week) {
      return `<div style="padding: 40px; text-align: center;">ไม่พบข้อมูลสัปดาห์ <button class="btn btn-primary" onclick="window.appState.goToMonths()">กลับหน้ารายเดือน</button></div>`;
    }

    const tasks = state.getTasksForWeek(week.id);

    let html = `
      <div class="section-header">
        <div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <button class="btn btn-secondary btn-sm" onclick="window.appState.goToMonth('${month?.id || ''}')">⬅️ ย้อนกลับ</button>
            <h2 class="section-title">📆 ${this.escapeHtml(week.title)}</h2>
          </div>
          ${week.summary ? `<p class="section-subtitle" style="margin-top: 4px;">💡 ${this.escapeHtml(week.summary)}</p>` : ''}
        </div>
        ${state.isAdmin ? `
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary" onclick="window.appController.openEditWeekModal('${week.id}')">✏️ แก้ไขสัปดาห์</button>
            <button class="btn btn-primary" onclick="window.appController.openAddTaskModal('${week.id}')">➕ เพิ่มบันทึกรายวัน</button>
          </div>
        ` : ''}
      </div>

      <div class="daily-tasks-grid">
    `;

    if (tasks.length === 0) {
      html += `
        <div style="grid-column: 1/-1; text-align: center; padding: 48px; background: #ffffff; border: 1px dashed var(--border-medium); border-radius: var(--radius-md);">
          <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 1rem;">ยังไม่มีบันทึกประจำวันสำหรับสัปดาห์นี้</p>
          ${state.isAdmin ? `<button class="btn btn-primary" onclick="window.appController.openAddTaskModal('${week.id}')">➕ เพิ่มบันทึกวันแรก</button>` : ''}
        </div>
      `;
    }

    tasks.forEach(task => {
      const images = (task.images && Array.isArray(task.images) && task.images.length > 0)
        ? task.images
        : (task.imageUrl ? [task.imageUrl] : []);

      const activeSlideIndex = (window.appController && window.appController.getCardSlideIndex)
        ? window.appController.getCardSlideIndex(task.id)
        : 0;

      const currentImg = images[activeSlideIndex] || images[0] || '';

      let imagesHtml = '';

      if (images.length === 0) {
        imagesHtml = `
          <div class="no-image-box" ${state.isAdmin ? `onclick="window.appController.openEditTaskModal('${task.id}')" title="คลิกเพื่อแนบรูปภาพ"` : ''}>
            <span style="font-size: 1.5rem;">📷</span>
            <span style="font-weight: 600;">ยังไม่มีรูปภาพ</span>
            ${state.isAdmin ? `<span style="font-size: 0.8rem; color: var(--primary); text-decoration: underline;">คลิกเพื่อแนบรูปภาพ</span>` : ''}
          </div>
        `;
      } else if (images.length === 1) {
        imagesHtml = `
          <div class="card-slider-wrapper" id="card-slider-${task.id}">
            <div class="card-main-image-box" onclick="window.appController.openLightboxGallery('${task.id}', 0)" title="คลิกเพื่อดูรูปภาพขนาดใหญ่">
              <img src="${this.escapeHtml(images[0])}" class="card-slide-main-img" alt="${this.escapeHtml(task.title || 'ภาพผลงาน')}" loading="lazy">
              <div class="card-image-zoom-hint">🔍 ดูรูปใหญ่</div>
            </div>
          </div>
        `;
      } else {
        // 2 or more images: Interactive Slider with Prominent ◀ ▶ Arrows + Thumbnails Row
        imagesHtml = `
          <div class="card-slider-wrapper" id="card-slider-${task.id}">
            <div class="card-main-image-box" onclick="window.appController.openLightboxGallery('${task.id}', window.appController.getCardSlideIndex('${task.id}'))" title="คลิกเพื่อดูรูปภาพขนาดใหญ่">
              <img src="${this.escapeHtml(currentImg)}" class="card-slide-main-img" alt="${this.escapeHtml(task.title || 'ภาพผลงาน')}" loading="lazy">
              
              <div class="card-slide-counter">📷 ${activeSlideIndex + 1} / ${images.length}</div>
              <div class="card-image-zoom-hint">🔍 ดูรูปใหญ่</div>
              
              <!-- High-Contrast Left/Right Slide Buttons -->
              <button type="button" class="card-slide-btn card-slide-prev" onclick="window.appController.prevCardSlide('${task.id}', event)" title="รูปก่อนหน้า (◀)">
                ❮
              </button>
              <button type="button" class="card-slide-btn card-slide-next" onclick="window.appController.nextCardSlide('${task.id}', event)" title="รูปถัดไป (▶)">
                ❯
              </button>
            </div>

            <!-- Thumbnail Strip Row -->
            <div class="card-thumbs-strip">
              ${images.map((img, idx) => `
                <div class="card-thumb-item ${idx === activeSlideIndex ? 'active' : ''}" onclick="window.appController.setCardSlide('${task.id}', ${idx}, event)" title="ดูรูปที่ ${idx + 1}">
                  <img src="${this.escapeHtml(img)}" alt="thumb ${idx + 1}">
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }

      html += `
        <div class="daily-task-card" id="task-card-${task.id}">
          ${imagesHtml}

          <div class="task-card-body">
            <div class="task-date-row">
              <span>📅 ${this.formatDateThai(task.date)}</span>
              ${task.dayName ? `<span style="background: var(--bg-tertiary); padding: 2px 6px; border-radius: 4px; font-size: 0.76rem;">วัน${task.dayName}</span>` : ''}
            </div>

            ${task.title ? `<div class="task-title-text">${this.escapeHtml(task.title)}</div>` : ''}

            <!-- 1 Single Description Under Image -->
            <div class="task-single-description">
              ${this.escapeHtml(task.description || 'ไม่มีคำอธิบาย')}
            </div>
          </div>

          ${state.isAdmin ? `
            <div class="task-card-footer">
              <button class="btn btn-secondary btn-sm" onclick="window.appController.openEditTaskModal('${task.id}')">✏️ แก้ไข</button>
              <button class="btn btn-danger btn-sm" onclick="window.appController.deleteTask('${task.id}')">🗑️ ลบ</button>
            </div>
          ` : ''}
        </div>
      `;
    });

    html += `</div>`;
    return html;
  }
};

window.UI = UI;
