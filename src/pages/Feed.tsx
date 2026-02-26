import { useState } from 'react';
import { announcements, states } from '@/data/mockData';
import FeedCard from '@/components/FeedCard';
import Layout from '@/components/Layout';
import { SlidersHorizontal, X } from 'lucide-react';

const Feed = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterState, setFilterState] = useState('');

  const filtered = announcements.filter((ad) => {
    if (filterCategory && ad.category !== filterCategory) return false;
    if (filterState && ad.state !== filterState) return false;
    return true;
  });

  const hasFilters = filterCategory || filterState;

  return (
    <Layout>
      <div className="px-4 pt-4">
        {/* Filter toggle */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 min-h-touch px-4 rounded-full border-2 font-medium text-base transition-colors ${
              showFilters || hasFilters ? 'border-primary bg-accent text-primary' : 'border-border text-muted-foreground'
            }`}
          >
            <SlidersHorizontal size={18} /> Filtros
          </button>
          {hasFilters && (
            <button 
              onClick={() => { setFilterCategory(''); setFilterState(''); }}
              className="min-h-touch px-3 rounded-full text-muted-foreground hover:text-foreground"
            >
              <X size={18} />
            </button>
          )}
          <span className="text-sm text-muted-foreground ml-auto">{filtered.length} anúncios</span>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-card rounded-xl p-4 mb-4 border border-border animate-fade-in-up">
            <div className="mb-3">
              <label className="text-sm font-semibold text-muted-foreground mb-2 block">Categoria</label>
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: '', label: 'Todas' },
                  { value: 'vehicles', label: 'Veículos' },
                  { value: 'realestate', label: 'Imóveis' },
                  { value: 'services', label: 'Serviços' },
                ].map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setFilterCategory(cat.value)}
                    className={`min-h-touch px-4 rounded-full text-base font-medium transition-colors ${
                      filterCategory === cat.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-muted-foreground mb-2 block">Estado</label>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setFilterState('')}
                  className={`min-h-touch px-4 rounded-full text-base font-medium transition-colors ${
                    !filterState ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  Todos
                </button>
                {states.slice(0, 5).map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterState(st)}
                    className={`min-h-touch px-4 rounded-full text-base font-medium transition-colors ${
                      filterState === st ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Feed */}
        <div className="space-y-4 pb-4">
          {filtered.map((ad) => (
            <FeedCard key={ad.id} ad={ad} />
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">Nenhum anúncio encontrado</p>
              <p className="text-sm mt-1">Tente mudar os filtros</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Feed;
