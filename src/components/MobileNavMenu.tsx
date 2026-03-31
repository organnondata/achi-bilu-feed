import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Home, Search, PlusCircle, Calendar, User, BookOpen, Star, Gem, Radio } from 'lucide-react';

const allNavItems = [
  { path: '/feed', icon: Home, label: 'Feed' },
  { path: '/explore', icon: Search, label: 'Explorar' },
  { path: '/publish', icon: PlusCircle, label: 'Publicar' },
  { path: '/events', icon: Calendar, label: 'Eventos' },
  { path: '/profile', icon: User, label: 'Perfil' },
  { path: '/ativos', icon: Gem, label: 'Ativos Dakila', highlight: 'gold' },
  { path: '/orientadores', icon: BookOpen, label: 'Orientadores', badge: 'OFICIAL' },
  { path: '/radio', icon: Radio, label: 'Rádio Top FM' },
  { path: '/premium', icon: Star, label: 'Premium', highlight: 'premium' },
];

const MobileNavMenu = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex flex-col items-center gap-0.5 min-w-[52px] min-h-touch p-1 rounded-lg transition-colors text-muted-foreground"
      >
        <Menu size={22} strokeWidth={2} />
        <span className="text-[10px] font-medium">Menu</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-end">
          <div className="fixed inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative w-full bg-card rounded-t-2xl shadow-lg z-10 animate-fade-in-up max-h-[80vh] overflow-y-auto pb-safe">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-bold text-lg">Menu</h3>
              <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-muted">
                <X size={20} className="text-muted-foreground" />
              </button>
            </div>
            <div className="p-3 grid grid-cols-3 gap-2">
              {allNavItems.map(item => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-colors ${
                      isActive
                        ? item.highlight === 'gold'
                          ? 'bg-bdm-gold/10 text-bdm-gold'
                          : item.highlight === 'premium'
                            ? 'bg-secondary/20 text-secondary'
                            : 'bg-accent text-primary'
                        : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-xs font-bold text-center leading-tight">{item.label}</span>
                    {item.badge && (
                      <span className="bg-primary text-primary-foreground text-[9px] px-1.5 py-0.5 rounded-full font-bold leading-none">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavMenu;
