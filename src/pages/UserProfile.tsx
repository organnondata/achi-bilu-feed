import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, getAnnouncementsByUser, formatPrice, pointsLevels, orientadorPosts, currentUser } from '@/data/mockData';
import Layout from '@/components/Layout';
import { BadgeCheck, MapPin, MessageCircle, ChevronRight, Star, Gem, Handshake, ExternalLink, Briefcase, Heart, MessageSquare, Share2, UserPlus } from 'lucide-react';
import ChatModal from '@/components/ChatModal';
import CommentsSection from '@/components/CommentsSection';
import ShareModal from '@/components/ShareModal';
import { useState } from 'react';

type ProfileTab = 'publicacoes' | 'anuncios' | 'sobre';

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [chatContext, setChatContext] = useState('');
  const [activeTab, setActiveTab] = useState<ProfileTab>('publicacoes');
  const [showShare, setShowShare] = useState(false);
  const [following, setFollowing] = useState(false);

  const user = getUserById(id || '');
  const userAds = getAnnouncementsByUser(id || '');
  const level = pointsLevels.find(l => l.name === user?.level) || pointsLevels[0];

  // Mock posts for this user (simulate with orientadorPosts or create inline)
  const userPosts = [
    {
      id: `up1-${id}`,
      text: 'Acabei de publicar um novo produto no marketplace! Confiram no meu perfil.',
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=600&fit=crop',
      createdAt: '2025-02-26',
      likes: 14,
      liked: false,
      comments: [],
    },
    {
      id: `up2-${id}`,
      text: 'Participando do evento Dakila em Uberaba! Excelente encontro com a comunidade. 🌿',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop',
      createdAt: '2025-02-24',
      likes: 28,
      liked: false,
      comments: [
        { id: 'upc1', userId: 'u2', userName: 'Maria Silva', userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face', text: 'Que evento incrível!', createdAt: '2025-02-24' },
      ],
    },
    {
      id: `up3-${id}`,
      text: 'O BDM está transformando a forma como fazemos negócios. Orgulho de fazer parte desse ecossistema!',
      image: '',
      createdAt: '2025-02-20',
      likes: 42,
      liked: false,
      comments: [],
    },
  ];

  if (!user) return (
    <Layout>
      <div className="p-8 text-center text-muted-foreground">Usuário não encontrado</div>
    </Layout>
  );

  const handleMessage = () => {
    setChatContext(`Conversa com ${user.name}`);
    setShowChat(true);
  };

  const handleNegotiate = () => {
    const recentAds = userAds.slice(0, 3).map(a => a.title).join(', ');
    setChatContext(recentAds ? `Negociação: ${recentAds}` : `Negociar com ${user.name}`);
    setShowChat(true);
  };

  const tabs: { key: ProfileTab; label: string }[] = [
    { key: 'publicacoes', label: 'Publicações' },
    { key: 'anuncios', label: `Anúncios (${userAds.length})` },
    { key: 'sobre', label: 'Sobre' },
  ];

  return (
    <Layout>
      <div className="px-4 pt-4 pb-4">
        {/* Profile header */}
        <div className="bg-card rounded-xl overflow-hidden feed-card-shadow mb-4">
          <div className="h-24 bg-gradient-to-r from-primary to-primary/70" />
          <div className="px-4 pb-4 -mt-10">
            <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover border-4 border-card mb-2" />
            <h2 className="text-xl font-bold flex items-center gap-2">
              {user.name}
              {user.verified && <BadgeCheck size={20} className="text-verified" />}
            </h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
              <Briefcase size={14} /> Membro do Ecossistema Dakila
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
              <MapPin size={14} /> {user.city}, {user.state}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {user.verified && (
                <span className="inline-block badge-verified px-3 py-1 rounded-full text-xs font-semibold">
                  ✓ Verificado
                </span>
              )}
              {user.bdmAccount && (
                <span className="inline-flex items-center gap-1 badge-bdm px-3 py-1 rounded-full text-xs font-bold">
                  <Gem size={12} /> Correntista BDM
                </span>
              )}
              {user.level && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${level.color}20`, color: level.color }}>
                  <Star size={12} fill="currentColor" /> Nível {user.level}
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleMessage}
                className="flex-1 min-h-touch bg-primary text-primary-foreground rounded-lg font-semibold text-sm flex items-center justify-center gap-1.5"
              >
                <MessageCircle size={16} /> Mensagem
              </button>
              {userAds.length > 0 && (
                <button
                  onClick={handleNegotiate}
                  className="flex-1 min-h-touch bg-bdm-gold text-bdm-gold-foreground rounded-lg font-semibold text-sm flex items-center justify-center gap-1.5"
                >
                  <Handshake size={16} /> Negociar
                </button>
              )}
              <button
                onClick={() => setFollowing(!following)}
                className={`min-h-touch min-w-[44px] rounded-lg flex items-center justify-center border-2 transition-colors ${
                  following ? 'border-primary bg-accent text-primary' : 'border-border text-muted-foreground hover:border-primary'
                }`}
              >
                <UserPlus size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-card rounded-xl p-3 text-center border border-border">
            <p className="text-xl font-bold text-primary">{userAds.length}</p>
            <p className="text-xs text-muted-foreground">Anúncios</p>
          </div>
          <div className="bg-card rounded-xl p-3 text-center border border-border">
            <p className="text-xl font-bold text-bdm-gold">{user.points || 0}</p>
            <p className="text-xs text-muted-foreground">Pontos</p>
          </div>
          <div className="bg-card rounded-xl p-3 text-center border border-border">
            <p className="text-xl font-bold text-muted-foreground">{userPosts.length}</p>
            <p className="text-xs text-muted-foreground">Publicações</p>
          </div>
        </div>

        {/* Saiba Mais BDM */}
        <button
          onClick={() => navigate('/bdm')}
          className="w-full bg-gradient-to-r from-bdm-gold-dark to-bdm-gold rounded-xl p-3 mb-4 flex items-center gap-3"
        >
          <Gem size={20} className="text-primary-foreground" />
          <span className="flex-1 text-left font-bold text-primary-foreground text-sm">Saiba Mais BDM</span>
          <ExternalLink size={16} className="text-primary-foreground/60" />
        </button>

        {/* Tabs */}
        <div className="flex gap-1 mb-4 border-b border-border">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 text-sm font-semibold text-center transition-colors border-b-2 ${
                activeTab === tab.key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'publicacoes' && (
          <div className="space-y-4 animate-fade-in-up">
            {userPosts.map(post => (
              <PostCard key={post.id} post={post} user={user} />
            ))}
          </div>
        )}

        {activeTab === 'anuncios' && (
          <div className="animate-fade-in-up">
            {userAds.length > 0 ? (
              <div className="space-y-3">
                {userAds.map(ad => (
                  <button
                    key={ad.id}
                    onClick={() => navigate(`/ad/${ad.id}`)}
                    className="w-full flex items-center gap-3 bg-card rounded-xl p-3 feed-card-shadow text-left"
                  >
                    <img src={ad.images[0]} alt={ad.title} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-0.5">
                        {ad.featured && <Star size={14} className="text-secondary" />}
                        <h4 className="font-semibold text-base truncate">{ad.title}</h4>
                      </div>
                      <p className="text-lg font-bold text-primary">{formatPrice(ad.price)}</p>
                      <p className="text-sm text-muted-foreground">{ad.city}, {ad.state}</p>
                    </div>
                    <ChevronRight size={20} className="text-muted-foreground flex-shrink-0" />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">Nenhum anúncio publicado</p>
            )}
          </div>
        )}

        {activeTab === 'sobre' && (
          <div className="animate-fade-in-up space-y-4">
            <div className="bg-card rounded-xl p-4 border border-border">
              <h4 className="font-bold text-sm mb-2">Bio</h4>
              <p className="text-muted-foreground text-sm">
                Membro ativo do Ecossistema Dakila. Interessado em produtos naturais, agronegócio e expansão do BDM.
              </p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <h4 className="font-bold text-sm mb-2">Informações</h4>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={14} /> {user.city}, {user.state}
                </p>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase size={14} /> Membro desde {new Date(user.joinedAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                </p>
                {user.bdmAccount && (
                  <p className="flex items-center gap-2 text-bdm-gold">
                    <Gem size={14} /> Correntista BDM — Nível {user.level}
                  </p>
                )}
              </div>
            </div>
            {userAds.length > 0 && (
              <div className="bg-card rounded-xl p-4 border border-border">
                <h4 className="font-bold text-sm mb-2">Ativos que comercializa</h4>
                <div className="flex flex-wrap gap-2">
                  {[...new Set(userAds.map(a => a.type))].map(type => (
                    <span key={type} className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <ChatModal
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        adTitle={chatContext}
        otherUser={user}
      />
      <ShareModal isOpen={showShare} onClose={() => setShowShare(false)} title={`Perfil de ${user.name}`} />
    </Layout>
  );
};

// Sub-component for user posts
const PostCard = ({ post, user }: { post: any; user: any }) => {
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);

  return (
    <>
      <div className="bg-card rounded-xl overflow-hidden feed-card-shadow">
        {/* Author header */}
        <div className="flex items-center gap-3 p-4 pb-2">
          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
          <div className="flex-1">
            <p className="font-semibold text-sm flex items-center gap-1">
              {user.name}
              {user.verified && <BadgeCheck size={16} className="text-verified" />}
            </p>
            <p className="text-xs text-muted-foreground">{post.createdAt}</p>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pb-2">
          <p className="text-sm leading-relaxed">{post.text}</p>
        </div>

        {post.image && (
          <img src={post.image} alt="" className="w-full h-52 object-cover" />
        )}

        {/* Counters */}
        <div className="px-4 py-2 flex items-center gap-4 text-sm text-muted-foreground">
          <span>{likeCount} curtidas</span>
          <span>{post.comments.length} comentários</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 border-t border-border mx-4 py-2">
          <button
            onClick={() => { setLiked(!liked); setLikeCount((p: number) => liked ? p - 1 : p + 1); }}
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

        {showComments && (
          <div className="px-4 pb-4">
            <CommentsSection comments={post.comments} />
          </div>
        )}
      </div>
      <ShareModal isOpen={showShare} onClose={() => setShowShare(false)} title={post.text.slice(0, 50)} />
    </>
  );
};

export default UserProfile;
