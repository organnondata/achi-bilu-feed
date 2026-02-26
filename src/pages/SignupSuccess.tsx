import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle2, BadgeCheck, Shield } from 'lucide-react';

const SignupSuccess = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoToFeed = () => {
    login();
    navigate('/feed', { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-center animate-fade-in-up">
        <CheckCircle2 size={72} className="text-verified mx-auto mb-4" />

        <h1 className="text-heading font-bold mb-2">Conta Criada!</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Sua conta foi criada e sua identidade foi validada com sucesso.
        </p>

        <div className="flex flex-col items-center gap-2 mb-8">
          <span className="inline-flex items-center gap-1.5 badge-verified px-4 py-2 rounded-full text-base font-semibold">
            <BadgeCheck size={18} /> Verificado por reconhecimento facial
          </span>
          <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-4 py-2 rounded-full text-base font-semibold">
            <Shield size={18} /> Conta BDM Ativa
          </span>
        </div>

        <button
          onClick={handleGoToFeed}
          className="w-full min-h-[56px] bg-primary text-primary-foreground font-bold text-lg rounded-xl hover:opacity-90 transition-opacity"
        >
          Ir para o Feed
        </button>
      </div>
    </div>
  );
};

export default SignupSuccess;
