/**
 * Clean & Robust Application State
 */

class AppState {
  constructor() {
    this.view = 'months'; // 'months' | 'weeks' | 'days'
    this.currentMonthId = null;
    this.currentWeekId = null;
    this.searchQuery = '';
    
    this.months = [];
    this.weeks = [];
    this.tasks = [];
    
    this.listeners = [];
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

  // Navigation
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
    return this.months.find(m => m.id === this.currentMonthId) || this.months[0] || null;
  }

  getCurrentWeek() {
    return this.weeks.find(w => w.id === this.currentWeekId) || this.weeks[0] || null;
  }

  getWeeksForMonth(monthId) {
    const mId = monthId || this.currentMonthId;
    return this.weeks.filter(w => w.monthId === mId);
  }

  getTasksForWeek(weekId) {
    const wId = weekId || this.currentWeekId;
    let list = this.tasks.filter(t => t.weekId === wId);

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
