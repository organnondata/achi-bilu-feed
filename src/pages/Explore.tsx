import Layout from '@/components/Layout';
import { categories, announcements, formatPrice } from '@/data/mockData';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Home, Wrench, MapPin, ChevronRight } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = { Car, Home, Wrench };

const Explore = () => {
  const [selectedCat, setSelectedCat] = useState('');
  const navigate = useNavigate();

  const filtered = selectedCat 
    ? announcements.filter(a => a.category === selectedCat) 
    : announcements;

  return (
    <Layout>
      <div className="px-4 pt-4 pb-4">
        <h2 className="text-heading font-bold mb-4">Explorar</h2>

        {/* Category cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon];
            const isActive = selectedCat === cat.id;
            const count = announcements.filter(a => a.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(isActive ? '' : cat.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all min-h-touch ${
                  isActive 
                    ? 'border-primary bg-accent text-primary' 
                    : 'border-border bg-card text-muted-foreground hover:border-primary/30'
                }`}
              >
                <Icon size={28} />
                <span className="font-semibold text-sm">{cat.label}</span>
                <span className="text-xs">{count} anúncios</span>
              </button>
            );
          })}
        </div>

        {/* Results */}
        <div className="space-y-3">
          {filtered.map((ad) => (
            <button
              key={ad.id}
              onClick={() => navigate(`/ad/${ad.id}`)}
              className="w-full flex items-center gap-3 bg-card rounded-xl p-3 feed-card-shadow text-left transition-shadow"
            >
              <img src={ad.images[0]} alt={ad.title} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-base truncate">{ad.title}</h4>
                <p className="text-lg font-bold text-primary">{formatPrice(ad.price)}</p>
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <MapPin size={14} /> {ad.city}, {ad.state}
                </div>
              </div>
              <ChevronRight size={20} className="text-muted-foreground flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
