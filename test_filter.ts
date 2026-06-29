// Local mock properties from App.tsx
const SIZZLING_DEALS = [
  {
    id: '1',
    title: 'Luxury 3BHK Apartment in HSR Layout - Semi Furnished',
    location: '2nd Main, Sector 4, HSR Layout, Bangalore',
    category: 'apartments',
  },
  {
    id: '2',
    title: 'Penthouse Suite, Indira Nagar',
    location: 'Indira Nagar, Bangalore',
    category: 'apartments',
  }
];

const RECENTLY_VIEWED = [
  {
    id: 'r1',
    title: 'Shared PG, Koramangala',
    location: 'Koramangala, Bangalore',
    category: 'pgs',
  },
  {
    id: 'r2',
    title: '1BHK, Marathahalli',
    location: 'Marathahalli, Bangalore',
    category: 'apartments',
  },
  {
    id: 'r3',
    title: 'Full House, Whitefield',
    location: 'Whitefield, Bangalore',
    category: 'homes',
  }
];

const ALL_PROPERTIES = [
  ...SIZZLING_DEALS,
  ...RECENTLY_VIEWED,
  {
    id: 'v1',
    title: 'Royal Villa with Private Pool',
    category: 'villas',
    location: 'Palm Meadows, Whitefield, Bangalore',
  }
];

function testFilter() {
  const activeLocation = {
    name: "Riya Bhati House",
    area: "HSR Layout",
    city: "Bengaluru",
  };
  const activeCategory = 'all';

  const sourceProperties = ALL_PROPERTIES;
  let filtered = [...sourceProperties];
  console.log('START TOTAL:', filtered.length);

  const city = activeLocation?.city || 'Bengaluru';
  filtered = filtered.filter(p => {
    const pLoc = p.location ? p.location.toLowerCase() : '';
    const pCity = (p as any).city ? (p as any).city.toLowerCase() : '';
    const cityLower = city.toLowerCase();
    
    let matched = false;
    if (cityLower === 'bengaluru' || cityLower === 'bangalore') {
      matched = pLoc.includes('bengaluru') || pLoc.includes('bangalore') || pCity.includes('bengaluru') || pCity.includes('bangalore');
    } else {
      matched = pLoc.includes(cityLower) || pCity.includes(cityLower);
    }
    return matched;
  });
  console.log('AFTER CITY FILTER:', filtered.length);

  if (activeCategory !== 'all') {
    filtered = filtered.filter(p => p.category === activeCategory);
  }
  console.log('AFTER CATEGORY FILTER:', filtered.length);

  const area = activeLocation?.area || '';
  if (area) {
    const areaMatched = filtered.filter(p => {
      const pArea = (p as any).area ? (p as any).area.toLowerCase() : '';
      const pLoc = p.location ? p.location.toLowerCase() : '';
      return pArea.includes(area.toLowerCase()) || pLoc.includes(area.toLowerCase());
    });
    console.log('AREA MATCHED:', areaMatched.length);
    if (areaMatched.length > 0) {
      console.log('RETURNED MATCHED AREA:', areaMatched.map(p => p.title));
      return;
    }
  }

  console.log('RETURNED MAIN FILTERED:', filtered.map(p => p.title));
}

testFilter();
