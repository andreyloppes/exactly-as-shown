import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Plus, 
  Search, 
  Filter,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  CheckCircle2,
  XCircle,
  AlertCircle,
  PhoneCall,
  CreditCard,
  Home,
  Building,
  Mic,
  Users
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { mockLideres } from '@/lib/mockData';
import type { Atividade, StatusAtividade, MetodoPagamento } from '@/types';

// Mock activities
const mockAtividades: Atividade[] = [
  {
    id: 'a1',
    colportorId: 'col-eq1-0',
    data: new Date('2026-01-18T09:30:00'),
    tipo: 'PORTA_A_PORTA',
    status: 'VENDA',
    valor: 150,
    metodoPagamento: 'PIX',
    latitude: -26.2295,
    longitude: -52.6713,
    endereco: 'Rua das Flores, 123 - Pato Branco',
    clienteNome: 'Maria da Silva',
    clienteTelefone: '(46) 99999-1234',
    notas: 'Cliente muito interessada, pediu catálogo completo',
  },
  {
    id: 'a2',
    colportorId: 'col-eq1-1',
    data: new Date('2026-01-18T10:15:00'),
    tipo: 'PALESTRA',
    status: 'VENDA',
    valor: 450,
    metodoPagamento: 'CARTAO_CREDITO',
    endereco: 'Igreja Central - Av. Brasil, 500',
    clienteNome: 'Grupo de Jovens',
    notas: 'Palestra sobre saúde, 15 participantes, 3 vendas',
  },
  {
    id: 'a3',
    colportorId: 'col-eq2-0',
    data: new Date('2026-01-18T11:00:00'),
    tipo: 'INDICACAO',
    status: 'AGENDAMENTO',
    valor: 0,
    endereco: 'Rua Paraná, 456',
    clienteNome: 'José Pereira',
    clienteTelefone: '(46) 99888-5678',
    notas: 'Agendado para amanhã às 14h',
  },
  {
    id: 'a4',
    colportorId: 'col-eq1-2',
    data: new Date('2026-01-18T14:30:00'),
    tipo: 'PORTA_A_PORTA',
    status: 'DIVIDA',
    valor: 280,
    metodoPagamento: 'A_PRAZO',
    endereco: 'Rua São Paulo, 789',
    clienteNome: 'Ana Oliveira',
    clienteTelefone: '(46) 99777-9012',
    notas: 'Vai pagar na próxima semana',
  },
  {
    id: 'a5',
    colportorId: 'col-eq3-0',
    data: new Date('2026-01-18T15:45:00'),
    tipo: 'COMERCIO',
    status: 'RECUSA',
    valor: 0,
    endereco: 'Loja Centro - Av. Tupi, 100',
    notas: 'Gerente não quis atender',
  },
  {
    id: 'a6',
    colportorId: 'col-eq1-0',
    data: new Date('2026-01-17T09:00:00'),
    tipo: 'REVISITA',
    status: 'VENDA',
    valor: 120,
    metodoPagamento: 'DINHEIRO',
    endereco: 'Rua das Flores, 123 - Pato Branco',
    clienteNome: 'Maria da Silva',
    clienteTelefone: '(46) 99999-1234',
  },
];

const statusConfig: Record<StatusAtividade, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  VENDA: { label: 'Venda', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', icon: CheckCircle2 },
  AGENDAMENTO: { label: 'Agendamento', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: Calendar },
  RECUSA: { label: 'Recusa', color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: XCircle },
  AUSENTE: { label: 'Ausente', color: 'bg-muted text-muted-foreground border-border', icon: AlertCircle },
  DIVIDA: { label: 'Dívida', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', icon: AlertCircle },
};

const tipoConfig: Record<string, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  PORTA_A_PORTA: { label: 'Porta a Porta', icon: Home },
  INDICACAO: { label: 'Indicação', icon: Users },
  PALESTRA: { label: 'Palestra', icon: Mic },
  REVISITA: { label: 'Revisita', icon: PhoneCall },
  COMERCIO: { label: 'Comércio', icon: Building },
};

const pagamentoConfig: Record<MetodoPagamento, string> = {
  PIX: 'PIX',
  DINHEIRO: 'Dinheiro',
  CARTAO_CREDITO: 'Cartão Crédito',
  CARTAO_DEBITO: 'Cartão Débito',
  BOLETO: 'Boleto',
  FOLHA: 'Folha',
  A_PRAZO: 'A Prazo',
};

