import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import NewsCard from '@/components/NewsCard';
import { newsPosts } from '@/data/mockData';
import { BadgeCheck, ExternalLink } from 'lucide-react';
import dakilaNewsIcon from '@/assets/dakila_news_icon.png';

const DakilaNewsProfile = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="pb-4">
        {/* Cover */}
        <div className="h-36 bg-gradient-to-r from-primary to-emerald-700 relative" />

        {/* Profile info */}
        <div className="px-4 -mt-14 relative z-10">
          <div className="w-24 h-24 rounded-full border-4 border-card bg-foreground flex items-center justify-center overflow-hidden mx-auto">
            <img src={dakilaNewsIcon} alt="Dakila News" className="w-full h-full object-contain p-2" />
          </div>

          <div className="text-center mt-3">
            <div className="flex items-center justify-center gap-1.5">
              <h1 className="text-2xl font-bold">Dakila News</h1>
              <BadgeCheck size={22} className="text-primary" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">Canal Oficial de Notícias do Ecossistema Dakila</p>
            <p className="text-sm text-muted-foreground">Pesquisas • Tecnologia • Comunidade</p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-4">
            <div className="text-center">
              <span className="font-bold text-lg">{newsPosts.length}</span>
              <p className="text-xs text-muted-foreground">Publicações</p>
            </div>
            <div className="text-center">
              <span className="font-bold text-lg">
                {newsPosts.reduce((sum, p) => sum + p.likes, 0)}
              </span>
              <p className="text-xs text-muted-foreground">Curtidas</p>
            </div>
            <div className="text-center">
              <span className="font-bold text-lg">
                {newsPosts.reduce((sum, p) => sum + p.comments.length, 0)}
              </span>
              <p className="text-xs text-muted-foreground">Comentários</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-4 justify-center">
            <button
              onClick={() => navigate('/bdm')}
              className="min-h-touch px-6 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center gap-2"
            >
              <ExternalLink size={16} /> Saber Mais
            </button>
            <button
              onClick={() => navigate('/radio')}
              className="min-h-touch px-6 rounded-full border-2 border-primary text-primary font-bold text-sm flex items-center gap-2"
            >
              🎙️ Rádio Top FM
            </button>
          </div>
        </div>

        {/* News feed */}
        <div className="px-4 mt-6 space-y-4">
          <h2 className="text-lg font-bold">Publicações</h2>
          {newsPosts.map(post => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default DakilaNewsProfile;
