export interface User {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  city: string;
  state: string;
  phone: string;
  joinedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: 'vehicles' | 'realestate' | 'services';
  type: string;
  city: string;
  state: string;
  author: User;
  createdAt: string;
  featured: boolean;
  saved?: boolean;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  city: string;
  state: string;
  image: string;
  confirmed: boolean;
  attendees: number;
}

export interface Orientador {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  links: { label: string; url: string }[];
}

export const currentUser: User = {
  id: 'u1',
  name: 'Carlos Mendes',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  verified: true,
  city: 'Uberaba',
  state: 'MG',
  phone: '(34) 99999-0001',
  joinedAt: '2024-03-15',
};

const users: User[] = [
  currentUser,
  {
    id: 'u2',
    name: 'Maria Silva',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    verified: true,
    city: 'Uberlândia',
    state: 'MG',
    phone: '(34) 99999-0002',
    joinedAt: '2024-01-10',
  },
  {
    id: 'u3',
    name: 'José Oliveira',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    verified: true,
    city: 'Ribeirão Preto',
    state: 'SP',
    phone: '(16) 99999-0003',
    joinedAt: '2024-05-20',
  },
  {
    id: 'u4',
    name: 'Ana Ferreira',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    verified: false,
    city: 'Goiânia',
    state: 'GO',
    phone: '(62) 99999-0004',
    joinedAt: '2024-07-01',
  },
];

export const announcements: Announcement[] = [
  {
    id: 'a1',
    title: 'Caminhonete S10 2018 Diesel',
    description: 'S10 LTZ 2.8 Diesel 4x4 automática. Único dono, revisões em dia na concessionária. Pneus novos, banco de couro. Aceito troca por veículo de menor valor.',
    price: 145000,
    images: ['https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800&h=600&fit=crop'],
    category: 'vehicles',
    type: 'Caminhonete',
    city: 'Uberaba',
    state: 'MG',
    author: users[1],
    createdAt: '2025-02-25',
    featured: true,
  },
  {
    id: 'a2',
    title: 'Fazenda 120 Hectares com Curral',
    description: 'Fazenda com 120 hectares em região privilegiada. Possui curral completo, 3 represas, casa sede com 4 quartos. Pasto formado, cerca nova. Ideal para pecuária.',
    price: 3500000,
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop'],
    category: 'realestate',
    type: 'Fazenda',
    city: 'Araguari',
    state: 'MG',
    author: users[2],
    createdAt: '2025-02-24',
    featured: true,
  },
  {
    id: 'a3',
    title: 'Toyota Hilux 2020 SRV',
    description: 'Hilux SRV 2.8 Diesel automática. 45.000 km rodados. Toda original, sem detalhes. IPVA 2025 pago. Aceito financiamento bancário.',
    price: 198000,
    images: ['https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=800&h=600&fit=crop'],
    category: 'vehicles',
    type: 'Caminhonete',
    city: 'Uberlândia',
    state: 'MG',
    author: users[0],
    createdAt: '2025-02-23',
    featured: false,
  },
  {
    id: 'a4',
    title: 'Sítio 5 Alqueires com Piscina',
    description: 'Sítio com casa de 3 quartos, piscina, churrasqueira, pomar formado. Água de mina, energia trifásica. 15 minutos do centro.',
    price: 850000,
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop'],
    category: 'realestate',
    type: 'Sítio',
    city: 'Sacramento',
    state: 'MG',
    author: users[3],
    createdAt: '2025-02-22',
    featured: false,
  },
  {
    id: 'a5',
    title: 'Ford Ranger XLT 2019',
    description: 'Ranger XLT 3.2 Diesel automática. Capota marítima, estribo, para-choque de impulsão. 60.000 km. Pneus BF Goodrich novos.',
    price: 175000,
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop'],
    category: 'vehicles',
    type: 'Caminhonete',
    city: 'Franca',
    state: 'SP',
    author: users[1],
    createdAt: '2025-02-21',
    featured: false,
  },
  {
    id: 'a6',
    title: 'Terreno 1.000m² em Condomínio',
    description: 'Terreno plano em condomínio fechado com segurança 24h. Área de lazer completa. Pronto para construir. Documentação ok.',
    price: 280000,
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop'],
    category: 'realestate',
    type: 'Terreno',
    city: 'Goiânia',
    state: 'GO',
    author: users[2],
    createdAt: '2025-02-20',
    featured: false,
  },
  {
    id: 'a7',
    title: 'Honda CG 160 Titan 2022',
    description: 'Moto em excelente estado, baixa quilometragem. Único dono, todas as revisões feitas. Documento 2025 pago.',
    price: 14500,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop'],
    category: 'vehicles',
    type: 'Moto',
    city: 'Uberaba',
    state: 'MG',
    author: users[3],
    createdAt: '2025-02-19',
    featured: false,
  },
  {
    id: 'a8',
    title: 'Consultoria Agropecuária',
    description: 'Serviço de consultoria para propriedades rurais. Gestão de pastagem, manejo animal, planejamento financeiro. Mais de 15 anos de experiência.',
    price: 0,
    images: ['https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop'],
    category: 'services',
    type: 'Consultoria',
    city: 'Uberlândia',
    state: 'MG',
    author: users[0],
    createdAt: '2025-02-18',
    featured: false,
  },
];

