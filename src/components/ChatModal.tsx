import { X, Send, Phone, Circle } from 'lucide-react';
import { useState } from 'react';
import { ChatMessage, User, currentUser } from '@/data/mockData';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  adTitle: string;
  otherUser: User;
  initialMessages?: ChatMessage[];
  online?: boolean;
  lastSeen?: string;
}

const ChatModal = ({ isOpen, onClose, adTitle, otherUser, initialMessages = [], online = false, lastSeen }: ChatModalProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      senderId: currentUser.id,
      text: input.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
  };

  const statusText = online ? 'Online agora' : lastSeen ? `Última vez: ${new Date(lastSeen).toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })}` : 'Offline';

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={onClose} className="min-h-touch min-w-[44px] flex items-center justify-center">
          <X size={22} />
        </button>
        <img src={otherUser.avatar} alt={otherUser.name} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base truncate">{otherUser.name}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Circle size={8} fill={online ? 'hsl(var(--primary))' : 'transparent'} className={online ? 'text-primary' : 'text-muted-foreground'} />
            {statusText}
          </div>
        </div>
        <button
          onClick={() => window.open(`https://wa.me/${otherUser.phone?.replace(/\D/g, '')}`, '_blank')}
          className="min-h-touch min-w-[44px] flex items-center justify-center rounded-full hover:bg-muted text-primary"
        >
          <Phone size={20} />
        </button>
      </div>

      {/* Ad context */}
      <div className="bg-muted px-4 py-2 text-sm text-muted-foreground border-b border-border">
        Sobre: <span className="font-semibold text-foreground">{adTitle}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-center text-muted-foreground py-8">Envie uma mensagem para iniciar a conversa</p>
        )}
        {messages.map(msg => {
          const isMine = msg.senderId === currentUser.id;
          return (
            <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-base ${
                isMine 
                  ? 'bg-primary text-primary-foreground rounded-br-md' 
                  : 'bg-card border border-border rounded-bl-md'
              }`}>
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="bg-card border-t border-border p-3 flex items-center gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Digite sua mensagem..."
          className="flex-1 min-h-[50px] px-4 rounded-xl border-2 border-border bg-background text-lg focus:border-primary focus:outline-none transition-colors"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="min-h-[50px] min-w-[50px] bg-primary text-primary-foreground rounded-xl flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-opacity"
        >
          <Send size={22} />
        </button>
      </div>
    </div>
  );
};

export default ChatModal;
