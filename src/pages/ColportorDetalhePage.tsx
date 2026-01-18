import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { KPICard } from '@/components/dashboard/KPICard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getColportorById } from '@/lib/mockData';
import { segmentInfo } from '@/types';
import {
  ChevronLeft,
  DollarSign,
  Eye,
  Presentation,
  Phone,
  Mail,
  Mic,
  Calendar,
  Edit,
  BarChart3,
  TrendingUp,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function ColportorDetalhePage() {
  const { colportorId } = useParams();
  const result = getColportorById(colportorId || '');

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Colportor não encontrado</p>
      </div>
    );
  }

  const { colportor, equipe, lider } = result;
  const segmento = segmentInfo[equipe.tipo];
  const initials = colportor.user.nome.split(' ').map(n => n[0]).join('').slice(0, 2);
  
  // Mock daily data
  const evolucaoDiaria = [
    { dia: 'Seg', vendas: 280, visitas: 8 },
    { dia: 'Ter', vendas: 350, visitas: 12 },
    { dia: 'Qua', vendas: 420, visitas: 15 },
    { dia: 'Qui', vendas: 180, visitas: 6 },
    { dia: 'Sex', vendas: 520, visitas: 18 },
    { dia: 'Sáb', vendas: 390, visitas: 14 },
    { dia: 'Dom', vendas: 0, visitas: 0 },
  ];

  // Mock activities
  const atividadesRecentes = [
    { id: '1', data: '18/01 14:30', tipo: 'Palestra', status: 'VENDA', valor: 180, cliente: 'Maria Silva' },
    { id: '2', data: '18/01 11:00', tipo: 'Porta a Porta', status: 'AGENDAMENTO', valor: 0, cliente: 'João Costa' },
    { id: '3', data: '17/01 16:45', tipo: 'Indicação', status: 'VENDA', valor: 220, cliente: 'Ana Oliveira' },
    { id: '4', data: '17/01 10:20', tipo: 'Porta a Porta', status: 'RECUSA', valor: 0, cliente: '-' },
    { id: '5', data: '16/01 15:00', tipo: 'Palestra', status: 'DIVIDA', valor: 350, cliente: 'Roberto Santos' },
  ];

  const statusColors: Record<string, string> = {
    VENDA: 'bg-success text-success-foreground',
    AGENDAMENTO: 'bg-warning text-warning-foreground',
    RECUSA: 'bg-muted text-muted-foreground',
    DIVIDA: 'bg-destructive text-destructive-foreground',
    AUSENTE: 'bg-muted text-muted-foreground',
  };

  return (
    <div className="min-h-screen">
      <Header 
        title={colportor.user.nome}
        subtitle={`${equipe.nome} • ${lider.cidade}`}
      />

      <div className="p-6 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm flex-wrap">
          <Link to="/lideres" className="text-muted-foreground hover:text-foreground transition-colors">
            Líderes
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link to={`/lideres/${lider.id}`} className="text-muted-foreground hover:text-foreground transition-colors">
            {lider.user.nome}
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link to={`/lideres/${lider.id}/equipes/${equipe.id}`} className="text-muted-foreground hover:text-foreground transition-colors">
            {equipe.nome}
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{colportor.user.nome}</span>
        </div>

        {/* Header Card */}
        <Card className="p-6 bg-card border-border">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-20 w-20 border-4 border-primary/20">
              <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-card-foreground">{colportor.user.nome}</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {segmento.icon} {segmento.label}
                    </Badge>
                    {colportor.ehPalestrante && (
                      <Badge variant="outline" className="gap-1">
                        <Mic className="h-3 w-3" />
                        Palestrante
                      </Badge>
                    )}
                    {colportor.ehAgendista && (
                      <Badge variant="outline" className="gap-1">
                        <Calendar className="h-3 w-3" />
                        Agendista
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {colportor.user.email}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <Edit className="h-4 w-4" />
                    Editar
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <BarChart3 className="h-4 w-4" />
                    SWOT
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-5 bg-card border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-success/20 text-success">
                <DollarSign className="h-5 w-5" />
              </div>
              <span className="text-sm text-muted-foreground">Vendas</span>
            </div>
            <p className="text-2xl font-bold text-card-foreground mb-2">
              R$ {(colportor.totalVendas || 0).toLocaleString('pt-BR')}
            </p>
            <Progress 
              value={Math.min(100, ((colportor.totalVendas || 0) / colportor.metaVendas) * 100)} 
              className="h-2 mb-1" 
            />
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Meta: R$ {colportor.metaVendas.toLocaleString('pt-BR')}</span>
              <span className="text-success font-medium">
                {(((colportor.totalVendas || 0) / colportor.metaVendas) * 100).toFixed(0)}%
              </span>
            </div>
          </Card>

          <Card className="p-5 bg-card border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-warning/20 text-warning">
                <Eye className="h-5 w-5" />
              </div>
              <span className="text-sm text-muted-foreground">Visitas</span>
            </div>
            <p className="text-2xl font-bold text-card-foreground mb-2">
              {colportor.totalVisitas || 0}
            </p>
            <Progress 
              value={Math.min(100, ((colportor.totalVisitas || 0) / colportor.metaVisitas) * 100)} 
              className="h-2 mb-1" 
            />
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Meta: {colportor.metaVisitas}</span>
              <span className="text-warning font-medium">
                {(((colportor.totalVisitas || 0) / colportor.metaVisitas) * 100).toFixed(0)}%
              </span>
            </div>
          </Card>

          <Card className="p-5 bg-card border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-accent/20 text-accent">
                <Presentation className="h-5 w-5" />
              </div>
              <span className="text-sm text-muted-foreground">Palestras</span>
            </div>
            <p className="text-2xl font-bold text-card-foreground mb-2">
              {colportor.totalPalestras || 0}
            </p>
            <Progress 
              value={Math.min(100, ((colportor.totalPalestras || 0) / colportor.metaPalestras) * 100)} 
              className="h-2 mb-1" 
            />
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Meta: {colportor.metaPalestras}</span>
              <span className="text-accent font-medium">
                {(((colportor.totalPalestras || 0) / colportor.metaPalestras) * 100).toFixed(0)}%
              </span>
            </div>
          </Card>
        </div>

        {/* Evolução Diária */}
        <Card className="p-5 bg-card border-border">
          <h3 className="text-base font-semibold text-card-foreground mb-4">
            Evolução Diária (Esta Semana)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={evolucaoDiaria}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="dia" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--popover))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--popover-foreground))',
                  }}
                  formatter={(value: number) => [`R$ ${value}`, 'Vendas']}
                />
                <Bar 
                  dataKey="vendas" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Histórico de Atividades */}
        <Card className="p-5 bg-card border-border">
          <h3 className="text-base font-semibold text-card-foreground mb-4">
            Histórico de Atividades
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-muted-foreground border-b border-border">
                  <th className="pb-3 font-medium">Data</th>
                  <th className="pb-3 font-medium">Tipo</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Valor</th>
                  <th className="pb-3 font-medium">Cliente</th>
                </tr>
              </thead>
              <tbody>
                {atividadesRecentes.map(ativ => (
                  <tr key={ativ.id} className="border-b border-border/50 text-sm">
                    <td className="py-3 text-muted-foreground">{ativ.data}</td>
                    <td className="py-3 text-card-foreground">{ativ.tipo}</td>
                    <td className="py-3">
                      <Badge className={statusColors[ativ.status]}>
                        {ativ.status === 'VENDA' ? '🟢' : ativ.status === 'AGENDAMENTO' ? '🟡' : ativ.status === 'DIVIDA' ? '🔴' : '⚫'} {ativ.status}
                      </Badge>
                    </td>
                    <td className="py-3 text-card-foreground font-medium">
                      {ativ.valor > 0 ? `R$ ${ativ.valor}` : '-'}
                    </td>
                    <td className="py-3 text-muted-foreground">{ativ.cliente}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Button variant="ghost" className="w-full mt-3 text-sm text-muted-foreground">
            Ver mais atividades
          </Button>
        </Card>
      </div>
    </div>
  );
}
