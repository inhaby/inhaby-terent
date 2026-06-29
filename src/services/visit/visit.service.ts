export const visitService = {
  getVisitRequests(): any[] {
    try {
      const stored = localStorage.getItem('homstay-visit-requests-v2');
      return stored ? JSON.parse(stored) : [];
    } catch (_) {
      return [];
    }
  },
  saveVisitRequests(requests: any[]): void {
    try {
      localStorage.setItem('homstay-visit-requests-v2', JSON.stringify(requests));
    } catch (_) {}
  }
};
