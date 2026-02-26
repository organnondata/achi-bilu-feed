import { Bell, Heart, MessageSquare, Star, Info } from 'lucide-react';
import { notifications } from '@/data/mockData';
import { useState, useRef, useEffect } from 'react';

const typeIcons = {
  like: Heart,
  comment: MessageSquare,
  message: MessageSquare,
  points: Star,
  system: Info,
};

const NotificationsDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const unread = notifications.filter(n => !n.read).length;

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
        <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden animate-fade-in-up">
          <div className="p-4 border-b border-border">
            <h3 className="font-bold text-lg">Notificações</h3>
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
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
