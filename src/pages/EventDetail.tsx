import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { events, formatDate, users } from '@/data/mockData';
import { ArrowLeft, Calendar, MapPin, Users, Share2, Check, Car, Hotel, MessageCircle, Phone, Clock, ChevronRight, ExternalLink, UserPlus } from 'lucide-react';
import Layout from '@/components/Layout';
import { toast } from 'sonner';

type TabKey = 'geral' | 'participantes' | 'caronas' | 'hospedagens' | 'chat';

const mockParticipants = users.map(u => ({ ...u }));

const mockCaronas = [
  { id: 'cr1', user: users[1], origin: 'Uberlândia, MG', slots: 3, time: '06:00', date: '2025-04-15' },
  { id: 'cr2', user: users[2], origin: 'Ribeirão Preto, SP', slots: 2, time: '07:30', date: '2025-04-15' },
  { id: 'cr3', user: users[4], origin: 'Campo Grande, MS', slots: 4, time: '05:00', date: '2025-04-14' },
];

const mockHospedagens = [
  { id: 'h1', name: 'Hotel Uberaba Palace', price: 'R$ 180/noite', contact: '(34) 3333-0001', link: '#' },
  { id: 'h2', name: 'Pousada do Triângulo', price: 'R$ 120/noite', contact: '(34) 3333-0002', link: '#' },
  { id: 'h3', name: 'Hostel Mineiro', price: 'R$ 65/noite', contact: '(34) 3333-0003', link: '#' },
];

