import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface KPICardProps {
  titulo: string;
  valor: string | number;
  subtitulo?: string;
  icone: LucideIcon;
  corIcone: 'primary' | 'success' | 'destructive' | 'warning' | 'accent' | 'info';
  variacao?: { valor: number; periodo: string };
  progresso?: { atual: number; meta: number };
}

const iconColorClasses = {
  primary: 'bg-primary/20 text-primary',
  success: 'bg-success/20 text-success',
  destructive: 'bg-destructive/20 text-destructive',
  warning: 'bg-warning/20 text-warning',
  accent: 'bg-accent/20 text-accent',
  info: 'bg-info/20 text-info',
};

const progressColorClasses = {
  primary: 'bg-primary',
  success: 'bg-success',
  destructive: 'bg-destructive',
  warning: 'bg-warning',
  accent: 'bg-accent',
  info: 'bg-info',
};

export function KPICard({
  titulo,
  valor,
  subtitulo,
  icone: Icon,
  corIcone,
  variacao,
  progresso,
}: KPICardProps) {
  const progressPercent = progresso 
    ? Math.min(100, (progresso.atual / progresso.meta) * 100) 
    : 0;

  return (
    <Card className="p-4 bg-card border-border hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">{titulo}</p>
          <p className="text-2xl font-bold text-card-foreground mt-1">
            {typeof valor === 'number' && titulo.toLowerCase().includes('r$') 
              ? `R$ ${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
              : valor}
          </p>
          {subtitulo && (
            <p className="text-xs text-muted-foreground mt-1">{subtitulo}</p>
          )}
        </div>
        <div className={cn('p-2.5 rounded-lg', iconColorClasses[corIcone])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {variacao && (
        <div className="flex items-center gap-1 mt-3">
          <span className={cn(
            'text-xs font-medium',
            variacao.valor >= 0 ? 'text-success' : 'text-destructive'
          )}>
            {variacao.valor >= 0 ? '+' : ''}{variacao.valor}%
          </span>
          <span className="text-xs text-muted-foreground">
            vs {variacao.periodo}
          </span>
        </div>
      )}

      {progresso && (
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Progresso</span>
            <span className="font-medium text-card-foreground">
              {progressPercent.toFixed(0)}%
            </span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-all duration-500', progressColorClasses[corIcone])}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </Card>
  );
}
