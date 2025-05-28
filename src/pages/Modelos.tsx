
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { FormData } from '@/types/curriculum';
import { toast } from 'sonner';

const Modelos = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
      return;
    }

    // Verificar se está editando
    const editId = localStorage.getItem('growcv_editing_id');
    if (editId) {
      setIsEditing(true);
    }

    // Carregar dados do formulário
    const savedData = localStorage.getItem('growcv_form_data');
    if (!savedData) {
      navigate('/formulario');
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      setFormData(parsed);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      navigate('/formulario');
    }

    // Carregar modelo salvo
    const savedModel = localStorage.getItem('growcv_selected_model');
    if (savedModel) {
      setSelectedModel(savedModel);
    }
  }, [user, loading, navigate]);

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    localStorage.setItem('growcv_selected_model', model);
  };

  const handleContinue = async () => {
    if (!selectedModel) {
      toast.error('Por favor, selecione um modelo');
      return;
    }

    if (!user || !formData) {
      toast.error('Dados inválidos');
      return;
    }

    setSaving(true);

    try {
      const editingId = localStorage.getItem('growcv_editing_id');
      
      const curriculumData = {
        user_id: user.id,
        name: `Currículo - ${formData.nomeCompleto}`,
        model: selectedModel,
        personal_info: {
          nomeCompleto: formData.nomeCompleto,
          email: formData.email,
          telefone: formData.telefone,
          endereco: formData.endereco,
          objetivoProfissional: formData.objetivoProfissional
        },
        education: formData.formacoes,
        experience: formData.experiencias,
        courses: formData.cursos,
        skills: formData.habilidades
      };

      if (isEditing && editingId) {
        // Atualizar currículo existente
        const { error } = await supabase
          .from('curriculums')
          .update(curriculumData)
          .eq('id', editingId);

        if (error) {
          console.error('Erro ao atualizar currículo:', error);
          toast.error('Erro ao atualizar currículo');
          return;
        }

        toast.success('Currículo atualizado com sucesso!');
        localStorage.removeItem('growcv_editing_id');
      } else {
        // Criar novo currículo
        const { error } = await supabase
          .from('curriculums')
          .insert([curriculumData]);

        if (error) {
          console.error('Erro ao salvar currículo:', error);
          toast.error('Erro ao salvar currículo');
          return;
        }

        toast.success('Currículo criado com sucesso!');
      }

      // Ir para visualização
      navigate('/visualizacao');
    } catch (error) {
      console.error('Erro ao processar currículo:', error);
      toast.error('Erro ao processar currículo');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Carregando...</div>
      </div>
    );
  }

  const models = [
    {
      id: 'classico',
      name: 'Clássico',
      description: 'Design tradicional e formal, ideal para áreas conservadoras',
      preview: '📄'
    },
    {
      id: 'moderno',
      name: 'Moderno',
      description: 'Layout contemporâneo com toques de cor, perfeito para startups',
      preview: '🎨'
    },
    {
      id: 'criativo',
      name: 'Criativo',
      description: 'Design ousado e diferenciado, ideal para áreas criativas',
      preview: '✨'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-gray-800">Grow CV</Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Escolha seu Modelo</h1>
          <p className="mt-2 text-gray-600">Selecione o modelo que melhor representa seu perfil profissional</p>
        </div>

        {/* Models Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {models.map((model) => (
            <div
              key={model.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                selectedModel === model.id
                  ? 'ring-4 ring-blue-500 transform scale-105'
                  : 'hover:shadow-xl hover:transform hover:scale-102'
              }`}
              onClick={() => handleModelSelect(model.id)}
            >
              {/* Preview */}
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-6xl">{model.preview}</div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{model.name}</h3>
                  {selectedModel === model.id && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 text-sm">{model.description}</p>

                {/* Features */}
                <div className="mt-4 space-y-1">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Layout responsivo
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Exportação PDF
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Fácil personalização
                  </div>
                </div>

                {selectedModel === model.id && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-blue-800 text-sm font-medium">✓ Modelo selecionado</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Preview Section */}
        {selectedModel && (
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
              Preview do Modelo {models.find(m => m.id === selectedModel)?.name}
            </h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="text-4xl mb-4">
                {models.find(m => m.id === selectedModel)?.preview}
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                {formData?.nomeCompleto || 'Seu Nome Aqui'}
              </h3>
              <p className="text-gray-600 mb-4">
                {formData?.email || 'seu@email.com'} • {formData?.telefone || '(00) 00000-0000'}
              </p>
              <div className="text-sm text-gray-500 max-w-md mx-auto">
                {formData?.objetivoProfissional || 'Seu objetivo profissional aparecerá aqui...'}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link
            to="/formulario"
            className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
          >
            ← Voltar aos Dados
          </Link>

          <button
            onClick={handleContinue}
            disabled={!selectedModel || saving}
            className={`px-8 py-3 font-semibold rounded-lg transition-colors ${
              selectedModel && !saving
                ? 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {saving ? 'Salvando...' : (isEditing ? 'Atualizar Currículo →' : 'Gerar Currículo →')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modelos;
