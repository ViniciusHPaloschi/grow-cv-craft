
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const Index = () => {
  const { redirectToFormulario, redirectToModelos } = useAuthRedirect();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/5fe141ed-a11c-4e31-85cc-a650afdddec2.png" 
                alt="Grow CV Logo" 
                className="h-10 w-10"
              />
              <h1 className="text-2xl font-bold text-gray-800">Grow CV</h1>
            </div>
            <div className="flex space-x-4">
              <Link 
                to="/login" 
                className="px-4 py-2 text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/cadastro" 
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Cadastro
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Crie seu currículo profissional
            <span className="text-blue-500"> em minutos</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Com o Grow CV, você pode criar currículos profissionais de forma rápida e fácil. 
            Escolha entre diferentes modelos e personalize com seus dados.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={redirectToFormulario}
              className="px-8 py-4 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Começar Agora
            </button>
            <button 
              onClick={redirectToModelos}
              className="px-8 py-4 border-2 text-lg font-semibold rounded-lg transition-colors"
              style={{ 
                borderColor: '#264653', 
                color: '#264653',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#264653';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#264653';
              }}
            >
              Ver Modelos
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Rápido e Fácil</h3>
            <p className="text-gray-600">Crie seu currículo em poucos minutos com nosso formulário intuitivo.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#264653' + '20' }}>
              <svg className="w-8 h-8" fill="none" stroke="#264653" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Profissional</h3>
            <p className="text-gray-600">Modelos criados por especialistas para impressionar recrutadores.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Download PDF</h3>
            <p className="text-gray-600">Baixe seu currículo em PDF de alta qualidade para enviar.</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Pronto para criar seu currículo?
          </h3>
          <p className="text-lg text-gray-600 mb-8">
            Junte-se a milhares de profissionais que já conseguiram suas vagas dos sonhos.
          </p>
          <button 
            onClick={redirectToFormulario}
            className="inline-block px-8 py-4 text-white text-lg font-semibold rounded-lg transition-colors shadow-lg"
            style={{ backgroundColor: '#264653' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1e3a3f';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#264653';
            }}
          >
            Começar Gratuitamente
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Grow CV. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