const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: 'geral', label: 'Visão Geral', icon: Calendar },
  { key: 'participantes', label: 'Participantes', icon: Users },
  { key: 'caronas', label: 'Caronas', icon: Car },
  { key: 'hospedagens', label: 'Hospedagens', icon: Hotel },
  { key: 'chat', label: 'Chat', icon: MessageCircle },
];

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ev = events.find(e => e.id === id);
  const [confirmed, setConfirmed] = useState(ev?.confirmed ?? false);
  const [activeTab, setActiveTab] = useState<TabKey>('geral');

  if (!ev) return <Layout><div className="p-8 text-center text-muted-foreground">Evento não encontrado</div></Layout>;

  const toggleConfirm = () => {
    setConfirmed(!confirmed);
    toast.success(confirmed ? 'Presença cancelada' : 'Presença confirmada!');
  };

  return (
    <Layout>
      <div className="pb-4">
        {/* Hero */}
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

          {/* Confirm + Share */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={toggleConfirm}
              className={`flex-1 min-h-[56px] rounded-xl font-bold text-lg transition-all ${
                confirmed ? 'bg-verified text-primary-foreground' : 'bg-primary text-primary-foreground hover:opacity-90'
              }`}
            >
              {confirmed ? <><Check size={20} className="inline mr-1" /> Confirmado</> : 'Confirmar Presença'}
            </button>
            <button
              onClick={() => toast.info('Conectando com atendente...')}
              className="min-h-[56px] min-w-[56px] rounded-xl border-2 border-border flex items-center justify-center hover:border-primary transition-colors"
            >
              <Phone size={20} className="text-muted-foreground" />
            </button>
          </div>

          {/* Sub-tabs */}
          <div className="flex gap-1 overflow-x-auto pb-2 mb-4 scrollbar-hide">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Icon size={14} /> {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          {activeTab === 'geral' && (
            <div className="animate-fade-in-up">
              <p className="leading-relaxed mb-6">{ev.description}</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button onClick={() => setActiveTab('caronas')} className="bg-card rounded-xl p-4 border border-border text-center feed-card-shadow hover:border-primary transition-colors">
                  <Car size={24} className="text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold">Caronas</p>
                  <p className="text-xs text-muted-foreground">{mockCaronas.length} disponíveis</p>
                </button>
                <button onClick={() => setActiveTab('hospedagens')} className="bg-card rounded-xl p-4 border border-border text-center feed-card-shadow hover:border-primary transition-colors">
                  <Hotel size={24} className="text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold">Hospedagem</p>
                  <p className="text-xs text-muted-foreground">{mockHospedagens.length} opções</p>
                </button>
                <button onClick={() => setActiveTab('chat')} className="bg-card rounded-xl p-4 border border-border text-center feed-card-shadow hover:border-primary transition-colors">
                  <MessageCircle size={24} className="text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold">Chat do Evento</p>
                  <p className="text-xs text-muted-foreground">Converse</p>
                </button>
                <button onClick={() => setActiveTab('participantes')} className="bg-card rounded-xl p-4 border border-border text-center feed-card-shadow hover:border-primary transition-colors">
                  <Users size={24} className="text-primary mx-auto mb-2" />
                  <p className="text-sm font-semibold">Participantes</p>
                  <p className="text-xs text-muted-foreground">{mockParticipants.length} confirmados</p>
                </button>
              </div>
              <button className="w-full min-h-[56px] border-2 border-border rounded-xl font-semibold flex items-center justify-center gap-2 hover:border-primary transition-colors">
                <Share2 size={20} /> Compartilhar Evento
              </button>
            </div>
          )}

          {activeTab === 'participantes' && (
            <div className="space-y-3 animate-fade-in-up">
              <p className="text-sm text-muted-foreground mb-2">{mockParticipants.length} pessoas confirmadas</p>
              {mockParticipants.map(p => (
                <div key={p.id} className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border">
                  <img src={p.avatar} alt={p.name} className="w-11 h-11 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.city}, {p.state}</p>
                  </div>
                  <button
                    onClick={() => toast.success(`Solicitação enviada para ${p.name}`)}
                    className="min-h-touch px-3 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1"
                  >
                    <UserPlus size={14} /> Conectar
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'caronas' && (
            <div className="animate-fade-in-up">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-muted-foreground">{mockCaronas.length} caronas disponíveis</p>
                <button
                  onClick={() => toast.success('Formulário de carona aberto!')}
                  className="min-h-touch px-4 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center gap-1.5"
                >
                  <Car size={14} /> Oferecer Carona
                </button>
              </div>
              <div className="space-y-3">
                {mockCaronas.map(c => (
                  <div key={c.id} className="bg-card rounded-xl p-4 border border-border feed-card-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={c.user.avatar} alt={c.user.name} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{c.user.name}</p>
                        <p className="text-xs text-muted-foreground">{c.user.city}, {c.user.state}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center mb-3">
                      <div className="bg-muted rounded-lg p-2">
                        <MapPin size={14} className="mx-auto text-primary mb-1" />
                        <p className="text-xs font-medium truncate">{c.origin}</p>
                      </div>
                      <div className="bg-muted rounded-lg p-2">
                        <Clock size={14} className="mx-auto text-primary mb-1" />
                        <p className="text-xs font-medium">{c.time}</p>
                      </div>
                      <div className="bg-muted rounded-lg p-2">
                        <Users size={14} className="mx-auto text-primary mb-1" />
                        <p className="text-xs font-medium">{c.slots} vagas</p>
                      </div>
                    </div>
                    <button
                      onClick={() => toast.success('Vaga solicitada!')}
                      className="w-full min-h-touch rounded-lg bg-primary text-primary-foreground font-semibold text-sm"
                    >
                      Solicitar Vaga
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'hospedagens' && (
            <div className="animate-fade-in-up">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-muted-foreground">{mockHospedagens.length} opções próximas</p>
                <button
                  onClick={() => toast.success('Sugestão enviada!')}
                  className="min-h-touch px-4 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center gap-1.5"
                >
                  <Hotel size={14} /> Indicar
                </button>
              </div>
              <div className="space-y-3">
                {mockHospedagens.map(h => (
                  <div key={h.id} className="bg-card rounded-xl p-4 border border-border feed-card-shadow">
                    <h4 className="font-bold text-sm mb-1">{h.name}</h4>
                    <p className="text-primary font-bold text-lg mb-1">{h.price}</p>
                    <p className="text-xs text-muted-foreground mb-3">{h.contact}</p>
                    <button
                      onClick={() => toast.info('Abrindo link externo...')}
                      className="w-full min-h-touch rounded-lg border-2 border-border font-semibold text-sm flex items-center justify-center gap-1.5 hover:border-primary transition-colors"
                    >
                      <ExternalLink size={14} /> Ver no Mapa
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="bg-card rounded-xl p-4 border border-border animate-fade-in-up">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                <MessageCircle size={16} className="text-primary" /> Chat do Evento
              </h3>
              <div className="space-y-2 mb-3 max-h-64 overflow-y-auto">
                <div className="bg-muted rounded-lg p-2.5 text-sm">
                  <span className="font-semibold text-primary">Carlos:</span> Alguém vai de carro saindo de Uberaba?
                </div>
                <div className="bg-muted rounded-lg p-2.5 text-sm">
                  <span className="font-semibold text-primary">Maria:</span> Eu posso dar carona! Tenho 3 vagas.
                </div>
                <div className="bg-muted rounded-lg p-2.5 text-sm">
                  <span className="font-semibold text-primary">José:</span> Vou reservar hotel próximo ao local.
                </div>
                <div className="bg-muted rounded-lg p-2.5 text-sm">
                  <span className="font-semibold text-primary">Ana:</span> Estarei lá! Muito animada!
                </div>
                <div className="bg-muted rounded-lg p-2.5 text-sm">
                  <span className="font-semibold text-primary">Roberto:</span> Quem quiser dividir hotel, me chama!
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
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;
