// Enums
export type UserRole = 'ADMIN' | 'COORDENADOR' | 'LIDER' | 'ASSISTENTE' | 'COLPORTOR';

export type TipoSegmento = 'PALESTRA' | 'CASA_EM_CASA' | 'INDICACAO' | 'COMERCIO' | 'ASSISTENCIA';

export type StatusAtividade = 'VENDA' | 'AGENDAMENTO' | 'RECUSA' | 'AUSENTE' | 'DIVIDA';

export type MetodoPagamento = 'PIX' | 'DINHEIRO' | 'CARTAO_CREDITO' | 'CARTAO_DEBITO' | 'BOLETO' | 'FOLHA' | 'A_PRAZO';

export type StatusDivida = 'PENDENTE' | 'PARCIAL' | 'QUITADA' | 'INADIMPLENTE';

export type TipoItemSWOT = 'FORCA' | 'FRAQUEZA' | 'OPORTUNIDADE' | 'AMEACA';

// Interfaces
export interface User {
  id: string;
  email: string;
  nome: string;
  role: UserRole;
  avatarUrl?: string;
  telefone?: string;
  ativo: boolean;
}

export interface Campanha {
  id: string;
  nome: string;
  descricao?: string;
  dataInicio: Date;
  dataFim: Date;
  metaGlobal: number;
  ativa: boolean;
  visao?: string;
  fundamentos?: string;
}

export interface Lider {
  id: string;
  campanhaId: string;
  userId: string;
  cidade: string;
  descricao?: string;
  metaVendas: number;
  metaVisitas: number;
  metaPalestras: number;
  user: User;
  equipes: Equipe[];
  // Computed
  totalVendas?: number;
  totalVisitas?: number;
  totalPalestras?: number;
  totalColportores?: number;
  totalDividas?: number;
  valorDividas?: number;
}

export interface Equipe {
  id: string;
  liderId: string;
  nome: string;
  tipo: TipoSegmento;
  descricao?: string;
  metaVendas: number;
  metaVisitas: number;
  metaPalestras: number;
  colportores: Colportor[];
  // Computed
  totalVendas?: number;
  totalVisitas?: number;
  totalPalestras?: number;
}

export interface Colportor {
  id: string;
  equipeId: string;
  userId: string;
  apelido?: string;
  metaVendas: number;
  metaVisitas: number;
  metaPalestras: number;
  ehPalestrante: boolean;
  ehAgendista: boolean;
  user: User;
  // Computed
  totalVendas?: number;
  totalVisitas?: number;
  totalPalestras?: number;
  totalDividas?: number;
}

export interface Atividade {
  id: string;
  colportorId: string;
  data: Date;
  tipo: 'PORTA_A_PORTA' | 'INDICACAO' | 'PALESTRA' | 'REVISITA' | 'COMERCIO';
  status: StatusAtividade;
  valor: number;
  metodoPagamento?: MetodoPagamento;
  latitude?: number;
  longitude?: number;
  endereco?: string;
  clienteNome?: string;
  clienteTelefone?: string;
  notas?: string;
}

export interface Divida {
  id: string;
  atividadeId: string;
  colportorId: string;
  valorTotal: number;
  valorPago: number;
  dataVencimento: Date;
  dataPagamento?: Date;
  status: StatusDivida;
  clienteNome: string;
  clienteTelefone?: string;
  clienteEndereco?: string;
  notas?: string;
  colportor?: Colportor;
}

export interface MetaSemanal {
  id: string;
  equipeId: string;
  semana: number;
  ano: number;
  metaVendas: number;
  metaVisitas: number;
  metaPalestras: number;
  realizadoVendas: number;
  realizadoVisitas: number;
  realizadoPalestras: number;
}

export interface SWOTItem {
  id: string;
  tipo: TipoItemSWOT;
  texto: string;
  prioridade: number;
  geradoPorIA: boolean;
}

// KPI Types
export interface KPIData {
  titulo: string;
  valor: string | number;
  subtitulo?: string;
  variacao?: {
    valor: number;
    periodo: string;
  };
  progresso?: {
    atual: number;
    meta: number;
  };
}

// Dashboard Types
export interface DashboardData {
  campanha: Campanha;
  kpis: {
    totalVendido: number;
    metaGlobal: number;
    atingimento: number;
    totalColportores: number;
    totalVisitas: number;
    totalPalestras: number;
    totalDevedores: number;
    valorDividas: number;
    melhorLider: { nome: string; valor: number };
  };
  lideres: Lider[];
  vendasPorSegmento: { tipo: TipoSegmento; valor: number }[];
  evolucaoSemanal: { semana: number; realizado: number; meta: number }[];
  topColportores: { nome: string; valor: number; meta: number; percentual: number }[];
  devedoresCriticos: Divida[];
}

// Segment info helper
export const segmentInfo: Record<TipoSegmento, { label: string; icon: string; color: string }> = {
  PALESTRA: { label: 'Palestra', icon: '🎤', color: 'segment-palestra' },
  CASA_EM_CASA: { label: 'Casa em Casa', icon: '🏠', color: 'segment-casa' },
  INDICACAO: { label: 'Indicação', icon: '🤝', color: 'segment-indicacao' },
  COMERCIO: { label: 'Comércio', icon: '🏪', color: 'segment-comercio' },
  ASSISTENCIA: { label: 'Assistência', icon: '💝', color: 'segment-assistencia' },
};
