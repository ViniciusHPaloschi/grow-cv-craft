import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { ArrowRight, Zap, Shield, Download, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { redirectToFormulario, redirectToModelos } = useAuthRedirect();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/5fe141ed-a11c-4e31-85cc-a650afdddec2.png" 
                alt="Grow CV Logo" 
                className="h-10 w-10"
              />
              <span className="text-xl font-display font-bold text-foreground">Grow CV</span>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="font-medium">
                  Entrar
                </Button>
              </Link>
              <Link to="/cadastro">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6">
                  Criar conta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative pt-32 pb-20">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-40 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Novo: Modelos ATS-friendly</span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-tight mb-6">
              Crie seu currículo
              <span className="block text-gradient mt-2">profissional em minutos</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Destaque-se no mercado com currículos elegantes e profissionais. 
              Escolha modelos modernos e personalize com facilidade.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Button 
              onClick={redirectToFormulario}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg rounded-xl shadow-glow hover-lift"
            >
              Começar agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              onClick={redirectToModelos}
              variant="outline"
              size="lg"
              className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold px-8 py-6 text-lg rounded-xl hover-lift"
            >
              Ver modelos
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {[
              { value: '10k+', label: 'Currículos criados' },
              { value: '15+', label: 'Modelos profissionais' },
              { value: '98%', label: 'Satisfação' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-display font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Features */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Por que escolher o Grow CV?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ferramentas intuitivas para criar currículos que impressionam recrutadores
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Rápido e Intuitivo',
                description: 'Interface simples que permite criar seu currículo em poucos minutos, sem complicações.',
                color: 'text-primary bg-primary/10',
              },
              {
                icon: Shield,
                title: 'Modelos Profissionais',
                description: 'Designs criados por especialistas em RH para maximizar suas chances de contratação.',
                color: 'text-secondary bg-secondary/10',
              },
              {
                icon: Download,
                title: 'Export em PDF',
                description: 'Baixe seu currículo em PDF de alta qualidade, pronto para enviar a recrutadores.',
                color: 'text-primary bg-primary/10',
              },
            ].map((feature, i) => (
              <div 
                key={i} 
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-soft hover-lift"
              >
                <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary opacity-90" />
            
            {/* Content */}
            <div className="relative p-12 md:p-16 text-center">
              <h3 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
                Pronto para dar o próximo passo?
              </h3>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Junte-se a milhares de profissionais que já conquistaram suas vagas dos sonhos.
              </p>
              <Button 
                onClick={redirectToFormulario}
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-6 text-lg rounded-xl shadow-lg hover-lift"
              >
                Começar gratuitamente
                <ArrowRight className="ml-2 w-5 h-5" />
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
