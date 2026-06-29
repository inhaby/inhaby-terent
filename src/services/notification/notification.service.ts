export const notificationService = {
  getNotifications(): any[] {
    try {
      const stored = localStorage.getItem('homstay-notifications');
      return stored ? JSON.parse(stored) : [];
    } catch (_) {
      return [];
    }
  },
  saveNotifications(notifications: any[]): void {
    try {
      localStorage.setItem('homstay-notifications', JSON.stringify(notifications));
    } catch (_) {}
  }
};
