import { LayoutGrid } from 'lucide-react';
import { Property, Section } from '../../types';
import { SectionWrapper } from '../../components/property/SectionWrapper';
import { OwnerCTA } from '../../components/property/OwnerCTA';

interface HomePageProps {
  sections: Section[];
  savedIds: Set<string>;
  toggleSave: (id: string) => void;
  setSelectedPropertyId: (id: string | null) => void;
  triggerShare: (p: Property) => void;
  setViewAllSection: (s: Section | null) => void;
  activeCategory: string;
  setIsExploringCategories: (open: boolean) => void;
}

export const HomePage = ({
  sections,
  savedIds,
  toggleSave,
  setSelectedPropertyId,
  triggerShare,
  setViewAllSection,
  activeCategory,
  setIsExploringCategories
}: HomePageProps) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {sections.map(section => (
        <SectionWrapper 
          key={section.id} 
          section={section} 
          savedIds={savedIds} 
          onToggleSave={toggleSave} 
          onClick={setSelectedPropertyId} 
          onShare={triggerShare}
          onViewAll={setViewAllSection}
        />
      ))}
      
      {activeCategory === 'all' && <OwnerCTA />}
      
      {activeCategory === 'all' && (
        <div className="px-4 py-8">
          <button 
            onClick={() => setIsExploringCategories(true)}
            className="w-full bg-[#18181B] text-white py-5 rounded-3xl font-black uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-xl shadow-black/10 cursor-pointer text-sans text-sm"
          >
            <LayoutGrid size={20} />
            <span>Explore All Categories</span>
          </button>
        </div>
      )}
    </div>
  );
};
