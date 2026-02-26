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

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: 'vehicles' | 'realestate' | 'services' | 'products';
  type: string;
  condition?: string;
  city: string;
  state: string;
  author: User;
  createdAt: string;
  featured: boolean;
  saved?: boolean;
  likes: number;
  liked?: boolean;
  comments: Comment[];
}

export interface OrientadorPost {
  id: string;
  orientadorId: string;
  orientadorName: string;
  orientadorAvatar: string;
  orientadorRole: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  likes: number;
  liked?: boolean;
  comments: Comment[];
  socialLinks: { instagram?: string; tiktok?: string; youtube?: string };
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface ChatConversation {
  id: string;
  adId: string;
  adTitle: string;
  participants: User[];
  messages: ChatMessage[];
  lastSeen?: string;
  online?: boolean;
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
  socialLinks: { instagram?: string; tiktok?: string; youtube?: string };
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
  {
    id: 'u5',
    name: 'Roberto Santos',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    verified: true,
    city: 'Campo Grande',
    state: 'MS',
    phone: '(67) 99999-0005',
    joinedAt: '2024-06-12',
  },
];

export { users };

const mockComments: Comment[] = [
  { id: 'c1', userId: 'u2', userName: 'Maria Silva', userAvatar: users[1].avatar, text: 'Que beleza! Ainda está disponível?', createdAt: '2025-02-25' },
  { id: 'c2', userId: 'u3', userName: 'José Oliveira', userAvatar: users[2].avatar, text: 'Aceita troca?', createdAt: '2025-02-25' },
  { id: 'c3', userId: 'u4', userName: 'Ana Ferreira', userAvatar: users[3].avatar, text: 'Muito bom preço!', createdAt: '2025-02-24' },
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
    condition: 'Usado',
    city: 'Uberaba',
    state: 'MG',
    author: users[1],
    createdAt: '2025-02-25',
    featured: true,
    likes: 24,
    comments: [mockComments[0], mockComments[1]],
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
    likes: 18,
    comments: [mockComments[2]],
  },
  {
    id: 'a3',
    title: 'Toyota Hilux 2020 SRV',
    description: 'Hilux SRV 2.8 Diesel automática. 45.000 km rodados. Toda original, sem detalhes. IPVA 2025 pago. Aceito financiamento bancário.',
    price: 198000,
    images: ['https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?w=800&h=600&fit=crop'],
    category: 'vehicles',
    type: 'Caminhonete',
    condition: 'Usado',
    city: 'Uberlândia',
    state: 'MG',
    author: users[0],
    createdAt: '2025-02-23',
    featured: false,
    likes: 12,
    comments: [],
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
    likes: 9,
    comments: [],
  },
  {
    id: 'a5',
    title: 'Ford Ranger XLT 2019',
    description: 'Ranger XLT 3.2 Diesel automática. Capota marítima, estribo, para-choque de impulsão. 60.000 km. Pneus BF Goodrich novos.',
    price: 175000,
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop'],
    category: 'vehicles',
    type: 'Caminhonete',
    condition: 'Usado',
    city: 'Franca',
    state: 'SP',
    author: users[1],
    createdAt: '2025-02-21',
    featured: false,
    likes: 7,
    comments: [],
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
    likes: 5,
    comments: [],
  },
  {
    id: 'a7',
    title: 'Honda CG 160 Titan 2022',
    description: 'Moto em excelente estado, baixa quilometragem. Único dono, todas as revisões feitas. Documento 2025 pago.',
    price: 14500,
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop'],
    category: 'vehicles',
    type: 'Moto',
    condition: 'Usado',
    city: 'Uberaba',
    state: 'MG',
    author: users[3],
    createdAt: '2025-02-19',
    featured: false,
    likes: 15,
    comments: [mockComments[0]],
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
    likes: 3,
    comments: [],
  },
  // Products category
  {
    id: 'a9',
    title: 'Kit Cosméticos Dakila - Completo',
    description: 'Kit completo com shampoo, condicionador, creme hidratante e sabonete artesanal Dakila. Produtos 100% naturais feitos com ingredientes selecionados.',
    price: 189,
    images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=600&fit=crop'],
    category: 'products',
    type: 'Cosméticos Dakila',
    condition: 'Novo',
    city: 'Uberaba',
    state: 'MG',
    author: users[4],
    createdAt: '2025-02-26',
    featured: true,
    likes: 32,
    comments: [
      { id: 'c10', userId: 'u2', userName: 'Maria Silva', userAvatar: users[1].avatar, text: 'Adoro esses produtos! Quero comprar o kit completo.', createdAt: '2025-02-26' },
    ],
  },
  {
    id: 'a10',
    title: 'Colar de Pedra Ametista Natural',
    description: 'Colar artesanal com pedra ametista natural polida. Cordão de couro legítimo ajustável. Peça única e exclusiva.',
    price: 85,
    images: ['https://images.unsplash.com/photo-1515562141589-67f0d569b6fc?w=800&h=600&fit=crop'],
    category: 'products',
    type: 'Colares e Pedras',
    condition: 'Novo',
    city: 'Uberlândia',
    state: 'MG',
    author: users[1],
    createdAt: '2025-02-25',
    featured: false,
    likes: 21,
    comments: [],
  },
  {
    id: 'a11',
    title: 'Chá de Moringa - 200g',
    description: 'Chá de moringa oleifera desidratada. Produção artesanal, secagem natural. Rico em vitaminas e minerais. Embalagem para 60 dias de uso.',
    price: 45,
    images: ['https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&h=600&fit=crop'],
    category: 'products',
    type: 'Chás de Moringa',
    condition: 'Novo',
    city: 'Campo Grande',
    state: 'MS',
    author: users[4],
    createdAt: '2025-02-24',
    featured: false,
    likes: 14,
    comments: [
      { id: 'c11', userId: 'u3', userName: 'José Oliveira', userAvatar: users[2].avatar, text: 'Faz entrega para SP?', createdAt: '2025-02-24' },
    ],
  },
  {
    id: 'a12',
    title: 'Kit Pedras Energéticas - 7 Chakras',
    description: 'Conjunto com 7 pedras naturais para alinhamento dos chakras. Inclui ametista, quartzo rosa, citrino, aventurina, sodalita, cornalina e jaspe vermelho.',
    price: 120,
    images: ['https://images.unsplash.com/photo-1603344204980-4edb0ea63148?w=800&h=600&fit=crop'],
    category: 'products',
    type: 'Colares e Pedras',
    condition: 'Novo',
    city: 'Goiânia',
    state: 'GO',
    author: users[3],
    createdAt: '2025-02-23',
    featured: false,
    likes: 8,
    comments: [],
  },
  {
    id: 'a13',
    title: 'Manutenção de Cercas Rurais',
    description: 'Serviço de manutenção e construção de cercas para propriedades rurais. Materiais inclusos. Atendo toda a região do Triângulo Mineiro.',
    price: 0,
    images: ['https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&h=600&fit=crop'],
    category: 'services',
    type: 'Manutenção',
    city: 'Uberaba',
    state: 'MG',
    author: users[2],
    createdAt: '2025-02-22',
    featured: false,
    likes: 6,
    comments: [],
  },
  {
    id: 'a14',
    title: 'Saveiro Cross 2021',
    description: 'Saveiro Cross 1.6 completa. Ar, direção, vidros e travas elétricas. 30.000 km. Único dono.',
    price: 82000,
    images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop'],
    category: 'vehicles',
    type: 'Automóvel',
    condition: 'Usado',
    city: 'Ribeirão Preto',
    state: 'SP',
    author: users[4],
    createdAt: '2025-02-21',
    featured: false,
    likes: 11,
    comments: [],
  },
  {
    id: 'a15',
    title: 'Sabonete Artesanal Dakila - Kit 6 un',
    description: 'Kit com 6 sabonetes artesanais Dakila. Fragrâncias: lavanda, alecrim, camomila, erva-doce, capim-limão e hortelã. Sem química.',
    price: 59,
    images: ['https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=800&h=600&fit=crop'],
    category: 'products',
    type: 'Cosméticos Dakila',
    condition: 'Novo',
    city: 'Uberaba',
    state: 'MG',
    author: users[0],
    createdAt: '2025-02-20',
    featured: false,
    likes: 19,
    comments: [
      { id: 'c12', userId: 'u4', userName: 'Ana Ferreira', userAvatar: users[3].avatar, text: 'Amei! Quero dois kits!', createdAt: '2025-02-20' },
    ],
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
    socialLinks: { instagram: '#', youtube: '#', tiktok: '#' },
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
    socialLinks: { instagram: '#', youtube: '#', tiktok: '#' },
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
    socialLinks: { instagram: '#', youtube: '#' },
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
    socialLinks: { instagram: '#', tiktok: '#' },
  },
];

