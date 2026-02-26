import { MessageCircle } from 'lucide-react';
import { chatConversations, currentUser } from '@/data/mockData';
import { useState, useRef, useEffect } from 'react';

interface Props {
  onOpenChat?: (chatId: string) => void;
}

const MessagesDropdown = ({ onOpenChat }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const unreadCount = 3;

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
        <MessageCircle size={22} className="text-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden animate-fade-in-up">
          <div className="p-4 border-b border-border">
            <h3 className="font-bold text-lg">Mensagens</h3>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {chatConversations.map(chat => {
              const otherUser = chat.participants.find(p => p.id !== currentUser.id) || chat.participants[1];
              const lastMsg = chat.messages[chat.messages.length - 1];
              return (
                <button
                  key={chat.id}
                  onClick={() => { onOpenChat?.(chat.id); setOpen(false); }}
                  className="w-full flex items-center gap-3 p-3 border-b border-border last:border-0 hover:bg-muted/50 transition-colors text-left"
                >
                  <div className="relative flex-shrink-0">
                    <img src={otherUser.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-verified rounded-full border-2 border-card" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{otherUser.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{lastMsg?.text}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesDropdown;
