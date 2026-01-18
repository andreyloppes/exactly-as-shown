import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown,
  Target,
  TrendingUp,
  AlertTriangle,
  Shield,
  Loader2,
  Users,
  User
} from 'lucide-react';
import { mockLideres, mockCampanha } from '@/lib/mockData';
import type { SWOTItem, TipoItemSWOT } from '@/types';

interface SWOTSection {
  tipo: TipoItemSWOT;
  titulo: string;
  descricao: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  borderColor: string;
}

const swotSections: SWOTSection[] = [
  {
    tipo: 'FORCA',
    titulo: 'Forças',
    descricao: 'Pontos fortes internos',
    icon: Shield,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
  },
  {
    tipo: 'FRAQUEZA',
    titulo: 'Fraquezas',
    descricao: 'Pontos a melhorar',
    icon: AlertTriangle,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
  },
  {
    tipo: 'OPORTUNIDADE',
    titulo: 'Oportunidades',
    descricao: 'Fatores externos favoráveis',
    icon: TrendingUp,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
  },
  {
    tipo: 'AMEACA',
    titulo: 'Ameaças',
    descricao: 'Riscos externos',
    icon: Target,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
  },
];

// Mock SWOT items
const initialSWOTItems: SWOTItem[] = [
  { id: '1', tipo: 'FORCA', texto: 'Equipe de palestras com alta taxa de conversão (85%)', prioridade: 1, geradoPorIA: false },
  { id: '2', tipo: 'FORCA', texto: 'Líder Allysson com experiência de 5 campanhas anteriores', prioridade: 2, geradoPorIA: false },
  { id: '3', tipo: 'FRAQUEZA', texto: 'Alto índice de inadimplência na equipe Casa em Casa', prioridade: 1, geradoPorIA: true },
  { id: '4', tipo: 'FRAQUEZA', texto: 'Baixa cobertura geográfica em Dois Vizinhos', prioridade: 2, geradoPorIA: false },
  { id: '5', tipo: 'OPORTUNIDADE', texto: 'Feira regional de saúde na próxima semana', prioridade: 1, geradoPorIA: true },
  { id: '6', tipo: 'OPORTUNIDADE', texto: 'Parceria com igrejas locais para palestras', prioridade: 2, geradoPorIA: false },
  { id: '7', tipo: 'AMEACA', texto: 'Chuvas intensas previstas para a próxima semana', prioridade: 1, geradoPorIA: true },
  { id: '8', tipo: 'AMEACA', texto: 'Concorrência de vendedores ambulantes na região central', prioridade: 2, geradoPorIA: false },
];