export const orientadorPosts: OrientadorPost[] = [
  {
    id: 'op1',
    orientadorId: 'o2',
    orientadorName: 'Urandir',
    orientadorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face',
    orientadorRole: 'Fundador BDM',
    title: 'Novidades sobre o Projeto Dakila 2025',
    content: 'Estamos com grandes novidades para 2025! O projeto Dakila está expandindo para novas regiões e lançando produtos exclusivos. Fiquem atentos às próximas atualizações.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
    createdAt: '2025-02-26',
    likes: 87,
    comments: [
      { id: 'oc1', userId: 'u1', userName: 'Carlos Mendes', userAvatar: users[0].avatar, text: 'Excelente notícia!', createdAt: '2025-02-26' },
      { id: 'oc2', userId: 'u2', userName: 'Maria Silva', userAvatar: users[1].avatar, text: 'Ansioso para as novidades!', createdAt: '2025-02-26' },
    ],
    socialLinks: { instagram: '#', youtube: '#', tiktok: '#' },
  },
  {
    id: 'op2',
    orientadorId: 'o1',
    orientadorName: 'Rafael Hungria',
    orientadorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face',
    orientadorRole: 'Líder de Expansão',
    title: 'Expansão BDM - Novos Estados',
    content: 'O BDM Marketplace agora está presente em 10 estados brasileiros! Nosso trabalho de expansão territorial continua forte. Em breve, mais regiões serão alcançadas.',
    image: 'https://images.unsplash.com/photo-1553729459-afe8f2e2ed08?w=800&h=600&fit=crop',
    createdAt: '2025-02-25',
    likes: 54,
    comments: [
      { id: 'oc3', userId: 'u3', userName: 'José Oliveira', userAvatar: users[2].avatar, text: 'Quando chega em Ribeirão Preto?', createdAt: '2025-02-25' },
    ],
    socialLinks: { instagram: '#', youtube: '#' },
  },
  {
    id: 'op3',
    orientadorId: 'o3',
    orientadorName: 'Felipe Castelo Branco',
    orientadorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    orientadorRole: 'Coordenador Regional',
    title: 'Ação de Campo - Triângulo Mineiro',
    content: 'Realizamos mais uma ação de campo com sucesso! Foram 3 dias de atividades intensas no Triângulo Mineiro, com visitas a propriedades e encontros com produtores.',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop',
    createdAt: '2025-02-23',
    likes: 41,
    comments: [],
    socialLinks: { instagram: '#' },
  },
  {
    id: 'op4',
    orientadorId: 'o4',
    orientadorName: 'Otávio Reis',
    orientadorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    orientadorRole: 'Orientador Técnico',
    title: 'Dicas para Usar o Marketplace',
    content: 'Aprenda a tirar o melhor proveito do Achei Bilu! Neste vídeo, mostro como publicar seu anúncio, negociar com segurança e usar os filtros de busca.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
    createdAt: '2025-02-22',
    likes: 33,
    comments: [
      { id: 'oc4', userId: 'u4', userName: 'Ana Ferreira', userAvatar: users[3].avatar, text: 'Muito útil, obrigada!', createdAt: '2025-02-22' },
    ],
    socialLinks: { instagram: '#', tiktok: '#', youtube: '#' },
  },
  {
    id: 'op5',
    orientadorId: 'o2',
    orientadorName: 'Urandir',
    orientadorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face',
    orientadorRole: 'Fundador BDM',
    title: 'Lançamento: Cosméticos Dakila 2025',
    content: 'É com orgulho que anunciamos a nova linha de cosméticos Dakila! Produtos 100% naturais, desenvolvidos com ingredientes brasileiros. Disponíveis agora no marketplace.',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=600&fit=crop',
    createdAt: '2025-02-20',
    likes: 92,
    comments: [
      { id: 'oc5', userId: 'u1', userName: 'Carlos Mendes', userAvatar: users[0].avatar, text: 'Maravilhoso! Já estou usando.', createdAt: '2025-02-20' },
      { id: 'oc6', userId: 'u2', userName: 'Maria Silva', userAvatar: users[1].avatar, text: 'Os melhores cosméticos!', createdAt: '2025-02-20' },
    ],
    socialLinks: { instagram: '#', youtube: '#' },
  },
];

