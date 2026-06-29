export const chatService = {
  getConversations(): any[] {
    try {
      const stored = localStorage.getItem('homstay-conversations-db-v1');
      return stored ? JSON.parse(stored) : [];
    } catch (_) {
      return [];
    }
  },
  saveConversations(conversations: any[]): void {
    try {
      localStorage.setItem('homstay-conversations-db-v1', JSON.stringify(conversations));
    } catch (_) {}
  }
};
