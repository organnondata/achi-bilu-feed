import { ReactNode, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, PlusCircle, Calendar, User, Crown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import NotificationsDropdown from './NotificationsDropdown';
import MessagesDropdown from './MessagesDropdown';
import PointsPanel from './PointsPanel';
import FloatingChat from './FloatingChat';
import { chatConversations } from '@/data/mockData';

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
  const { user } = useAuth();
  const [openChats, setOpenChats] = useState<string[]>([]);
  const [minimizedChats, setMinimizedChats] = useState<string[]>([]);

  const handleOpenChat = (chatId: string) => {
    if (!openChats.includes(chatId)) {
      setOpenChats(prev => [...prev.slice(-2), chatId]);
    }
    setMinimizedChats(prev => prev.filter(id => id !== chatId));
  };

  const handleCloseChat = (chatId: string) => {
    setOpenChats(prev => prev.filter(id => id !== chatId));
    setMinimizedChats(prev => prev.filter(id => id !== chatId));
  };

  const handleMinimizeChat = (chatId: string) => {
    setMinimizedChats(prev =>
      prev.includes(chatId) ? prev.filter(id => id !== chatId) : [...prev, chatId]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Top header - Facebook style */}
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-2 feed-card-shadow">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          {/* Logo */}
          <h1
            className="text-xl font-bold text-primary cursor-pointer whitespace-nowrap"
            onClick={() => navigate('/feed')}
          >
            Achei Bilu
          </h1>

          {/* Search */}
          <div className="flex-1 max-w-md mx-auto hidden sm:block">
            <input
              type="text"
              placeholder="Pesquisar produtos, orientadores, anúncios..."
              className="w-full bg-muted rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
            />
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={() => navigate('/orientadores')}
              className="hidden sm:flex items-center gap-1.5 min-h-touch px-3 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors"
            >
              <Crown size={18} className="text-secondary" />
              <span className="text-sm font-bold text-secondary">Orientadores</span>
            </button>

            <PointsPanel />
            <NotificationsDropdown />
            <MessagesDropdown onOpenChat={handleOpenChat} />

            {/* Avatar */}
            <button
              onClick={() => navigate('/profile')}
              className="min-h-touch min-w-[44px] flex items-center justify-center"
            >
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-primary/20"
              />
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="sm:hidden mt-2">
          <input
            type="text"
            placeholder="Pesquisar..."
            className="w-full bg-muted rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 placeholder:text-muted-foreground"
          />
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto">
        {children}
      </main>

      {/* Bottom navigation - mobile */}
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
        {/* Orientadores link in sidebar */}
        <button
          onClick={() => navigate('/orientadores')}
          className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-colors min-h-touch w-16 ${
            location.pathname === '/orientadores' ? 'bg-secondary/10 text-secondary' : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          <Crown size={22} strokeWidth={location.pathname === '/orientadores' ? 2.5 : 2} />
          <span className="text-[11px] font-medium">Conteúdos</span>
        </button>
      </nav>

      {/* Floating chats */}
      <div className="fixed bottom-24 md:bottom-4 right-4 z-50 flex flex-col-reverse items-end gap-2">
        {openChats.map(chatId => {
          const chat = chatConversations.find(c => c.id === chatId);
          if (!chat) return null;
          return (
            <FloatingChat
              key={chatId}
              chat={chat}
              minimized={minimizedChats.includes(chatId)}
              onClose={() => handleCloseChat(chatId)}
              onMinimize={() => handleMinimizeChat(chatId)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Layout;
