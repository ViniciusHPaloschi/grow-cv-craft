
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Modelos = () => {
  const navigate = useNavigate();

  const handleModelSelection = (modelType) => {
    localStorage.setItem('growcv_selected_model', modelType);
    navigate('/visualizacao');
  };

  const models = [
    {
      id: 'classico',
      name: 'Clássico',
      description: 'Design tradicional e elegante, ideal para áreas corporativas',
      preview: 'bg-gradient-to-br from-gray-100 to-gray-200',
      features: ['Layout tradicional', 'Tipografia clássica', 'Cores neutras']
    },
    {
      id: 'moderno',
      name: 'Moderno',
      description: 'Design contemporâneo com elementos visuais atuais',
      preview: 'bg-gradient-to-br from-blue-100 to-blue-200',
      features: ['Design atual', 'Cores vibrantes', 'Layout dinâmico']
    },
    {
      id: 'criativo',
      name: 'Criativo',
      description: 'Design inovador para profissionais de áreas criativas',
      preview: 'bg-gradient-to-br from-green-100 to-green-200',
      features: ['Visual único', 'Elementos gráficos', 'Estilo diferenciado']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-gray-800">Grow CV</Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Escolha seu modelo</h1>
          <p className="mt-2 text-gray-600">Selecione o design que melhor representa seu perfil profissional</p>
        </div>

        {/* Models Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {models.map((model) => (
            <div key={model.id} className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow">
              {/* Preview */}
              <div className={`h-64 ${model.preview} p-4`}>
                <div className="bg-white rounded-lg p-4 h-full shadow-inner">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-200 rounded w-2/3"></div>
                    <div className="mt-4 space-y-1">
                      <div className="h-2 bg-gray-200 rounded"></div>
                      <div className="h-2 bg-gray-200 rounded"></div>
                      <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                    </div>
                    <div className="mt-4">
                      <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                      <div className="mt-2 space-y-1">
                        <div className="h-2 bg-gray-200 rounded"></div>
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{model.name}</h3>
                <p className="text-gray-600 mb-4">{model.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Características:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {model.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleModelSelection(model.id)}
                  className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Escolher este modelo
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Link
            to="/formulario"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Voltar aos dados
          </Link>
          <div className="text-gray-500 text-sm flex items-center">
            Passo 2 de 3
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modelos;
