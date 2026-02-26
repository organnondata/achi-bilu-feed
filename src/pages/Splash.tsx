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
    <div className="min-h-screen relative flex flex-col items-center justify-end">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 splash-gradient" />

      <div className="relative z-10 text-center px-6 pb-16 pt-20 w-full max-w-md animate-fade-in-up">
        <h1 className="text-display font-bold text-primary-foreground mb-2 leading-tight">
          Achei Bilu
        </h1>
        <p className="text-body-lg text-primary-foreground/80 mb-2 font-medium">
          BDM Marketplace
        </p>
        <p className="text-body text-primary-foreground/70 mb-10">
          Compre, venda e conecte-se com sua comunidade
        </p>

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
