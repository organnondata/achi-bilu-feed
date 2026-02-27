import Layout from '@/components/Layout';
import OrientadoresStories from '@/components/OrientadoresStories';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Crown, ExternalLink, ShoppingBag, Leaf, Gem, Sparkles } from 'lucide-react';

interface AtivoItem {
  id: string;
  name: string;
  description: string;
  image: string;
  type: 'produto' | 'servico' | 'ativo-bdm';
  price?: string;
  badge: string;
}

const ativos: AtivoItem[] = [
  {
    id: 'at1', name: 'Kit Cosméticos Dakila Premium',
    description: 'Linha completa de cosméticos naturais com ingredientes exclusivos do Ecossistema Dakila.',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=600&fit=crop',
    type: 'produto', price: 'R$ 189,00', badge: 'Ativo Oficial Dakila',
  },
  {
    id: 'at2', name: 'Chá de Moringa Orgânico - 200g',
    description: 'Chá de moringa oleifera 100% natural. Produção artesanal com secagem controlada.',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&h=600&fit=crop',
    type: 'produto', price: 'R$ 45,00', badge: 'Ativo Oficial Dakila',
  },
  {
    id: 'at3', name: 'Conta Corrente BDM',
    description: 'Abra sua conta corrente BDM e participe do ecossistema de moeda complementar.',
    image: 'https://images.unsplash.com/photo-1553729459-afe8f2e2ed08?w=800&h=600&fit=crop',
    type: 'ativo-bdm', badge: 'Ativo BDM',
  },
  {
    id: 'at4', name: 'Kit Pedras Energéticas - 7 Chakras',
    description: 'Conjunto com 7 pedras naturais para alinhamento energético e bem-estar.',
    image: 'https://images.unsplash.com/photo-1603344204980-4edb0ea63148?w=800&h=600&fit=crop',
    type: 'produto', price: 'R$ 120,00', badge: 'Ativo Oficial Dakila',
  },
  {
    id: 'at5', name: 'Consultoria de Expansão BDM',
    description: 'Serviço de consultoria para expansão comercial dentro do ecossistema BDM.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    type: 'servico', badge: 'Serviço Oficial',
  },
  {
    id: 'at6', name: 'Creme Facial Anti-idade Dakila',
    description: 'Creme facial premium com ingredientes naturais exclusivos da linha Dakila.',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?w=800&h=600&fit=crop',
    type: 'produto', price: 'R$ 79,00', badge: 'Ativo Oficial Dakila',
  },
  {
    id: 'at7', name: 'Óleo Essencial de Lavanda',
    description: 'Óleo essencial puro de lavanda. Produção artesanal Dakila. Frasco 30ml.',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=600&fit=crop',
    type: 'produto', price: 'R$ 35,00', badge: 'Ativo Oficial Dakila',
  },
  {
    id: 'at8', name: 'Carteira Digital BDM',
    description: 'Gerencie seus ativos BDM, transações e saldo diretamente pelo aplicativo.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    type: 'ativo-bdm', badge: 'Ativo BDM',
  },
];

const typeIcons = {
  'produto': ShoppingBag,
  'servico': Sparkles,
  'ativo-bdm': Gem,
};

const AtivosDakila = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="px-4 pt-4 pb-4">
        {/* Stories */}
        <OrientadoresStories />

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Crown size={24} className="text-bdm-gold" />
            <h2 className="text-heading font-bold">Ativos Dakila</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Produtos e serviços oficiais do Ecossistema Dakila e ativos BDM.
          </p>
        </div>

        {/* Saiba Mais BDM Banner */}
        <button
          onClick={() => navigate('/bdm')}
          className="w-full bg-gradient-to-r from-bdm-gold-dark to-bdm-gold rounded-xl p-4 mb-6 flex items-center gap-3 text-left"
        >
          <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
            <Gem size={24} className="text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-primary-foreground text-lg">Saiba Mais sobre o BDM</h3>
            <p className="text-primary-foreground/70 text-sm">Bônus Dourado Mercantil · Conheça os benefícios</p>
          </div>
          <ExternalLink size={20} className="text-primary-foreground/60" />
        </button>

        {/* Feed de Ativos */}
        <div className="space-y-4">
          {ativos.map((ativo) => {
            const Icon = typeIcons[ativo.type];
            return (
              <article
                key={ativo.id}
                className="bg-card rounded-xl overflow-hidden feed-card-shadow border border-bdm-gold/20"
              >
                <img src={ativo.image} alt={ativo.name} className="w-full h-44 object-cover" />
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge-ativo-dakila text-xs px-2.5 py-1 rounded-full font-bold inline-flex items-center gap-1">
                      <Leaf size={12} /> {ativo.badge}
                    </span>
                    {ativo.type === 'ativo-bdm' && (
                      <span className="badge-bdm text-xs px-2.5 py-1 rounded-full font-bold inline-flex items-center gap-1">
                        <Gem size={12} /> BDM
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold mb-1">{ativo.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{ativo.description}</p>
                  <div className="flex items-center justify-between">
                    {ativo.price ? (
                      <span className="text-lg font-bold text-primary">{ativo.price}</span>
                    ) : (
                      <span className="text-sm text-bdm-gold font-semibold">Consultar</span>
                    )}
                    <button className="min-h-touch px-5 rounded-full bg-bdm-gold text-bdm-gold-foreground font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-1.5">
                      <Icon size={16} />
                      {ativo.type === 'ativo-bdm' ? 'Saiba Mais' : 'Ver Detalhes'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AtivosDakila;
