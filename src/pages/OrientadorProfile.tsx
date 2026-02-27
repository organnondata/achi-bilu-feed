import { useParams, useNavigate } from 'react-router-dom';
import { orientadores, orientadorPosts, pointsLevels } from '@/data/mockData';
import Layout from '@/components/Layout';
import { BadgeCheck, MapPin, MessageCircle, Crown, Star, Briefcase, Heart, MessageSquare, Share2, ExternalLink } from 'lucide-react';
import CommentsSection from '@/components/CommentsSection';
import ShareModal from '@/components/ShareModal';
import { useState } from 'react';

type ProfileTab = 'publicacoes' | 'sobre';

const OrientadorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ProfileTab>('publicacoes');
  const [showShare, setShowShare] = useState(false);

  const orientador = orientadores.find(o => o.id === id);
  const posts = orientadorPosts.filter(p => p.orientadorId === id);

  if (!orientador) return (
    <Layout>
      <div className="p-8 text-center text-muted-foreground">Orientador não encontrado</div>
    </Layout>
  );

  const tabs: { key: ProfileTab; label: string }[] = [
    { key: 'publicacoes', label: `Publicações (${posts.length})` },
    { key: 'sobre', label: 'Sobre' },
  ];

  return (
    <Layout>
      <div className="px-4 pt-4 pb-4">
        {/* Profile header — same layout as UserProfile */}
        <div className="bg-card rounded-xl overflow-hidden feed-card-shadow mb-4">
          <div className="h-24 bg-gradient-to-r from-primary to-primary/70" />
          <div className="px-4 pb-4 -mt-10">
            <img src={orientador.avatar} alt={orientador.name} className="w-24 h-24 rounded-full object-cover border-4 border-card mb-2" />
            <h2 className="text-xl font-bold flex items-center gap-2">
              {orientador.name}
              <BadgeCheck size={20} className="text-secondary" />
            </h2>
            <p className="text-sm font-semibold text-secondary flex items-center gap-1 mb-1">
              <Crown size={14} /> {orientador.role}
            </p>
            <p className="text-sm text-muted-foreground mb-3">{orientador.bio}</p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="inline-block badge-highlight px-3 py-1 rounded-full text-xs font-bold">
                Orientador Oficial
              </span>
            </div>

            {/* Social links as action buttons */}
            <div className="flex gap-2 flex-wrap">
              {orientador.socialLinks.instagram && (
                <a href={orientador.socialLinks.instagram} className="min-h-touch px-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold flex items-center gap-1.5">
                  Instagram
                </a>
              )}
              {orientador.socialLinks.tiktok && (
                <a href={orientador.socialLinks.tiktok} className="min-h-touch px-4 rounded-lg bg-foreground text-background text-sm font-semibold flex items-center gap-1.5">
                  TikTok
                </a>
              )}
              {orientador.socialLinks.youtube && (
                <a href={orientador.socialLinks.youtube} className="min-h-touch px-4 rounded-lg bg-red-600 text-white text-sm font-semibold flex items-center gap-1.5">
                  YouTube
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-card rounded-xl p-3 text-center border border-border">
            <p className="text-xl font-bold text-primary">{posts.length}</p>
            <p className="text-xs text-muted-foreground">Publicações</p>
          </div>
          <div className="bg-card rounded-xl p-3 text-center border border-border">
            <p className="text-xl font-bold text-secondary">{posts.reduce((sum, p) => sum + p.likes, 0)}</p>
            <p className="text-xs text-muted-foreground">Curtidas</p>
          </div>
        </div>

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
            {posts.length > 0 ? (
              posts.map(post => (
                <OrientadorPostCard key={post.id} post={post} orientador={orientador} />
              ))
            ) : (
              <p className="text-muted-foreground text-center py-8">Nenhuma publicação ainda</p>
            )}
          </div>
        )}

        {activeTab === 'sobre' && (
          <div className="animate-fade-in-up space-y-4">
            <div className="bg-card rounded-xl p-4 border border-border">
              <h4 className="font-bold text-sm mb-2">Bio</h4>
              <p className="text-muted-foreground text-sm">{orientador.bio}</p>
            </div>
            <div className="bg-card rounded-xl p-4 border border-border">
              <h4 className="font-bold text-sm mb-2">Função</h4>
              <p className="text-sm flex items-center gap-2 text-secondary font-semibold">
                <Crown size={14} /> {orientador.role}
              </p>
            </div>
            {(orientador.socialLinks.instagram || orientador.socialLinks.tiktok || orientador.socialLinks.youtube) && (
              <div className="bg-card rounded-xl p-4 border border-border">
                <h4 className="font-bold text-sm mb-2">Links Oficiais</h4>
                <div className="flex flex-wrap gap-2">
                  {orientador.socialLinks.instagram && (
                    <a href={orientador.socialLinks.instagram} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold">
                      <ExternalLink size={12} /> Instagram
                    </a>
                  )}
                  {orientador.socialLinks.tiktok && (
                    <a href={orientador.socialLinks.tiktok} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground text-background text-xs font-semibold">
                      <ExternalLink size={12} /> TikTok
                    </a>
                  )}
                  {orientador.socialLinks.youtube && (
                    <a href={orientador.socialLinks.youtube} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 text-white text-xs font-semibold">
                      <ExternalLink size={12} /> YouTube
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <ShareModal isOpen={showShare} onClose={() => setShowShare(false)} title={`Perfil de ${orientador.name}`} />
    </Layout>
  );
};

// Post card for orientador — same style as UserProfile PostCard but with "Conteúdo Oficial" badge
const OrientadorPostCard = ({ post, orientador }: { post: any; orientador: any }) => {
  const [liked, setLiked] = useState(post.liked || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [showShare, setShowShare] = useState(false);

  return (
    <>
      <div className="bg-card rounded-xl overflow-hidden feed-card-shadow">
        {/* Author header */}
        <div className="flex items-center gap-3 p-4 pb-2">
          <img src={orientador.avatar} alt={orientador.name} className="w-10 h-10 rounded-full object-cover" />
          <div className="flex-1">
            <p className="font-semibold text-sm flex items-center gap-1">
              {orientador.name}
              <BadgeCheck size={16} className="text-secondary" />
            </p>
            <p className="text-xs text-muted-foreground">{post.createdAt}</p>
          </div>
          <span className="badge-highlight px-2 py-0.5 rounded-full text-[10px] font-bold">Conteúdo Oficial</span>
        </div>

        {/* Content */}
        <div className="px-4 pb-2">
          {post.title && <h4 className="font-bold text-sm mb-1">{post.title}</h4>}
          <p className="text-sm leading-relaxed">{post.content}</p>
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
      <ShareModal isOpen={showShare} onClose={() => setShowShare(false)} title={post.title} />
    </>
  );
};

export default OrientadorProfile;
