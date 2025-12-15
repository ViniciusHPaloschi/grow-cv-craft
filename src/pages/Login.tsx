import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail, Lock, Loader2 } from 'lucide-react';

interface FormData {
  email: string;
  senha: string;
}

interface Errors {
  email?: string;
  senha?: string;
  general?: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    senha: ''
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors: Errors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    }
    
    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.senha
      });

      if (error) {
        console.error('Login error:', error);
        setErrors({ general: 'E-mail ou senha incorretos' });
        return;
      }

      if (data.user) {
        toast.success('Login realizado com sucesso!');
        navigate('/painel');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setErrors({ general: 'Erro interno. Tente novamente.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-hero pointer-events-none" />
      <div className="fixed top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-pulse-slow pointer-events-none" />
      <div className="fixed bottom-1/3 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[128px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-10 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Link to="/" className="inline-flex items-center justify-center space-x-3 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-xl blur-xl" />
                <img 
                  src="/lovable-uploads/5fe141ed-a11c-4e31-85cc-a650afdddec2.png" 
                  alt="Grow CV Logo" 
                  className="h-12 w-12 relative"
                />
              </div>
              <span className="text-2xl font-display font-bold text-foreground">Grow CV</span>
            </Link>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
              Bem-vindo de volta
            </h1>
            <p className="text-muted-foreground">
              Entre na sua conta para continuar
            </p>
          </div>

          {/* Form */}
          <div className="glass-strong rounded-3xl p-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-sm">
                  {errors.general}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  E-mail
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`pl-12 py-6 bg-muted/50 border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary ${
                      errors.email ? 'border-destructive' : ''
                    }`}
                    placeholder="seu@email.com"
                  />
                </div>
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="senha" className="text-foreground font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="password"
                    id="senha"
                    name="senha"
                    value={formData.senha}
                    onChange={handleInputChange}
                    className={`pl-12 py-6 bg-muted/50 border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary ${
                      errors.senha ? 'border-destructive' : ''
                    }`}
                    placeholder="Sua senha"
                  />
                </div>
                {errors.senha && <p className="text-sm text-destructive">{errors.senha}</p>}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl text-lg glow-primary hover-glow"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>

            <div className="mt-8 text-center space-y-4">
              <p className="text-muted-foreground">
                Não tem uma conta?{' '}
                <Link to="/cadastro" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                  Criar conta grátis
                </Link>
              </p>
              
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar ao início
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
