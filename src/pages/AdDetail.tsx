import { useParams, useNavigate } from 'react-router-dom';
import { announcements, formatPrice, formatDate } from '@/data/mockData';
import { ArrowLeft, MapPin, BadgeCheck, MessageCircle, Heart, Share2, Phone } from 'lucide-react';
import Layout from '@/components/Layout';

const AdDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ad = announcements.find(a => a.id === id);

  if (!ad) return (
    <Layout>
      <div className="p-8 text-center text-muted-foreground">Anúncio não encontrado</div>
    </Layout>
  );

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

          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <MapPin size={18} />
            <span>{ad.city}, {ad.state}</span>
            <span>·</span>
            <span>{ad.type}</span>
            <span>·</span>
            <span>{formatDate(ad.createdAt)}</span>
          </div>

          {/* Author */}
          <div className="flex items-center gap-3 p-4 bg-muted rounded-xl mb-4">
            <img src={ad.author.avatar} alt={ad.author.name} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <div className="flex items-center gap-1 font-semibold">
                {ad.author.name}
                {ad.author.verified && <BadgeCheck size={18} className="text-verified" />}
              </div>
              <p className="text-sm text-muted-foreground">{ad.author.city}, {ad.author.state}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-bold text-lg mb-2">Descrição</h3>
            <p className="text-muted-foreground leading-relaxed">{ad.description}</p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button className="w-full min-h-[56px] bg-primary text-primary-foreground rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <MessageCircle size={22} /> Negociar pelo Chat
            </button>
            <button className="w-full min-h-[56px] bg-verified text-primary-foreground rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <Phone size={22} /> Chamar no WhatsApp
            </button>
            <div className="flex gap-3">
              <button className="flex-1 min-h-touch border-2 border-border rounded-xl font-semibold flex items-center justify-center gap-2 hover:border-primary transition-colors">
                <Heart size={20} /> Salvar
              </button>
              <button className="flex-1 min-h-touch border-2 border-border rounded-xl font-semibold flex items-center justify-center gap-2 hover:border-primary transition-colors">
                <Share2 size={20} /> Compartilhar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdDetail;
