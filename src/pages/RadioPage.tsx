import Layout from '@/components/Layout';
import { Radio, Music, Clock, ExternalLink, Volume2 } from 'lucide-react';
import radioTopFm from '@/assets/radio_top_fm.png';

const schedule = [
  { time: '06:00 – 09:00', show: 'Bom Dia Campo Grande', host: 'Equipe TOP FM' },
  { time: '09:00 – 12:00', show: 'Manhã TOP', host: 'Programação Musical' },
  { time: '12:00 – 14:00', show: 'Hora do Almoço', host: 'Variedades e Música' },
  { time: '14:00 – 17:00', show: 'Tarde Especial', host: 'Hits e Entrevistas' },
  { time: '17:00 – 19:00', show: 'Drive Time', host: 'Notícias e Música' },
  { time: '19:00 – 22:00', show: 'Noite TOP', host: 'Programação Musical' },
  { time: '22:00 – 00:00', show: 'Corujão TOP', host: 'Música sem parar' },
];

const RadioPage = () => {
  return (
    <Layout>
      <div className="px-4 pt-4 pb-8">
        {/* Hero with image */}
        <div className="rounded-2xl overflow-hidden mb-6">
          <img src={radioTopFm} alt="Rádio TOP Campo Grande FM" className="w-full h-48 sm:h-56 object-cover" />
          <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-6 text-primary-foreground">
            <h1 className="text-2xl font-bold mb-1">TOP Campo Grande FM</h1>
            <p className="text-primary-foreground/80 text-base mb-4">Rádio oficial do Ecossistema Dakila</p>
            <p className="text-lg leading-relaxed mb-4">
              A TOP Campo Grande FM foi adquirida pelo Ecossistema Dakila para expandir a presença institucional e fortalecer a comunicação com a comunidade.
            </p>
            <button className="w-full min-h-[52px] bg-primary-foreground text-primary rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
              <Volume2 size={20} />
              Ouvir ao Vivo
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="bg-card rounded-2xl border border-border p-5 mb-4">
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Music size={20} className="text-primary" />
            Sobre a Rádio
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            A TOP Campo Grande FM é uma emissora de rádio sediada em Campo Grande, MS. 
            Agora parte do Ecossistema Dakila, a rádio traz programação diversificada com 
            música, notícias, entrevistas e conteúdos exclusivos da comunidade Dakila.
          </p>
        </div>

        {/* Schedule */}
        <div className="bg-card rounded-2xl border border-border p-5 mb-4">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Clock size={20} className="text-primary" />
            Programação
          </h2>
          <div className="space-y-3">
            {schedule.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/50">
                <span className="text-sm font-mono font-bold text-primary whitespace-nowrap min-w-[110px]">{item.time}</span>
                <div>
                  <p className="font-bold text-base">{item.show}</p>
                  <p className="text-sm text-muted-foreground">{item.host}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-muted/50 rounded-2xl border border-border p-5 text-center">
          <p className="text-muted-foreground mb-3">Acompanhe também nas redes sociais</p>
          <button className="min-h-[52px] px-8 bg-primary text-primary-foreground rounded-xl font-bold text-base flex items-center justify-center gap-2 mx-auto hover:opacity-90 transition-opacity">
            <ExternalLink size={18} />
            Visitar site da rádio
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default RadioPage;
