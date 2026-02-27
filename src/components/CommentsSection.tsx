import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Comment, currentUser } from '@/data/mockData';
import { Send } from 'lucide-react';

interface CommentsSectionProps {
  comments: Comment[];
  onAddComment?: (text: string) => void;
}

const CommentsSection = ({ comments, onAddComment }: CommentsSectionProps) => {
  const [text, setText] = useState('');
  const [localComments, setLocalComments] = useState<Comment[]>(comments);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!text.trim()) return;
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      text: text.trim(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setLocalComments(prev => [...prev, newComment]);
    onAddComment?.(text.trim());
    setText('');
  };

  return (
    <div className="pt-3 border-t border-border">
      {localComments.length > 0 && (
        <div className="space-y-3 mb-3">
          {localComments.map(c => (
            <div key={c.id} className="flex gap-2">
              <img
                src={c.userAvatar}
                alt={c.userName}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5 cursor-pointer"
                onClick={() => navigate(`/user/${c.userId}`)}
              />
              <div>
                <span
                  className="font-semibold text-sm cursor-pointer hover:text-primary transition-colors"
                  onClick={() => navigate(`/user/${c.userId}`)}
                >
                  {c.userName}
                </span>
                <p className="text-base text-foreground">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <img src={currentUser.avatar} alt="Você" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="Escreva um comentário..."
          className="flex-1 min-h-touch px-3 rounded-full border-2 border-border bg-background text-base focus:border-primary focus:outline-none transition-colors"
        />
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="min-h-touch min-w-[44px] flex items-center justify-center text-primary disabled:opacity-40"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default CommentsSection;
