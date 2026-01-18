import { Header } from '@/components/layout/Header';
import { KPICard } from '@/components/dashboard/KPICard';
import { MetaVsRealizadoChart } from '@/components/dashboard/MetaVsRealizadoChart';
import { VendasPorSegmentoPie } from '@/components/dashboard/VendasPorSegmentoPie';
import { EvolucaoSemanalChart } from '@/components/dashboard/EvolucaoSemanalChart';
import { TopColportores } from '@/components/dashboard/TopColportores';
import { DevedoresAlert } from '@/components/dashboard/DevedoresAlert';
import { LiderCard } from '@/components/dashboard/LiderCard';
import { getMockDashboardData } from '@/lib/mockData';
import {
  DollarSign,
  Target,
  TrendingUp,
  Users,
  Eye,
  Presentation,
  AlertTriangle,
  Trophy,
} from 'lucide-react';

export default function Dashboard() {
  const data = getMockDashboardData();
  const { kpis, lideres, vendasPorSegmento, evolucaoSemanal, topColportores, devedoresCriticos } = data;

  return (
    <div className="min-h-screen">
      <Header 
        title="Dashboard" 
        subtitle={`Campanha: ${data.campanha.nome}`}
      />

      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            titulo="Total Vendido"
            valor={`R$ ${kpis.totalVendido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
            icone={DollarSign}
            corIcone="success"
            variacao={{ valor: 12.5, periodo: 'semana passada' }}
          />
          <KPICard
            titulo="Meta Global"
            valor={`R$ ${kpis.metaGlobal.toLocaleString('pt-BR')}`}
            icone={Target}
            corIcone="primary"
            progresso={{ atual: kpis.totalVendido, meta: kpis.metaGlobal }}
          />
          <KPICard
            titulo="Atingimento"
            valor={`${kpis.atingimento.toFixed(1)}%`}
            icone={TrendingUp}
            corIcone="accent"
            subtitulo={kpis.atingimento >= 100 ? '🎉 Meta batida!' : 'Continue assim!'}
          />
          <KPICard
            titulo="Colportores"
            valor={kpis.totalColportores}
            icone={Users}
            corIcone="info"
            subtitulo="Ativos na campanha"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            titulo="Visitas"
            valor={kpis.totalVisitas}
            icone={Eye}
            corIcone="warning"
            variacao={{ valor: 8.2, periodo: 'semana passada' }}
          />
          <KPICard
            titulo="Palestras"
            valor={kpis.totalPalestras}
            icone={Presentation}
            corIcone="accent"
          />
          <KPICard
            titulo="Devedores"
            valor={`${kpis.totalDevedores} (R$ ${kpis.valorDividas.toLocaleString('pt-BR')})`}
            icone={AlertTriangle}
            corIcone="destructive"
            subtitulo="A receber"
          />
          <KPICard
            titulo="Melhor Líder"
            valor={kpis.melhorLider.nome.split(' ')[0]}
            icone={Trophy}
            corIcone="warning"
            subtitulo={`R$ ${kpis.melhorLider.valor.toLocaleString('pt-BR')}`}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MetaVsRealizadoChart lideres={lideres} />
          <VendasPorSegmentoPie data={vendasPorSegmento} />
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EvolucaoSemanalChart data={evolucaoSemanal} />
          </div>
          <TopColportores data={topColportores} />
        </div>

        {/* Líderes Section */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Líderes da Campanha</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {lideres.map(lider => (
              <LiderCard key={lider.id} lider={lider} />
            ))}
          </div>
        </div>

        {/* Devedores Críticos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DevedoresAlert devedores={devedoresCriticos} />
        </div>
      </div>
    </div>
  );
}
