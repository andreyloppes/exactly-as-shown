import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Phone,
  MapPin,
  Search,
  Filter,
  CreditCard,
  Banknote,
  Receipt,
  PiggyBank,
  ArrowUpRight,
  ArrowDownRight,
  CircleDollarSign,
  Wallet
} from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { mockDevedores, mockLideres } from '@/lib/mockData';
import type { Divida, StatusDivida } from '@/types';

const statusConfig: Record<StatusDivida, { label: string; color: string; icon: React.ComponentType<{ className?: string }> }> = {
  PENDENTE: { label: 'Pendente', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30', icon: Clock },
  PARCIAL: { label: 'Parcial', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: Receipt },
  QUITADA: { label: 'Quitada', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', icon: CheckCircle2 },
  INADIMPLENTE: { label: 'Inadimplente', color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: AlertTriangle },
};

// Extended mock data for financial
const mockTransacoes = [
  { id: 't1', tipo: 'entrada', valor: 1500, descricao: 'Vendas Equipe Palestra', data: new Date('2026-01-18'), metodo: 'PIX' },
  { id: 't2', tipo: 'entrada', valor: 890, descricao: 'Vendas Casa em Casa', data: new Date('2026-01-18'), metodo: 'Dinheiro' },
  { id: 't3', tipo: 'entrada', valor: 450, descricao: 'Pagamento parcial - Ana Maria', data: new Date('2026-01-17'), metodo: 'PIX' },
  { id: 't4', tipo: 'saida', valor: 200, descricao: 'Combustível equipes', data: new Date('2026-01-17'), metodo: 'Cartão' },
  { id: 't5', tipo: 'entrada', valor: 320, descricao: 'Quitação dívida - Carlos', data: new Date('2026-01-16'), metodo: 'Dinheiro' },
  { id: 't6', tipo: 'saida', valor: 150, descricao: 'Material de divulgação', data: new Date('2026-01-16'), metodo: 'PIX' },
];

export default function FinanceiroPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDivida, setSelectedDivida] = useState<Divida | null>(null);
  const [dividas] = useState<Divida[]>(mockDevedores);

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

  const filteredDividas = dividas.filter(d => {
    const matchesSearch = 
      d.clienteNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getColportorNome(d.colportorId).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || d.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Financial stats
  const stats = {
    totalEntradas: mockTransacoes.filter(t => t.tipo === 'entrada').reduce((sum, t) => sum + t.valor, 0),
    totalSaidas: mockTransacoes.filter(t => t.tipo === 'saida').reduce((sum, t) => sum + t.valor, 0),
    totalDividas: dividas.reduce((sum, d) => sum + d.valorTotal, 0),
    totalPago: dividas.reduce((sum, d) => sum + d.valorPago, 0),
    totalPendente: dividas.reduce((sum, d) => sum + (d.valorTotal - d.valorPago), 0),
    inadimplentes: dividas.filter(d => d.status === 'INADIMPLENTE').length,
    taxaRecuperacao: Math.round((dividas.reduce((sum, d) => sum + d.valorPago, 0) / dividas.reduce((sum, d) => sum + d.valorTotal, 0)) * 100),
  };

  const registrarPagamento = (divida: Divida) => {
    setSelectedDivida(divida);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Financeiro</h1>
          <p className="text-muted-foreground">
            Gestão de entradas, saídas e cobranças
          </p>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border-emerald-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-400">Entradas</p>
                <p className="text-2xl font-bold text-emerald-400">
                  R$ {stats.totalEntradas.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <ArrowUpRight className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/20 to-red-600/10 border-red-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-400">Saídas</p>
                <p className="text-2xl font-bold text-red-400">
                  R$ {stats.totalSaidas.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <ArrowDownRight className="h-6 w-6 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-amber-500/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-400">A Receber</p>
                <p className="text-2xl font-bold text-amber-400">
                  R$ {stats.totalPendente.toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/20 to-accent/10 border-primary/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-primary">Saldo</p>
                <p className="text-2xl font-bold text-primary">
                  R$ {(stats.totalEntradas - stats.totalSaidas).toLocaleString('pt-BR')}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <CircleDollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="dividas" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="dividas">Dívidas e Cobranças</TabsTrigger>
          <TabsTrigger value="transacoes">Transações</TabsTrigger>
          <TabsTrigger value="resumo">Resumo</TabsTrigger>
        </TabsList>

        {/* Dívidas Tab */}
        <TabsContent value="dividas" className="space-y-4">
          {/* Recovery Stats */}
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Taxa de Recuperação</span>
                <span className="text-sm font-medium text-foreground">{stats.taxaRecuperacao}%</span>
              </div>
              <Progress value={stats.taxaRecuperacao} className="h-2" />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Recuperado: R$ {stats.totalPago.toLocaleString('pt-BR')}</span>
                <span>Total: R$ {stats.totalDividas.toLocaleString('pt-BR')}</span>
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card>
            <CardContent className="py-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por cliente ou colportor..."
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
              </div>
            </CardContent>
          </Card>

          {/* Debts Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Controle de Dívidas</CardTitle>
                <Badge variant="secondary" className="bg-red-500/20 text-red-400">
                  {stats.inadimplentes} inadimplentes
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Colportor</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-right">Pago</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDividas.map((divida) => {
                    const StatusIcon = statusConfig[divida.status].icon;
                    const diasAtraso = differenceInDays(new Date(), divida.dataVencimento);
                    const percentPago = (divida.valorPago / divida.valorTotal) * 100;
                    
                    return (
                      <TableRow key={divida.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">{divida.clienteNome}</p>
                            {divida.clienteTelefone && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Phone className="h-3 w-3" />
                                {divida.clienteTelefone}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{getColportorNome(divida.colportorId)}</span>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm">{format(divida.dataVencimento, 'dd/MM/yyyy', { locale: ptBR })}</p>
                            {diasAtraso > 0 && divida.status !== 'QUITADA' && (
                              <p className="text-xs text-red-400">{diasAtraso} dias em atraso</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusConfig[divida.status].color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig[divida.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="font-medium">R$ {divida.valorTotal.toLocaleString('pt-BR')}</span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="space-y-1">
                            <span className="text-sm text-emerald-400">
                              R$ {divida.valorPago.toLocaleString('pt-BR')}
                            </span>
                            <Progress value={percentPago} className="h-1 w-16 ml-auto" />
                          </div>
                        </TableCell>
                        <TableCell>
                          {divida.status !== 'QUITADA' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => registrarPagamento(divida)}
                            >
                              <DollarSign className="h-4 w-4 mr-1" />
                              Pagar
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transações Tab */}
        <TabsContent value="transacoes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Transações</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTransacoes.map((transacao) => (
                    <TableRow key={transacao.id}>
                      <TableCell>
                        {format(transacao.data, 'dd/MM/yyyy', { locale: ptBR })}
                      </TableCell>
                      <TableCell>{transacao.descricao}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{transacao.metodo}</Badge>
                      </TableCell>
                      <TableCell>
                        {transacao.tipo === 'entrada' ? (
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            Entrada
                          </Badge>
                        ) : (
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                            <ArrowDownRight className="h-3 w-3 mr-1" />
                            Saída
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className={`text-right font-medium ${transacao.tipo === 'entrada' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {transacao.tipo === 'entrada' ? '+' : '-'} R$ {transacao.valor.toLocaleString('pt-BR')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resumo Tab */}
        <TabsContent value="resumo" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                  Entradas por Método
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { metodo: 'PIX', valor: 1950, percent: 62 },
                  { metodo: 'Dinheiro', valor: 890, percent: 28 },
                  { metodo: 'Cartão', valor: 320, percent: 10 },
                ].map((item) => (
                  <div key={item.metodo} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.metodo}</span>
                      <span className="font-medium text-foreground">R$ {item.valor.toLocaleString('pt-BR')}</span>
                    </div>
                    <Progress value={item.percent} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-primary" />
                  Resumo do Período
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Total de Vendas</span>
                  <span className="font-medium text-foreground">R$ 47.000,00</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Dívidas Geradas</span>
                  <span className="font-medium text-amber-400">R$ {stats.totalDividas.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Dívidas Recuperadas</span>
                  <span className="font-medium text-emerald-400">R$ {stats.totalPago.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Despesas Operacionais</span>
                  <span className="font-medium text-red-400">R$ {stats.totalSaidas.toLocaleString('pt-BR')}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Payment Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Pagamento</DialogTitle>
            <DialogDescription>
              {selectedDivida && `Dívida de ${selectedDivida.clienteNome}`}
            </DialogDescription>
          </DialogHeader>
          {selectedDivida && (
            <div className="space-y-4 py-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Valor Total</span>
                  <span className="font-medium">R$ {selectedDivida.valorTotal.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Já Pago</span>
                  <span className="font-medium text-emerald-400">R$ {selectedDivida.valorPago.toLocaleString('pt-BR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Restante</span>
                  <span className="font-medium text-amber-400">
                    R$ {(selectedDivida.valorTotal - selectedDivida.valorPago).toLocaleString('pt-BR')}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Valor do Pagamento</Label>
                <Input 
                  type="number" 
                  placeholder="0,00" 
                  defaultValue={selectedDivida.valorTotal - selectedDivida.valorPago}
                />
              </div>
              <div className="space-y-2">
                <Label>Método de Pagamento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PIX">PIX</SelectItem>
                    <SelectItem value="DINHEIRO">Dinheiro</SelectItem>
                    <SelectItem value="CARTAO">Cartão</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setDialogOpen(false)}>
              Confirmar Pagamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
