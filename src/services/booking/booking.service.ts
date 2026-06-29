export const bookingService = {
  getActiveTenancy(): any {
    try {
      const stored = localStorage.getItem('homstay-active-tenancy-v1');
      return stored ? JSON.parse(stored) : null;
    } catch (_) {
      return null;
    }
  },
  saveActiveTenancy(tenancy: any): void {
    try {
      localStorage.setItem('homstay-active-tenancy-v1', JSON.stringify(tenancy));
    } catch (_) {}
  }
};