export default function SWOTPage() {
  const [nivel, setNivel] = useState<'campanha' | 'lider' | 'equipe' | 'colportor'>('campanha');
  const [selectedId, setSelectedId] = useState<string>('');
  const [items, setItems] = useState<SWOTItem[]>(initialSWOTItems);
  const [newItemText, setNewItemText] = useState<Record<TipoItemSWOT, string>>({
    FORCA: '',
    FRAQUEZA: '',
    OPORTUNIDADE: '',
    AMEACA: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingSection, setGeneratingSection] = useState<TipoItemSWOT | 'all' | null>(null);

  const getItemsByTipo = (tipo: TipoItemSWOT) => 
    items.filter(item => item.tipo === tipo).sort((a, b) => a.prioridade - b.prioridade);

  const addItem = (tipo: TipoItemSWOT) => {
    if (!newItemText[tipo].trim()) return;
    
    const newItem: SWOTItem = {
      id: Date.now().toString(),
      tipo,
      texto: newItemText[tipo],
      prioridade: getItemsByTipo(tipo).length + 1,
      geradoPorIA: false,
    };
    
    setItems([...items, newItem]);
    setNewItemText({ ...newItemText, [tipo]: '' });
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const movePriority = (id: string, direction: 'up' | 'down') => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    const sameTypeItems = getItemsByTipo(item.tipo);
    const currentIndex = sameTypeItems.findIndex(i => i.id === id);
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex < 0 || newIndex >= sameTypeItems.length) return;

    const updatedItems = items.map(i => {
      if (i.id === id) return { ...i, prioridade: newIndex + 1 };
      if (i.id === sameTypeItems[newIndex].id) return { ...i, prioridade: currentIndex + 1 };
      return i;
    });

    setItems(updatedItems);
  };

  const generateWithAI = async (tipo?: TipoItemSWOT) => {
    setIsGenerating(true);
    setGeneratingSection(tipo || 'all');
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const aiSuggestions: Partial<Record<TipoItemSWOT, string[]>> = {
      FORCA: [
        'Forte engajamento dos colportores com média de 45 visitas/dia',
        'Taxa de fechamento 23% acima da média histórica',
      ],
      FRAQUEZA: [
        'Dependência excessiva de vendas em palestrasSugerido',
        'Tempo médio de cobrança superior a 15 dias',
      ],
      OPORTUNIDADE: [
        'Novos bairros residenciais em Pato Branco sem cobertura',
        'Aumento de 30% na procura por conteúdo de saúde',
      ],
      AMEACA: [
        'Feriado prolongado pode reduzir disponibilidade de clientes',
        'Aumento no preço de combustível impacta deslocamentos',
      ],
    };

    const typesToGenerate = tipo ? [tipo] : (['FORCA', 'FRAQUEZA', 'OPORTUNIDADE', 'AMEACA'] as TipoItemSWOT[]);
    
    const newItems: SWOTItem[] = [];
    typesToGenerate.forEach(t => {
      const suggestions = aiSuggestions[t] || [];
      suggestions.forEach((texto, index) => {
        newItems.push({
          id: `ai-${Date.now()}-${t}-${index}`,
          tipo: t,
          texto,
          prioridade: getItemsByTipo(t).length + index + 1,
          geradoPorIA: true,
        });
      });
    });

    setItems([...items, ...newItems]);
    setIsGenerating(false);
    setGeneratingSection(null);
  };

  const getNivelLabel = () => {
    switch (nivel) {
      case 'campanha': return mockCampanha.nome;
      case 'lider': return mockLideres.find(l => l.id === selectedId)?.user.nome || 'Selecione um líder';
      case 'equipe': return 'Equipe selecionada';
      case 'colportor': return 'Colportor selecionado';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Análise SWOT</h1>
          <p className="text-muted-foreground">
            Forças, Fraquezas, Oportunidades e Ameaças com IA
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={nivel} onValueChange={(v: typeof nivel) => setNivel(v)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Nível" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="campanha">Campanha</SelectItem>
              <SelectItem value="lider">Líder</SelectItem>
              <SelectItem value="equipe">Equipe</SelectItem>
              <SelectItem value="colportor">Colportor</SelectItem>
            </SelectContent>
          </Select>

          {nivel === 'lider' && (
            <Select value={selectedId} onValueChange={setSelectedId}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Selecione líder" />
              </SelectTrigger>
              <SelectContent>
                {mockLideres.map(lider => (
                  <SelectItem key={lider.id} value={lider.id}>
                    {lider.user.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Button 
            onClick={() => generateWithAI()} 
            disabled={isGenerating}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            {isGenerating && generatingSection === 'all' ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Gerar com IA
          </Button>
        </div>
      </div>

      {/* Nível Info */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            {nivel === 'campanha' && <Target className="h-6 w-6 text-primary" />}
            {nivel === 'lider' && <Users className="h-6 w-6 text-primary" />}
            {nivel === 'equipe' && <Users className="h-6 w-6 text-primary" />}
            {nivel === 'colportor' && <User className="h-6 w-6 text-primary" />}
            <div>
              <p className="text-sm text-muted-foreground">Analisando</p>
              <p className="font-semibold text-foreground">{getNivelLabel()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SWOT Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {swotSections.map((section) => {
          const sectionItems = getItemsByTipo(section.tipo);
          const Icon = section.icon;
          
          return (
            <Card key={section.tipo} className={`${section.borderColor} border-2`}>
              <CardHeader className={`${section.bgColor} rounded-t-lg`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-6 w-6 ${section.color}`} />
                    <div>
                      <CardTitle className={section.color}>{section.titulo}</CardTitle>
                      <CardDescription>{section.descricao}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">{sectionItems.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                {/* Items */}
                {sectionItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                  >
                    <span className="text-xs font-medium text-muted-foreground min-w-[20px]">
                      {index + 1}.
                    </span>
                    <p className="flex-1 text-sm text-foreground">{item.texto}</p>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.geradoPorIA && (
                        <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                          <Sparkles className="h-3 w-3 mr-1" />
                          IA
                        </Badge>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => movePriority(item.id, 'up')}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => movePriority(item.id, 'down')}
                        disabled={index === sectionItems.length - 1}
                      >
                        <ArrowDown className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Add new item */}
                <div className="flex gap-2 pt-2">
                  <Textarea
                    value={newItemText[section.tipo]}
                    onChange={(e) => setNewItemText({ ...newItemText, [section.tipo]: e.target.value })}
                    placeholder={`Adicionar ${section.titulo.toLowerCase().slice(0, -1)}...`}
                    className="min-h-[60px] text-sm"
                  />
                  <div className="flex flex-col gap-1">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => addItem(section.tipo)}
                      disabled={!newItemText[section.tipo].trim()}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => generateWithAI(section.tipo)}
                      disabled={isGenerating}
                      className="text-primary border-primary/30 hover:bg-primary/10"
                    >
                      {isGenerating && generatingSection === section.tipo ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Resumo da Análise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {swotSections.map((section) => {
              const count = getItemsByTipo(section.tipo).length;
              const aiCount = getItemsByTipo(section.tipo).filter(i => i.geradoPorIA).length;
              const Icon = section.icon;
              
              return (
                <div key={section.tipo} className={`p-4 rounded-lg ${section.bgColor} ${section.borderColor} border`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`h-5 w-5 ${section.color}`} />
                    <span className={`font-medium ${section.color}`}>{section.titulo}</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{count}</p>
                  <p className="text-xs text-muted-foreground">{aiCount} gerados por IA</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
