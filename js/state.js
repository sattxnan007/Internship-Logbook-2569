/**
 * Clean & Robust Application State
 */

const DEFAULT_LOCATION_INFO = {
  placeTitle: 'ข้อมูลสถานที่ฝึกงาน',
  placeName: 'บริษัท บุญรอดบริวเวอรี่ จำกัด',
  placeLine: 'สาย Engineering and Information Technology Business Unit',
  placeGroup: 'กลุ่ม Infrastructure & Maintenance Services Team',
  placeDepartment: 'ฝ่าย Data Center & Maintenance Systems Division',
  placeSection: 'แผนก Service Desk',
  placeDescription: 'สาย Engineering and Information Technology Business Unit กลุ่ม Infrastructure & Maintenance Services Team ฝ่าย Data Center & Maintenance Systems Division แผนก Service Desk',
  placeImage: 'img/boonrawd_building.jpg',
  supervisorTitle: 'ผู้ควบคุมการฝึกงาน',
  supervisorName: 'ธัญธนัช ชัยรัตน์',
  supervisorRole: 'IT Support 1',
  supervisorImage: 'img/supervisor_thanthanat.jpg',
  locationTitle: 'สถานที่ตั้ง',
  companyName: 'บริษัท บุญรอดบริวเวอรี่ จำกัด',
  address: '999 ถนนสามเสน แขวงถนนนครไชยศรี เขตดุสิต กรุงเทพมหานคร 10300',
  contactTitle: 'ติดต่อ',
  phone: '02 242 4000',
  fax: '',
  email: '',
  mapUrl: 'https://www.google.co.th/maps/search/999+%E0%B8%96%E0%B8%99%E0%B8%99%E0%B8%AA%E0%B8%B2%E0%B8%A1%E0%B9%80%E0%B8%AA%E0%B8%99+%E0%B8%96%E0%B8%99%E0%B8%99%E0%B8%99%E0%B8%84%E0%B8%A3%E0%B9%84%E0%B8%8A%E0%B8%A2%E0%B8%A8%E0%B8%A3%E0%B8%B5+%E0%B9%80%E0%B8%82%E0%B8%95%E0%B8%94%E0%B8%B8%E0%B8%AA%E0%B8%B4%E0%B8%95+%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B8%87%E0%B9%80%E0%B8%97%E0%B8%9E%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%A3+%7C+%28%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A9%E0%B8%B1%E0%B8%97+%E0%B8%9A%E0%B8%B8%E0%B8%8D%E0%B8%A3%E0%B8%AD%E0%B8%94%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%A7%E0%B9%80%E0%B8%A7%E0%B8%AD%E0%B8%A3%E0%B8%B5%E0%B9%88+%E0%B8%88%E0%B8%B3%E0%B8%81%E0%B8%B1%E0%B8%94%29'
};

class AppState {
  constructor() {
    this.view = 'home'; // 'home' | 'location' | 'months' | 'weeks' | 'days'
    this.currentMonthId = null;
    this.currentWeekId = null;
    this.searchQuery = '';
    
    // Filter mode (hide weeks 19+ and months 5-9): default is true (showing data up to 18 September 2569)
    try {
      localStorage.removeItem('ALL_INTERN_FILTER_SEP18');
    } catch (e) {}
    const savedFilter = localStorage.getItem('ALL_INTERN_FILTER_SEP18_V2');
    this.filterUpToSep18 = savedFilter !== null ? savedFilter === 'true' : true;

    // Admin authentication mode: default is false (View-Only mode)
    this.isAdmin = sessionStorage.getItem('ALL_INTERN_IS_ADMIN') === 'true';
    
    this.locationInfo = this.loadLocationInfo();

    this.months = [];
    this.weeks = [];
    this.tasks = [];
    
    this.listeners = [];
  }

