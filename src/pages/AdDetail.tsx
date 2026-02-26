import { useParams, useNavigate } from 'react-router-dom';
import { announcements, formatPrice, formatDate, chatConversations } from '@/data/mockData';
import { ArrowLeft, MapPin, BadgeCheck, MessageCircle, Heart, Share2, MessageSquare } from 'lucide-react';
import Layout from '@/components/Layout';
import { useState } from 'react';
import CommentsSection from '@/components/CommentsSection';
import ShareModal from '@/components/ShareModal';
import ChatModal from '@/components/ChatModal';

const AdDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ad = announcements.find(a => a.id === id);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(ad?.likes || 0);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showChat, setShowChat] = useState(false);

  if (!ad) return (
    <Layout>
      <div className="p-8 text-center text-muted-foreground">Anúncio não encontrado</div>
    </Layout>
  );

  const existingChat = chatConversations.find(c => c.adId === ad.id);

  return (
    <Layout>
      <div className="pb-4">
        {/* Image */}
        <div className="relative">
          <img src={ad.images[0]} alt={ad.title} className="w-full h-64 sm:h-80 object-cover" />
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-foreground/50 text-primary-foreground min-h-touch min-w-[44px] rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={22} />
          </button>
        </div>

        <div className="px-4 pt-4">
          <h2 className="text-heading font-bold mb-1">{ad.title}</h2>
          <p className="text-heading-lg font-bold text-primary mb-3">{formatPrice(ad.price)}</p>

          <div className="flex items-center gap-2 text-muted-foreground mb-4 flex-wrap">
            <MapPin size={18} />
            <span>{ad.city}, {ad.state}</span>
            <span>·</span>
            <span>{ad.type}</span>
            {ad.condition && <><span>·</span><span>{ad.condition}</span></>}
            <span>·</span>
            <span>{formatDate(ad.createdAt)}</span>
          </div>

          {/* Author - clickable */}
          <button
            onClick={() => navigate(`/user/${ad.author.id}`)}
            className="w-full flex items-center gap-3 p-4 bg-muted rounded-xl mb-4 text-left"
          >
            <img src={ad.author.avatar} alt={ad.author.name} className="w-12 h-12 rounded-full object-cover" />
            <div className="flex-1">
              <div className="flex items-center gap-1 font-semibold">
                {ad.author.name}
                {ad.author.verified && <BadgeCheck size={18} className="text-verified" />}
              </div>
              <p className="text-sm text-muted-foreground">{ad.author.city}, {ad.author.state}</p>
            </div>
            <span className="text-sm text-primary font-semibold">Ver perfil →</span>
          </button>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-2">Descrição</h3>
            <p className="text-muted-foreground leading-relaxed">{ad.description}</p>
          </div>

          {/* Social actions */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <span>{likeCount} curtidas</span>
            <span>{ad.comments.length} comentários</span>
          </div>

          <div className="flex items-center gap-1 border-t border-b border-border py-2 mb-4">
            <button
              onClick={() => { setLiked(!liked); setLikeCount(prev => liked ? prev - 1 : prev + 1); }}
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
            <div className="mb-4">
              <CommentsSection comments={ad.comments} />
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => setShowChat(true)}
              className="w-full min-h-[56px] bg-primary text-primary-foreground rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={22} /> Negociar pelo Chat
            </button>
          </div>
        </div>
      </div>

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
    </Layout>
  );
};

export default AdDetail;
