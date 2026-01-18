import type { Lider, Equipe, Colportor, Campanha, Divida, DashboardData, TipoSegmento } from '@/types';

// Mock Users
const users = {
  allysson: {
    id: 'u1',
    email: 'allysson@omega.com',
    nome: 'Allysson Silva',
    role: 'LIDER' as const,
    avatarUrl: '',
    telefone: '(46) 99999-1234',
    ativo: true,
  },
  carlos: {
    id: 'u2',
    email: 'carlos@omega.com',
    nome: 'Carlos Oliveira',
    role: 'LIDER' as const,
    telefone: '(46) 99999-5678',
    ativo: true,
  },
  maria: {
    id: 'u3',
    email: 'maria@omega.com',
    nome: 'Maria Santos',
    role: 'LIDER' as const,
    telefone: '(46) 99999-9012',
    ativo: true,
  },
};

const colportorUsers = [
  { id: 'c1', email: 'joao@omega.com', nome: 'João Pedro', role: 'COLPORTOR' as const, ativo: true },
  { id: 'c2', email: 'pedro@omega.com', nome: 'Pedro Henrique', role: 'COLPORTOR' as const, ativo: true },
  { id: 'c3', email: 'ana@omega.com', nome: 'Ana Clara', role: 'COLPORTOR' as const, ativo: true },
  { id: 'c4', email: 'lucas@omega.com', nome: 'Lucas Gabriel', role: 'COLPORTOR' as const, ativo: true },
  { id: 'c5', email: 'julia@omega.com', nome: 'Júlia Costa', role: 'COLPORTOR' as const, ativo: true },
  { id: 'c6', email: 'mateus@omega.com', nome: 'Mateus Ferreira', role: 'COLPORTOR' as const, ativo: true },
  { id: 'c7', email: 'beatriz@omega.com', nome: 'Beatriz Lima', role: 'COLPORTOR' as const, ativo: true },
  { id: 'c8', email: 'gabriel@omega.com', nome: 'Gabriel Alves', role: 'COLPORTOR' as const, ativo: true },
  { id: 'c9', email: 'sofia@omega.com', nome: 'Sofia Rodrigues', role: 'COLPORTOR' as const, ativo: true },
  { id: 'c10', email: 'miguel@omega.com', nome: 'Miguel Souza', role: 'COLPORTOR' as const, ativo: true },
  { id: 'c11', email: 'laura@omega.com', nome: 'Laura Martins', role: 'COLPORTOR' as const, ativo: true },
  { id: 'c12', email: 'davi@omega.com', nome: 'Davi Pereira', role: 'COLPORTOR' as const, ativo: true },
];

// Colportores
const createColportores = (equipeId: string, startIndex: number, count: number): Colportor[] => {
  return colportorUsers.slice(startIndex, startIndex + count).map((user, i) => ({
    id: `col-${equipeId}-${i}`,
    equipeId,
    userId: user.id,
    metaVendas: 2000 + Math.random() * 1000,
    metaVisitas: 50 + Math.floor(Math.random() * 30),
    metaPalestras: 3 + Math.floor(Math.random() * 5),
    ehPalestrante: i < 2,
    ehAgendista: i >= 2 && i < 4,
    user,
    totalVendas: 1500 + Math.random() * 1500,
    totalVisitas: 30 + Math.floor(Math.random() * 40),
    totalPalestras: Math.floor(Math.random() * 6),
    totalDividas: Math.floor(Math.random() * 3),
  }));
};

// Equipes
const createEquipe = (id: string, liderId: string, nome: string, tipo: TipoSegmento, colportorStartIndex: number, colportorCount: number): Equipe => {
  const colportores = createColportores(id, colportorStartIndex, colportorCount);
  const totalVendas = colportores.reduce((sum, c) => sum + (c.totalVendas || 0), 0);
  const totalVisitas = colportores.reduce((sum, c) => sum + (c.totalVisitas || 0), 0);
  const totalPalestras = colportores.reduce((sum, c) => sum + (c.totalPalestras || 0), 0);
  
  return {
    id,
    liderId,
    nome,
    tipo,
    metaVendas: colportorCount * 2500,
    metaVisitas: colportorCount * 60,
    metaPalestras: colportorCount * 4,
    colportores,
    totalVendas,
    totalVisitas,
    totalPalestras,
  };
};

