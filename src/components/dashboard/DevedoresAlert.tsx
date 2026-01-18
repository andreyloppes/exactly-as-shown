import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Phone, MessageSquare } from 'lucide-react';
import type { Divida } from '@/types';
import { differenceInDays } from 'date-fns';

interface DevedoresAlertProps {
  devedores: Divida[];
}

export function DevedoresAlert({ devedores }: DevedoresAlertProps) {
  const getDiasAtraso = (dataVencimento: Date) => {
    return differenceInDays(new Date(), new Date(dataVencimento));
  };

  const getStatusBadge = (diasAtraso: number) => {
    if (diasAtraso > 30) {
      return <Badge variant="destructive">+30 dias</Badge>;
    }
    if (diasAtraso > 15) {
      return <Badge className="bg-warning text-warning-foreground">+15 dias</Badge>;
    }
    return <Badge variant="secondary">{diasAtraso} dias</Badge>;
  };

  return (
    <Card className="p-5 bg-card border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-card-foreground">
          Devedores Críticos
        </h3>
        <AlertTriangle className="h-5 w-5 text-destructive" />
      </div>
      <div className="space-y-3">
        {devedores.slice(0, 4).map((divida) => {
          const diasAtraso = getDiasAtraso(divida.dataVencimento);
          
          return (
            <div
              key={divida.id}
              className="p-3 rounded-lg bg-destructive/10 border border-destructive/20"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground truncate">
                    {divida.clienteNome}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Vencimento: {new Date(divida.dataVencimento).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                {getStatusBadge(diasAtraso)}
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-bold text-destructive">
                  R$ {divida.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="h-7 w-7">
                    <Phone className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7">
                    <MessageSquare className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {devedores.length > 4 && (
        <Button variant="ghost" className="w-full mt-3 text-sm text-muted-foreground">
          Ver todos ({devedores.length})
        </Button>
      )}
    </Card>
  );
}
