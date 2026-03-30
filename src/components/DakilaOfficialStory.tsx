import { useState } from 'react';
import { BadgeCheck, X, ChevronLeft, ChevronRight, Building2, MapPin, Radio } from 'lucide-react';

const newsSlides = [
  {
    id: 's1',
    title: 'Zigurats – Centro de Treinamento',
    text: 'Centro de treinamento para mais de 21 países. Estrutura de pesquisa e desenvolvimento reconhecida internacionalmente.',
    bgClass: 'from-primary to-primary/80',
    Icon: Building2,
  },
  {
    id: 's2',
    title: 'Fendas em Corguinhos',
    text: 'Nos últimos dias foram encontradas fendas em Corguinhos durante trabalhos de pesquisa na região.',
    bgClass: 'from-emerald-700 to-emerald-900',
    Icon: MapPin,
  },
  {
    id: 's3',
    title: 'Raio Diamante & TOP FM',
    text: 'O ecossistema Dakila lançou o Sistema Raio Diamante e adquiriu a rádio TOP Campo Grande FM.',
    bgClass: 'from-amber-700 to-amber-900',
    Icon: Radio,
  },
];

const SEEN_KEY = 'bilu_dakila_story_seen';

const DakilaOfficialStory = () => {
  const [open, setOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [seen, setSeen] = useState(() => localStorage.getItem(SEEN_KEY) === 'true');

  const handleOpen = () => {
    setOpen(true);
    setCurrentSlide(0);
    setSeen(true);
    localStorage.setItem(SEEN_KEY, 'true');
  };

  const goNext = () => {
    if (currentSlide < newsSlides.length - 1) setCurrentSlide(prev => prev + 1);
    else setOpen(false);
  };

  const goPrev = () => {
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  };

  const slide = newsSlides[currentSlide];

  return (
    <>
      {/* Story bubble */}
      <button onClick={handleOpen} className="flex flex-col items-center gap-1.5 min-w-[80px] group">
        <div className="relative">
          <div className={`w-[68px] h-[68px] rounded-full p-[3px] ${
            seen ? 'bg-muted' : 'bg-gradient-to-br from-amber-500 via-primary to-emerald-500'
          }`}>
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-card bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">D</span>
            </div>
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 bg-amber-500 rounded-full p-0.5">
            <BadgeCheck size={14} className="text-white" />
          </div>
        </div>
        <span className="text-xs font-semibold text-center leading-tight group-hover:text-primary transition-colors">
          Dakila News
        </span>
      </button>

      {/* Story viewer */}
      {open && (
        <div className="fixed inset-0 z-[100] bg-foreground/95 flex items-center justify-center">
          <div className="relative w-full max-w-md h-full max-h-[90vh] rounded-2xl overflow-hidden flex flex-col">
            {/* Progress bars */}
            <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-3">
              {newsSlides.map((_, i) => (
                <div key={i} className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{ width: i < currentSlide ? '100%' : i === currentSlide ? '100%' : '0%' }}
                  />
                </div>
              ))}
            </div>

            {/* Header */}
            <div className="absolute top-6 left-0 right-0 z-10 flex items-center gap-3 px-4">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center border-2 border-white/50">
                <span className="text-primary-foreground font-bold text-sm">D</span>
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-sm">Dakila Pesquisas – Notícias</p>
                <p className="text-white/60 text-xs">Conta Oficial</p>
              </div>
              <button onClick={() => setOpen(false)} className="min-h-touch min-w-[44px] flex items-center justify-center text-white/80 hover:text-white">
                <X size={24} />
              </button>
            </div>

            {/* Slide content */}
            <div className={`flex-1 bg-gradient-to-b ${slide.bgClass} flex flex-col items-center justify-center p-8 text-center`}>
              {/* Placeholder image area */}
              <div className="w-48 h-48 rounded-2xl bg-white/10 border-2 border-dashed border-white/30 flex flex-col items-center justify-center mb-6">
                <slide.Icon size={48} className="text-white/60 mb-2" />
                <span className="text-white/50 text-xs">Imagem em breve</span>
              </div>
              <h3 className="text-white font-bold text-2xl mb-3 leading-tight">{slide.title}</h3>
              <p className="text-white/80 text-lg leading-relaxed">{slide.text}</p>
            </div>

            {/* Touch navigation */}
            <button onClick={goPrev} className="absolute left-0 top-20 bottom-20 w-1/3 z-10" aria-label="Anterior" />
            <button onClick={goNext} className="absolute right-0 top-20 bottom-20 w-1/3 z-10" aria-label="Próximo" />

            {/* Desktop arrows */}
            <button onClick={goPrev} className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/30 items-center justify-center text-white hover:bg-black/50">
              <ChevronLeft size={20} />
            </button>
            <button onClick={goNext} className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/30 items-center justify-center text-white hover:bg-black/50">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DakilaOfficialStory;
