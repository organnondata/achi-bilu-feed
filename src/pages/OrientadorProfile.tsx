import { useParams, useNavigate } from 'react-router-dom';
import { orientadores, orientadorPosts } from '@/data/mockData';
import Layout from '@/components/Layout';
import OrientadorCard from '@/components/OrientadorCard';
import { ArrowLeft, BadgeCheck, Crown, MapPin, Briefcase } from 'lucide-react';

const OrientadorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const orientador = orientadores.find(o => o.id === id);
  const posts = orientadorPosts.filter(p => p.orientadorId === id);

  if (!orientador) return (
    <Layout>
      <div className="p-8 text-center text-muted-foreground">Orientador não encontrado</div>
    </Layout>
  );

  return (
    <Layout>
      <div className="pb-4">
        {/* Cover + back */}
        <div className="relative h-28 bg-gradient-to-r from-secondary/30 to-primary/20">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-foreground/50 text-primary-foreground min-h-touch min-w-[44px] rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={22} />
          </button>
        </div>

        <div className="px-4 -mt-12">
          {/* Avatar */}
          <img src={orientador.avatar} alt={orientador.name} className="w-24 h-24 rounded-full object-cover border-4 border-card mb-2" />

          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold">{orientador.name}</h2>
            <BadgeCheck size={20} className="text-secondary" />
          </div>

          <p className="text-sm font-semibold text-secondary flex items-center gap-1 mb-1">
            <Crown size={14} /> {orientador.role}
          </p>
          <p className="text-sm text-muted-foreground mb-3">{orientador.bio}</p>

          {/* Badge */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge-highlight px-3 py-1 rounded-full text-xs font-bold">Orientador Oficial</span>
          </div>

          {/* Social links */}
          <div className="flex gap-2 flex-wrap mb-6">
            {orientador.socialLinks.instagram && (
              <a href={orientador.socialLinks.instagram} className="min-h-touch px-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold flex items-center">
                Instagram
              </a>
            )}
            {orientador.socialLinks.tiktok && (
              <a href={orientador.socialLinks.tiktok} className="min-h-touch px-4 rounded-full bg-foreground text-background text-sm font-semibold flex items-center">
                TikTok
              </a>
            )}
            {orientador.socialLinks.youtube && (
              <a href={orientador.socialLinks.youtube} className="min-h-touch px-4 rounded-full bg-red-600 text-white text-sm font-semibold flex items-center">
                YouTube
              </a>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-card rounded-xl p-3 text-center border border-border">
              <p className="text-xl font-bold text-primary">{posts.length}</p>
              <p className="text-xs text-muted-foreground">Publicações</p>
            </div>
            <div className="bg-card rounded-xl p-3 text-center border border-border">
              <p className="text-xl font-bold text-secondary">{posts.reduce((sum, p) => sum + p.likes, 0)}</p>
              <p className="text-xs text-muted-foreground">Curtidas</p>
            </div>
          </div>

          {/* Posts */}
          <h3 className="font-bold text-lg mb-3">Conteúdos de {orientador.name}</h3>
          <div className="space-y-4">
            {posts.length > 0 ? (
              posts.map(post => <OrientadorCard key={post.id} post={post} />)
            ) : (
              <p className="text-muted-foreground text-center py-8">Nenhuma publicação ainda</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrientadorProfile;
