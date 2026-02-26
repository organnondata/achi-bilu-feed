import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, PlusCircle, Calendar, User } from 'lucide-react';

const navItems = [
  { path: '/feed', icon: Home, label: 'Feed' },
  { path: '/explore', icon: Search, label: 'Explorar' },
  { path: '/publish', icon: PlusCircle, label: 'Publicar' },
  { path: '/events', icon: Calendar, label: 'Eventos' },
  { path: '/profile', icon: User, label: 'Perfil' },
];

const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Top header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 flex items-center justify-between feed-card-shadow">
        <h1 
          className="text-xl font-bold text-primary cursor-pointer" 
          onClick={() => navigate('/feed')}
        >
          Achei Bilu
        </h1>
        <span className="text-sm text-muted-foreground font-medium">BDM Marketplace</span>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto">
        {children}
      </main>

      {/* Bottom navigation - mobile style */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border bottom-nav-safe md:hidden">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path === '/feed' && location.pathname.startsWith('/ad/'));
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-0.5 min-w-[60px] min-h-touch p-1 rounded-lg transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop sidebar nav */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-20 bg-card border-r border-border flex-col items-center pt-20 gap-2 z-30">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-colors min-h-touch w-16 ${
                isActive ? 'bg-accent text-primary' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[11px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
