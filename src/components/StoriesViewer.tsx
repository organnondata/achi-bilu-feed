import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { orientadores, orientadorPosts, type Orientador } from '@/data/mockData';
import { Progress } from '@/components/ui/progress';

interface StoriesViewerProps {
  initialOrientadorId: string;
  orderedOrientadorIds: string[];
  onClose: () => void;
  onMarkSeen: (orientadorId: string) => void;
}

const StoriesViewer = ({ initialOrientadorId, orderedOrientadorIds, onClose, onMarkSeen }: StoriesViewerProps) => {
  const [currentOrientadorIdx, setCurrentOrientadorIdx] = useState(
    orderedOrientadorIds.indexOf(initialOrientadorId)
  );
  const [currentPostIdx, setCurrentPostIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  const currentOrientadorId = orderedOrientadorIds[currentOrientadorIdx];
  const currentOrientador = orientadores.find(o => o.id === currentOrientadorId);
  const posts = orientadorPosts
    .filter(p => p.orientadorId === currentOrientadorId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const currentPost = posts[currentPostIdx];

  // Mark seen
  useEffect(() => {
    if (currentOrientadorId) onMarkSeen(currentOrientadorId);
  }, [currentOrientadorId, onMarkSeen]);

  // Auto-progress timer
  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          goNext();
          return 0;
        }
        return prev + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [currentOrientadorIdx, currentPostIdx]);

  const goNext = useCallback(() => {
    if (currentPostIdx < posts.length - 1) {
      setCurrentPostIdx(prev => prev + 1);
      setProgress(0);
    } else if (currentOrientadorIdx < orderedOrientadorIds.length - 1) {
      setCurrentOrientadorIdx(prev => prev + 1);
      setCurrentPostIdx(0);
      setProgress(0);
    } else {
      onClose();
    }
  }, [currentPostIdx, posts.length, currentOrientadorIdx, orderedOrientadorIds.length, onClose]);

  const goPrev = useCallback(() => {
    if (currentPostIdx > 0) {
      setCurrentPostIdx(prev => prev - 1);
      setProgress(0);
    } else if (currentOrientadorIdx > 0) {
      setCurrentOrientadorIdx(prev => prev - 1);
      setCurrentPostIdx(0);
      setProgress(0);
    }
  }, [currentPostIdx, currentOrientadorIdx]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev, onClose]);

  if (!currentOrientador || !currentPost) return null;

  const getInitials = (name: string) => name.split(' ').map(w => w[0]).join('').slice(0, 2);

  return (
    <div className="fixed inset-0 z-[100] bg-foreground/95 flex items-center justify-center">
      <div className="relative w-full max-w-md h-full max-h-[90vh] bg-card rounded-2xl overflow-hidden flex flex-col">
        {/* Progress segments */}
        <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-3">
          {posts.map((_, i) => (
            <div key={i} className="flex-1 h-1 rounded-full bg-foreground/20 overflow-hidden">
              <div
                className="h-full bg-primary-foreground rounded-full transition-all duration-100"
                style={{
                  width: i < currentPostIdx ? '100%' : i === currentPostIdx ? `${progress}%` : '0%'
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-6 left-0 right-0 z-10 flex items-center gap-3 px-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-foreground/50 flex-shrink-0">
            <img
              src={currentOrientador.avatar}
              alt={currentOrientador.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.classList.add('bg-primary', 'flex', 'items-center', 'justify-center');
                  parent.innerHTML = `<span class="text-primary-foreground text-sm font-bold">${getInitials(currentOrientador.name)}</span>`;
                }
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-primary-foreground font-bold text-sm truncate">{currentOrientador.name}</p>
            <p className="text-primary-foreground/60 text-xs">{currentOrientador.role}</p>
          </div>
          <button onClick={onClose} className="min-h-touch min-w-[44px] flex items-center justify-center text-primary-foreground/80 hover:text-primary-foreground">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 relative">
          <img
            src={currentPost.image}
            alt={currentPost.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=1200&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-foreground/40" />

          {/* Text overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-primary-foreground font-bold text-xl mb-2 leading-tight">{currentPost.title}</h3>
            <p className="text-primary-foreground/80 text-base line-clamp-3">{currentPost.content}</p>
          </div>
        </div>

        {/* Navigation areas */}
        <button
          onClick={goPrev}
          className="absolute left-0 top-20 bottom-20 w-1/3 z-10"
          aria-label="Anterior"
        />
        <button
          onClick={goNext}
          className="absolute right-0 top-20 bottom-20 w-1/3 z-10"
          aria-label="Próximo"
        />

        {/* Arrow buttons for desktop */}
        <button onClick={goPrev} className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-foreground/30 items-center justify-center text-primary-foreground hover:bg-foreground/50">
          <ChevronLeft size={20} />
        </button>
        <button onClick={goNext} className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-foreground/30 items-center justify-center text-primary-foreground hover:bg-foreground/50">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default StoriesViewer;
