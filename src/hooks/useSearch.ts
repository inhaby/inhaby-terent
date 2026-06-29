import { useState, useEffect, useCallback } from 'react';

export function useSearch() {
  const [selectedPropertyId, setSelectedPropertyIdState] = useState<string | null>(() => {
    const match = window.location.pathname.match(/^\/property\/([^/]+)/);
    return match ? match[1] : null;
  });

  const [currentRoute, setCurrentRoute] = useState<'MAIN' | 'SEARCH' | 'PROPERTY'>(() => {
    if (window.location.pathname.startsWith('/property/')) return 'PROPERTY';
    if (window.location.pathname === '/search') return 'SEARCH';
    return 'MAIN';
  });

  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('homstay-recent-viewed');
      return saved ? JSON.parse(saved) : [];
    } catch (_) {
      return [];
    }
  });

  const [isExploringCategories, setIsExploringCategories] = useState(false);

  const [searchQuery, setSearchQuery] = useState(() => {
    if (window.location.pathname === '/search') {
      const params = new URLSearchParams(window.location.search);
      return params.get('q') || '';
    }
    return '';
  });

  const setSelectedPropertyId = useCallback((id: string | null) => {
    setSelectedPropertyIdState(id);
    if (id) {
      setRecentlyViewedIds(prev => {
        const next = [id, ...prev.filter(item => item !== id)].slice(0, 6);
        localStorage.setItem('homstay-recent-viewed', JSON.stringify(next));
        return next;
      });
      const url = `/property/${id}`;
      if (window.location.pathname !== url) {
        window.history.pushState({ route: 'PROPERTY', propertyId: id }, '', url);
      }
      setCurrentRoute('PROPERTY');
    } else {
      const path = window.location.pathname;
      if (path !== '/' && !path.startsWith('/search')) {
        window.history.pushState({ route: 'MAIN' }, '', '/');
        setCurrentRoute('MAIN');
      }
    }
  }, []);

  const navigate = useCallback((route: 'MAIN' | 'SEARCH' | 'PROPERTY', queryValOrPropId?: string) => {
    if (route === 'SEARCH') {
      const url = queryValOrPropId ? `/search?q=${encodeURIComponent(queryValOrPropId)}` : '/search';
      window.history.pushState({ route: 'SEARCH', q: queryValOrPropId }, '', url);
      setCurrentRoute('SEARCH');
      if (queryValOrPropId !== undefined) {
        setSearchQuery(queryValOrPropId);
      }
      setSelectedPropertyIdState(null);
    } else if (route === 'PROPERTY') {
      const url = `/property/${queryValOrPropId}`;
      window.history.pushState({ route: 'PROPERTY', propertyId: queryValOrPropId }, '', url);
      setCurrentRoute('PROPERTY');
      setSelectedPropertyIdState(queryValOrPropId || null);
    } else {
      window.history.pushState({ route: 'MAIN' }, '', '/');
      setCurrentRoute('MAIN');
      setSelectedPropertyIdState(null);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/property/')) {
        setCurrentRoute('PROPERTY');
        const match = path.match(/^\/property\/([^/]+)/);
        setSelectedPropertyIdState(match ? match[1] : null);
      } else if (path === '/search') {
        setCurrentRoute('SEARCH');
        const params = new URLSearchParams(window.location.search);
        setSearchQuery(params.get('q') || '');
        setSelectedPropertyIdState(null);
      } else {
        setCurrentRoute('MAIN');
        setSelectedPropertyIdState(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return {
    selectedPropertyId,
    setSelectedPropertyId,
    currentRoute,
    setCurrentRoute,
    recentlyViewedIds,
    setRecentlyViewedIds,
    isExploringCategories,
    setIsExploringCategories,
    searchQuery,
    setSearchQuery,
    navigate
  };
}
