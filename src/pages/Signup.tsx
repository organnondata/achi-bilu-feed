import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';

const signupSchema = z.object({
  name: z.string().trim().min(3, 'Nome deve ter pelo menos 3 caracteres').max(100, 'Nome muito longo'),
  email: z.string().trim().email('E-mail inválido').max(255, 'E-mail muito longo'),
  phone: z.string().trim().min(10, 'Telefone inválido').max(20, 'Telefone muito longo'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres').max(50, 'Senha muito longa'),
  terms: z.literal(true, { errorMap: () => ({ message: 'Você deve aceitar os termos' }) }),
});

type FormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
  terms: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', password: '', terms: false });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = () => {
    const result = signupSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof FormData;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    login(); // Set authenticated before face validation
    navigate('/signup/face');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 flex items-center gap-3 feed-card-shadow">
        <button onClick={() => navigate('/')} className="min-h-touch min-w-touch flex items-center">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-primary">Criar Conta</h1>
      </header>

      <div className="flex-1 px-4 py-8 max-w-md mx-auto w-full">
        <h2 className="text-[28px] font-bold mb-1">Criar sua conta</h2>
        <p className="text-muted-foreground text-base mb-8">Acesso seguro com validação facial</p>

        <div className="space-y-5">
          {/* Nome */}
          <div>
            <label className="block text-base font-semibold mb-1.5">Nome completo</label>
            <input
              type="text"
              value={form.name}
              onChange={e => handleChange('name', e.target.value)}
              placeholder="Seu nome completo"
              className={`w-full min-h-[52px] bg-muted rounded-xl px-4 text-base outline-none focus:ring-2 focus:ring-primary/30 ${errors.name ? 'ring-2 ring-destructive/50' : ''}`}
            />
            {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-base font-semibold mb-1.5">E-mail</label>
            <input
              type="email"
              value={form.email}
              onChange={e => handleChange('email', e.target.value)}
              placeholder="seu@email.com"
              className={`w-full min-h-[52px] bg-muted rounded-xl px-4 text-base outline-none focus:ring-2 focus:ring-primary/30 ${errors.email ? 'ring-2 ring-destructive/50' : ''}`}
            />
            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
          </div>

          {/* Telefone */}
          <div>
            <label className="block text-base font-semibold mb-1.5">Telefone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={e => handleChange('phone', e.target.value)}
              placeholder="(34) 99999-0000"
              className={`w-full min-h-[52px] bg-muted rounded-xl px-4 text-base outline-none focus:ring-2 focus:ring-primary/30 ${errors.phone ? 'ring-2 ring-destructive/50' : ''}`}
            />
            {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
          </div>

          {/* Senha */}
          <div>
            <label className="block text-base font-semibold mb-1.5">Criar senha</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={e => handleChange('password', e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className={`w-full min-h-[52px] bg-muted rounded-xl px-4 pr-12 text-base outline-none focus:ring-2 focus:ring-primary/30 ${errors.password ? 'ring-2 ring-destructive/50' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-destructive mt-1">{errors.password}</p>}
          </div>

          {/* Termos */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.terms}
                onChange={e => handleChange('terms', e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-border accent-primary"
              />
              <span className="text-base text-muted-foreground leading-snug">
                Li e aceito os <span className="text-primary font-semibold">Termos de Uso</span> e a{' '}
                <span className="text-primary font-semibold">Política de Privacidade</span>
              </span>
            </label>
            {errors.terms && <p className="text-sm text-destructive mt-1">{errors.terms}</p>}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full min-h-[56px] bg-primary text-primary-foreground font-bold text-lg rounded-xl hover:opacity-90 transition-opacity mt-2"
          >
            Continuar
          </button>

          <p className="text-center text-base text-muted-foreground mt-4">
            Já tem conta?{' '}
            <button onClick={() => navigate('/login')} className="text-primary font-semibold">
              Entrar
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
