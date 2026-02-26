import { useState } from 'react';
import { orientadores, orientadorPosts, type Orientador } from '@/data/mockData';
import { BadgeCheck, X, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrientadoresStories = () => {
  const navigate = useNavigate();
  const [selectedOrientador, setSelectedOrientador] = useState<Orientador | null>(null);

  const postCount = (id: string) => orientadorPosts.filter(p => p.orientadorId === id).length;

  return (
    <>
      {/* Stories row */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Crown size={18} className="text-secondary" />
          <h2 className="text-lg font-bold">Orientadores Oficiais</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {orientadores.map(o => (
            <button
              key={o.id}
              onClick={() => setSelectedOrientador(o)}
              className="flex flex-col items-center gap-1.5 min-w-[80px] group"
            >
              <div className="relative">
                <div className="w-[68px] h-[68px] rounded-full p-[3px] bg-gradient-to-br from-secondary via-primary to-secondary">
                  <img
                    src={o.avatar}
                    alt={o.name}
                    className="w-full h-full rounded-full object-cover border-2 border-card"
                  />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 bg-secondary rounded-full p-0.5">
                  <BadgeCheck size={14} className="text-secondary-foreground" />
                </div>
              </div>
              <span className="text-xs font-semibold text-center leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                {o.name.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedOrientador && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4" onClick={() => setSelectedOrientador(null)}>
          <div className="bg-card rounded-2xl w-full max-w-sm p-6 animate-fade-in-up" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <img src={selectedOrientador.avatar} alt={selectedOrientador.name} className="w-16 h-16 rounded-full object-cover border-2 border-secondary/30" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-lg">{selectedOrientador.name}</h3>
                    <BadgeCheck size={18} className="text-secondary" />
                  </div>
                  <p className="text-sm font-semibold text-secondary">{selectedOrientador.role}</p>
                </div>
              </div>
              <button onClick={() => setSelectedOrientador(null)} className="min-h-touch min-w-[44px] flex items-center justify-center text-muted-foreground hover:text-foreground">
                <X size={22} />
              </button>
            </div>

            <p className="text-base text-muted-foreground mb-4">{selectedOrientador.bio}</p>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setSelectedOrientador(null);
                  navigate(`/feed?mode=orientadores&author=${selectedOrientador.id}`);
                }}
                className="w-full min-h-[50px] rounded-xl bg-primary text-primary-foreground font-bold text-base"
              >
                Ver Conteúdos ({postCount(selectedOrientador.id)})
              </button>

              <div className="flex gap-2">
                {selectedOrientador.socialLinks.instagram && (
                  <a href={selectedOrientador.socialLinks.instagram} className="flex-1 min-h-[50px] rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-base flex items-center justify-center">
                    Instagram
                  </a>
                )}
                {selectedOrientador.socialLinks.tiktok && (
                  <a href={selectedOrientador.socialLinks.tiktok} className="flex-1 min-h-[50px] rounded-xl bg-foreground text-background font-semibold text-base flex items-center justify-center">
                    TikTok
                  </a>
                )}
                {selectedOrientador.socialLinks.youtube && (
                  <a href={selectedOrientador.socialLinks.youtube} className="flex-1 min-h-[50px] rounded-xl bg-red-600 text-white font-semibold text-base flex items-center justify-center">
                    YouTube
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrientadoresStories;
