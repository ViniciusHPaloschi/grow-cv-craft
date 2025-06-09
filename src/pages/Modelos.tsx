
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { FormData } from '@/types/curriculum';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Modelos = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [currentTheme, setCurrentTheme] = useState({
    primary: '#3178c6',
    secondary: '#f0f0f0',
    accent: '#a0d468'
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
      return;
    }

    const savedData = localStorage.getItem('growcv_form_data');
    const savedModel = localStorage.getItem('growcv_selected_model');

    if (!savedData) {
      navigate('/formulario');
      return;
    }

    try {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      
      if (savedModel) {
        setSelectedModel(savedModel);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      navigate('/formulario');
    }
  }, [user, loading, navigate]);

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    localStorage.setItem('growcv_selected_model', model);
  };

  const handleThemeChange = (color: string, type: 'primary' | 'secondary' | 'accent') => {
    setCurrentTheme(prev => ({
      ...prev,
      [type]: color
    }));
  };

  const handleContinue = () => {
    if (!selectedModel) {
      toast.error('Selecione um modelo antes de continuar.');
      return;
    }
    navigate('/visualizacao');
  };

  const renderClassicoModel = () => (
    <div className="bg-white p-6 max-w-md mx-auto shadow-lg rounded-lg border">
      {/* Header */}
      <div className="text-center pb-3 mb-3 border-b-2 border-gray-800">
        {formData?.fotoUrl && (
          <div className="flex justify-center mb-2">
            <img
              src={formData.fotoUrl}
              alt="Foto de perfil"
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-800"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
        <h1 className="text-xl font-bold text-gray-800 mb-1">{formData?.nomeCompleto}</h1>
        <div className="text-gray-600 text-xs space-y-1">
          <p>{formData?.email} • {formData?.telefone}</p>
          <p>{formData?.endereco}</p>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        {/* Objetivo */}
        {formData?.objetivoProfissional && (
          <div>
            <h2 className="text-sm font-bold text-gray-800 mb-1 pb-1 border-b border-gray-800">
              OBJETIVO PROFISSIONAL
            </h2>
            <p className="text-gray-700 leading-relaxed">{formData.objetivoProfissional.substring(0, 100)}...</p>
          </div>
        )}

        {/* Experiência */}
        {formData?.experiencias.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-gray-800 mb-1 pb-1 border-b border-gray-800">
              EXPERIÊNCIA PROFISSIONAL
            </h2>
            <div className="space-y-2">
              {formData.experiencias.slice(0, 2).map((exp, index) => (
                <div key={exp.id || index}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-800">{exp.cargo}</h3>
                    <span className="text-gray-600 text-xs">{exp.anoInicio} - {exp.anoFim}</span>
                  </div>
                  <p className="text-gray-700 font-medium">{exp.empresa}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formação */}
        {formData?.formacoes.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-gray-800 mb-1 pb-1 border-b border-gray-800">
              FORMAÇÃO ACADÊMICA
            </h2>
            <div className="space-y-1">
              {formData.formacoes.slice(0, 1).map((formacao, index) => (
                <div key={formacao.id || index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{formacao.curso}</h3>
                      <p className="text-gray-700">{formacao.instituicao}</p>
                    </div>
                    <span className="text-gray-600 text-xs">{formacao.anoInicio} - {formacao.anoFim}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderModernoModel = () => (
    <div className="bg-white max-w-md mx-auto shadow-lg rounded-lg overflow-hidden border">
      {/* Header */}
      <div className="p-4 text-white" style={{ backgroundColor: currentTheme.primary }}>
        <div className="flex items-center space-x-4">
          {formData?.fotoUrl && (
            <img
              src={formData.fotoUrl}
              alt="Foto de perfil"
              className="w-12 h-12 rounded-full object-cover border-2 border-white"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          <div>
            <h1 className="text-lg font-bold mb-1">{formData?.nomeCompleto}</h1>
            <div className="text-white/90 text-xs space-y-1">
              <p>{formData?.email}</p>
              <p>{formData?.telefone}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3 text-xs">
        {/* Objetivo */}
        {formData?.objetivoProfissional && (
          <div>
            <h2 className="text-sm font-bold mb-1 pb-1 border-b-2" style={{ color: currentTheme.primary, borderColor: currentTheme.primary }}>
              OBJETIVO PROFISSIONAL
            </h2>
            <p className="text-gray-700 leading-relaxed">{formData.objetivoProfissional.substring(0, 100)}...</p>
          </div>
        )}

        {/* Experiência */}
        {formData?.experiencias.length > 0 && (
          <div>
            <h2 className="text-sm font-bold mb-1 pb-1 border-b-2" style={{ color: currentTheme.primary, borderColor: currentTheme.primary }}>
              EXPERIÊNCIA PROFISSIONAL
            </h2>
            <div className="space-y-2">
              {formData.experiencias.slice(0, 2).map((exp, index) => (
                <div key={exp.id || index}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-800">{exp.cargo}</h3>
                    <span className="text-white text-xs px-2 py-1 rounded" style={{ backgroundColor: currentTheme.accent }}>
                      {exp.anoInicio} - {exp.anoFim}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium">{exp.empresa}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderCriativoModel = () => (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 max-w-md mx-auto shadow-xl rounded-lg overflow-hidden border">
      {/* Header */}
      <div className="relative p-4 text-white" style={{ background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.accent})` }}>
        <div className="flex items-center space-x-4">
          {formData?.fotoUrl && (
            <img
              src={formData.fotoUrl}
              alt="Foto de perfil"
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          <div>
            <h1 className="text-lg font-bold mb-1">{formData?.nomeCompleto}</h1>
            <div className="text-white/90 text-xs space-y-1">
              <p>{formData?.email}</p>
              <p>{formData?.telefone}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3 text-xs">
        {/* Objetivo */}
        {formData?.objetivoProfissional && (
          <div className="bg-white p-3 rounded-lg shadow-sm border-l-4" style={{ borderColor: currentTheme.primary }}>
            <h2 className="text-sm font-bold mb-1" style={{ color: currentTheme.primary }}>
              OBJETIVO PROFISSIONAL
            </h2>
            <p className="text-gray-700 leading-relaxed">{formData.objetivoProfissional.substring(0, 100)}...</p>
          </div>
        )}

        {/* Experiência */}
        {formData?.experiencias.length > 0 && (
          <div className="bg-white p-3 rounded-lg shadow-sm border-l-4" style={{ borderColor: currentTheme.primary }}>
            <h2 className="text-sm font-bold mb-2" style={{ color: currentTheme.primary }}>
              EXPERIÊNCIA PROFISSIONAL
            </h2>
            <div className="space-y-2">
              {formData.experiencias.slice(0, 2).map((exp, index) => (
                <div key={exp.id || index} className="pb-2 border-b border-gray-200 last:border-b-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-800">{exp.cargo}</h3>
                    <span className="text-white text-xs px-2 py-1 rounded-full" style={{ backgroundColor: currentTheme.accent }}>
                      {exp.anoInicio} - {exp.anoFim}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium">{exp.empresa}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Carregando...</div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Nenhum dado encontrado.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-gray-800">Grow CV</Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Escolha seu Modelo</h1>
          <p className="mt-2 text-gray-600">Selecione o modelo que melhor se adequa ao seu perfil profissional</p>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Modelo Clássico */}
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Modelo Clássico</h2>
              <p className="text-gray-600 text-sm">Design tradicional e elegante, ideal para áreas mais conservadoras</p>
            </div>
            <div 
              className={`cursor-pointer transition-all duration-300 ${
                selectedModel === 'classico' ? 'ring-4 ring-blue-500 transform scale-105' : 'hover:scale-105'
              }`}
              onClick={() => handleModelSelect('classico')}
            >
              {renderClassicoModel()}
            </div>
            {selectedModel === 'classico' && (
              <div className="text-center">
                <span className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg font-medium">
                  ✓ Selecionado
                </span>
              </div>
            )}
          </div>

          {/* Modelo Moderno */}
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Modelo Moderno</h2>
              <p className="text-gray-600 text-sm">Design contemporâneo com cores personalizáveis</p>
            </div>
            <div 
              className={`cursor-pointer transition-all duration-300 ${
                selectedModel === 'moderno' ? 'ring-4 ring-blue-500 transform scale-105' : 'hover:scale-105'
              }`}
              onClick={() => handleModelSelect('moderno')}
            >
              {renderModernoModel()}
            </div>
            {selectedModel === 'moderno' && (
              <div className="space-y-4">
                <div className="text-center">
                  <span className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg font-medium">
                    ✓ Selecionado
                  </span>
                </div>
                {/* Color Selectors */}
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <h3 className="font-medium text-gray-800 mb-3">Personalizar Cores</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Cor Principal</label>
                      <div className="flex gap-2">
                        {['#3178c6', '#2563eb', '#7c3aed', '#dc2626', '#059669'].map(color => (
                          <button
                            key={color}
                            className={`w-8 h-8 rounded-full border-2 ${
                              currentTheme.primary === color ? 'border-gray-800' : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => handleThemeChange(color, 'primary')}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Cor de Destaque</label>
                      <div className="flex gap-2">
                        {['#a0d468', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'].map(color => (
                          <button
                            key={color}
                            className={`w-8 h-8 rounded-full border-2 ${
                              currentTheme.accent === color ? 'border-gray-800' : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => handleThemeChange(color, 'accent')}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modelo Criativo */}
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Modelo Criativo</h2>
              <p className="text-gray-600 text-sm">Design inovador com gradientes e elementos visuais únicos</p>
            </div>
            <div 
              className={`cursor-pointer transition-all duration-300 ${
                selectedModel === 'criativo' ? 'ring-4 ring-blue-500 transform scale-105' : 'hover:scale-105'
              }`}
              onClick={() => handleModelSelect('criativo')}
            >
              {renderCriativoModel()}
            </div>
            {selectedModel === 'criativo' && (
              <div className="space-y-4">
                <div className="text-center">
                  <span className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg font-medium">
                    ✓ Selecionado
                  </span>
                </div>
                {/* Color Selectors */}
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <h3 className="font-medium text-gray-800 mb-3">Personalizar Cores</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Cor Principal</label>
                      <div className="flex gap-2">
                        {['#3178c6', '#2563eb', '#7c3aed', '#dc2626', '#059669'].map(color => (
                          <button
                            key={color}
                            className={`w-8 h-8 rounded-full border-2 ${
                              currentTheme.primary === color ? 'border-gray-800' : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => handleThemeChange(color, 'primary')}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Cor de Destaque</label>
                      <div className="flex gap-2">
                        {['#a0d468', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'].map(color => (
                          <button
                            key={color}
                            className={`w-8 h-8 rounded-full border-2 ${
                              currentTheme.accent === color ? 'border-gray-800' : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => handleThemeChange(color, 'accent')}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <Link
            to="/formulario"
            className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
          >
            ← Editar Dados
          </Link>
          <button
            onClick={handleContinue}
            disabled={!selectedModel}
            className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modelos;
