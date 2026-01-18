import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { KPICard } from '@/components/dashboard/KPICard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getLiderById } from '@/lib/mockData';
import { segmentInfo } from '@/types';
import {
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Eye,
  Presentation,
  AlertTriangle,
  MapPin,
  Phone,
  Mail,
  Edit,
  BarChart3,
  Users,
} from 'lucide-react';

export default function LiderDetalhePage() {
  const { liderId } = useParams();
  const lider = getLiderById(liderId || '');

  if (!lider) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Líder não encontrado</p>
      </div>
    );
  }

  const initials = lider.user.nome.split(' ').map(n => n[0]).join('').slice(0, 2);
  const percentualVendas = ((lider.totalVendas || 0) / lider.metaVendas) * 100;

  return (
    <div className="min-h-screen">
      <Header 
        title={lider.user.nome} 
        subtitle={lider.cidade}
      />

      <div className="p-6 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <Link to="/lideres" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            Líderes
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{lider.user.nome}</span>
        </div>

        {/* Leader Header Card */}
        <Card className="p-6 bg-card border-border">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar className="h-24 w-24 border-4 border-primary/20">
              <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-card-foreground">{lider.user.nome}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4" />
                    <span>{lider.cidade}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {lider.user.email}
                    </div>
                    {lider.user.telefone && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {lider.user.telefone}
                      </div>
                    )}
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

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            titulo="Vendas"
            valor={`R$ ${(lider.totalVendas || 0).toLocaleString('pt-BR')}`}
            icone={DollarSign}
            corIcone="success"
            progresso={{ atual: lider.totalVendas || 0, meta: lider.metaVendas }}
          />
          <KPICard
            titulo="Visitas"
            valor={lider.totalVisitas || 0}
            icone={Eye}
            corIcone="warning"
            subtitulo={`Meta: ${lider.metaVisitas}`}
          />
          <KPICard
            titulo="Palestras"
            valor={lider.totalPalestras || 0}
            icone={Presentation}
            corIcone="accent"
            subtitulo={`Meta: ${lider.metaPalestras}`}
          />
          <KPICard
            titulo="Dívidas"
            valor={`${lider.totalDividas || 0}`}
            icone={AlertTriangle}
            corIcone="destructive"
            subtitulo={`R$ ${(lider.valorDividas || 0).toLocaleString('pt-BR')}`}
          />
        </div>

        {/* Equipes Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Equipes ({lider.equipes.length})
            </h3>
            <Button variant="outline" size="sm">
              + Nova Equipe
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lider.equipes.map(equipe => {
              const segmento = segmentInfo[equipe.tipo];
              const percentual = ((equipe.totalVendas || 0) / equipe.metaVendas) * 100;
              
              return (
                <Card key={equipe.id} className="p-5 bg-card border-border hover:border-primary/30 transition-all group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-xl">
                        {segmento.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-card-foreground">{equipe.nome}</h4>
                        <Badge variant="outline" className="text-xs mt-1">
                          {segmento.label}
                        </Badge>
                      </div>
                    </div>
                    <Link to={`/lideres/${lider.id}/equipes/${equipe.id}`}>
                      <Button size="icon" variant="ghost" className="group-hover:bg-primary group-hover:text-primary-foreground">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </Link>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Users className="h-4 w-4" />
                    <span>{equipe.colportores.length} colportores</span>
                  </div>

                  {/* Vendas Progress */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1 text-sm">
                      <span className="text-muted-foreground">Vendas</span>
                      <span className="font-medium text-card-foreground">
                        R$ {(equipe.totalVendas || 0).toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <Progress value={Math.min(100, percentual)} className="h-2" />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">
                        Meta: R$ {equipe.metaVendas.toLocaleString('pt-BR')}
                      </span>
                      <span className="text-xs font-medium text-primary">
                        {percentual.toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  {/* Other stats */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 rounded bg-secondary/50">
                      <p className="text-sm font-medium text-card-foreground">{equipe.totalVisitas || 0}</p>
                      <p className="text-xs text-muted-foreground">Visitas</p>
                    </div>
                    <div className="p-2 rounded bg-secondary/50">
                      <p className="text-sm font-medium text-card-foreground">{equipe.totalPalestras || 0}</p>
                      <p className="text-xs text-muted-foreground">Palestras</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