export const events: Event[] = [
  {
    id: 'e1',
    name: 'Feira Agropecuária de Uberaba',
    description: 'A maior feira do Triângulo Mineiro. Exposição de animais, maquinários, palestras e shows. Entrada gratuita.',
    date: '2025-04-15',
    time: '08:00',
    location: 'Parque Fernando Costa',
    city: 'Uberaba',
    state: 'MG',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=400&fit=crop',
    confirmed: false,
    attendees: 234,
  },
  {
    id: 'e2',
    name: 'Encontro de Pecuaristas do Triângulo',
    description: 'Encontro para troca de experiências entre pecuaristas. Palestras sobre manejo, nutrição animal e novas tecnologias.',
    date: '2025-03-20',
    time: '09:00',
    location: 'Centro de Convenções',
    city: 'Uberlândia',
    state: 'MG',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop',
    confirmed: true,
    attendees: 89,
  },
  {
    id: 'e3',
    name: 'Leilão Nelore Especial',
    description: 'Leilão com os melhores exemplares da raça Nelore. Transmissão ao vivo disponível. Catálogo disponível no local.',
    date: '2025-03-28',
    time: '19:00',
    location: 'Fazenda Santa Clara',
    city: 'Araguari',
    state: 'MG',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&h=400&fit=crop',
    confirmed: false,
    attendees: 156,
  },
];

export const orientadores: Orientador[] = [
  {
    id: 'o1',
    name: 'Rafael Hungria',
    role: 'Líder de Expansão',
    bio: 'Responsável pela expansão do BDM em novos territórios. Especialista em agronegócio e relacionamento.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face',
    links: [
      { label: 'WhatsApp', url: '#' },
      { label: 'Instagram', url: '#' },
    ],
  },
  {
    id: 'o2',
    name: 'Urandir',
    role: 'Fundador BDM',
    bio: 'Fundador do projeto Dakila e do movimento BDM. Visionário e empreendedor social.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face',
    links: [
      { label: 'Site Oficial', url: '#' },
      { label: 'YouTube', url: '#' },
    ],
  },
  {
    id: 'o3',
    name: 'Felipe Castelo Branco',
    role: 'Coordenador Regional',
    bio: 'Coordenação de ações de campo e eventos regionais. Atuação no Triângulo Mineiro e Alto Paranaíba.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    links: [
      { label: 'WhatsApp', url: '#' },
      { label: 'Telegram', url: '#' },
    ],
  },
  {
    id: 'o4',
    name: 'Otávio Reis',
    role: 'Orientador Técnico',
    bio: 'Suporte técnico e orientação para novos membros. Especialista em tecnologia e comunicação.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    links: [
      { label: 'WhatsApp', url: '#' },
      { label: 'E-mail', url: '#' },
    ],
  },
];

export const categories = [
  { id: 'vehicles', label: 'Veículos', icon: 'Car', types: ['Caminhonete', 'Automóvel', 'Moto', 'Bicicleta'] },
  { id: 'realestate', label: 'Imóveis', icon: 'Home', types: ['Fazenda', 'Sítio', 'Terreno', 'Casa'] },
  { id: 'services', label: 'Serviços', icon: 'Wrench', types: ['Consultoria', 'Manutenção', 'Transporte'] },
];

export const states = ['MG', 'SP', 'GO', 'MS', 'MT', 'BA', 'PR', 'RS', 'SC', 'RJ'];

export function formatPrice(value: number): string {
  if (value === 0) return 'Consultar';
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 });
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}
