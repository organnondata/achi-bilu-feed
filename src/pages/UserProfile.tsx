import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, getAnnouncementsByUser, formatPrice } from '@/data/mockData';
import Layout from '@/components/Layout';
import { BadgeCheck, MapPin, MessageCircle, ChevronRight, Star } from 'lucide-react';
import ChatModal from '@/components/ChatModal';
import { useState } from 'react';

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);

  const user = getUserById(id || '');
  const userAds = getAnnouncementsByUser(id || '');

  if (!user) return (
    <Layout>
      <div className="p-8 text-center text-muted-foreground">Usuário não encontrado</div>
    </Layout>
  );

  return (
    <Layout>
      <div className="px-4 pt-4 pb-4">
        {/* Profile header */}
        <div className="text-center mb-6">
          <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-4 border-primary/20" />
          <h2 className="text-heading font-bold flex items-center justify-center gap-2">
            {user.name}
            {user.verified && <BadgeCheck size={24} className="text-verified" />}
          </h2>
          <p className="text-muted-foreground flex items-center justify-center gap-1 mb-2">
            <MapPin size={16} /> {user.city}, {user.state}
          </p>
          {user.verified && (
            <span className="inline-block badge-verified px-4 py-1 rounded-full text-sm font-semibold">
              ✓ Verificado por reconhecimento facial
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-card rounded-xl p-4 text-center border border-border">
            <p className="text-heading font-bold text-primary">{userAds.length}</p>
            <p className="text-sm text-muted-foreground">Anúncios ativos</p>
          </div>
          <div className="bg-card rounded-xl p-4 text-center border border-border">
            <p className="text-heading font-bold text-muted-foreground">Em breve</p>
            <p className="text-sm text-muted-foreground">Avaliações</p>
          </div>
        </div>

        {/* Chat button */}
        <button
          onClick={() => setShowChat(true)}
          className="w-full min-h-[56px] bg-primary text-primary-foreground rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity mb-6"
        >
          <MessageCircle size={22} /> Conversar
        </button>

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
