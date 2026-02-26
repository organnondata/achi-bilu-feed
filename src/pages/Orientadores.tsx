import Layout from '@/components/Layout';
import { orientadores, orientadorPosts } from '@/data/mockData';
import OrientadorCard from '@/components/OrientadorCard';
import { BadgeCheck, Crown } from 'lucide-react';

const Orientadores = () => {
  return (
    <Layout>
      <div className="px-4 pt-4 pb-4">
        {/* Banner */}
        <div className="bg-gradient-to-r from-secondary/20 to-primary/10 border border-secondary/30 rounded-xl p-6 mb-6 text-center">
          <Crown size={36} className="text-secondary mx-auto mb-2" />
          <h1 className="text-heading font-bold mb-1">Orientadores Oficiais</h1>
          <p className="text-muted-foreground">Líderes e produtores de conteúdo do ecossistema BDM</p>
        </div>

        {/* Orientadores grid */}
        <div className="space-y-4 mb-8">
          {orientadores.map(o => (
            <div key={o.id} className="bg-card rounded-xl p-4 feed-card-shadow border border-secondary/10">
              <div className="flex items-center gap-4">
                <img src={o.avatar} alt={o.name} className="w-16 h-16 rounded-full object-cover border-2 border-secondary/30" />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className="font-bold text-lg">{o.name}</h3>
                    <BadgeCheck size={18} className="text-secondary" />
                  </div>
                  <p className="text-sm font-semibold text-secondary">{o.role}</p>
                  <p className="text-sm text-muted-foreground mt-1">{o.bio}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                {o.socialLinks.instagram && (
                  <a href={o.socialLinks.instagram} className="min-h-touch px-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold flex items-center">
                    Instagram
                  </a>
                )}
                {o.socialLinks.tiktok && (
                  <a href={o.socialLinks.tiktok} className="min-h-touch px-4 rounded-full bg-foreground text-background text-sm font-semibold flex items-center">
                    TikTok
                  </a>
                )}
                {o.socialLinks.youtube && (
                  <a href={o.socialLinks.youtube} className="min-h-touch px-4 rounded-full bg-red-600 text-white text-sm font-semibold flex items-center">
                    YouTube
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Posts */}
        <h2 className="text-xl font-bold mb-4">Conteúdos Recentes</h2>
        <div className="space-y-4">
          {orientadorPosts.map(post => (
            <OrientadorCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Orientadores;
