import { Card } from '@/components/ui/card';
import { TrendingUp, Medal } from 'lucide-react';

interface TopColportoresProps {
  data: { nome: string; valor: number; meta: number; percentual: number }[];
}

const medals = ['🥇', '🥈', '🥉'];

export function TopColportores({ data }: TopColportoresProps) {
  return (
    <Card className="p-5 bg-card border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-card-foreground">
          Top 5 Colportores
        </h3>
        <Medal className="h-5 w-5 text-warning" />
      </div>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div
            key={item.nome}
            className="flex items-center gap-3 p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <span className="text-xl w-8 text-center">
              {index < 3 ? medals[index] : `${index + 1}º`}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-card-foreground truncate">
                {item.nome}
              </p>
              <p className="text-xs text-muted-foreground">
                Meta: R$ {item.meta.toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-card-foreground">
                R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <div className="flex items-center justify-end gap-1">
                <TrendingUp className="h-3 w-3 text-success" />
                <span className="text-xs text-success font-medium">
                  {item.percentual.toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
