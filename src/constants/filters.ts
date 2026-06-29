import { FilterState } from '../types';

export const DEFAULT_FILTERS: FilterState = {
  minPrice: 10000,
  maxPrice: 150000,
  bedrooms: null,
  furnished: null,
  category: 'all',
  sortBy: 'rating-desc'
};
