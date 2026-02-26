import { Heart, Share2, MessageCircle, MapPin, BadgeCheck, Star } from 'lucide-react';
import { Announcement, formatPrice } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const categoryStyles: Record<string, string> = {
  vehicles: 'category-vehicles',
  realestate: 'category-realestate',
  services: 'category-services',
};

const categoryLabels: Record<string, string> = {
  vehicles: 'Veículos',
  realestate: 'Imóveis',
  services: 'Serviços',
};

const FeedCard = ({ ad }: { ad: Announcement }) => {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(ad.saved || false);

  return (
    <article 
      className="bg-card rounded-xl overflow-hidden feed-card-shadow transition-shadow cursor-pointer"
      onClick={() => navigate(`/ad/${ad.id}`)}
    >
      {/* Image */}
      <div className="relative">
        <img
          src={ad.images[0]}
          alt={ad.title}
          className="w-full h-56 sm:h-64 object-cover"
          loading="lazy"
        />
        {ad.featured && (
          <span className="absolute top-3 left-3 badge-highlight px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <Star size={14} /> Destaque
          </span>
        )}
        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold ${categoryStyles[ad.category]}`}>
          {categoryLabels[ad.category]}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-foreground leading-tight mb-1">{ad.title}</h3>
        
        <p className="text-heading font-bold text-primary mb-2">
          {formatPrice(ad.price)}
        </p>

        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin size={16} />
          <span>{ad.city}, {ad.state}</span>
          <span className="mx-1">·</span>
          <span>{ad.type}</span>
        </div>

        {/* Author */}
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
          <img src={ad.author.avatar} alt={ad.author.name} className="w-9 h-9 rounded-full object-cover" />
          <span className="font-medium text-sm">{ad.author.name}</span>
          {ad.author.verified && <BadgeCheck size={18} className="text-verified" />}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button 
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg min-h-touch font-semibold text-base transition-opacity hover:opacity-90"
          >
            <MessageCircle size={20} /> Negociar
          </button>
          <button 
            onClick={() => setSaved(!saved)}
            className={`min-h-touch min-w-[50px] flex items-center justify-center rounded-lg border-2 transition-colors ${
              saved ? 'border-primary bg-accent text-primary' : 'border-border text-muted-foreground hover:border-primary'
            }`}
          >
            <Heart size={20} fill={saved ? 'currentColor' : 'none'} />
          </button>
          <button className="min-h-touch min-w-[50px] flex items-center justify-center rounded-lg border-2 border-border text-muted-foreground hover:border-primary transition-colors">
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default FeedCard;
