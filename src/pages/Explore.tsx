import Layout from '@/components/Layout';
import { categories, announcements, formatPrice, states } from '@/data/mockData';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Home, Wrench, ShoppingBag, MapPin, ChevronRight, SlidersHorizontal, Package } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = { Car, Home, Wrench, ShoppingBag };

const Explore = () => {
  const [selectedCat, setSelectedCat] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const filtered = announcements.filter(a => {
    if (selectedCat && a.category !== selectedCat) return false;
    if (selectedState && a.state !== selectedState) return false;
    if (priceRange === 'low' && a.price > 50000) return false;
    if (priceRange === 'mid' && (a.price < 50000 || a.price > 500000)) return false;
    if (priceRange === 'high' && a.price < 500000) return false;
    return true;
  });

  return (
    <Layout>
      <div className="px-4 pt-4 pb-4">
        <h2 className="text-heading font-bold mb-4">Explorar</h2>

        {/* Category cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Package;
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

        {/* Filters toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 min-h-touch px-4 rounded-full border-2 font-medium text-base mb-4 transition-colors ${
            showFilters ? 'border-primary bg-accent text-primary' : 'border-border text-muted-foreground'
          }`}
        >
          <SlidersHorizontal size={18} /> Mais filtros
        </button>

        {showFilters && (
          <div className="bg-card rounded-xl p-4 mb-4 border border-border animate-fade-in-up space-y-3">
            <div>
              <label className="text-sm font-semibold text-muted-foreground mb-2 block">Estado</label>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedState('')}
                  className={`min-h-touch px-4 rounded-full text-base font-medium transition-colors ${
                    !selectedState ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  Todos
                </button>
                {states.slice(0, 6).map(st => (
                  <button
                    key={st}
                    onClick={() => setSelectedState(st)}
                    className={`min-h-touch px-4 rounded-full text-base font-medium transition-colors ${
                      selectedState === st ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-muted-foreground mb-2 block">Faixa de Preço</label>
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: '', label: 'Qualquer' },
                  { value: 'low', label: 'Até R$ 50 mil' },
                  { value: 'mid', label: 'R$ 50-500 mil' },
                  { value: 'high', label: 'Acima R$ 500 mil' },
                ].map(p => (
                  <button
                    key={p.value}
                    onClick={() => setPriceRange(p.value)}
                    className={`min-h-touch px-4 rounded-full text-base font-medium transition-colors ${
                      priceRange === p.value ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        <p className="text-sm text-muted-foreground mb-3">{filtered.length} resultados</p>
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
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">Nenhum resultado encontrado</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Explore;
