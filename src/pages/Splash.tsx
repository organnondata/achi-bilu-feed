import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import heroImage from '@/assets/hero-splash.jpg';

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
      <div className="relative z-10 pt-10 text-center">
        <p className="text-[11px] text-primary-foreground/50 tracking-[0.3em] uppercase font-medium">
          Ecossistema Dakila
        </p>
      </div>

      {/* Hero center */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 w-full max-w-md mx-auto">
        <h1 className="text-5xl font-bold text-primary-foreground mb-3 leading-none">
          Bilu
        </h1>
        <p className="text-xl text-primary-foreground/85 mb-2 font-medium">
          Encontre Sabedoria aqui
        </p>
        <p className="text-base text-primary-foreground/60">
          Compre, venda e conecte-se com sua comunidade
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

        <p className="text-sm text-primary-foreground/50 mt-6">
          Acesso seguro com validação facial
        </p>
      </div>
    </div>
  );
};

export default Splash;
