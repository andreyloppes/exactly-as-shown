import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { KPICard } from '@/components/dashboard/KPICard';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getEquipeById } from '@/lib/mockData';
import { segmentInfo } from '@/types';
import {
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Eye,
  Presentation,
  Users,
  Mic,
  Calendar,
} from 'lucide-react';

export default function EquipeDetalhePage() {
  const { liderId, equipeId } = useParams();
  const result = getEquipeById(equipeId || '');

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Equipe não encontrada</p>
      </div>
    );
  }

  const { equipe, lider } = result;
  const segmento = segmentInfo[equipe.tipo];
  const percentualVendas = ((equipe.totalVendas || 0) / equipe.metaVendas) * 100;

  return (
    <div className="min-h-screen">
      <Header 
        title={equipe.nome}
        subtitle={`${segmento.icon} ${segmento.label} • ${lider.user.nome} - ${lider.cidade}`}
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
          <span className="text-foreground">{equipe.nome}</span>
        </div>

        {/* Header Card */}
        <Card className="p-6 bg-card border-border">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-3xl">
              {segmento.icon}
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-card-foreground">{equipe.nome}</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {segmento.label}
                    </Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {equipe.colportores.length} colportores
                    </span>
                  </div>
                </div>
                <Link to={`/lideres/${lider.id}`}>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    Voltar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            titulo="Vendas"
            valor={`R$ ${(equipe.totalVendas || 0).toLocaleString('pt-BR')}`}
            icone={DollarSign}
            corIcone="success"
            progresso={{ atual: equipe.totalVendas || 0, meta: equipe.metaVendas }}
          />
          <KPICard
            titulo="Visitas"
            valor={equipe.totalVisitas || 0}
            icone={Eye}
            corIcone="warning"
            subtitulo={`Meta: ${equipe.metaVisitas}`}
          />
          <KPICard
            titulo="Palestras"
            valor={equipe.totalPalestras || 0}
            icone={Presentation}
            corIcone="accent"
            subtitulo={`Meta: ${equipe.metaPalestras}`}
          />
          <KPICard
            titulo="Colportores"
            valor={equipe.colportores.length}
            icone={Users}
            corIcone="info"
            subtitulo={`${equipe.colportores.filter(c => c.ehPalestrante).length} palestrantes`}
          />
        </div>

        {/* Colportores Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Colportores ({equipe.colportores.length})
            </h3>
            <Button variant="outline" size="sm">
              + Novo Colportor
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {equipe.colportores.map(colportor => {
              const initials = colportor.user.nome.split(' ').map(n => n[0]).join('').slice(0, 2);
              const percentual = ((colportor.totalVendas || 0) / colportor.metaVendas) * 100;
              
              return (
                <Card key={colportor.id} className="p-4 bg-card border-border hover:border-primary/30 transition-all group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-primary/20">
                        <AvatarFallback className="bg-primary/20 text-primary text-sm font-semibold">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-card-foreground text-sm">
                          {colportor.user.nome}
                        </h4>
                        <div className="flex gap-1 mt-0.5">
                          {colportor.ehPalestrante && (
                            <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 gap-0.5">
                              <Mic className="h-2.5 w-2.5" />
                              Palestrante
                            </Badge>
                          )}
                          {colportor.ehAgendista && (
                            <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 gap-0.5">
                              <Calendar className="h-2.5 w-2.5" />
                              Agendista
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Link to={`/lideres/${lider.id}/equipes/${equipe.id}/colportores/${colportor.id}`}>
                      <Button size="icon" variant="ghost" className="h-7 w-7 group-hover:bg-primary group-hover:text-primary-foreground">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>

                  {/* Vendas */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Vendas</span>
                      <span className="font-medium text-card-foreground">
                        R$ {(colportor.totalVendas || 0).toLocaleString('pt-BR')}
                      </span>
                    </div>
                    <Progress value={Math.min(100, percentual)} className="h-1.5" />
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-muted-foreground">
                        Meta: R$ {colportor.metaVendas.toLocaleString('pt-BR')}
                      </span>
                      <span className="text-[10px] font-medium text-primary">
                        {percentual.toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="text-center p-1.5 rounded bg-secondary/50">
                      <p className="text-xs font-medium text-card-foreground">{colportor.totalVisitas || 0}</p>
                      <p className="text-[10px] text-muted-foreground">Visitas</p>
                    </div>
                    <div className="text-center p-1.5 rounded bg-secondary/50">
                      <p className="text-xs font-medium text-card-foreground">{colportor.totalPalestras || 0}</p>
                      <p className="text-[10px] text-muted-foreground">Palestras</p>
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
