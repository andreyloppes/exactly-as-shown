import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { Card } from '@/components/ui/card';

interface EvolucaoSemanalChartProps {
  data: { semana: number; realizado: number; meta: number }[];
}

export function EvolucaoSemanalChart({ data }: EvolucaoSemanalChartProps) {
  const chartData = data.map(item => ({
    ...item,
    label: `Sem ${item.semana}`,
  }));

  // Current week marker
  const currentWeek = 3;

  return (
    <Card className="p-5 bg-card border-border">
      <h3 className="text-base font-semibold text-card-foreground mb-4">
        Evolução Semanal
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="realizadoGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="label" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
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
            />
            <Area
              type="monotone"
              dataKey="realizado"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#realizadoGradient)"
            />
            <Area
              type="monotone"
              dataKey="meta"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="transparent"
            />
            <ReferenceLine
              x={`Sem ${currentWeek}`}
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              label={{
                value: 'Atual',
                fill: 'hsl(var(--accent))',
                fontSize: 11,
                position: 'top',
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 mt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-primary rounded" />
          <span>Realizado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-muted-foreground rounded border-dashed" style={{ borderTop: '2px dashed' }} />
          <span>Meta</span>
        </div>
      </div>
    </Card>
  );
}
