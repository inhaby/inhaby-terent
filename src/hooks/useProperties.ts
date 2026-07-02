import { useState, useEffect, useMemo } from 'react';
import { Property, Section, FilterState, LocationInfo } from '../types';
import { propertyService } from '../services/property/property.service';

export function useProperties(searchQuery: string, activeTab: string, activeLocation?: LocationInfo) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sections, setSections] = useState<Section[]>([]);
  const [paginatedProperties, setPaginatedProperties] = useState<Property[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [viewAllSection, setViewAllSection] = useState<Section | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: 200000,
    bedrooms: null,
    furnished: null,
    category: 'all',
    sortBy: 'latest'
  });

  const filteredProperties = useMemo(() => {
    if (!searchQuery) return paginatedProperties;
    const query = searchQuery.toLowerCase();
    return paginatedProperties.filter(p => 
      p.title.toLowerCase().includes(query) ||
      p.location.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      (p.tag && p.tag.toLowerCase().includes(query))
    );
  }, [paginatedProperties, searchQuery]);

  // Load Home/Explore Sections
  useEffect(() => {
    const area = activeLocation?.area || '';
    const city = activeLocation?.city || '';
    propertyService.getHomeSections(activeCategory, area, city)
      .then(setSections)
      .catch(() => {});
  }, [activeCategory, activeLocation]);

  // Load Properties paginated listing
  useEffect(() => {
    if (viewAllSection || activeTab === 'VISITS') return;
    setIsLoading(true);
    const area = activeLocation?.area || '';
    const city = activeLocation?.city || '';
    
    const params = {
      page: page.toString(),
      limit: '20',
      category: activeCategory,
      minPrice: filters.minPrice.toString(),
      maxPrice: filters.maxPrice.toString(),
      sortBy: filters.sortBy,
      area: area,
      city: city
    };

    propertyService.getProperties(params)
      .then(data => {
        if (page === 1) {
          setPaginatedProperties(data.items);
        } else {
          setPaginatedProperties(prev => [...prev, ...data.items]);
        }
        setTotalPages(data.totalPages);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [page, activeCategory, filters, viewAllSection, activeTab, activeLocation]);

  return {
    activeCategory,
    setActiveCategory,
    sections,
    setSections,
    paginatedProperties,
    setPaginatedProperties,
    page,
    setPage,
    totalPages,
    setTotalPages,
    isLoading,
    setIsLoading,
    viewAllSection,
    setViewAllSection,
    filters,
    setFilters,
    filteredProperties
  };
}
