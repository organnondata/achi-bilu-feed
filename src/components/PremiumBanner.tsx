import { Crown, Check } from 'lucide-react';

const PremiumBanner = () => (
  <div className="bg-gradient-to-r from-secondary/15 to-secondary/5 border border-secondary/30 rounded-xl p-4 mb-4">
    <div className="flex items-center gap-2 mb-2">
      <Crown size={22} className="text-secondary" />
      <h3 className="font-bold text-lg">Seja Premium</h3>
    </div>
    <ul className="space-y-1 mb-3">
      {['Mais anúncios ativos', 'Destaque automático', 'Maior pontuação', 'Prioridade no feed'].map((b, i) => (
        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
          <Check size={14} className="text-verified flex-shrink-0" /> {b}
        </li>
      ))}
    </ul>
    <button className="w-full min-h-touch bg-secondary text-secondary-foreground rounded-lg font-bold text-base hover:opacity-90 transition-opacity">
      Plano Profissional · R$ 69/mês
    </button>
  </div>
);

export default PremiumBanner;
