import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Send, Phone } from 'lucide-react';
import { ChatConversation, currentUser } from '@/data/mockData';

interface Props {
  chat: ChatConversation;
  onClose: () => void;
  onMinimize: () => void;
  minimized: boolean;
}

const FloatingChat = ({ chat, onClose, onMinimize, minimized }: Props) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(chat.messages);
  const navigate = useNavigate();
  const otherUser = chat.participants.find(p => p.id !== currentUser.id) || chat.participants[1];

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, {
      id: `m${Date.now()}`,
      senderId: currentUser.id,
      text: input.trim(),
      timestamp: new Date().toISOString(),
    }]);
    setInput('');
  };

  if (minimized) {
    return (
      <button
        onClick={onMinimize}
        className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-shadow"
      >
        <div className="relative">
          <img src={otherUser.avatar} className="w-8 h-8 rounded-full object-cover" alt="" />
          {chat.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-verified rounded-full border-2 border-card" />}
        </div>
        <span className="font-semibold text-sm max-w-[100px] truncate">{otherUser.name}</span>
      </button>
    );
  }

  return (
    <div className="w-80 bg-card border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden" style={{ height: '400px' }}>
      {/* Header */}
      <div className="flex items-center gap-2 p-3 border-b border-border bg-primary/5">
        <div className="relative cursor-pointer" onClick={() => navigate(`/user/${otherUser.id}`)}>
          <img src={otherUser.avatar} className="w-9 h-9 rounded-full object-cover" alt="" />
          {chat.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-verified rounded-full border-2 border-card" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate cursor-pointer hover:text-primary transition-colors" onClick={() => navigate(`/user/${otherUser.id}`)}>{otherUser.name}</p>
          <p className="text-xs text-muted-foreground">
            {chat.online ? 'Online' : chat.lastSeen ? 'Visto recentemente' : 'Offline'}
          </p>
        </div>
        <button onClick={() => window.open(`https://wa.me/5534999990001`, '_blank')} className="p-1.5 hover:bg-muted rounded-full">
          <Phone size={16} className="text-verified" />
        </button>
        <button onClick={onMinimize} className="p-1.5 hover:bg-muted rounded-full">
          <Minus size={16} className="text-muted-foreground" />
        </button>
        <button onClick={onClose} className="p-1.5 hover:bg-muted rounded-full">
          <X size={16} className="text-muted-foreground" />
        </button>
      </div>

      {/* Ad context */}
      <div className="px-3 py-2 bg-muted/50 text-xs text-muted-foreground border-b border-border truncate">
        📦 {chat.adTitle}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map(msg => {
          const isMine = msg.senderId === currentUser.id;
          return (
            <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                isMine ? 'bg-primary text-primary-foreground rounded-br-md' : 'bg-muted text-foreground rounded-bl-md'
              }`}>
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="p-2 border-t border-border flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Digite sua mensagem..."
          className="flex-1 bg-muted rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        />
        <button onClick={sendMessage} className="min-w-[40px] h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default FloatingChat;
