import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { Card } from '@/components/ui/card';
import type { TipoSegmento } from '@/types';
import { segmentInfo } from '@/types';

interface VendasPorSegmentoPieProps {
  data: { tipo: TipoSegmento; valor: number }[];
}

const SEGMENT_COLORS: Record<TipoSegmento, string> = {
  PALESTRA: 'hsl(262 83% 58%)',
  CASA_EM_CASA: 'hsl(199 89% 48%)',
  INDICACAO: 'hsl(142 76% 36%)',
  COMERCIO: 'hsl(38 92% 50%)',
  ASSISTENCIA: 'hsl(340 82% 52%)',
};

export function VendasPorSegmentoPie({ data }: VendasPorSegmentoPieProps) {
  const chartData = data.map(item => ({
    name: segmentInfo[item.tipo].label,
    value: item.valor,
    tipo: item.tipo,
    icon: segmentInfo[item.tipo].icon,
  }));

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="p-5 bg-card border-border">
      <h3 className="text-base font-semibold text-card-foreground mb-4">
        Vendas por Segmento
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={SEGMENT_COLORS[entry.tipo]}
                  stroke="hsl(var(--card))"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--popover-foreground))',
              }}
              formatter={(value: number) => [
                `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                'Valor'
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        {chartData.map((item) => (
          <div key={item.tipo} className="flex items-center gap-2 text-xs">
            <div 
              className="w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: SEGMENT_COLORS[item.tipo] }}
            />
            <span className="text-muted-foreground truncate">
              {item.icon} {item.name}
            </span>
            <span className="ml-auto font-medium text-card-foreground">
              {((item.value / total) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
