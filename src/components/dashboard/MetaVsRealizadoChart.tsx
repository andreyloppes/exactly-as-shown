import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from 'recharts';
import { Card } from '@/components/ui/card';
import type { Lider } from '@/types';

interface MetaVsRealizadoChartProps {
  lideres: Lider[];
}

export function MetaVsRealizadoChart({ lideres }: MetaVsRealizadoChartProps) {
  const data = lideres.map(lider => ({
    nome: lider.user.nome.split(' ')[0],
    cidade: lider.cidade,
    realizado: lider.totalVendas || 0,
    meta: lider.metaVendas,
    percentual: ((lider.totalVendas || 0) / lider.metaVendas) * 100,
  }));

  return (
    <Card className="p-5 bg-card border-border">
      <h3 className="text-base font-semibold text-card-foreground mb-4">
        Meta vs Realizado por Líder
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
            <XAxis 
              type="number" 
              tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              dataKey="nome" 
              type="category" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              width={50}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--popover-foreground))',
              }}
              formatter={(value: number, name: string) => [
                `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                name === 'realizado' ? 'Realizado' : 'Meta'
              ]}
              labelFormatter={(label) => {
                const item = data.find(d => d.nome === label);
                return `${label} - ${item?.cidade}`;
              }}
            />
            <Bar 
              dataKey="realizado" 
              radius={[0, 4, 4, 0]}
              maxBarSize={30}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.percentual >= 100 
                    ? 'hsl(var(--success))' 
                    : entry.percentual >= 80 
                      ? 'hsl(var(--primary))' 
                      : 'hsl(var(--warning))'
                  }
                />
              ))}
            </Bar>
            {data.map((entry, index) => (
              <ReferenceLine
                key={`ref-${index}`}
                x={entry.meta}
                stroke="hsl(var(--muted-foreground))"
                strokeDasharray="4 4"
                strokeWidth={1}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 mt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-success" />
          <span>≥ 100%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-primary" />
          <span>≥ 80%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-warning" />
          <span>&lt; 80%</span>
        </div>
      </div>
    </Card>
  );
}
