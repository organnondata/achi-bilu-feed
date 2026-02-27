import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, getAnnouncementsByUser, formatPrice, pointsLevels } from '@/data/mockData';
import Layout from '@/components/Layout';
import { BadgeCheck, MapPin, MessageCircle, ChevronRight, Star, Gem, Handshake, ExternalLink, Briefcase, Shield } from 'lucide-react';
import ChatModal from '@/components/ChatModal';
import { useState } from 'react';

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);

  const user = getUserById(id || '');
  const userAds = getAnnouncementsByUser(id || '');
  const level = pointsLevels.find(l => l.name === user?.level) || pointsLevels[0];

  if (!user) return (
    <Layout>
      <div className="p-8 text-center text-muted-foreground">Usuário não encontrado</div>
    </Layout>
  );

  return (
    <Layout>
      <div className="px-4 pt-4 pb-4">
        {/* Profile header - LinkedIn style */}
        <div className="bg-card rounded-xl overflow-hidden feed-card-shadow mb-6">
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
                onClick={() => setShowChat(true)}
                className="flex-1 min-h-touch bg-primary text-primary-foreground rounded-lg font-semibold text-sm flex items-center justify-center gap-1.5"
              >
                <MessageCircle size={16} /> Mensagem
              </button>
              <button className="flex-1 min-h-touch bg-bdm-gold text-bdm-gold-foreground rounded-lg font-semibold text-sm flex items-center justify-center gap-1.5">
                <Handshake size={16} /> Negociar
              </button>
            </div>
          </div>
        </div>

        {/* Saiba Mais BDM */}
        <button
          onClick={() => navigate('/bdm')}
          className="w-full bg-gradient-to-r from-bdm-gold-dark to-bdm-gold rounded-xl p-3 mb-6 flex items-center gap-3"
        >
          <Gem size={20} className="text-primary-foreground" />
          <span className="flex-1 text-left font-bold text-primary-foreground text-sm">Saiba Mais BDM</span>
          <ExternalLink size={16} className="text-primary-foreground/60" />
        </button>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-card rounded-xl p-3 text-center border border-border">
            <p className="text-xl font-bold text-primary">{userAds.length}</p>
            <p className="text-xs text-muted-foreground">Anúncios</p>
          </div>
          <div className="bg-card rounded-xl p-3 text-center border border-border">
            <p className="text-xl font-bold text-bdm-gold">{user.points || 0}</p>
            <p className="text-xs text-muted-foreground">Pontos</p>
          </div>
          <div className="bg-card rounded-xl p-3 text-center border border-border">
            <p className="text-xl font-bold text-muted-foreground">—</p>
            <p className="text-xs text-muted-foreground">Avaliações</p>
          </div>
        </div>

        {/* User ads */}
        <h3 className="font-bold text-lg mb-3">Anúncios de {user.name}</h3>
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

      <ChatModal
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        adTitle={`Conversa com ${user.name}`}
        otherUser={user}
      />
    </Layout>
  );
};

export default UserProfile;
