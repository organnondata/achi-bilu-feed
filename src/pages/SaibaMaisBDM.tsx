import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { ArrowLeft, Gem, Shield, TrendingUp, Users, CheckCircle2, Coins, Building2, Leaf } from 'lucide-react';

const benefits = [
  { icon: Shield, title: 'Segurança', desc: 'Transações seguras dentro do ecossistema com verificação facial.' },
  { icon: TrendingUp, title: 'Valorização', desc: 'Moeda com lastro em ativos reais e produção Dakila.' },
  { icon: Users, title: 'Comunidade', desc: 'Rede de correntistas com benefícios exclusivos.' },
  { icon: Coins, title: 'Cashback', desc: 'Receba de volta em BDM a cada transação realizada.' },
];

const howItWorks = [
  'Crie sua conta no Ecossistema Dakila.',
  'Solicite a abertura de sua conta corrente BDM.',
  'Realize transações com outros correntistas.',
  'Acumule pontos e suba de nível.',
  'Acesse produtos e serviços exclusivos.',
];

const ativosBDM = [
  { name: 'Cosméticos Dakila', type: 'Produto', icon: Leaf },
  { name: 'Chá de Moringa', type: 'Produto', icon: Leaf },
  { name: 'Pedras Energéticas', type: 'Produto', icon: Gem },
  { name: 'Consultoria de Expansão', type: 'Serviço', icon: Building2 },
  { name: 'Carteira Digital BDM', type: 'Ativo Digital', icon: Coins },
  { name: 'Óleos Essenciais Dakila', type: 'Produto', icon: Leaf },
];

const SaibaMaisBDM = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="pb-4">
        {/* Hero */}
        <div className="bg-gradient-to-br from-bdm-gold-dark to-bdm-gold px-6 py-10 text-center relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 min-h-touch min-w-[44px] flex items-center justify-center text-primary-foreground/70"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-4">
            <Gem size={32} className="text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-primary-foreground mb-1">BDM</h1>
          <p className="text-lg text-primary-foreground/80 font-medium">Bônus Dourado Mercantil</p>
          <p className="text-sm text-primary-foreground/60 mt-2">Ecossistema Dakila</p>
        </div>

        <div className="px-4 pt-6">
          {/* O que é */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Gem size={20} className="text-bdm-gold" /> O que é BDM?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              O <strong>Bônus Dourado Mercantil (BDM)</strong> é a moeda complementar do Ecossistema Dakila.
              Ela permite transações entre membros da comunidade, com lastro em produtos e serviços reais,
              promovendo a economia colaborativa e o fortalecimento do ecossistema.
            </p>
          </section>

          {/* Benefícios */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Benefícios</h2>
            <div className="grid grid-cols-2 gap-3">
              {benefits.map((b) => (
                <div key={b.title} className="bg-card rounded-xl p-4 border border-bdm-gold/20 feed-card-shadow">
                  <b.icon size={24} className="text-bdm-gold mb-2" />
                  <h3 className="font-bold text-sm mb-1">{b.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Como funciona */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Como funciona</h2>
            <div className="space-y-3">
              {howItWorks.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-bdm-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-bdm-gold">{i + 1}</span>
                  </div>
                  <p className="text-sm leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tornar-se correntista */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-bdm-gold-dark to-bdm-gold rounded-xl p-6 text-center">
              <Shield size={32} className="text-primary-foreground mx-auto mb-3" />
              <h2 className="text-xl font-bold text-primary-foreground mb-2">Torne-se Correntista BDM</h2>
              <p className="text-sm text-primary-foreground/70 mb-4">
                Acesse benefícios exclusivos e faça parte da economia colaborativa.
              </p>
              <button className="bg-primary-foreground text-bdm-gold-foreground font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity">
                Quero ser Correntista
              </button>
            </div>
          </section>

          {/* Lista de Ativos */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Ativos BDM & Produtos Dakila</h2>
            <div className="space-y-2">
              {ativosBDM.map((ativo, i) => (
                <div key={i} className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border">
                  <div className="w-10 h-10 rounded-lg bg-bdm-gold/10 flex items-center justify-center flex-shrink-0">
                    <ativo.icon size={20} className="text-bdm-gold" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{ativo.name}</h4>
                    <p className="text-xs text-muted-foreground">{ativo.type}</p>
                  </div>
                  <span className="badge-ativo-dakila text-[10px] px-2 py-0.5 rounded-full font-bold">
                    Oficial
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Badges */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Badges Institucionais</h2>
            <div className="flex flex-wrap gap-2">
              <span className="badge-ativo-dakila text-xs px-3 py-1.5 rounded-full font-bold inline-flex items-center gap-1">
                <Leaf size={12} /> Ativo Oficial Dakila
              </span>
              <span className="badge-bdm text-xs px-3 py-1.5 rounded-full font-bold inline-flex items-center gap-1">
                <Gem size={12} /> Correntista BDM
              </span>
              <span className="badge-verified text-xs px-3 py-1.5 rounded-full font-bold inline-flex items-center gap-1">
                <CheckCircle2 size={12} /> Verificado
              </span>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default SaibaMaisBDM;
