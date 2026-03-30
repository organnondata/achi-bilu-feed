import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import heroImage from '@/assets/hero-splash.jpg';
import ecossistemaLogo from '@/assets/ecossistema_dakila_logo.png';

const Splash = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) navigate('/feed', { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen relative flex flex-col">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 splash-gradient" />

      {/* Institutional top bar */}
      <div className="relative z-10 pt-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-black text-primary-foreground tracking-[0.2em] uppercase drop-shadow-lg">
          Ecossistema Dakila
        </h2>
        <div className="w-24 h-1 bg-bdm-gold mx-auto mt-3 rounded-full shadow-lg" />
        <p className="text-primary-foreground/60 text-sm mt-2 tracking-widest uppercase">
          Comunidade · Expansão · Valores
        </p>
      </div>

      {/* Hero center */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 w-full max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-primary-foreground mb-2 leading-none">
          Bilu
        </h1>

        {/* BDM Section */}
        <div className="mt-6 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-bdm-gold flex items-center justify-center">
              <span className="text-bdm-gold-foreground font-bold text-lg">B</span>
            </div>
            <span className="text-2xl font-bold text-bdm-gold">BDM</span>
          </div>
          <p className="text-lg text-primary-foreground/80 font-medium">
            Bônus Dourado Mercantil
          </p>
        </div>

        <p className="text-base text-primary-foreground/50 mt-6">
          Marketplace e comunidade do Ecossistema Dakila
        </p>
      </div>

      {/* Buttons bottom */}
      <div className="relative z-10 px-6 pb-16 w-full max-w-md mx-auto animate-fade-in-up">
        <div className="space-y-3">
          <button
            onClick={() => navigate('/login')}
            className="w-full min-h-[56px] bg-secondary text-secondary-foreground font-bold text-lg rounded-xl hover:opacity-90 transition-opacity"
          >
            Entrar
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="w-full min-h-[56px] border-2 border-primary-foreground/40 text-primary-foreground font-bold text-lg rounded-xl hover:border-primary-foreground/60 transition-colors"
          >
            Cadastrar
          </button>
        </div>

        <p className="text-sm text-primary-foreground/50 mt-6 text-center">
          Acesso seguro com validação facial
        </p>
      </div>
    </div>
  );
};

export default Splash;
