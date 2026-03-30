import { Heart, MessageSquare, Share2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommentsSection from './CommentsSection';
import ShareModal from './ShareModal';
import { Comment } from '@/data/mockData';
import dakilaNewsIcon from '@/assets/dakila_news_icon.png';

export interface NewsPost {
  id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  likes: number;
  liked?: boolean;
  comments: Comment[];
}

const NewsCard = ({ post }: { post: NewsPost }) => {
  const [liked, setLiked] = useState(post.liked || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <article className="bg-card rounded-xl overflow-hidden feed-card-shadow relative">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
          <Newspaper size={22} className="text-white" />
        </div>
        <div className="flex-1">
          <span className="font-bold text-base">Dakila News</span>
          <p className="text-sm text-muted-foreground">Ecossistema Dakila</p>
        </div>
        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
          Últimas Notícias
        </span>
      </div>

      {/* Image */}
      <img src={post.image} alt={post.title} className="w-full h-56 sm:h-64 object-cover" loading="lazy" />

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-foreground mb-2">{post.title}</h3>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">{post.content}</p>

        {/* Counters */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <span>{likeCount} curtidas</span>
          <span>{post.comments.length} comentários</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 border-t border-border pt-3">
          <button
            onClick={handleLike}
            className={`flex-1 flex items-center justify-center gap-2 min-h-touch rounded-lg font-semibold text-base transition-colors ${
              liked ? 'text-blue-600 bg-blue-50' : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            <Heart size={20} fill={liked ? 'currentColor' : 'none'} /> Curtir
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex-1 flex items-center justify-center gap-2 min-h-touch rounded-lg font-semibold text-base text-muted-foreground hover:bg-muted transition-colors"
          >
            <MessageSquare size={20} /> Comentar
          </button>
          <button
            onClick={() => setShowShare(true)}
            className="flex-1 flex items-center justify-center gap-2 min-h-touch rounded-lg font-semibold text-base text-muted-foreground hover:bg-muted transition-colors"
          >
            <Share2 size={20} /> Compartilhar
          </button>
        </div>

        {showComments && (
          <div className="mt-3">
            <CommentsSection comments={post.comments} />
          </div>
        )}
      </div>

      <ShareModal isOpen={showShare} onClose={() => setShowShare(false)} title={post.title} />
    </article>
  );
};

export default NewsCard;
