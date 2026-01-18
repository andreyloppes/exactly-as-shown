import { Header } from '@/components/layout/Header';
import { LiderCard } from '@/components/dashboard/LiderCard';
import { mockLideres } from '@/lib/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, Filter } from 'lucide-react';

export default function LideresPage() {
  return (
    <div className="min-h-screen">
      <Header 
        title="Líderes" 
        subtitle="Gerenciar líderes da campanha"
      />

      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar líderes..."
              className="pl-9 bg-secondary border-border"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Novo Líder
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-sm text-muted-foreground">Total de Líderes</p>
            <p className="text-2xl font-bold text-card-foreground">{mockLideres.length}</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-sm text-muted-foreground">Total de Equipes</p>
            <p className="text-2xl font-bold text-card-foreground">
              {mockLideres.reduce((sum, l) => sum + l.equipes.length, 0)}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-sm text-muted-foreground">Total de Colportores</p>
            <p className="text-2xl font-bold text-card-foreground">
              {mockLideres.reduce((sum, l) => sum + (l.totalColportores || 0), 0)}
            </p>
          </div>
        </div>

        {/* Líderes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {mockLideres.map(lider => (
            <LiderCard key={lider.id} lider={lider} />
          ))}
        </div>
      </div>
    </div>
  );
}
