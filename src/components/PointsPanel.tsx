import { Star, X, Trophy, Gift, ArrowUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { pointsActivities, pointsLevels, pointsBenefits } from '@/data/mockData';
import { useState, useRef, useEffect } from 'react';

const PointsPanel = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const points = user?.points || 0;
  const level = user?.level || 'Bronze';
  const currentLevel = pointsLevels.find(l => l.name === level) || pointsLevels[0];
  const nextLevel = pointsLevels[pointsLevels.indexOf(currentLevel) + 1];
  const benefits = pointsBenefits.find(b => b.level === level);
  const progress = nextLevel ? ((points - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100 : 100;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 min-h-touch px-3 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors"
      >
        <Star size={18} className="text-secondary" fill="currentColor" />
        <span className="font-bold text-sm text-secondary">{points}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden animate-fade-in-up">
          <div className="p-4 border-b border-border bg-gradient-to-r from-secondary/10 to-secondary/5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Trophy size={20} className="text-secondary" /> Pontos BDM
              </h3>
              <button onClick={() => setOpen(false)} className="p-1"><X size={18} className="text-muted-foreground" /></button>
            </div>
            <div className="text-center py-2">
              <p className="text-3xl font-bold text-secondary">{points}</p>
              <p className="text-sm text-muted-foreground">Nível: <span className="font-bold text-foreground">{level}</span></p>
              {nextLevel && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{level}</span>
                    <span>{nextLevel.name}</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-secondary rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{nextLevel.min - points} pontos para {nextLevel.name}</p>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 border-b border-border">
            <h4 className="font-bold text-sm mb-2 flex items-center gap-1">
              <Gift size={16} className="text-primary" /> Benefícios Atuais
            </h4>
            <ul className="space-y-1">
              {benefits?.benefits.map((b, i) => (
                <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="text-verified">✓</span> {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 max-h-40 overflow-y-auto">
            <h4 className="font-bold text-sm mb-2 flex items-center gap-1">
              <ArrowUp size={16} className="text-primary" /> Atividade Recente
            </h4>
            {pointsActivities.slice(0, 5).map(a => (
              <div key={a.id} className="flex items-center justify-between py-1.5 text-sm">
                <span className="text-muted-foreground">{a.action}</span>
                <span className="font-bold text-verified">+{a.points}</span>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-border">
            <button className="w-full min-h-touch bg-secondary text-secondary-foreground rounded-lg font-bold text-base hover:opacity-90 transition-opacity">
              Trocar Pontos
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PointsPanel;
