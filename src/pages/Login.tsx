import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Camera, CheckCircle2, Loader2, ArrowLeft, Shield } from 'lucide-react';

type LoginStep = 'camera' | 'scanning' | 'success' | 'bdm';

const Login = () => {
  const [step, setStep] = useState<LoginStep>('camera');
  const [bdmStatus, setBdmStatus] = useState<'idle' | 'creating' | 'done'>('idle');
  const navigate = useNavigate();
  const { login } = useAuth();

  const startValidation = () => {
    setStep('scanning');
    setTimeout(() => {
      setStep('success');
      setTimeout(() => setStep('bdm'), 1500);
    }, 2500);
  };

  const createBdmAccount = () => {
    setBdmStatus('creating');
    setTimeout(() => {
      setBdmStatus('done');
      setTimeout(() => {
        login();
        navigate('/feed', { replace: true });
      }, 1500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-foreground flex flex-col items-center justify-center px-4 relative">
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-primary-foreground/70 min-h-touch min-w-touch flex items-center gap-2"
      >
        <ArrowLeft size={24} />
      </button>

      {step !== 'bdm' && (
        <>
          <div className="text-center mb-8">
            <h2 className="text-heading text-primary-foreground font-bold">
              {step === 'success' ? 'Verificado!' : 'Validação Facial'}
            </h2>
            <p className="text-primary-foreground/60 mt-1">
              {step === 'success' ? 'Preparando sua conta...' : 'Posicione seu rosto no centro'}
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

          {step === 'camera' && (
            <button
              onClick={startValidation}
              className="w-full max-w-xs min-h-[56px] bg-primary text-primary-foreground font-bold text-lg rounded-xl hover:opacity-90 transition-opacity"
            >
              Iniciar Validação
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
              <p className="text-primary-foreground/50 mt-1">Configurando conta BDM...</p>
            </div>
          )}
        </>
      )}

      {/* BDM Account Step */}
      {step === 'bdm' && (
        <div className="text-center animate-fade-in-up max-w-sm">
          <Shield size={64} className={`mx-auto mb-4 ${bdmStatus === 'done' ? 'text-verified' : 'text-primary-foreground/60'}`} />
          <h2 className="text-heading text-primary-foreground font-bold mb-2">Conta BDM</h2>
          <p className="text-primary-foreground/60 mb-6">
            {bdmStatus === 'idle' && 'Para usar o Achei Bilu, é necessário vincular sua Conta BDM.'}
            {bdmStatus === 'creating' && 'Criando sua conta BDM...'}
            {bdmStatus === 'done' && 'Conta BDM ativa!'}
          </p>

          {bdmStatus === 'idle' && (
            <div className="space-y-3">
              <button
                onClick={createBdmAccount}
                className="w-full min-h-[56px] bg-primary text-primary-foreground font-bold text-lg rounded-xl hover:opacity-90 transition-opacity"
              >
                Criar Conta BDM
              </button>
              <button
                onClick={createBdmAccount}
                className="w-full min-h-[56px] border-2 border-primary-foreground/30 text-primary-foreground font-bold text-lg rounded-xl hover:border-primary-foreground/50 transition-colors"
              >
                Já tenho conta BDM
              </button>
            </div>
          )}

          {bdmStatus === 'creating' && (
            <Loader2 size={32} className="animate-spin text-primary-foreground/60 mx-auto" />
          )}

          {bdmStatus === 'done' && (
            <div className="animate-fade-in-up">
              <CheckCircle2 size={48} className="text-verified mx-auto mb-2" />
              <p className="text-xl font-bold text-verified">Conta BDM Ativa!</p>
              <p className="text-primary-foreground/50 mt-1">Entrando no Achei Bilu...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
