import { Crown, Check, ArrowLeft, Star, Zap, TrendingUp, Gift, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';

const benefits = [
  { icon: Zap, label: 'Mais anúncios ativos', desc: 'Publique até 20 anúncios simultaneamente' },
  { icon: Star, label: 'Destaque automático', desc: 'Seus anúncios aparecem no topo do feed' },
  { icon: TrendingUp, label: 'Maior pontuação BDM', desc: 'Ganhe 2x mais pontos em todas as ações' },
  { icon: Crown, label: 'Prioridade no feed', desc: 'Seus anúncios são exibidos antes dos demais' },
  { icon: Gift, label: 'Cashback interno', desc: 'Receba de volta parte do valor gasto na plataforma' },
  { icon: ShieldCheck, label: 'Selo verificado premium', desc: 'Destaque de confiança no seu perfil' },
];

const Premium = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="px-4 pt-4 pb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 min-h-touch text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Voltar</span>
        </button>

        {/* Hero */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
            <Crown size={40} className="text-secondary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Plano Premium</h1>
          <p className="text-muted-foreground text-lg">Potencialize sua presença na comunidade</p>
        </div>

        {/* Price card */}
        <div className="bg-gradient-to-br from-secondary/15 to-secondary/5 border-2 border-secondary/40 rounded-2xl p-6 mb-8">
          <div className="text-center mb-6">
            <p className="text-muted-foreground text-base mb-1">Plano Profissional</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold text-foreground">R$ 69</span>
              <span className="text-muted-foreground text-lg">/mês</span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-base">{b.label}</p>
                    <p className="text-sm text-muted-foreground">{b.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="w-full min-h-[56px] bg-secondary text-secondary-foreground rounded-xl font-bold text-lg hover:opacity-90 transition-opacity">
            Assinar Premium
          </button>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Cancele quando quiser. Sem fidelidade.
          </p>
        </div>

        {/* How points work */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="text-xl font-bold mb-4">Como funciona a pontuação</h2>
          <div className="space-y-3">
            {[
              { action: 'Publicar anúncio', pts: '+10 pontos' },
              { action: 'Receber curtida', pts: '+2 pontos' },
              { action: 'Comentar', pts: '+3 pontos' },
              { action: 'Indicar amigo', pts: '+50 pontos' },
              { action: 'Compra/venda concluída', pts: '+25 pontos' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-base">{item.action}</span>
                <span className="font-bold text-primary text-base">{item.pts}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Membros Premium ganham <strong>2x mais pontos</strong> em todas as ações acima.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Premium;
