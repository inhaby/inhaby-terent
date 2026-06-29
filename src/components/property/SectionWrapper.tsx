import { LazyImage } from '../LazyImage';
import { Section, Property } from '../../types';
import { 
  CarouselCard, 
  MiniCard, 
  StoryCard, 
  GridCard, 
  ListCard, 
  ComparisonCard, 
  MapPlaceholder, 
  FilterChips, 
  TagFilters 
} from '../Cards';

interface SectionWrapperProps {
  section: Section;
  savedIds: Set<string>;
  onToggleSave: (id: string) => void;
  onClick: (id: string) => void;
  onShare: (p: Property) => void;
  onViewAll: (s: Section) => void;
}

export const SectionWrapper = ({ 
  section, 
  savedIds, 
  onToggleSave, 
  onClick, 
  onShare, 
  onViewAll 
}: SectionWrapperProps) => {
  if (section.items && section.items.length === 0) {
    return null;
  }

  if (section.type === 'banner') {
    return (
      <div className="px-4 py-4 text-left">
        <div className="relative rounded-3xl overflow-hidden aspect-[21/9] bg-blue-600 flex items-center px-8">
          <LazyImage src={section.image} alt={section.title} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
          <div className="relative z-10">
            <h3 className="text-white text-xl font-black leading-tight max-w-[150px]">{section.title}</h3>
            <button className="mt-3 bg-white text-blue-600 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg cursor-pointer">
              {section.actionText}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (section.type === 'map-view') return <MapPlaceholder />;
  if (section.type === 'filter-chips') return <FilterChips />;
  if (section.type === 'tag-filters') return <TagFilters />;

  return (
    <div className="py-4 text-left">
      <div className="flex items-center justify-between px-4 mb-4">
        <h3 className="text-lg font-black text-gray-900 tracking-tight">{section.title}</h3>
        {section.actionText && (
          <button 
            onClick={() => onViewAll(section)}
            className="text-blue-600 text-[10px] font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-lg cursor-pointer"
          >
            {section.actionText}
          </button>
        )}
      </div>

      {section.type === 'carousel' && (
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar">
          {section.items?.map(item => (
            <CarouselCard 
              key={item.id} 
              property={item} 
              isSaved={savedIds.has(item.id)} 
              onToggleSave={onToggleSave} 
              onClick={onClick} 
              onShare={onShare} 
            />
          ))}
        </div>
      )}

      {section.type === 'snap-carousel' && (
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar snap-x snap-mandatory">
          {section.items?.map(item => (
            <div key={item.id} className="snap-center">
              <CarouselCard 
                property={item} 
                isSaved={savedIds.has(item.id)} 
                onToggleSave={onToggleSave} 
                onClick={onClick} 
                onShare={onShare} 
              />
            </div>
          ))}
        </div>
      )}

      {section.type === 'story-carousel' && (
        <div className="flex gap-6 overflow-x-auto px-4 pb-2 no-scrollbar">
          {section.items?.map(item => (
            <StoryCard 
              key={item.id} 
              property={item} 
              onClick={onClick} 
            />
          ))}
        </div>
      )}

      {section.type === 'grid' && (
        <div className="grid grid-cols-2 gap-3 md:gap-5 px-4">
          {section.items?.map(item => (
            <GridCard 
              key={item.id} 
              property={item} 
              isSaved={savedIds.has(item.id)} 
              onToggleSave={onToggleSave} 
              onClick={onClick} 
              onShare={onShare} 
            />
          ))}
        </div>
      )}

      {section.type === 'compact-grid' && (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 px-4">
          {section.items?.map(item => (
            <GridCard 
              key={item.id} 
              property={item} 
              isSaved={savedIds.has(item.id)} 
              onToggleSave={onToggleSave} 
              onClick={onClick} 
              onShare={onShare} 
            />
          ))}
        </div>
      )}

      {section.type === 'dense-grid' && (
        <div className="grid grid-cols-2 gap-2 md:gap-4 px-4">
          {section.items?.map(item => (
            <GridCard 
              key={item.id} 
              property={item} 
              isSaved={savedIds.has(item.id)} 
              onToggleSave={onToggleSave} 
              onClick={onClick} 
              onShare={onShare} 
            />
          ))}
        </div>
      )}

      {section.type === 'list' && (
        <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-5 px-4">
          {section.items?.map(item => (
            <ListCard 
              key={item.id} 
              property={item} 
              isSaved={savedIds.has(item.id)} 
              onToggleSave={onToggleSave} 
              onClick={onClick} 
              onShare={onShare} 
            />
          ))}
        </div>
      )}

      {section.type === 'compact-list' && (
        <div className="flex flex-col md:grid md:grid-cols-2 gap-2 md:gap-4 px-4">
          {section.items?.map(item => (
            <MiniCard 
              key={item.id} 
              property={item} 
              isSaved={savedIds.has(item.id)} 
              onToggleSave={onToggleSave} 
              onClick={onClick} 
              onShare={onShare} 
            />
          ))}
        </div>
      )}

      {section.type === 'mini-list' && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 px-4">
          {section.items?.map(item => (
            <MiniCard 
              key={item.id} 
              property={item} 
              isSaved={savedIds.has(item.id)} 
              onToggleSave={onToggleSave} 
              onClick={onClick} 
              onShare={onShare} 
            />
          ))}
        </div>
      )}

      {section.type === 'multi-row-scroll' && (
        <div className="grid grid-rows-2 grid-flow-col gap-4 overflow-x-auto px-4 pb-4 no-scrollbar">
          {section.items?.map(item => (
            <CarouselCard 
              key={item.id} 
              property={item} 
              isSaved={savedIds.has(item.id)} 
              onToggleSave={onToggleSave} 
              onClick={onClick} 
              onShare={onShare} 
            />
          ))}
        </div>
      )}

      {section.type === 'comparison-cards' && (
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 no-scrollbar">
          {section.items?.map(item => (
            <ComparisonCard 
              key={item.id} 
              property={item} 
              onClick={onClick} 
            />
          ))}
        </div>
      )}
    </div>
  );
};