// Líderes
export const mockLideres: Lider[] = [
  {
    id: 'l1',
    campanhaId: 'camp1',
    userId: users.allysson.id,
    cidade: 'Pato Branco',
    descricao: 'Líder da região sudoeste',
    metaVendas: 25000,
    metaVisitas: 300,
    metaPalestras: 20,
    user: users.allysson,
    equipes: [
      createEquipe('eq1', 'l1', 'Equipe Palestra', 'PALESTRA', 0, 4),
      createEquipe('eq2', 'l1', 'Equipe Casa em Casa', 'CASA_EM_CASA', 4, 3),
      createEquipe('eq3', 'l1', 'Equipe Indicação', 'INDICACAO', 7, 2),
    ],
    get totalVendas() {
      return this.equipes.reduce((sum, e) => sum + (e.totalVendas || 0), 0);
    },
    get totalVisitas() {
      return this.equipes.reduce((sum, e) => sum + (e.totalVisitas || 0), 0);
    },
    get totalPalestras() {
      return this.equipes.reduce((sum, e) => sum + (e.totalPalestras || 0), 0);
    },
    get totalColportores() {
      return this.equipes.reduce((sum, e) => sum + e.colportores.length, 0);
    },
    totalDividas: 5,
    valorDividas: 1250,
  },
  {
    id: 'l2',
    campanhaId: 'camp1',
    userId: users.carlos.id,
    cidade: 'Francisco Beltrão',
    descricao: 'Líder experiente',
    metaVendas: 20000,
    metaVisitas: 250,
    metaPalestras: 15,
    user: users.carlos,
    equipes: [
      createEquipe('eq4', 'l2', 'Equipe Comercial', 'COMERCIO', 0, 3),
      createEquipe('eq5', 'l2', 'Equipe Casa em Casa FB', 'CASA_EM_CASA', 3, 3),
    ],
    get totalVendas() {
      return this.equipes.reduce((sum, e) => sum + (e.totalVendas || 0), 0);
    },
    get totalVisitas() {
      return this.equipes.reduce((sum, e) => sum + (e.totalVisitas || 0), 0);
    },
    get totalPalestras() {
      return this.equipes.reduce((sum, e) => sum + (e.totalPalestras || 0), 0);
    },
    get totalColportores() {
      return this.equipes.reduce((sum, e) => sum + e.colportores.length, 0);
    },
    totalDividas: 3,
    valorDividas: 890,
  },
  {
    id: 'l3',
    campanhaId: 'camp1',
    userId: users.maria.id,
    cidade: 'Dois Vizinhos',
    descricao: 'Nova líder com muito potencial',
    metaVendas: 15000,
    metaVisitas: 180,
    metaPalestras: 12,
    user: users.maria,
    equipes: [
      createEquipe('eq6', 'l3', 'Equipe Assistência', 'ASSISTENCIA', 0, 2),
      createEquipe('eq7', 'l3', 'Equipe Indicação DV', 'INDICACAO', 2, 2),
    ],
    get totalVendas() {
      return this.equipes.reduce((sum, e) => sum + (e.totalVendas || 0), 0);
    },
    get totalVisitas() {
      return this.equipes.reduce((sum, e) => sum + (e.totalVisitas || 0), 0);
    },
    get totalPalestras() {
      return this.equipes.reduce((sum, e) => sum + (e.totalPalestras || 0), 0);
    },
    get totalColportores() {
      return this.equipes.reduce((sum, e) => sum + e.colportores.length, 0);
    },
    totalDividas: 2,
    valorDividas: 450,
  },
];

// Campanha
export const mockCampanha: Campanha = {
  id: 'camp1',
  nome: 'Férias de Inverno 2026',
  descricao: 'Campanha de inverno para toda a região sudoeste do Paraná',
  dataInicio: new Date('2026-07-01'),
  dataFim: new Date('2026-07-31'),
  metaGlobal: 60000,
  ativa: true,
  visao: 'Alcançar cada família da região com literatura de qualidade',
  fundamentos: 'Fé, dedicação e trabalho em equipe',
};