  loadLocationInfo() {
    try {
      const saved = localStorage.getItem('ALL_INTERN_LOCATION_INFO');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && (parsed.placeDepartment === 'ฝ่าย Data Center Maintenance Division' || !parsed.placeLine)) {
          parsed.placeLine = DEFAULT_LOCATION_INFO.placeLine;
          parsed.placeGroup = DEFAULT_LOCATION_INFO.placeGroup;
          parsed.placeDepartment = DEFAULT_LOCATION_INFO.placeDepartment;
          parsed.placeSection = DEFAULT_LOCATION_INFO.placeSection;
          parsed.placeDescription = DEFAULT_LOCATION_INFO.placeDescription;
          try {
            localStorage.setItem('ALL_INTERN_LOCATION_INFO', JSON.stringify({ ...DEFAULT_LOCATION_INFO, ...parsed }));
          } catch (e) {}
        }
        if (parsed && parsed.placeName && parsed.placeName.includes('บุญรอด')) {
          return { ...DEFAULT_LOCATION_INFO, ...parsed };
        }
      }
    } catch (e) {}
    return { ...DEFAULT_LOCATION_INFO };
  }

  saveLocationInfo(info) {
    this.locationInfo = { ...this.locationInfo, ...info };
    try {
      localStorage.setItem('ALL_INTERN_LOCATION_INFO', JSON.stringify(this.locationInfo));
    } catch (e) {}
    this.notify();
  }

  setAdmin(status) {
    this.isAdmin = !!status;
    try {
      if (this.isAdmin) {
        sessionStorage.setItem('ALL_INTERN_IS_ADMIN', 'true');
      } else {
        sessionStorage.removeItem('ALL_INTERN_IS_ADMIN');
      }
    } catch (e) {}
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(fn => {
      try { fn(this); } catch (e) { console.error('Listener error:', e); }
    });
  }

  async load() {
    let data = await window.storageManager.getAllData();
    if (!data || !data.months || data.months.length === 0) {
      data = JSON.parse(JSON.stringify(window.DEFAULT_SAMPLE_DATA));
      await window.storageManager.saveAllData(data);
    }

    this.months = data.months || [];
    this.weeks = data.weeks || [];
    this.tasks = data.tasks || [];
    this.notify();
  }

  async saveCurrentData() {
    const data = {
      months: this.months,
      weeks: this.weeks,
      tasks: this.tasks
    };
    await window.storageManager.saveAllData(data);
    this.notify();
  }

  // Filter Helpers for Teacher Submission Mode (<= 18 กันยายน 2569)
  isMonthHidden(month) {
    if (!this.filterUpToSep18) return false;
    if (!month) return false;
    const hiddenMonthIds = ['month_5', 'month_6', 'month_7', 'month_8', 'month_9'];
    if (hiddenMonthIds.includes(month.id)) return true;
    const monthNum = parseInt(String(month.id).replace(/\D/g, ''), 10);
    return !isNaN(monthNum) && monthNum > 4;
  }

  isWeekHidden(week) {
    if (!this.filterUpToSep18) return false;
    if (!week) return false;
    if (week.monthId && this.isMonthHidden({ id: week.monthId })) return true;
    const weekNum = parseInt(String(week.id).replace(/\D/g, ''), 10);
    if (!isNaN(weekNum) && weekNum > 18) return true;
    return false;
  }

  isTaskHidden(task) {
    if (!this.filterUpToSep18) return false;
    if (!task) return false;
    if (this.isWeekHidden({ id: task.weekId })) return true;
    if (task.date && task.date > '2026-09-18') return true;
    return false;
  }

  getVisibleMonths() {
    return this.months.filter(m => !this.isMonthHidden(m));
  }

  getVisibleWeeks() {
    return this.weeks.filter(w => !this.isWeekHidden(w));
  }

  toggleFilterSep18() {
    this.filterUpToSep18 = !this.filterUpToSep18;
    try {
      localStorage.setItem('ALL_INTERN_FILTER_SEP18_V2', this.filterUpToSep18 ? 'true' : 'false');
      localStorage.removeItem('ALL_INTERN_FILTER_SEP18');
    } catch (e) {}

    // Check if current view is now hidden, if so navigate safely
    if (this.filterUpToSep18) {
      if (this.currentMonthId && this.isMonthHidden({ id: this.currentMonthId })) {
        this.goToMonths();
        return;
      }
      if (this.currentWeekId && this.isWeekHidden({ id: this.currentWeekId })) {
        if (this.currentMonthId) {
          this.goToMonth(this.currentMonthId);
        } else {
          this.goToMonths();
        }
        return;
      }
    }
    this.notify();
  }

  // Navigation
  goToHome() {
    this.view = 'home';
    this.currentMonthId = null;
    this.currentWeekId = null;
    this.notify();
  }

  goToLocation() {
    this.view = 'location';
    this.currentMonthId = null;
    this.currentWeekId = null;
    this.notify();
  }

  goToMonths() {
    this.view = 'months';
    this.currentMonthId = null;
    this.currentWeekId = null;
    this.notify();
  }

  goToMonth(monthId) {
    this.view = 'weeks';
    this.currentMonthId = monthId;
    this.currentWeekId = null;
    this.notify();
  }

  goToWeek(weekId, monthId) {
    this.view = 'days';
    if (monthId) this.currentMonthId = monthId;
    this.currentWeekId = weekId;
    this.notify();
  }

  setSearchQuery(q) {
    this.searchQuery = (q || '').trim().toLowerCase();
    this.notify();
  }

  // Helpers
  getCurrentMonth() {
    const visibleMonths = this.getVisibleMonths();
    if (this.currentMonthId) {
      const found = visibleMonths.find(m => m.id === this.currentMonthId);
      if (found) return found;
    }
    return visibleMonths[0] || null;
  }

  getCurrentWeek() {
    const visibleWeeks = this.getVisibleWeeks();
    if (this.currentWeekId) {
      const found = visibleWeeks.find(w => w.id === this.currentWeekId);
      if (found) return found;
    }
    return visibleWeeks[0] || null;
  }

  getWeeksForMonth(monthId) {
    const mId = monthId || this.currentMonthId;
    return this.weeks.filter(w => w.monthId === mId && !this.isWeekHidden(w));
  }

  getTasksForWeek(weekId) {
    const wId = weekId || this.currentWeekId;
    let list = this.tasks.filter(t => t.weekId === wId && !this.isTaskHidden(t));

    if (this.searchQuery) {
      const q = this.searchQuery;
      list = list.filter(t =>
        (t.title && t.title.toLowerCase().includes(q)) ||
        (t.description && t.description.toLowerCase().includes(q))
      );
    }

    return list.sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0));
  }
}

window.appState = new AppState();
