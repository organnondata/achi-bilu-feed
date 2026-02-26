import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Camera, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';

type FaceStep = 'ready' | 'scanning' | 'success';

const SignupFace = () => {
  const [step, setStep] = useState<FaceStep>('ready');
  const navigate = useNavigate();
  const { isAuthenticated, isFaceVerified, setFaceVerified } = useAuth();

  // If already fully verified, go to feed
  if (isAuthenticated && isFaceVerified) {
    navigate('/feed', { replace: true });
    return null;
  }

  const startValidation = () => {
    setStep('scanning');
    setTimeout(() => {
      setStep('success');
      setFaceVerified(true);
      setTimeout(() => navigate('/signup/success', { replace: true }), 1500);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-foreground flex flex-col items-center justify-center px-4 relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-primary-foreground/70 min-h-touch min-w-touch flex items-center gap-2"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="text-center mb-8">
        <h2 className="text-heading text-primary-foreground font-bold">
          {step === 'success' ? 'Identidade Validada!' : 'Validação Facial'}
        </h2>
        <p className="text-primary-foreground/60 mt-1 text-lg">
          {step === 'success'
            ? 'Seu rosto foi verificado com sucesso'
            : 'Valide sua identidade para acessar a comunidade.'}
        </p>
      </div>

      <div className="relative w-64 h-64 sm:w-72 sm:h-72 mb-8">
        <div className={`absolute inset-4 rounded-full border-4 ${
          step === 'success' ? 'border-verified' : 'border-primary-foreground/40'
        } transition-colors duration-500`} />

        {step === 'scanning' && (
          <>
            <div className="absolute inset-4 rounded-full animate-pulse-ring border-2 border-secondary" />
            <div className="absolute left-4 right-4 h-0.5 bg-secondary animate-scan-line rounded-full" />
          </>
        )}

        <div className="absolute inset-0 flex items-center justify-center">
          {step === 'success' ? (
            <CheckCircle2 size={64} className="text-verified animate-fade-in-up" />
          ) : (
            <Camera size={48} className="text-primary-foreground/30" />
          )}
        </div>

        {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-8 h-8`}>
            <div className={`absolute ${pos.includes('top') ? 'top-0' : 'bottom-0'} ${pos.includes('left') ? 'left-0' : 'right-0'} w-8 h-1 bg-primary-foreground/50 ${pos.includes('right') ? 'rounded-r' : 'rounded-l'}`} />
            <div className={`absolute ${pos.includes('top') ? 'top-0' : 'bottom-0'} ${pos.includes('left') ? 'left-0' : 'right-0'} w-1 h-8 bg-primary-foreground/50 ${pos.includes('bottom') ? 'rounded-b' : 'rounded-t'}`} />
          </div>
        ))}
      </div>

      {step === 'ready' && (
        <button
          onClick={startValidation}
          className="w-full max-w-xs min-h-[56px] bg-primary text-primary-foreground font-bold text-lg rounded-xl hover:opacity-90 transition-opacity"
        >
          Validar Identidade
        </button>
      )}

      {step === 'scanning' && (
        <div className="flex items-center gap-3 text-primary-foreground/70">
          <Loader2 size={24} className="animate-spin" />
          <span className="text-lg font-medium">Analisando...</span>
        </div>
      )}

      {step === 'success' && (
        <div className="text-center animate-fade-in-up">
          <p className="text-xl font-bold text-verified">Verificado com sucesso!</p>
          <p className="text-primary-foreground/50 mt-1">Criando sua conta...</p>
        </div>
      )}
    </div>
  );
};

export default SignupFace;
