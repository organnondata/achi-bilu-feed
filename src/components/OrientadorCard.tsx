import { Heart, MessageSquare, Share2, BadgeCheck } from 'lucide-react';
import { OrientadorPost } from '@/data/mockData';
import { useState } from 'react';
import CommentsSection from './CommentsSection';
import ShareModal from './ShareModal';

const OrientadorCard = ({ post }: { post: OrientadorPost }) => {
  const [liked, setLiked] = useState(post.liked || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <article className="bg-card rounded-xl overflow-hidden feed-card-shadow">
      {/* Author header */}
      <div className="p-4 flex items-center gap-3">
        <img src={post.orientadorAvatar} alt={post.orientadorName} className="w-12 h-12 rounded-full object-cover" />
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-base">{post.orientadorName}</span>
            <BadgeCheck size={18} className="text-verified" />
          </div>
          <span className="text-sm text-muted-foreground">{post.orientadorRole}</span>
        </div>
        <span className="badge-highlight px-3 py-1 rounded-full text-xs font-bold">Conteúdo Oficial</span>
      </div>

      {/* Image */}
      <img src={post.image} alt={post.title} className="w-full h-56 sm:h-64 object-cover" loading="lazy" />

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-foreground mb-2">{post.title}</h3>
        <p className="text-base text-muted-foreground leading-relaxed mb-3">{post.content}</p>

        {/* Social links */}
        <div className="flex gap-2 mb-3">
          {post.socialLinks.instagram && (
            <a href={post.socialLinks.instagram} className="min-h-touch px-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold flex items-center gap-1">
              Instagram
            </a>
          )}
          {post.socialLinks.tiktok && (
            <a href={post.socialLinks.tiktok} className="min-h-touch px-4 rounded-full bg-foreground text-background text-sm font-semibold flex items-center gap-1">
              TikTok
            </a>
          )}
          {post.socialLinks.youtube && (
            <a href={post.socialLinks.youtube} className="min-h-touch px-4 rounded-full bg-red-600 text-white text-sm font-semibold flex items-center gap-1">
              YouTube
            </a>
          )}
        </div>

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
              liked ? 'text-primary bg-accent' : 'text-muted-foreground hover:bg-muted'
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

export default OrientadorCard;
