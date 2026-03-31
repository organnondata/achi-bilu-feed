import { Bell, Heart, MessageSquare, Star, Info } from 'lucide-react';
import { notifications } from '@/data/mockData';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const typeIcons = {
  like: Heart,
  comment: MessageSquare,
  message: MessageSquare,
  points: Star,
  system: Info,
};

const NotificationsDropdown = () => {
  const [open, setOpen] = useState(false);
  const unread = notifications.filter(n => !n.read).length;
  const isMobile = useIsMobile();

  const listContent = (
    <>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">Notificações</h3>
          {isMobile && (
            <button onClick={() => setOpen(false)} className="text-muted-foreground text-sm font-medium">Fechar</button>
          )}
        </div>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {notifications.map(n => {
          const Icon = typeIcons[n.type];
          return (
            <div key={n.id} className={`flex items-start gap-3 p-3 border-b border-border last:border-0 ${!n.read ? 'bg-accent/50' : ''}`}>
              {n.avatar ? (
                <img src={n.avatar} className="w-10 h-10 rounded-full object-cover flex-shrink-0" alt="" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-primary" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm leading-tight">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.description}</p>
              </div>
              {!n.read && <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />}
            </div>
          );
        })}
      </div>
    </>
  );

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative min-h-touch min-w-[44px] flex items-center justify-center rounded-full hover:bg-muted transition-colors"
      >
        <Bell size={22} className="text-foreground" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <>
          {isMobile ? (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <div className="fixed inset-0 bg-black/60" onClick={() => setOpen(false)} />
              <div className="relative w-full max-w-sm max-h-[85vh] bg-card border border-border rounded-xl shadow-lg overflow-y-auto animate-fade-in-up z-10">
                {listContent}
              </div>
            </div>
          ) : (
            <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden animate-fade-in-up">
              {listContent}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NotificationsDropdown;