export default function AtividadesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [tipoFilter, setTipoFilter] = useState<string>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [atividades] = useState<Atividade[]>(mockAtividades);

  // Get colportor name by ID
  const getColportorNome = (colportorId: string): string => {
    for (const lider of mockLideres) {
      for (const equipe of lider.equipes) {
        const colportor = equipe.colportores.find(c => c.id === colportorId);
        if (colportor) return colportor.user.nome;
      }
    }
    return 'Desconhecido';
  };

  const filteredAtividades = atividades.filter(a => {
    const matchesSearch = 
      a.clienteNome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.endereco?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getColportorNome(a.colportorId).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    const matchesTipo = tipoFilter === 'all' || a.tipo === tipoFilter;

    return matchesSearch && matchesStatus && matchesTipo;
  });

  const stats = {
    total: atividades.length,
    vendas: atividades.filter(a => a.status === 'VENDA').length,
    agendamentos: atividades.filter(a => a.status === 'AGENDAMENTO').length,
    recusas: atividades.filter(a => a.status === 'RECUSA').length,
    dividas: atividades.filter(a => a.status === 'DIVIDA').length,
    valorTotal: atividades.filter(a => a.status === 'VENDA').reduce((sum, a) => sum + a.valor, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Atividades</h1>
          <p className="text-muted-foreground">
            Registro e acompanhamento de atividades dos colportores
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
              <Plus className="mr-2 h-4 w-4" />
              Nova Atividade
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Registrar Nova Atividade</DialogTitle>
              <DialogDescription>
                Preencha os dados da atividade realizada
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de Atividade</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(tipoConfig).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          {config.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(statusConfig).map(([key, config]) => (
                        <SelectItem key={key} value={key}>
                          {config.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Nome do Cliente</Label>
                <Input placeholder="Nome completo" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input placeholder="(00) 00000-0000" />
                </div>
                <div className="space-y-2">
                  <Label>Valor (R$)</Label>
                  <Input type="number" placeholder="0,00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Método de Pagamento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(pagamentoConfig).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Endereço</Label>
                <div className="flex gap-2">
                  <Input placeholder="Endereço completo" className="flex-1" />
                  <Button variant="outline" size="icon">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Observações</Label>
                <Textarea placeholder="Notas sobre a atividade..." />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setDialogOpen(false)}>
                Salvar Atividade
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="bg-card/50">
          <CardContent className="pt-4">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className="bg-emerald-500/10 border-emerald-500/30">
          <CardContent className="pt-4">
            <p className="text-xs text-emerald-400">Vendas</p>
            <p className="text-2xl font-bold text-emerald-400">{stats.vendas}</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-500/10 border-blue-500/30">
          <CardContent className="pt-4">
            <p className="text-xs text-blue-400">Agendamentos</p>
            <p className="text-2xl font-bold text-blue-400">{stats.agendamentos}</p>
          </CardContent>
        </Card>
        <Card className="bg-red-500/10 border-red-500/30">
          <CardContent className="pt-4">
            <p className="text-xs text-red-400">Recusas</p>
            <p className="text-2xl font-bold text-red-400">{stats.recusas}</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-500/10 border-amber-500/30">
          <CardContent className="pt-4">
            <p className="text-xs text-amber-400">Dívidas</p>
            <p className="text-2xl font-bold text-amber-400">{stats.dividas}</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/10 border-primary/30">
          <CardContent className="pt-4">
            <p className="text-xs text-primary">Valor Total</p>
            <p className="text-2xl font-bold text-primary">
              R$ {stats.valorTotal.toLocaleString('pt-BR')}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por cliente, endereço ou colportor..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Status</SelectItem>
                {Object.entries(statusConfig).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={tipoFilter} onValueChange={setTipoFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Tipos</SelectItem>
                {Object.entries(tipoConfig).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Activities Table */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Atividades</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Colportor</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Endereço</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAtividades.map((atividade) => {
                const StatusIcon = statusConfig[atividade.status].icon;
                const TipoIcon = tipoConfig[atividade.tipo].icon;
                
                return (
                  <TableRow key={atividade.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">
                            {format(atividade.data, 'dd/MM', { locale: ptBR })}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(atividade.data, 'HH:mm')}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{getColportorNome(atividade.colportorId)}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <TipoIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{tipoConfig[atividade.tipo].label}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {atividade.clienteNome ? (
                        <div>
                          <p className="text-sm font-medium">{atividade.clienteNome}</p>
                          {atividade.clienteTelefone && (
                            <p className="text-xs text-muted-foreground">{atividade.clienteTelefone}</p>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 max-w-[200px]">
                        <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="text-sm truncate">{atividade.endereco || '-'}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig[atividade.status].color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig[atividade.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {atividade.valor > 0 ? (
                        <div className="flex items-center justify-end gap-2">
                          <span className="font-medium text-emerald-400">
                            R$ {atividade.valor.toLocaleString('pt-BR')}
                          </span>
                          {atividade.metodoPagamento && (
                            <Badge variant="outline" className="text-xs">
                              {pagamentoConfig[atividade.metodoPagamento]}
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
