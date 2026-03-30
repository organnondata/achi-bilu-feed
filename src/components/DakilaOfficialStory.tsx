import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BadgeCheck, X, ChevronLeft, ChevronRight } from 'lucide-react';
import dakilaNewsIcon from '@/assets/dakila_news_icon.png';
import corguinhos from '@/assets/corguinhos.avif';
import zigurats from '@/assets/zigurats.jpg';
import amazonPesquisa from '@/assets/amazon_pesquisa.avif';

const newsSlides = [
  {
    id: 's1',
    title: 'Fendas em Corguínhos',
    text: 'Durante trabalhos de pesquisa na região de Corguínhos, foram descobertas novas fendas e cavernas.',
    bgClass: 'from-emerald-700 to-emerald-900',
    image: corguinhos,
  },
  {
    id: 's2',
    title: 'Centro de treinamento para catástrofes naturais',
    text: 'O centro de treinamento do Zigurats atende mais de 21 países na preparação para desastres.',
    bgClass: 'from-primary to-primary/80',
    image: zigurats,
  },
  {
    id: 's3',
    title: 'Novas aquisições Dakila',
    text: 'Dakila lança o Sistema Raio Diamante e apresenta sua nova emissora de rádio, a Top Campo Grande FM.',
    bgClass: 'from-amber-700 to-amber-900',
    image: amazonPesquisa,
  },
];

const SEEN_KEY = 'bilu_dakila_story_seen';

const DakilaOfficialStory = () => {
  const navigate = useNavigate();
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
      {/* Story bubble with founder photo */}
      <button onClick={handleOpen} className="flex flex-col items-center gap-1.5 min-w-[80px] group">
        <div className="relative">
          <div className={`w-[68px] h-[68px] rounded-full p-[3px] ${
            seen ? 'bg-muted' : 'bg-gradient-to-br from-amber-500 via-primary to-emerald-500'
          }`}>
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-card bg-foreground flex items-center justify-center">
              <img src={dakilaNewsIcon} alt="Dakila News" className="w-full h-full object-contain p-1" />
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
                    style={{ width: i <= currentSlide ? '100%' : '0%' }}
                  />
                </div>
              ))}
            </div>

            {/* Header */}
            <div className="absolute top-6 left-0 right-0 z-10 flex items-center gap-3 px-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/50">
                <img src={dakilaNewsIcon} alt="Dakila" className="w-full h-full object-contain p-1" />
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-sm">Dakila Pesquisas – Notícias</p>
                <p className="text-white/60 text-xs">Conta Oficial</p>
              </div>
              <button onClick={() => setOpen(false)} className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white/80 hover:text-white">
                <X size={24} />
              </button>
            </div>

            {/* Slide content with real image */}
            <div className="flex-1 relative flex flex-col">
              <img src={slide.image} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
              <div className="relative flex-1 flex flex-col items-center justify-end p-8 pb-12 text-center">
                <h3 className="text-white font-bold text-2xl mb-3 leading-tight drop-shadow-lg">{slide.title}</h3>
                <p className="text-white/90 text-lg leading-relaxed drop-shadow-md">{slide.text}</p>
              </div>
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
