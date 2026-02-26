import { useState } from 'react';
import Layout from '@/components/Layout';
import { events, formatDate } from '@/data/mockData';
import { Calendar, MapPin, Users, Check } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Events = () => {
  const [eventList, setEventList] = useState(events);
  const navigate = useNavigate();

  const toggleRSVP = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEventList(prev => prev.map(ev => 
      ev.id === id ? { ...ev, confirmed: !ev.confirmed, attendees: ev.confirmed ? ev.attendees - 1 : ev.attendees + 1 } : ev
    ));
    const ev = eventList.find(e => e.id === id);
    toast.success(ev?.confirmed ? 'Presença cancelada' : 'Presença confirmada!');
  };

  return (
    <Layout>
      <div className="px-4 pt-4 pb-4">
        <h2 className="text-heading font-bold mb-4">Eventos e Ações</h2>

        <div className="space-y-4">
          {eventList.map(ev => (
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
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Users size={16} /> {ev.attendees} confirmados
                  </span>
                  <button
                    onClick={(e) => toggleRSVP(ev.id, e)}
                    className={`min-h-touch px-5 rounded-full font-semibold text-base transition-all ${
                      ev.confirmed 
                        ? 'bg-verified text-primary-foreground' 
                        : 'bg-primary text-primary-foreground hover:opacity-90'
                    }`}
                  >
                    {ev.confirmed ? <><Check size={18} className="inline mr-1" />Confirmado</> : 'Confirmar Presença'}
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
