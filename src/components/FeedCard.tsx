import { Heart, Share2, MessageSquare, MapPin, BadgeCheck, Star, MessageCircle } from 'lucide-react';
import { Announcement, formatPrice, chatConversations } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CommentsSection from './CommentsSection';
import ShareModal from './ShareModal';
import ChatModal from './ChatModal';

const categoryStyles: Record<string, string> = {
  vehicles: 'category-vehicles',
  realestate: 'category-realestate',
  services: 'category-services',
  products: 'category-products',
};

const categoryLabels: Record<string, string> = {
  vehicles: 'Veículos',
  realestate: 'Imóveis',
  services: 'Serviços',
  products: 'Produtos',
};

const FeedCard = ({ ad }: { ad: Announcement }) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(ad.saved || false);
  const [liked, setLiked] = useState(ad.liked || false);
  const [likeCount, setLikeCount] = useState(ad.likes);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const existingChat = chatConversations.find(c => c.adId === ad.id);

  return (
    <>
      <article className="bg-card rounded-xl overflow-hidden feed-card-shadow">
        {/* Image - clickable to detail */}
        <div className="relative cursor-pointer" onClick={() => navigate(`/ad/${ad.id}`)}>
          <img src={ad.images[0]} alt={ad.title} className="w-full h-56 sm:h-64 object-cover" loading="lazy" />
          {ad.featured && (
            <span className="absolute top-3 left-3 badge-highlight px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              <Star size={14} /> Destaque
            </span>
          )}
          <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold ${categoryStyles[ad.category] || 'category-services'}`}>
            {categoryLabels[ad.category] || ad.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3
            className="text-lg font-bold text-foreground leading-tight mb-1 cursor-pointer hover:text-primary transition-colors"
            onClick={() => navigate(`/ad/${ad.id}`)}
          >
            {ad.title}
          </h3>

          <p className="text-heading font-bold text-primary mb-2">
            {formatPrice(ad.price)}
          </p>

          <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
            <MapPin size={16} />
            <span>{ad.city}, {ad.state}</span>
            <span className="mx-1">·</span>
            <span>{ad.type}</span>
          </div>

          {/* Author */}
          <div
            className="flex items-center gap-2 mb-3 pb-3 border-b border-border cursor-pointer"
            onClick={() => navigate(`/user/${ad.author.id}`)}
          >
            <img src={ad.author.avatar} alt={ad.author.name} className="w-9 h-9 rounded-full object-cover" />
            <span className="font-medium text-sm">{ad.author.name}</span>
            {ad.author.verified && <BadgeCheck size={18} className="text-verified" />}
          </div>

          {/* Like/Comment counters */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <span>{likeCount} curtidas</span>
            <span>{ad.comments.length} comentários</span>
          </div>

          {/* Social actions row */}
          <div className="flex items-center gap-1 border-t border-border pt-3 mb-3">
            <button
              onClick={handleLike}
              className={`flex-1 flex items-center justify-center gap-1.5 min-h-touch rounded-lg font-semibold text-sm transition-colors ${
                liked ? 'text-primary bg-accent' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Heart size={18} fill={liked ? 'currentColor' : 'none'} /> Curtir
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex-1 flex items-center justify-center gap-1.5 min-h-touch rounded-lg font-semibold text-sm text-muted-foreground hover:bg-muted transition-colors"
            >
              <MessageSquare size={18} /> Comentar
            </button>
            <button
              onClick={() => setShowShare(true)}
              className="flex-1 flex items-center justify-center gap-1.5 min-h-touch rounded-lg font-semibold text-sm text-muted-foreground hover:bg-muted transition-colors"
            >
              <Share2 size={18} /> Compartilhar
            </button>
          </div>

          {/* Negotiate + Save */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowChat(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg min-h-touch font-semibold text-base transition-opacity hover:opacity-90"
            >
              <MessageCircle size={20} /> Negociar
            </button>
            <button
              onClick={() => setSaved(!saved)}
              className={`min-h-touch min-w-[50px] flex items-center justify-center rounded-lg border-2 transition-colors ${
                saved ? 'border-primary bg-accent text-primary' : 'border-border text-muted-foreground hover:border-primary'
              }`}
            >
              <Heart size={20} fill={saved ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Comments */}
          {showComments && (
            <div className="mt-3">
              <CommentsSection comments={ad.comments} />
            </div>
          )}
        </div>
      </article>

      <ShareModal isOpen={showShare} onClose={() => setShowShare(false)} title={ad.title} />
      <ChatModal
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        adTitle={ad.title}
        otherUser={ad.author}
        initialMessages={existingChat?.messages || []}
        online={existingChat?.online}
        lastSeen={existingChat?.lastSeen}
      />
    </>
  );
};

export default FeedCard;
