import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { events, formatDate, states } from '@/data/mockData';
import { ArrowLeft, Calendar, MapPin, Users, Share2, Check, Car, Hotel, MessageCircle, Phone } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from 'sonner';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ev = events.find(e => e.id === id);
  const [confirmed, setConfirmed] = useState(ev?.confirmed ?? false);
  const [showChat, setShowChat] = useState(false);

  if (!ev) return <Layout><div className="p-8 text-center text-muted-foreground">Evento não encontrado</div></Layout>;

  const toggleConfirm = () => {
    setConfirmed(!confirmed);
    toast.success(confirmed ? 'Presença cancelada' : 'Presença confirmada!');
  };

  return (
    <Layout>
      <div className="pb-4">
        <div className="relative">
          <img src={ev.image} alt={ev.name} className="w-full h-52 object-cover" />
          <button onClick={() => navigate(-1)} className="absolute top-4 left-4 bg-foreground/50 text-primary-foreground min-h-touch min-w-[44px] rounded-full flex items-center justify-center">
            <ArrowLeft size={22} />
          </button>
        </div>
        <div className="px-4 pt-4">
          <h2 className="text-heading font-bold mb-3">{ev.name}</h2>
          <div className="space-y-2 text-muted-foreground mb-4">
            <p className="flex items-center gap-2"><Calendar size={18} /> {formatDate(ev.date)} às {ev.time}</p>
            <p className="flex items-center gap-2"><MapPin size={18} /> {ev.location} · {ev.city}, {ev.state}</p>
            <p className="flex items-center gap-2"><Users size={18} /> {ev.attendees + (confirmed && !ev.confirmed ? 1 : 0)} pessoas confirmadas</p>
          </div>
          <p className="leading-relaxed mb-6">{ev.description}</p>

          {/* Action buttons */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={toggleConfirm}
              className={`flex-1 min-h-[56px] rounded-xl font-bold text-lg transition-all ${
                confirmed ? 'bg-verified text-primary-foreground' : 'bg-primary text-primary-foreground hover:opacity-90'
              }`}
            >
              {confirmed ? <><Check size={20} className="inline mr-1" /> Confirmado</> : 'Confirmar Presença'}
            </button>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => toast.info('Caronas disponíveis em breve!')}
              className="bg-card rounded-xl p-4 border border-border text-center feed-card-shadow hover:border-primary transition-colors"
            >
              <Car size={24} className="text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold">Caronas</p>
              <p className="text-xs text-muted-foreground">Estilo BlaBlaCar</p>
            </button>
            <button
              onClick={() => toast.info('Opções de hospedagem em breve!')}
              className="bg-card rounded-xl p-4 border border-border text-center feed-card-shadow hover:border-primary transition-colors"
            >
              <Hotel size={24} className="text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold">Hospedagem</p>
              <p className="text-xs text-muted-foreground">Encontre onde ficar</p>
            </button>
            <button
              onClick={() => setShowChat(!showChat)}
              className="bg-card rounded-xl p-4 border border-border text-center feed-card-shadow hover:border-primary transition-colors"
            >
              <MessageCircle size={24} className="text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold">Chat do Evento</p>
              <p className="text-xs text-muted-foreground">Converse com participantes</p>
            </button>
            <button
              onClick={() => toast.info('Conectando com atendente...')}
              className="bg-card rounded-xl p-4 border border-border text-center feed-card-shadow hover:border-primary transition-colors"
            >
              <Phone size={24} className="text-bdm-gold mx-auto mb-2" />
              <p className="text-sm font-semibold">Fale Conosco</p>
              <p className="text-xs text-muted-foreground">Atendente dedicado</p>
            </button>
          </div>

          {/* Chat preview */}
          {showChat && (
            <div className="bg-card rounded-xl p-4 border border-border mb-4 animate-fade-in-up">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                <MessageCircle size={16} className="text-primary" /> Chat do Evento
              </h3>
              <div className="space-y-2 mb-3">
                <div className="bg-muted rounded-lg p-2.5 text-sm">
                  <span className="font-semibold text-primary">Carlos:</span> Alguém vai de carro saindo de Uberaba?
                </div>
                <div className="bg-muted rounded-lg p-2.5 text-sm">
                  <span className="font-semibold text-primary">Maria:</span> Eu posso dar carona! Tenho 3 vagas.
                </div>
                <div className="bg-muted rounded-lg p-2.5 text-sm">
                  <span className="font-semibold text-primary">José:</span> Vou reservar hotel próximo ao local.
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-muted rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button className="min-h-touch px-4 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                  Enviar
                </button>
              </div>
            </div>
          )}

          <button className="w-full min-h-[56px] mt-3 border-2 border-border rounded-xl font-semibold flex items-center justify-center gap-2 hover:border-primary transition-colors">
            <Share2 size={20} /> Compartilhar Evento
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;
