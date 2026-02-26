import Layout from '@/components/Layout';
import { announcements } from '@/data/mockData';
import { ArrowLeft, Trash2, Eye, Users, ShoppingBag, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="px-4 pt-4 pb-4">
        <button onClick={() => navigate(-1)} className="text-primary font-semibold mb-4 min-h-touch flex items-center gap-1">
          <ArrowLeft size={20} /> Voltar
        </button>

        <h2 className="text-heading font-bold mb-4">Painel Admin</h2>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: ShoppingBag, label: 'Anúncios', value: announcements.length },
            { icon: Users, label: 'Usuários', value: 4 },
            { icon: Calendar, label: 'Eventos', value: 3 },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-card rounded-xl p-4 text-center feed-card-shadow">
              <Icon size={24} className="mx-auto text-primary mb-1" />
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        {/* Announcements list */}
        <h3 className="font-bold text-lg mb-3">Moderar Anúncios</h3>
        <div className="space-y-2">
          {announcements.map(ad => (
            <div key={ad.id} className="flex items-center gap-3 bg-card rounded-xl p-3 feed-card-shadow">
              <img src={ad.images[0]} alt={ad.title} className="w-12 h-12 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm truncate">{ad.title}</h4>
                <p className="text-xs text-muted-foreground">{ad.author.name}</p>
              </div>
              <button className="min-h-touch min-w-[40px] flex items-center justify-center text-primary hover:bg-accent rounded-lg">
                <Eye size={18} />
              </button>
              <button className="min-h-touch min-w-[40px] flex items-center justify-center text-destructive hover:bg-destructive/10 rounded-lg">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
