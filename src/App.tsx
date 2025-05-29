
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Formulario from "./pages/Formulario";
import Modelos from "./pages/Modelos";
import Visualizacao from "./pages/Visualizacao";
import Painel from "./pages/Painel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/formulario" 
              element={
                <ProtectedRoute>
                  <Formulario />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/modelos" 
              element={
                <ProtectedRoute>
                  <Modelos />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/visualizacao" 
              element={
                <ProtectedRoute>
                  <Visualizacao />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/painel" 
              element={
                <ProtectedRoute>
                  <Painel />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
