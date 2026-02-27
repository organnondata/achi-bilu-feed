import { useState } from 'react';
import Layout from '@/components/Layout';
import { events, states, formatDate } from '@/data/mockData';
import { Calendar, MapPin, Users, Check, SlidersHorizontal, X, MessageCircle, Car, Hotel, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const [eventList, setEventList] = useState(events);
  const [showFilters, setShowFilters] = useState(false);
  const [filterState, setFilterState] = useState('');
  const navigate = useNavigate();

  const toggleRSVP = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEventList(prev => prev.map(ev => 
      ev.id === id ? { ...ev, confirmed: !ev.confirmed, attendees: ev.confirmed ? ev.attendees - 1 : ev.attendees + 1 } : ev
    ));
    const ev = eventList.find(e => e.id === id);
    toast.success(ev?.confirmed ? 'Presença cancelada' : 'Presença confirmada!');
  };

  const filtered = filterState
    ? eventList.filter(ev => ev.state === filterState)
    : eventList;

  return (
    <Layout>
      <div className="px-4 pt-4 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-heading font-bold">Eventos e Ações</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 min-h-touch px-4 rounded-full border-2 font-medium text-sm transition-colors ${
              showFilters || filterState ? 'border-primary bg-accent text-primary' : 'border-border text-muted-foreground'
            }`}
          >
            <SlidersHorizontal size={16} /> Filtros
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-card rounded-xl p-4 mb-4 border border-border animate-fade-in-up">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-muted-foreground">Estado</label>
              {filterState && (
                <button onClick={() => setFilterState('')} className="text-muted-foreground hover:text-foreground">
                  <X size={16} />
                </button>
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterState('')}
                className={`min-h-touch px-4 rounded-full text-sm font-medium transition-colors ${
                  !filterState ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
              >
                Todos
              </button>
              {states.slice(0, 6).map(st => (
                <button
                  key={st}
                  onClick={() => setFilterState(st)}
                  className={`min-h-touch px-4 rounded-full text-sm font-medium transition-colors ${
                    filterState === st ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Calendar hint */}
        <div className="bg-accent rounded-xl p-3 mb-4 flex items-center gap-2 border border-primary/10">
          <Calendar size={18} className="text-primary flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">{filtered.length} eventos</strong> disponíveis na agenda
          </p>
        </div>

        <div className="space-y-4">
          {filtered.map(ev => (
            <article 
              key={ev.id}
              className="bg-card rounded-xl overflow-hidden feed-card-shadow cursor-pointer"
              onClick={() => navigate(`/events/${ev.id}`)}
            >
              <img src={ev.image} alt={ev.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1">{ev.name}</h3>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                  <Calendar size={16} /> {formatDate(ev.date)} às {ev.time}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <MapPin size={16} /> {ev.location} · {ev.city}, {ev.state}
                </div>

                {/* Participants count */}
                <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users size={16} /> {ev.attendees} confirmados
                  </span>
                </div>

                {/* Quick action tags */}
                <div className="flex gap-2 flex-wrap mb-3">
                  <span className="inline-flex items-center gap-1 text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground">
                    <Car size={12} /> Caronas
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground">
                    <Hotel size={12} /> Hospedagem
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground">
                    <MessageCircle size={12} /> Chat
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => toggleRSVP(ev.id, e)}
                    className={`flex-1 min-h-touch px-5 rounded-full font-semibold text-base transition-all ${
                      ev.confirmed 
                        ? 'bg-verified text-primary-foreground' 
                        : 'bg-primary text-primary-foreground hover:opacity-90'
                    }`}
                  >
                    {ev.confirmed ? <><Check size={18} className="inline mr-1" />Confirmado</> : 'Confirmar Presença'}
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); toast.info('Conectando com atendente...'); }}
                    className="min-h-touch min-w-[44px] rounded-full border-2 border-border flex items-center justify-center hover:border-primary transition-colors"
                  >
                    <Phone size={18} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Events;
