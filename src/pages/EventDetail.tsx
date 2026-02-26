import { useParams, useNavigate } from 'react-router-dom';
import { events, formatDate } from '@/data/mockData';
import { ArrowLeft, Calendar, MapPin, Users, Share2 } from 'lucide-react';
import Layout from '@/components/Layout';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ev = events.find(e => e.id === id);

  if (!ev) return <Layout><div className="p-8 text-center text-muted-foreground">Evento não encontrado</div></Layout>;

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
            <p className="flex items-center gap-2"><Users size={18} /> {ev.attendees} pessoas confirmadas</p>
          </div>
          <p className="leading-relaxed mb-6">{ev.description}</p>
          <button className="w-full min-h-[56px] bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:opacity-90 transition-opacity">
            Confirmar Presença
          </button>
          <button className="w-full min-h-[56px] mt-3 border-2 border-border rounded-xl font-semibold flex items-center justify-center gap-2 hover:border-primary transition-colors">
            <Share2 size={20} /> Compartilhar Evento
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetail;
