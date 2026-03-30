import { useState } from 'react';
import { Newspaper, X, ChevronRight, MapPin, Radio, Building2 } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  icon: 'zigurats' | 'research' | 'radio';
  image?: string;
}

const newsItems: NewsItem[] = [
  {
    id: 'n1',
    title: 'Zigurats – Centro de Treinamento',
    description: 'Centro de treinamento para mais de 21 países. Estrutura de pesquisa e desenvolvimento reconhecida internacionalmente pela comunidade Dakila.',
    icon: 'zigurats',
  },
  {
    id: 'n2',
    title: 'Pesquisas Dakila News – Fendas em Corguinhos',
    description: 'Nos últimos dias foram encontradas fendas em Corguinhos durante trabalhos de pesquisa na região.',
    icon: 'research',
  },
  {
    id: 'n3',
    title: 'Sistema Dakila Raio Diamante e TOP CAMPO GRANDE FM',
    description: 'O ecossistema Dakila lançou o Sistema Raio Diamante e adquiriu a rádio TOP Campo Grande FM, expandindo a presença institucional.',
    icon: 'radio',
  },
];

const iconMap = {
  zigurats: Building2,
  research: MapPin,
  radio: Radio,
};

const LatestNewsBanner = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full mb-4 bg-gradient-to-r from-primary/10 via-primary/5 to-accent rounded-xl border border-primary/20 p-4 flex items-center gap-3 hover:border-primary/40 transition-all group"
      >
        <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/25 transition-colors">
          <Newspaper size={22} className="text-primary" />
        </div>
        <div className="flex-1 text-left">
          <h3 className="text-lg font-bold text-foreground">Últimas Notícias</h3>
          <p className="text-sm text-muted-foreground">3 novidades do Ecossistema Dakila</p>
        </div>
        <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] bg-foreground/60 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="bg-card rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-2">
                <Newspaper size={20} className="text-primary" />
                <h2 className="text-xl font-bold">Últimas Notícias</h2>
              </div>
              <button onClick={() => setOpen(false)} className="min-h-touch min-w-[44px] flex items-center justify-center text-muted-foreground hover:text-foreground">
                <X size={22} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {newsItems.map(item => {
                const Icon = iconMap[item.icon];
                return (
                  <div key={item.id} className="bg-muted/50 rounded-xl p-4 border border-border">
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-base text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                    {/* Placeholder for future image */}
                    <div className="mt-3 w-full h-40 rounded-lg bg-muted border-2 border-dashed border-border flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">📷 Imagem será inserida pelo cliente</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LatestNewsBanner;
