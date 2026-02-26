import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { announcements, orientadorPosts, states } from '@/data/mockData';
import FeedCard from '@/components/FeedCard';
import OrientadorCard from '@/components/OrientadorCard';
import PremiumBanner from '@/components/PremiumBanner';
import OrientadoresStories from '@/components/OrientadoresStories';
import Layout from '@/components/Layout';
import { SlidersHorizontal, X, Crown } from 'lucide-react';

type FeedMode = 'geral' | 'marketplace' | 'orientadores';

const Feed = () => {
  const [searchParams] = useSearchParams();
  const initialMode = (searchParams.get('mode') as FeedMode) || 'geral';
  const authorFilter = searchParams.get('author') || '';

  const [mode, setMode] = useState<FeedMode>(initialMode);
  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterState, setFilterState] = useState('');

  useEffect(() => {
    const m = searchParams.get('mode') as FeedMode;
    if (m) setMode(m);
  }, [searchParams]);

  const filtered = announcements.filter((ad) => {
    if (filterCategory && ad.category !== filterCategory) return false;
    if (filterState && ad.state !== filterState) return false;
    return true;
  });

  const hasFilters = filterCategory || filterState;

  const filteredOrientadorPosts = useMemo(() => {
    if (authorFilter) return orientadorPosts.filter(p => p.orientadorId === authorFilter);
    return orientadorPosts;
  }, [authorFilter]);

  // Build prioritized feed: first 3 orientadores, then intercalate 1 orientador per 4 ads
  const socialFeed = useMemo(() => {
    if (mode !== 'geral') return null;

    const oPosts = [...filteredOrientadorPosts].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    const ads = [...filtered].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    const result: { type: 'ad' | 'orientador'; data: any }[] = [];

    // First 3 orientador posts
    const firstThree = oPosts.splice(0, 3);
    firstThree.forEach(p => result.push({ type: 'orientador', data: p }));

    // Intercalate: 4 ads then 1 orientador
    let adIdx = 0;
    let oIdx = 0;
    while (adIdx < ads.length || oIdx < oPosts.length) {
      // 4 ads
      for (let i = 0; i < 4 && adIdx < ads.length; i++, adIdx++) {
        result.push({ type: 'ad', data: ads[adIdx] });
      }
      // 1 orientador
      if (oIdx < oPosts.length) {
        result.push({ type: 'orientador', data: oPosts[oIdx] });
        oIdx++;
      }
    }

    return result;
  }, [filtered, filteredOrientadorPosts, mode]);

  return (
    <Layout>
      <div className="px-4 pt-4">
        {/* Premium banner */}
        <PremiumBanner />

        {/* Orientadores Stories */}
        {mode === 'geral' && <OrientadoresStories />}

        {/* Mode toggle - 3 tabs */}
        <div className="flex rounded-xl bg-muted p-1 mb-4">
          {([
            { key: 'geral', label: 'Geral', badge: false },
            { key: 'marketplace', label: 'Marketplace', badge: false },
            { key: 'orientadores', label: 'Orientadores', badge: true },
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => setMode(tab.key)}
              className={`flex-1 min-h-touch rounded-lg font-bold text-base transition-all flex items-center justify-center gap-1.5 ${
                mode === tab.key ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground'
              }`}
            >
              {tab.badge && <Crown size={16} />}
              {tab.label}
              {tab.badge && (
                <span className="badge-premium text-[10px] px-1.5 py-0.5 rounded-full font-bold leading-none">
                  OFICIAL
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Filters - only for geral and marketplace */}
        {mode !== 'orientadores' && (
          <>
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
                      { value: 'diversos', label: 'Diversos' },
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
          </>
        )}

        {/* Feed content */}
        <div className="space-y-4 pb-4">
          {mode === 'geral' && socialFeed ? (
            socialFeed.map(item =>
              item.type === 'ad' ? (
                <FeedCard key={item.data.id} ad={item.data} />
              ) : (
                <OrientadorCard key={item.data.id} post={item.data} />
              )
            )
          ) : mode === 'marketplace' ? (
            filtered.map((ad) => (
              <FeedCard key={ad.id} ad={ad} />
            ))
          ) : (
            filteredOrientadorPosts.map(post => (
              <OrientadorCard key={post.id} post={post} />
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
