import Layout from '@/components/Layout';
import { orientadores } from '@/data/mockData';
import { ExternalLink, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const Links = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const person = orientadores.find(o => o.id === selected);

  if (person) {
    return (
      <Layout>
        <div className="px-4 pt-4 pb-4">
          <button onClick={() => setSelected(null)} className="text-primary font-semibold mb-4 min-h-touch flex items-center gap-1">
            ← Voltar
          </button>
          <div className="text-center mb-6">
            <img src={person.avatar} alt={person.name} className="w-24 h-24 rounded-full mx-auto mb-3 object-cover" />
            <h2 className="text-heading font-bold">{person.name}</h2>
            <p className="text-muted-foreground">{person.role}</p>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6">{person.bio}</p>
          <div className="space-y-3">
            {person.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                className="w-full min-h-[56px] bg-card border-2 border-border rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:border-primary transition-colors"
              >
                <ExternalLink size={20} /> {link.label}
              </a>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-4 pt-4 pb-4">
        <h2 className="text-heading font-bold mb-4">Orientadores</h2>
        <div className="space-y-3">
          {orientadores.map(o => (
            <button
              key={o.id}
              onClick={() => setSelected(o.id)}
              className="w-full flex items-center gap-4 bg-card rounded-xl p-4 feed-card-shadow text-left transition-shadow"
            >
              <img src={o.avatar} alt={o.name} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{o.name}</h3>
                <p className="text-sm text-muted-foreground">{o.role}</p>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Links;
