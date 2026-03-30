import { useState, useEffect, useMemo, useCallback } from 'react';
import { orientadores, orientadorPosts, type Orientador } from '@/data/mockData';
import { BadgeCheck, GraduationCap } from 'lucide-react';
import StoriesViewer from './StoriesViewer';
import DakilaOfficialStory from './DakilaOfficialStory';

const SEEN_KEY = 'bilu_stories_seen';

const getSeenIds = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(SEEN_KEY) || '[]');
  } catch { return []; }
};

const OrientadoresStories = () => {
  const [seenIds, setSeenIds] = useState<string[]>(getSeenIds);
  const [viewerOrientadorId, setViewerOrientadorId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(SEEN_KEY, JSON.stringify(seenIds));
  }, [seenIds]);

  const handleMarkSeen = useCallback((id: string) => {
    setSeenIds(prev => prev.includes(id) ? prev : [...prev, id]);
  }, []);

  // Order: unseen first, seen last
  const ordered = useMemo(() => {
    const withPosts = orientadores.filter(o => orientadorPosts.some(p => p.orientadorId === o.id));
    const unseen = withPosts.filter(o => !seenIds.includes(o.id));
    const seen = withPosts.filter(o => seenIds.includes(o.id));
    return [...unseen, ...seen];
  }, [seenIds]);

  const orderedIds = useMemo(() => ordered.map(o => o.id), [ordered]);

  const getInitials = (name: string) => name.split(' ').map(w => w[0]).join('').slice(0, 2);

  return (
    <>
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <GraduationCap size={18} className="text-primary" />
          <h2 className="text-lg font-bold">Notícias</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {/* Dakila Official Story - always first */}
          <DakilaOfficialStory />
          {ordered.map(o => {
            const isSeen = seenIds.includes(o.id);
            return (
              <button
                key={o.id}
                onClick={() => setViewerOrientadorId(o.id)}
                className="flex flex-col items-center gap-1.5 min-w-[80px] group"
              >
                <div className="relative">
                  <div className={`w-[68px] h-[68px] rounded-full p-[3px] ${
                    isSeen
                      ? 'bg-muted'
                      : 'bg-gradient-to-br from-primary via-accent-foreground to-primary'
                  }`}>
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-card bg-muted flex items-center justify-center">
                      <img
                        src={o.avatar}
                        alt={o.name}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <span className="hidden text-muted-foreground font-bold text-sm absolute">{getInitials(o.name)}</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 bg-primary rounded-full p-0.5">
                    <BadgeCheck size={14} className="text-primary-foreground" />
                  </div>
                </div>
                <span className="text-xs font-semibold text-center leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                  {o.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {viewerOrientadorId && (
        <StoriesViewer
          initialOrientadorId={viewerOrientadorId}
          orderedOrientadorIds={orderedIds}
          onClose={() => setViewerOrientadorId(null)}
          onMarkSeen={handleMarkSeen}
        />
      )}
    </>
  );
};

export default OrientadoresStories;