export const chatConversations: ChatConversation[] = [
  {
    id: 'chat1',
    adId: 'a1',
    adTitle: 'Caminhonete S10 2018 Diesel',
    participants: [users[0], users[1]],
    online: true,
    messages: [
      { id: 'm1', senderId: 'u1', text: 'Olá, a caminhonete ainda está disponível?', timestamp: '2025-02-25T10:00:00' },
      { id: 'm2', senderId: 'u2', text: 'Sim, está disponível! Quer agendar uma visita?', timestamp: '2025-02-25T10:05:00' },
      { id: 'm3', senderId: 'u1', text: 'Claro! Posso ir amanhã à tarde?', timestamp: '2025-02-25T10:10:00' },
      { id: 'm4', senderId: 'u2', text: 'Perfeito! Pode vir a partir das 14h. Te envio a localização.', timestamp: '2025-02-25T10:15:00' },
    ],
  },
  {
    id: 'chat2',
    adId: 'a9',
    adTitle: 'Kit Cosméticos Dakila - Completo',
    participants: [users[0], users[4]],
    online: false,
    lastSeen: '2025-02-26T08:30:00',
    messages: [
      { id: 'm5', senderId: 'u1', text: 'Boa tarde! Tem o kit disponível?', timestamp: '2025-02-26T09:00:00' },
      { id: 'm6', senderId: 'u5', text: 'Tem sim! Posso enviar pelos correios ou você pode retirar.', timestamp: '2025-02-26T09:10:00' },
    ],
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

export const categories = [
  { id: 'vehicles', label: 'Veículos', icon: 'Car', types: ['Caminhonete', 'Automóvel', 'Moto', 'Bicicleta'] },
  { id: 'realestate', label: 'Imóveis', icon: 'Home', types: ['Fazenda', 'Sítio', 'Terreno', 'Casa'] },
  { id: 'services', label: 'Serviços', icon: 'Wrench', types: ['Consultoria', 'Manutenção', 'Transporte'] },
  { id: 'products', label: 'Produtos', icon: 'ShoppingBag', types: ['Cosméticos Dakila', 'Colares e Pedras', 'Chás de Moringa', 'Outros'] },
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

export function getUserById(id: string): User | undefined {
  return users.find(u => u.id === id);
}

export function getAnnouncementsByUser(userId: string): Announcement[] {
  return announcements.filter(a => a.author.id === userId);
}
