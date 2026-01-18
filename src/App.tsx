import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import Dashboard from "@/pages/Dashboard";
import LideresPage from "@/pages/LideresPage";
import LiderDetalhePage from "@/pages/LiderDetalhePage";
import EquipeDetalhePage from "@/pages/EquipeDetalhePage";
import ColportorDetalhePage from "@/pages/ColportorDetalhePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/lideres" element={<LideresPage />} />
            <Route path="/lideres/:liderId" element={<LiderDetalhePage />} />
            <Route path="/lideres/:liderId/equipes/:equipeId" element={<EquipeDetalhePage />} />
            <Route path="/lideres/:liderId/equipes/:equipeId/colportores/:colportorId" element={<ColportorDetalhePage />} />
            <Route path="/metas" element={<Dashboard />} />
            <Route path="/atividades" element={<Dashboard />} />
            <Route path="/financeiro" element={<Dashboard />} />
            <Route path="/swot" element={<Dashboard />} />
            <Route path="/mapa" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
