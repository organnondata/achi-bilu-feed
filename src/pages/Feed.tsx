import { useState, useMemo } from 'react';
import { announcements, orientadorPosts, states } from '@/data/mockData';
import FeedCard from '@/components/FeedCard';
import OrientadorCard from '@/components/OrientadorCard';
import Layout from '@/components/Layout';
import { SlidersHorizontal, X } from 'lucide-react';

type FeedMode = 'social' | 'marketplace';

const Feed = () => {
  const [mode, setMode] = useState<FeedMode>('social');
  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterState, setFilterState] = useState('');

  const filtered = announcements.filter((ad) => {
    if (filterCategory && ad.category !== filterCategory) return false;
    if (filterState && ad.state !== filterState) return false;
    return true;
  });

  const hasFilters = filterCategory || filterState;

  // Interleave ads and orientador posts for social feed
  const socialFeed = useMemo(() => {
    if (mode === 'marketplace') return null;
    const items: { type: 'ad' | 'orientador'; data: any; sortDate: string }[] = [];
    filtered.forEach(ad => items.push({ type: 'ad', data: ad, sortDate: ad.createdAt }));
    orientadorPosts.forEach(post => items.push({ type: 'orientador', data: post, sortDate: post.createdAt }));
    items.sort((a, b) => b.sortDate.localeCompare(a.sortDate));
    return items;
  }, [filtered, mode]);

  return (
    <Layout>
      <div className="px-4 pt-4">
        {/* Mode toggle */}
        <div className="flex rounded-xl bg-muted p-1 mb-4">
          <button
            onClick={() => setMode('social')}
            className={`flex-1 min-h-touch rounded-lg font-bold text-base transition-all ${
              mode === 'social' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground'
            }`}
          >
            Feed Social
          </button>
          <button
            onClick={() => setMode('marketplace')}
            className={`flex-1 min-h-touch rounded-lg font-bold text-base transition-all ${
              mode === 'marketplace' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground'
            }`}
          >
            Marketplace
          </button>
        </div>

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
                  { value: 'products', label: 'Produtos' },
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

        {/* Feed content */}
        <div className="space-y-4 pb-4">
          {mode === 'social' && socialFeed ? (
            socialFeed.map(item =>
              item.type === 'ad' ? (
                <FeedCard key={item.data.id} ad={item.data} />
              ) : (
                <OrientadorCard key={item.data.id} post={item.data} />
              )
            )
          ) : (
            filtered.map((ad) => (
              <FeedCard key={ad.id} ad={ad} />
            ))
          )}
          {filtered.length === 0 && mode === 'marketplace' && (
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
