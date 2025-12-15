import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { ArrowRight, Zap, Shield, Download, Sparkles, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { redirectToFormulario, redirectToModelos } = useAuthRedirect();

  return (
    <div className="min-h-screen bg-background">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-hero pointer-events-none" />
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-pulse-slow pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[128px] animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-xl blur-xl" />
                <img 
                  src="/lovable-uploads/5fe141ed-a11c-4e31-85cc-a650afdddec2.png" 
                  alt="Grow CV Logo" 
                  className="h-10 w-10 relative"
                />
              </div>
              <span className="text-xl font-display font-bold text-foreground">Grow CV</span>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" className="font-medium text-muted-foreground hover:text-foreground">
                  Entrar
                </Button>
              </Link>
              <Link to="/cadastro">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 glow-primary">
                  Começar grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative pt-40 pb-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="flex justify-center mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-gradient glass">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Modelos ATS otimizados para 2024</span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center max-w-5xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-foreground leading-[1.1] mb-8 tracking-tight">
              Currículos que
              <span className="block text-gradient mt-2">impressionam</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Crie currículos profissionais em minutos. Design moderno, otimizado para ATS, 
              e pronto para conquistar sua próxima oportunidade.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button 
              onClick={redirectToFormulario}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 py-7 text-lg rounded-2xl glow-primary hover-glow group"
            >
              Criar meu currículo
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              onClick={redirectToModelos}
              variant="outline"
              size="lg"
              className="border-2 border-border hover:border-primary/50 text-foreground hover:text-primary font-semibold px-10 py-7 text-lg rounded-2xl glass hover-glow"
            >
              Ver modelos
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {[
              { icon: Check, text: '100% Gratuito' },
              { icon: Zap, text: 'Pronto em 5 min' },
              { icon: Star, text: 'ATS Friendly' },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-muted-foreground">
                <badge.icon className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium">{badge.text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-24 grid grid-cols-3 gap-8 max-w-3xl mx-auto opacity-0 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {[
              { value: '10k+', label: 'Currículos criados' },
              { value: '15+', label: 'Modelos premium' },
              { value: '98%', label: 'Taxa de satisfação' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-2xl glass border-gradient">
                <div className="text-3xl sm:text-4xl font-display font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Features */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Recursos</span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-foreground mt-4 mb-6">
              Tudo que você precisa
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ferramentas poderosas e intuitivas para criar o currículo perfeito
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Ultra Rápido',
                description: 'Crie seu currículo completo em menos de 5 minutos com nossa interface intuitiva.',
                gradient: 'from-primary to-purple-500',
              },
              {
                icon: Shield,
                title: 'Otimizado para ATS',
                description: 'Nossos modelos são projetados para passar pelos sistemas de rastreamento de candidatos.',
                gradient: 'from-secondary to-emerald-400',
              },
              {
                icon: Download,
                title: 'Export Profissional',
                description: 'Baixe seu currículo em PDF de alta qualidade, pronto para impressionar.',
                gradient: 'from-amber-500 to-orange-500',
              },
            ].map((feature, i) => (
              <div 
                key={i} 
                className="group p-8 rounded-3xl glass border-gradient hover-lift opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${0.6 + i * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-display font-semibold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[2rem] overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-secondary opacity-90" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
            
            {/* Content */}
            <div className="relative p-12 md:p-20 text-center">
              <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                Pronto para decolar?
              </h3>
              <p className="text-xl text-white/80 mb-10 max-w-xl mx-auto">
                Junte-se a milhares de profissionais que já conquistaram suas vagas dos sonhos.
              </p>
              <Button 
                onClick={redirectToFormulario}
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-bold px-10 py-7 text-lg rounded-2xl shadow-2xl hover-lift group"
              >
                Criar currículo grátis
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/5fe141ed-a11c-4e31-85cc-a650afdddec2.png" 
                alt="Grow CV Logo" 
                className="h-8 w-8"
              />
              <span className="font-display font-semibold text-foreground">Grow CV</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Grow CV. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
