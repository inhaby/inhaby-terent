export const authService = {
  logout(): void {
    try {
      localStorage.removeItem('homstay-profile-name');
      localStorage.removeItem('homstay-profile-phone');
      localStorage.removeItem('homstay-profile-email');
      localStorage.removeItem('homstay-gov-id-status');
      localStorage.removeItem('homstay-addresses');
      localStorage.removeItem('homstay-tickets');
    } catch (_) {}
  }
};
