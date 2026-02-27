import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { announcements, formatPrice, pointsLevels } from '@/data/mockData';
import { BadgeCheck, Settings, LogOut, ChevronRight, Crown, MapPin, Link as LinkIcon, Star, Shield, Gem, MessageCircle, Handshake, ExternalLink, Briefcase } from 'lucide-react';
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
        {/* Profile header - LinkedIn style */}
        <div className="bg-card rounded-xl overflow-hidden feed-card-shadow mb-6">
          {/* Cover */}
          <div className="h-24 bg-gradient-to-r from-primary to-primary/70" />
          <div className="px-4 pb-4 -mt-10">
            <img src={user?.avatar} alt={user?.name} className="w-20 h-20 rounded-full object-cover border-4 border-card mb-2" />
            <h2 className="text-xl font-bold flex items-center gap-2">
              {user?.name}
              {user?.verified && <BadgeCheck size={20} className="text-verified" />}
            </h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
              <Briefcase size={14} /> Empreendedor · Agronegócio
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
              <MapPin size={14} /> {user?.city}, {user?.state}
            </p>
            <p className="text-sm text-muted-foreground italic mb-3">
              "Fortalecendo o ecossistema através do comércio colaborativo."
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {user?.verified && (
                <span className="inline-block badge-verified px-3 py-1 rounded-full text-xs font-semibold">
                  ✓ Verificado
                </span>
              )}
              {user?.bdmAccount && (
                <span className="inline-flex items-center gap-1 badge-bdm px-3 py-1 rounded-full text-xs font-bold">
                  <Gem size={12} /> Correntista BDM
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold" style={{ background: `${level.color}20`, color: level.color }}>
                <Star size={12} fill="currentColor" /> Nível {user?.level}
              </span>
            </div>

            {/* BDM Level */}
            {user?.bdmAccount && (
              <div className="bg-bdm-gold/10 rounded-lg px-3 py-2 flex items-center gap-2 mb-3 border border-bdm-gold/20">
                <Gem size={16} className="text-bdm-gold" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-bdm-gold">Nível BDM: {user?.level}</p>
                  <p className="text-xs text-muted-foreground">{user?.points} pontos acumulados</p>
                </div>
              </div>
            )}

            {/* Assets list */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">Comercializa:</p>
              <div className="flex flex-wrap gap-1">
                {['Cosméticos Dakila', 'Chás de Moringa', 'Consultoria'].map(item => (
                  <span key={item} className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{item}</span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button className="flex-1 min-h-touch bg-primary text-primary-foreground rounded-lg font-semibold text-sm flex items-center justify-center gap-1.5">
                <MessageCircle size={16} /> Mensagem
              </button>
              <button className="flex-1 min-h-touch bg-bdm-gold text-bdm-gold-foreground rounded-lg font-semibold text-sm flex items-center justify-center gap-1.5">
                <Handshake size={16} /> Negociar
              </button>
            </div>
          </div>
        </div>

        {/* Saiba mais BDM */}
        <button
          onClick={() => navigate('/bdm')}
          className="w-full bg-gradient-to-r from-bdm-gold-dark to-bdm-gold rounded-xl p-3 mb-6 flex items-center gap-3"
        >
          <Gem size={20} className="text-primary-foreground" />
          <span className="flex-1 text-left font-bold text-primary-foreground text-sm">Saiba Mais BDM</span>
          <ExternalLink size={16} className="text-primary-foreground/60" />
        </button>

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
          <button onClick={() => navigate('/ativos')} className="w-full flex items-center gap-3 min-h-touch px-4 rounded-xl hover:bg-muted transition-colors">
            <Crown size={20} className="text-bdm-gold" />
            <span className="flex-1 text-left font-medium">Ativos Dakila</span>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
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
