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
      <div class="breadcrumb-item ${state.view === 'home' ? 'active' : ''}" onclick="window.appState.goToHome()">
        <span>🏠</span>
        <span>หน้าแรก</span>
      </div>
    `;

    if (state.view === 'location') {
      html += `
        <span class="breadcrumb-separator">/</span>
        <div class="breadcrumb-item active">
          <span>📍</span>
          <span>ข้อมูลสถานที่ฝึกสหกิจ</span>
        </div>
      `;
    } else if (state.view === 'months') {
      html += `
        <span class="breadcrumb-separator">/</span>
        <div class="breadcrumb-item active">
          <span>📋</span>
          <span>บันทึกการปฏิบัติงานรายเดือน</span>
        </div>
      `;
    } else if (state.view === 'weeks' || state.view === 'days') {
      html += `
        <span class="breadcrumb-separator">/</span>
        <div class="breadcrumb-item" onclick="window.appState.goToMonths()">
          <span>📋</span>
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
    }

    container.innerHTML = html;
  },

  renderSidebar(state) {
    // Update active highlight on static nav items
    const navHome = document.getElementById('nav-item-home');
    const navLoc = document.getElementById('nav-item-location');
    const navMonths = document.getElementById('nav-item-months');
    
    if (navHome) navHome.classList.toggle('active', state.view === 'home');
    if (navLoc) navLoc.classList.toggle('active', state.view === 'location');
    if (navMonths) navMonths.classList.toggle('active', state.view === 'months');

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
  // HOME VIEW (หน้าแรก - บันทึกการฝึกสหกิจ 2569)
  // --------------------------------------------------------------------------
  renderHomeView(state) {
    const visibleMonths = state.getVisibleMonths ? state.getVisibleMonths() : (state.months || []);
    const visibleWeeks = state.getVisibleWeeks ? state.getVisibleWeeks() : (state.weeks || []);
    const visibleTasks = state.tasks ? state.tasks.filter(t => !state.isTaskHidden(t)) : [];

    return `
      <div class="home-page-container">
        
        <!-- Hero Student Profile Card (No student photo as requested) -->
        <div class="home-hero-card">
          <div class="home-hero-badge-row">
            <span class="home-badge-tag">
              <span class="badge-pulse-dot"></span>
              ปีการศึกษา 2569 • ฝึกสหกิจศึกษา
            </span>
            <span class="home-badge-sub">มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ</span>
          </div>

          <div class="home-student-layout">
            <!-- Academic Tech Emblem (Minimalist & Dignified) -->
            <div class="home-student-emblem-box" title="สัญลักษณ์การศึกษาและเทคโนโลยี มจพ.">
              <div class="home-emblem-icon">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <div class="home-emblem-label">KMUTNB • COOP</div>
            </div>

            <!-- Student Credentials Matching User Specification -->
            <div class="home-student-details">
              <h1 class="home-main-title">บันทึกการฝึกสหกิจ 2569</h1>
              
              <div class="home-author-row">
                <span class="author-prefix">โดย</span>
                <span class="author-name">นายเสฏฐนันท์ ทิพย์สังวาลย์</span>
              </div>

              <div class="home-credentials-list">
                <div class="credential-item">
                  <span class="cred-icon">👨‍🎓</span>
                  <span class="cred-text"><strong>นักศึกษาภาควิชาคอมพิวเตอร์ศึกษา</strong></span>
                </div>
                <div class="credential-item">
                  <span class="cred-icon">🏛️</span>
                  <span class="cred-text">คณะครุศาสตร์อุตสาหกรรม</span>
                </div>
                <div class="credential-item">
                  <span class="cred-icon">💻</span>
                  <span class="cred-text">สาขาเทคโนโลยีคอมพิวเตอร์</span>
                </div>
                <div class="credential-item">
                  <span class="cred-icon">🏫</span>
                  <span class="cred-text">มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Access Dashboard Cards Grid -->
        <div class="home-grid">
          
          <!-- Card 1: Internship Location Page -->
          <div class="home-action-card" onclick="window.appState.goToLocation()">
            <div class="action-card-top">
              <div class="action-card-icon-box location-icon-bg">
                📍
              </div>
              <span class="action-card-tag">สถานที่ฝึกสหกิจ</span>
            </div>
            <h3 class="action-card-title">ข้อมูลสถานที่ฝึกสหกิจ</h3>
            <p class="action-card-desc">
              ดูรายละเอียดสถานที่ฝึกสหกิจ ผู้ควบคุมการฝึกงาน และสถานที่ตั้งพร้อมแผนที่การเดินทาง
            </p>
            <div class="action-card-cta">
              <span>ดูข้อมูลสถานที่ ➔</span>
            </div>
          </div>

          <!-- Card 2: Monthly Logbook View -->
          <div class="home-action-card highlight" onclick="window.appState.goToMonths()">
            <div class="action-card-top">
              <div class="action-card-icon-box logbook-icon-bg">
                📋
              </div>
              <span class="action-card-tag tag-blue">บันทึกผลงาน</span>
            </div>
            <h3 class="action-card-title">บันทึกผลการปฏิบัติงาน</h3>
            <p class="action-card-desc">
              เข้าสู่บันทึกผลการปฏิบัติงานรายเดือน รายสัปดาห์ และบันทึกงานประจำวัน (Daily Tasks) พร้อมภาพถ่าย
            </p>
            <div class="action-card-cta">
              <span>เปิดดูบันทึกงาน ➔</span>
            </div>
          </div>

          <!-- Card 3: Summary Stats -->
          <div class="home-action-card" onclick="window.appState.goToMonths()">
            <div class="action-card-top">
              <div class="action-card-icon-box stats-icon-bg">
                📊
              </div>
              <span class="action-card-tag tag-green">ภาพรวมสถิติ</span>
            </div>
            <h3 class="action-card-title">สถิติการปฏิบัติงาน</h3>
            <div class="home-stats-preview">
              <div class="stat-mini-pill">
                <span class="stat-mini-num">${visibleMonths.length}</span>
                <span class="stat-mini-label">เดือน</span>
              </div>
              <div class="stat-mini-pill">
                <span class="stat-mini-num">${visibleWeeks.length}</span>
                <span class="stat-mini-label">สัปดาห์</span>
              </div>
              <div class="stat-mini-pill">
                <span class="stat-mini-num">${visibleTasks.length}</span>
                <span class="stat-mini-label">บันทึกงาน</span>
              </div>
            </div>
            <div class="action-card-cta">
              <span>เข้าสู่รายเดือน ➔</span>
            </div>
          </div>

        </div>

      </div>
    `;
  },

  // --------------------------------------------------------------------------
  // LOCATION VIEW (ข้อมูลสถานที่ฝึกสหกิจ - INTERNSHIP LOCATION)
  // --------------------------------------------------------------------------
  renderLocationView(state) {
    const loc = state.locationInfo || (typeof DEFAULT_LOCATION_INFO !== 'undefined' ? DEFAULT_LOCATION_INFO : {});
    const mapUrl = loc.mapUrl || 'https://www.google.co.th/maps/search/999+%E0%B8%96%E0%B8%99%E0%B8%99%E0%B8%AA%E0%B8%B2%E0%B8%A1%E0%B9%80%E0%B8%AA%E0%B8%99+%E0%B8%96%E0%B8%99%E0%B8%99%E0%B8%99%E0%B8%84%E0%B8%A3%E0%B9%84%E0%B8%8A%E0%B8%A2%E0%B8%A8%E0%B8%A3%E0%B8%B5+%E0%B9%80%E0%B8%82%E0%B8%95%E0%B8%94%E0%B8%B8%E0%B8%AA%E0%B8%B4%E0%B8%95+%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%A3+%7C+%28%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97+%E0%B8%9A%E0%B8%B8%E0%B8%8D%E0%B8%A3%E0%B8%AD%E0%B8%94%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A7%E0%B9%80%E0%B8%A7%E0%B8%AD%E0%B8%A3%E0%B8%B5%E0%B9%88+%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94%29';

    return `
      <div class="location-page-container">
        
        <!-- Header Banner -->
        <div class="location-header-banner">
          <h1 class="location-main-title">INTERNSHIP LOCATION</h1>
          <div class="location-title-accent-bar"></div>
          <p class="location-main-subtitle">ข้อมูลสถานที่ฝึกสหกิจ ผู้ควบคุมการฝึกงาน และข้อมูลติดต่อ</p>

          ${state.isAdmin ? `
            <div style="margin-top: 14px;">
              <button class="btn btn-secondary btn-sm" onclick="window.appController.openLocationEditModal()">
                <span>✏️ แก้ไขข้อมูลสถานที่ (Admin)</span>
              </button>
            </div>
          ` : ''}
        </div>

        <!-- Section 1: ข้อมูลสถานที่ฝึกงาน (บริษัท บุญรอดบริวเวอรี่ จำกัด) -->
        <div class="location-section-row">
          <div class="location-media-col">
            <div class="location-img-wrap" onclick="window.appController.openImageInLightbox('img/boonrawd_building.jpg', '${this.escapeHtml(loc.placeName || 'บริษัท บุญรอดบริวเวอรี่ จำกัด')}')">
              <img src="img/boonrawd_building.jpg" alt="${this.escapeHtml(loc.placeName || 'บริษัท บุญรอดบริวเวอรี่ จำกัด')}" class="location-photo-img">
              <span class="location-img-hint">🔍 คลิกดูรูปใหญ่</span>
            </div>
          </div>
          <div class="location-info-col">
            <div class="location-block-header">
              <h3 class="location-block-title">${this.escapeHtml(loc.placeTitle || 'ข้อมูลสถานที่ฝึกงาน')}</h3>
              <div class="location-block-line"></div>
            </div>
            <div class="location-block-content">
              <div class="location-institute-name">${this.escapeHtml(loc.placeName || 'บริษัท บุญรอดบริวเวอรี่ จำกัด')}</div>
              <div class="location-dept-box">
                <div class="location-dept-item">
                  <span class="dept-badge">ฝ่าย</span>
                  <span class="dept-val"><strong>${this.escapeHtml(loc.placeDepartment || 'Data Center Maintenance Division')}</strong></span>
                </div>
                <div class="location-dept-item" style="margin-top: 6px;">
                  <span class="dept-badge badge-blue">แผนก</span>
                  <span class="dept-val"><strong>${this.escapeHtml(loc.placeSection || 'Service Desk')}</strong></span>
                </div>
              </div>
              <div class="location-ready-note">*(ข้อมูลพร้อมใช้งาน)*</div>
            </div>
          </div>
        </div>

        <div class="location-divider-dotted"></div>

        <!-- Section 2: ผู้ควบคุมการฝึกงาน (คุณธัญธนัช ชัยรัตน์) -->
        <div class="location-section-row">
          <div class="location-media-col">
            <div class="location-img-wrap supervisor-wrap" onclick="window.appController.openImageInLightbox('img/supervisor_thanthanat.jpg', '${this.escapeHtml(loc.supervisorName || 'ธัญธนัช ชัยรัตน์')} - ${this.escapeHtml(loc.supervisorRole || 'IT Support 1')}')">
              <img src="img/supervisor_thanthanat.jpg" alt="${this.escapeHtml(loc.supervisorName || 'ธัญธนัช ชัยรัตน์')}" class="location-photo-img supervisor-photo">
              <span class="location-img-hint">🔍 คลิกดูรูปใหญ่</span>
            </div>
          </div>
          <div class="location-info-col">
            <div class="location-block-header">
              <h3 class="location-block-title">${this.escapeHtml(loc.supervisorTitle || 'ผู้ควบคุมการฝึกงาน')}</h3>
            </div>
            <div class="location-block-content" style="text-align: center;">
              <div class="supervisor-name">${this.escapeHtml(loc.supervisorName || 'ธัญธนัช ชัยรัตน์')}</div>
              <div class="supervisor-role-label">ตำแหน่ง:</div>
              <div class="supervisor-role-val">${this.escapeHtml(loc.supervisorRole || 'IT Support 1')}</div>
            </div>
          </div>
        </div>

        <div class="location-divider-dotted"></div>

        <!-- Section 3: สถานที่ตั้ง & ติดต่อ (บริษัท บุญรอดบริวเวอรี่ จำกัด สามเสน) -->
        <div class="location-section-row">
          <div class="location-media-col">
            <div class="location-map-container" style="border-radius: 12px; overflow: hidden; box-shadow: 0 4px 14px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; height: 240px;">
              <iframe 
                title="แผนที่ บริษัท บุญรอดบริวเวอรี่ จำกัด"
                src="https://maps.google.com/maps?q=999+%E0%B8%96%E0%B8%99%E0%B8%99%E0%B8%AA%E0%B8%B2%E0%B8%A1%E0%B9%80%E0%B8%AA%E0%B8%99+%E0%B9%81%E0%B8%82%E0%B8%A7%E0%B8%87%E0%B8%96%E0%B8%99%E0%B8%99%E0%B8%99%E0%B8%84%E0%B8%A3%E0%B9%84%E0%B8%8A%E0%B8%A2%E0%B8%A8%E0%B8%A3%E0%B8%B5+%E0%B9%80%E0%B8%82%E0%B8%95%E0%B8%94%E0%B8%B8%E0%B8%AA%E0%B8%B4%E0%B8%95+%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%A3+10300&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
          <div class="location-info-col">
            <div class="location-contact-group">
              <div class="location-orange-label">${this.escapeHtml(loc.locationTitle || 'สถานที่ตั้ง')}</div>
              <div class="location-address-text">
                <div style="font-weight: 700; color: var(--text-main); font-size: 1.05rem; margin-bottom: 4px;">
                  ${this.escapeHtml(loc.companyName || loc.placeName || 'บริษัท บุญรอดบริวเวอรี่ จำกัด')}
                </div>
                <div>${(this.escapeHtml(loc.address || '999 ถนนสามเสน แขวงถนนนครไชยศรี เขตดุสิต กรุงเทพมหานคร 10300')).replace(/\n/g, '<br>')}</div>
              </div>

              <div class="location-orange-label" style="margin-top: 14px;">${this.escapeHtml(loc.contactTitle || 'ติดต่อ')}</div>
              <div class="location-contact-item">
                <span class="contact-key">โทรศัพท์ :</span>
                <a href="tel:${(loc.phone || '022424000').replace(/[^0-9]/g, '')}" class="contact-val-link">${this.escapeHtml(loc.phone || '02 242 4000')}</a>
              </div>

              <div class="location-action-btns">
                <a href="${this.escapeHtml(mapUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                  <span>🗺️ เปิดบน Google Maps</span>
                </a>
                <a href="tel:${(loc.phone || '022424000').replace(/[^0-9]/g, '')}" class="btn btn-secondary btn-sm">
                  <span>📞 โทร 02 242 4000</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;
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
