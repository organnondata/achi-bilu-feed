import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { categories, states, formatPrice } from '@/data/mockData';
import { ArrowRight, ArrowLeft, Check, ImagePlus, Eye } from 'lucide-react';
import { toast } from 'sonner';

const conditions = ['Novo', 'Usado', 'Recondicionado'];

const Publish = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    category: '',
    type: '',
    title: '',
    description: '',
    price: '',
    condition: '',
    city: '',
    state: '',
    images: [] as string[],
  });

  const selectedCat = categories.find(c => c.id === form.category);

  const canNext = () => {
    if (step === 1) return form.category && form.type;
    if (step === 2) return true;
    if (step === 3) return form.title && form.description;
    if (step === 4) return form.city && form.state;
    if (step === 5) return true;
    return false;
  };

  const handlePublish = () => {
    toast.success('Anúncio publicado com sucesso!');
    navigate('/feed');
  };

  const totalSteps = 5;

  return (
    <Layout>
      <div className="px-4 pt-4 pb-4">
        <h2 className="text-heading font-bold mb-2">Publicar Anúncio</h2>

        {/* Progress */}
        <div className="flex gap-2 mb-6">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map(s => (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${
              s <= step ? 'bg-primary' : 'bg-muted'
            }`} />
          ))}
        </div>

        {/* Step 1: Category + Subcategory */}
        {step === 1 && (
          <div className="animate-fade-in-up">
            <h3 className="text-lg font-semibold mb-3">O que você quer anunciar?</h3>
            <div className="space-y-3 mb-4">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setForm(f => ({ ...f, category: cat.id, type: '' }))}
                  className={`w-full min-h-touch p-4 rounded-xl border-2 text-left font-semibold text-lg transition-all ${
                    form.category === cat.id ? 'border-primary bg-accent' : 'border-border'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            {selectedCat && (
              <>
                <h3 className="text-lg font-semibold mb-3">Qual o tipo?</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCat.types.map(t => (
                    <button
                      key={t}
                      onClick={() => setForm(f => ({ ...f, type: t }))}
                      className={`min-h-touch px-5 rounded-full border-2 font-medium transition-all ${
                        form.type === t ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 2: Photos */}
        {step === 2 && (
          <div className="animate-fade-in-up">
            <h3 className="text-lg font-semibold mb-3">Adicione fotos</h3>
            <button className="w-full h-48 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-primary hover:text-primary transition-colors">
              <ImagePlus size={40} />
              <span className="font-medium">Toque para adicionar fotos</span>
              <span className="text-sm">Até 8 fotos</span>
            </button>
            <p className="text-sm text-muted-foreground mt-3 text-center">
              No MVP, as fotos são simuladas
            </p>
          </div>
        )}

        {/* Step 3: Title + Description */}
        {step === 3 && (
          <div className="animate-fade-in-up space-y-4">
            <h3 className="text-lg font-semibold mb-1">Detalhes do anúncio</h3>
            <div>
              <label className="text-sm font-semibold text-muted-foreground mb-1 block">Título</label>
              <input
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Ex: Caminhonete S10 2018"
                className="w-full min-h-touch px-4 rounded-xl border-2 border-border bg-card text-lg focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-muted-foreground mb-1 block">Descrição detalhada</label>
              <textarea
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Descreva com o máximo de detalhes: estado de conservação, características, diferenciais..."
                rows={6}
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-card text-lg focus:border-primary focus:outline-none transition-colors resize-none"
              />
              <p className="text-sm text-muted-foreground mt-1">{form.description.length} caracteres</p>
            </div>
          </div>
        )}

        {/* Step 4: Price + Condition + Location */}
        {step === 4 && (
          <div className="animate-fade-in-up space-y-4">
            <h3 className="text-lg font-semibold mb-1">Preço e Localização</h3>
            <div>
              <label className="text-sm font-semibold text-muted-foreground mb-1 block">Preço (R$)</label>
              <input
                value={form.price}
                onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                placeholder="0"
                type="number"
                className="w-full min-h-touch px-4 rounded-xl border-2 border-border bg-card text-lg focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-muted-foreground mb-2 block">Condição</label>
              <div className="flex gap-2 flex-wrap">
                {conditions.map(c => (
                  <button
                    key={c}
                    onClick={() => setForm(f => ({ ...f, condition: c }))}
                    className={`min-h-touch px-5 rounded-full border-2 font-medium transition-all ${
                      form.condition === c ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-muted-foreground mb-1 block">Cidade</label>
              <input
                value={form.city}
                onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                placeholder="Sua cidade"
                className="w-full min-h-touch px-4 rounded-xl border-2 border-border bg-card text-lg focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-muted-foreground mb-2 block">Estado</label>
              <div className="flex flex-wrap gap-2">
                {states.map(st => (
                  <button
                    key={st}
                    onClick={() => setForm(f => ({ ...f, state: st }))}
                    className={`min-h-touch px-5 rounded-full border-2 font-medium transition-all ${
                      form.state === st ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <div className="animate-fade-in-up">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Eye size={22} /> Revisão do anúncio
            </h3>

            {/* Preview card */}
            <div className="bg-card rounded-xl border-2 border-primary/20 overflow-hidden mb-4">
              <div className="h-40 bg-muted flex items-center justify-center text-muted-foreground">
                <ImagePlus size={40} />
              </div>
              <div className="p-4">
                <h4 className="text-lg font-bold mb-1">{form.title || 'Título do anúncio'}</h4>
                <p className="text-heading font-bold text-primary mb-2">
                  {form.price ? formatPrice(Number(form.price)) : 'Consultar'}
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  {form.city || 'Cidade'}, {form.state || 'Estado'} · {form.type || 'Tipo'}
                  {form.condition && ` · ${form.condition}`}
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {form.description || 'Descrição do anúncio...'}
                </p>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-muted rounded-xl p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Categoria</span>
                <span className="font-semibold">{selectedCat?.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tipo</span>
                <span className="font-semibold">{form.type}</span>
              </div>
              {form.condition && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Condição</span>
                  <span className="font-semibold">{form.condition}</span>
                </div>
              )}
            </div>

            {/* Highlight upsell */}
            <div className="bg-accent rounded-xl p-4 border border-primary/20 mt-4">
              <p className="font-semibold text-primary mb-1">✨ Quer destaque?</p>
              <p className="text-sm text-muted-foreground mb-2">
                Coloque seu anúncio no topo do feed por 7 dias.
              </p>
              <p className="text-sm font-bold text-secondary">R$ 19 - R$ 39 · Em breve</p>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="min-h-[56px] px-6 border-2 border-border rounded-xl font-semibold flex items-center gap-2 hover:border-primary transition-colors"
            >
              <ArrowLeft size={20} /> Voltar
            </button>
          )}
          {step < totalSteps ? (
            <button
              onClick={() => canNext() && setStep(s => s + 1)}
              disabled={!canNext()}
              className="flex-1 min-h-[56px] bg-primary text-primary-foreground rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              Próximo <ArrowRight size={20} />
            </button>
          ) : (
            <button
              onClick={handlePublish}
              className="flex-1 min-h-[56px] bg-primary text-primary-foreground rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Check size={20} /> Publicar Anúncio
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Publish;
