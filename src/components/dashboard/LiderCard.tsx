import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, MapPin, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Lider } from '@/types';
import { segmentInfo } from '@/types';

interface LiderCardProps {
  lider: Lider;
}

export function LiderCard({ lider }: LiderCardProps) {
  const percentualVendas = ((lider.totalVendas || 0) / lider.metaVendas) * 100;
  const initials = lider.user.nome.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <Card className="p-5 bg-card border-border hover:border-primary/30 transition-all group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarFallback className="bg-primary/20 text-primary font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-card-foreground">{lider.user.nome}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {lider.cidade}
            </div>
          </div>
        </div>
        <Link to={`/lideres/${lider.id}`}>
          <Button size="icon" variant="ghost" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <ChevronRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 rounded-lg bg-secondary/50">
          <p className="text-lg font-bold text-card-foreground">
            {lider.equipes.length}
          </p>
          <p className="text-xs text-muted-foreground">Equipes</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-secondary/50">
          <p className="text-lg font-bold text-card-foreground">
            {lider.totalColportores}
          </p>
          <p className="text-xs text-muted-foreground">Colportores</p>
        </div>
        <div className="text-center p-2 rounded-lg bg-secondary/50">
          <p className="text-lg font-bold text-card-foreground">
            {lider.totalVisitas}
          </p>
          <p className="text-xs text-muted-foreground">Visitas</p>
        </div>
      </div>

      {/* Vendas Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Vendas</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-card-foreground">
              R$ {(lider.totalVendas || 0).toLocaleString('pt-BR')}
            </span>
            <Badge 
              variant={percentualVendas >= 100 ? 'default' : percentualVendas >= 80 ? 'secondary' : 'destructive'}
              className={percentualVendas >= 100 ? 'bg-success text-success-foreground' : ''}
            >
              {percentualVendas.toFixed(0)}%
            </Badge>
          </div>
        </div>
        <Progress 
          value={Math.min(100, percentualVendas)} 
          className="h-2"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Meta: R$ {lider.metaVendas.toLocaleString('pt-BR')}
        </p>
      </div>

      {/* Equipes */}
      <div className="flex flex-wrap gap-1.5">
        {lider.equipes.map(equipe => (
          <Badge 
            key={equipe.id} 
            variant="outline"
            className="text-xs bg-secondary/50"
          >
            {segmentInfo[equipe.tipo].icon} {equipe.nome.split(' ')[1] || equipe.nome}
          </Badge>
        ))}
      </div>

      {/* Dividas Alert */}
      {(lider.totalDividas || 0) > 0 && (
        <div className="mt-3 p-2 rounded-lg bg-destructive/10 border border-destructive/20">
          <p className="text-xs text-destructive flex items-center gap-1">
            <span className="font-medium">{lider.totalDividas} devedores</span>
            <span>•</span>
            <span>R$ {(lider.valorDividas || 0).toLocaleString('pt-BR')}</span>
          </p>
        </div>
      )}
    </Card>
  );
}
