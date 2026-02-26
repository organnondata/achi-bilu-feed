import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { announcements, formatPrice, pointsLevels } from '@/data/mockData';
import { BadgeCheck, Settings, LogOut, ChevronRight, Crown, MapPin, Link as LinkIcon, Star, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const myAds = announcements.filter(a => a.author.id === user?.id);
  const level = pointsLevels.find(l => l.name === user?.level) || pointsLevels[0];

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return (
    <Layout>
      <div className="px-4 pt-4 pb-4">
        {/* Profile header */}
        <div className="text-center mb-6">
          <img src={user?.avatar} alt={user?.name} className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-primary/20" />
          <h2 className="text-heading font-bold flex items-center justify-center gap-2">
            {user?.name}
            {user?.verified && <BadgeCheck size={24} className="text-verified" />}
          </h2>
          <p className="text-muted-foreground flex items-center justify-center gap-1">
            <MapPin size={16} /> {user?.city}, {user?.state}
          </p>

          {/* Level badge */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold" style={{ background: `${level.color}20`, color: level.color }}>
              <Star size={14} fill="currentColor" /> Nível {user?.level} · {user?.points} pts
            </span>
          </div>

          {/* Verification badges */}
          <div className="flex items-center justify-center gap-2 mt-2 flex-wrap">
            {user?.verified && (
              <span className="inline-block badge-verified px-4 py-1 rounded-full text-sm font-semibold">
                ✓ Verificado por reconhecimento facial
              </span>
            )}
            {user?.bdmAccount && (
              <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold">
                <Shield size={14} /> Conta BDM Ativa
              </span>
            )}
          </div>
        </div>

        {/* Plan */}
        <div className="bg-accent rounded-xl p-4 mb-6 border border-primary/20">
          <div className="flex items-center gap-2 mb-1">
            <Crown size={20} className="text-secondary" />
            <span className="font-bold">Plano Gratuito</span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">1 anúncio gratuito ativo</p>
          <button className="w-full min-h-touch bg-secondary text-secondary-foreground rounded-lg font-semibold text-base hover:opacity-90 transition-opacity">
            Plano Profissional · R$ 69/mês
          </button>
        </div>

        {/* My ads */}
        <h3 className="font-bold text-lg mb-3">Meus Anúncios ({myAds.length})</h3>
        {myAds.length > 0 ? (
          <div className="space-y-3 mb-6">
            {myAds.map(ad => (
              <button
                key={ad.id}
                onClick={() => navigate(`/ad/${ad.id}`)}
                className="w-full flex items-center gap-3 bg-card rounded-xl p-3 feed-card-shadow text-left"
              >
                <img src={ad.images[0]} alt={ad.title} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold truncate">{ad.title}</h4>
                  <p className="text-primary font-bold">{formatPrice(ad.price)}</p>
                </div>
                <ChevronRight size={20} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground mb-6">Nenhum anúncio publicado ainda</p>
        )}

        {/* Menu */}
        <div className="space-y-2">
          <button onClick={() => navigate('/orientadores')} className="w-full flex items-center gap-3 min-h-touch px-4 rounded-xl hover:bg-muted transition-colors">
            <Crown size={20} className="text-secondary" />
            <span className="flex-1 text-left font-medium">Orientadores</span>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
          <button onClick={() => navigate('/links')} className="w-full flex items-center gap-3 min-h-touch px-4 rounded-xl hover:bg-muted transition-colors">
            <LinkIcon size={20} className="text-muted-foreground" />
            <span className="flex-1 text-left font-medium">Links Úteis</span>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
          <button onClick={() => navigate('/admin')} className="w-full flex items-center gap-3 min-h-touch px-4 rounded-xl hover:bg-muted transition-colors">
            <Settings size={20} className="text-muted-foreground" />
            <span className="flex-1 text-left font-medium">Painel Admin</span>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 min-h-touch px-4 rounded-xl hover:bg-destructive/10 transition-colors text-destructive">
            <LogOut size={20} />
            <span className="flex-1 text-left font-medium">Sair</span>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
