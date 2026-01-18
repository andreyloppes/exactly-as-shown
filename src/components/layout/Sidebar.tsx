import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Target,
  Activity,
  Map,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';
import logoOmega from '@/assets/logo-omega.png';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Líderes', href: '/lideres', icon: Users },
  { name: 'Metas', href: '/metas', icon: Target },
  { name: 'Atividades', href: '/atividades', icon: Activity },
  { name: 'Financeiro', href: '/financeiro', icon: DollarSign },
  { name: 'SWOT', href: '/swot', icon: BarChart3 },
  { name: 'Mapa', href: '/mapa', icon: Map },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-6 border-b border-sidebar-border">
        <img src={logoOmega} alt="Omega" className="h-10 w-10 object-contain rounded-lg bg-sidebar-foreground/10 p-1" />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-sidebar-foreground">Colportagem</span>
          <span className="text-xs text-muted-foreground">Manager</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href !== '/' && location.pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-sidebar-border p-3 space-y-1">
        <Link
          to="/configuracoes"
          className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/10 hover:text-sidebar-foreground rounded-lg transition-colors"
        >
          <Settings className="h-5 w-5" />
          Configurações
        </Link>
        <button
          className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-destructive/80 hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Sair
        </button>
      </div>

      {/* Campaign info */}
      <div className="p-4 mx-3 mb-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20">
        <p className="text-xs text-muted-foreground">Campanha Ativa</p>
        <p className="text-sm font-semibold text-sidebar-foreground mt-0.5">Férias de Inverno 2026</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 h-1.5 bg-sidebar-border rounded-full overflow-hidden">
            <div className="h-full w-[78%] bg-gradient-to-r from-primary to-accent rounded-full" />
          </div>
          <span className="text-xs font-medium text-primary">78%</span>
        </div>
      </div>
    </aside>
  );
}
