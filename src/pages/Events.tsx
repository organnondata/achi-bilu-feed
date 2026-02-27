import { useState } from 'react';
import Layout from '@/components/Layout';
import { events, states, formatDate } from '@/data/mockData';
import { Calendar, MapPin, Users, Check, SlidersHorizontal, X, MessageCircle, Car, Hotel, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const MONTH_NAMES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const DAY_NAMES = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];

const Events = () => {
  const [eventList, setEventList] = useState(events);
  const [showFilters, setShowFilters] = useState(false);
  const [filterState, setFilterState] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [calMonth, setCalMonth] = useState(2); // March (0-indexed)
  const [calYear, setCalYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleRSVP = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEventList(prev => prev.map(ev => 
      ev.id === id ? { ...ev, confirmed: !ev.confirmed, attendees: ev.confirmed ? ev.attendees - 1 : ev.attendees + 1 } : ev
    ));
    const ev = eventList.find(e => e.id === id);
    toast.success(ev?.confirmed ? 'Presença cancelada' : 'Presença confirmada!');
  };

  let filtered = filterState
    ? eventList.filter(ev => ev.state === filterState)
    : eventList;

  if (selectedDate) {
    filtered = filtered.filter(ev => ev.date === selectedDate);
  }

  // Calendar helpers
  const eventDates = new Set(eventList.map(ev => ev.date));
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay();

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
  };

  const handleDateClick = (day: number) => {
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (selectedDate === dateStr) setSelectedDate(null);
    else setSelectedDate(dateStr);
  };

  return (
    <Layout>
      <div className="px-4 pt-4 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-heading font-bold">Eventos e Ações</h2>
          <div className="flex gap-2">
            <button
              onClick={() => { setShowCalendar(!showCalendar); setShowFilters(false); }}
              className={`flex items-center gap-1.5 min-h-touch px-4 rounded-full border-2 font-medium text-sm transition-colors ${
                showCalendar ? 'border-primary bg-accent text-primary' : 'border-border text-muted-foreground'
              }`}
            >
              <Calendar size={16} />
            </button>
            <button
              onClick={() => { setShowFilters(!showFilters); setShowCalendar(false); }}
              className={`flex items-center gap-1.5 min-h-touch px-4 rounded-full border-2 font-medium text-sm transition-colors ${
                showFilters || filterState ? 'border-primary bg-accent text-primary' : 'border-border text-muted-foreground'
              }`}
            >
              <SlidersHorizontal size={16} /> Filtros
            </button>
          </div>
        </div>

        {/* Calendar */}
        {showCalendar && (
          <div className="bg-card rounded-xl p-4 mb-4 border border-border animate-fade-in-up">
            <div className="flex items-center justify-between mb-3">
              <button onClick={prevMonth} className="min-h-touch min-w-[44px] flex items-center justify-center"><ChevronLeft size={20} /></button>
              <h3 className="font-bold text-sm">{MONTH_NAMES[calMonth]} {calYear}</h3>
              <button onClick={nextMonth} className="min-h-touch min-w-[44px] flex items-center justify-center"><ChevronRight size={20} /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {DAY_NAMES.map(d => (
                <div key={d} className="text-[10px] font-bold text-muted-foreground py-1">{d}</div>
              ))}
              {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const hasEvent = eventDates.has(dateStr);
                const isSelected = selectedDate === dateStr;
                return (
                  <button
                    key={day}
                    onClick={() => handleDateClick(day)}
                    className={`aspect-square rounded-lg text-xs font-medium flex flex-col items-center justify-center transition-colors ${
                      isSelected ? 'bg-primary text-primary-foreground' :
                      hasEvent ? 'bg-accent text-primary font-bold' : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    {day}
                    {hasEvent && !isSelected && <div className="w-1 h-1 rounded-full bg-primary mt-0.5" />}
                  </button>
                );
              })}
            </div>
            {selectedDate && (
              <button onClick={() => setSelectedDate(null)} className="mt-3 text-xs text-primary font-semibold flex items-center gap-1">
                <X size={12} /> Limpar filtro de data
              </button>
            )}
          </div>
        )}

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
            {selectedDate && <span className="text-primary"> · Filtrado por data</span>}
          </p>
        </div>

        {/* Quick filter bar */}
        <div className="flex gap-2 overflow-x-auto mb-4 scrollbar-hide">
          {[
            { icon: Calendar, label: 'Calendário', action: () => { setShowCalendar(true); setShowFilters(false); } },
            { icon: Car, label: 'Caronas', action: () => toast.info('Veja caronas dentro de cada evento') },
            { icon: Hotel, label: 'Hospedagens', action: () => toast.info('Veja hospedagens dentro de cada evento') },
            { icon: Users, label: 'Participantes', action: () => toast.info('Veja participantes dentro de cada evento') },
          ].map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-muted text-muted-foreground text-xs font-medium whitespace-nowrap hover:bg-accent transition-colors"
            >
              <item.icon size={14} /> {item.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar size={32} className="mx-auto mb-2 opacity-50" />
              <p>Nenhum evento encontrado para esta data.</p>
            </div>
          )}
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

                <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users size={16} /> {ev.attendees} confirmados
                  </span>
                </div>

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