// Mock devedores
export const mockDevedores: Divida[] = [
  {
    id: 'd1',
    atividadeId: 'at1',
    colportorId: 'col-eq1-0',
    valorTotal: 350,
    valorPago: 0,
    dataVencimento: new Date('2026-01-10'),
    status: 'INADIMPLENTE',
    clienteNome: 'Roberto Silva',
    clienteTelefone: '(46) 99888-1234',
    clienteEndereco: 'Rua das Flores, 123',
    notas: 'Cliente pediu prazo extra',
  },
  {
    id: 'd2',
    atividadeId: 'at2',
    colportorId: 'col-eq2-1',
    valorTotal: 280,
    valorPago: 100,
    dataVencimento: new Date('2026-01-15'),
    status: 'PARCIAL',
    clienteNome: 'Ana Maria Costa',
    clienteTelefone: '(46) 99777-5678',
    clienteEndereco: 'Av. Brasil, 456',
  },
  {
    id: 'd3',
    atividadeId: 'at3',
    colportorId: 'col-eq1-2',
    valorTotal: 420,
    valorPago: 0,
    dataVencimento: new Date('2026-01-05'),
    status: 'INADIMPLENTE',
    clienteNome: 'José Pereira',
    clienteTelefone: '(46) 99666-9012',
    clienteEndereco: 'Rua Paraná, 789',
    notas: 'Sem retorno nas ligações',
  },
  {
    id: 'd4',
    atividadeId: 'at4',
    colportorId: 'col-eq4-0',
    valorTotal: 200,
    valorPago: 0,
    dataVencimento: new Date('2026-01-12'),
    status: 'PENDENTE',
    clienteNome: 'Mariana Souza',
    clienteTelefone: '(46) 99555-3456',
  },
];

// Dashboard data aggregated
export const getMockDashboardData = (): DashboardData => {
  const totalVendido = mockLideres.reduce((sum, l) => sum + (l.totalVendas || 0), 0);
  const totalVisitas = mockLideres.reduce((sum, l) => sum + (l.totalVisitas || 0), 0);
  const totalPalestras = mockLideres.reduce((sum, l) => sum + (l.totalPalestras || 0), 0);
  const totalColportores = mockLideres.reduce((sum, l) => sum + (l.totalColportores || 0), 0);
  const valorDividas = mockLideres.reduce((sum, l) => sum + (l.valorDividas || 0), 0);
  const totalDevedores = mockDevedores.length;

  // Find best leader
  const melhorLider = mockLideres.reduce((best, l) => 
    (l.totalVendas || 0) > (best.totalVendas || 0) ? l : best
  , mockLideres[0]);

  // Vendas por segmento
  const vendasPorSegmento: { tipo: TipoSegmento; valor: number }[] = [
    { tipo: 'PALESTRA', valor: 12500 },
    { tipo: 'CASA_EM_CASA', valor: 15200 },
    { tipo: 'INDICACAO', valor: 8900 },
    { tipo: 'COMERCIO', valor: 6300 },
    { tipo: 'ASSISTENCIA', valor: 4100 },
  ];

  // Evolução semanal (mock)
  const evolucaoSemanal = [
    { semana: 1, realizado: 8500, meta: 15000 },
    { semana: 2, realizado: 18200, meta: 30000 },
    { semana: 3, realizado: 32100, meta: 45000 },
    { semana: 4, realizado: 47000, meta: 60000 },
  ];

  // Top colportores
  const allColportores = mockLideres.flatMap(l => l.equipes.flatMap(e => e.colportores));
  const topColportores = allColportores
    .sort((a, b) => (b.totalVendas || 0) - (a.totalVendas || 0))
    .slice(0, 5)
    .map(c => ({
      nome: c.user.nome,
      valor: c.totalVendas || 0,
      meta: c.metaVendas,
      percentual: ((c.totalVendas || 0) / c.metaVendas) * 100,
    }));

  return {
    campanha: mockCampanha,
    kpis: {
      totalVendido,
      metaGlobal: mockCampanha.metaGlobal,
      atingimento: (totalVendido / mockCampanha.metaGlobal) * 100,
      totalColportores,
      totalVisitas,
      totalPalestras,
      totalDevedores,
      valorDividas,
      melhorLider: { nome: melhorLider.user.nome, valor: melhorLider.totalVendas || 0 },
    },
    lideres: mockLideres,
    vendasPorSegmento,
    evolucaoSemanal,
    topColportores,
    devedoresCriticos: mockDevedores.filter(d => d.status === 'INADIMPLENTE'),
  };
};

export const getLiderById = (id: string): Lider | undefined => {
  return mockLideres.find(l => l.id === id);
};

export const getEquipeById = (equipeId: string): { equipe: Equipe; lider: Lider } | undefined => {
  for (const lider of mockLideres) {
    const equipe = lider.equipes.find(e => e.id === equipeId);
    if (equipe) {
      return { equipe, lider };
    }
  }
  return undefined;
};

export const getColportorById = (colportorId: string): { colportor: Colportor; equipe: Equipe; lider: Lider } | undefined => {
  for (const lider of mockLideres) {
    for (const equipe of lider.equipes) {
      const colportor = equipe.colportores.find(c => c.id === colportorId);
      if (colportor) {
        return { colportor, equipe, lider };
      }
    }
  }
  return undefined;
};
