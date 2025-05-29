import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { FormData, Education, Experience, Course } from '@/types/curriculum';
import { toast } from 'sonner';
import ProfilePhotoUpload from '@/components/ProfilePhotoUpload';

const Formulario = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    nomeCompleto: '',
    email: '',
    telefone: '',
    endereco: '',
    objetivoProfissional: '',
    fotoUrl: undefined,
    formacoes: [],
    experiencias: [],
    cursos: [],
    habilidades: ''
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
      return;
    }

    // Verificar se está editando
    const editId = localStorage.getItem('growcv_editing_id');
    const savedData = localStorage.getItem('growcv_form_data');
    
    console.log('Verificando modo de operação...');
    console.log('Edit ID:', editId);
    console.log('Saved Data exists:', !!savedData);
    
    if (editId && savedData) {
      // Modo de edição - carregar dados salvos
      console.log('Modo de edição detectado - carregando dados');
      setIsEditing(true);
      setEditingId(editId);
      
      try {
        const parsed = JSON.parse(savedData);
        console.log('Dados carregados para edição:', parsed);
        setFormData(parsed);
      } catch (error) {
        console.error('Erro ao carregar dados salvos:', error);
        // Em caso de erro, resetar para modo de criação
        setIsEditing(false);
        setEditingId(null);
      }
      
      // Remover o ID de edição do localStorage após carregar os dados
      localStorage.removeItem('growcv_editing_id');
    } else {
      // Modo de criação - verificar se existe dados que devem ser limpos
      console.log('Modo de criação - iniciando com dados limpos');
      setIsEditing(false);
      setEditingId(null);
      
      // Se existe dados salvos mas não é edição, limpar
      if (savedData && !editId) {
        console.log('Limpando dados salvos (não é edição)');
        localStorage.removeItem('growcv_form_data');
      }
      
      // Garantir que o formulário comece vazio
      setFormData({
        nomeCompleto: '',
        email: '',
        telefone: '',
        endereco: '',
        objetivoProfissional: '',
        fotoUrl: undefined,
        formacoes: [],
        experiencias: [],
        cursos: [],
        habilidades: ''
      });
    }
  }, [user, loading, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (photoUrl: string | undefined) => {
    setFormData(prev => ({
      ...prev,
      fotoUrl: photoUrl
    }));
  };

  const addFormacao = () => {
    const newFormacao: Education = {
      id: Date.now().toString(),
      curso: '',
      instituicao: '',
      anoInicio: '',
      anoFim: ''
    };
    setFormData(prev => ({
      ...prev,
      formacoes: [...prev.formacoes, newFormacao]
    }));
  };

  const updateFormacao = (id: string, field: keyof Education, value: string) => {
    setFormData(prev => ({
      ...prev,
      formacoes: prev.formacoes.map(f => 
        f.id === id ? { ...f, [field]: value } : f
      )
    }));
  };

  const removeFormacao = (id: string) => {
    setFormData(prev => ({
      ...prev,
      formacoes: prev.formacoes.filter(f => f.id !== id)
    }));
  };

  const addExperiencia = () => {
    const newExperiencia: Experience = {
      id: Date.now().toString(),
      cargo: '',
      empresa: '',
      anoInicio: '',
      anoFim: '',
      descricao: ''
    };
    setFormData(prev => ({
      ...prev,
      experiencias: [...prev.experiencias, newExperiencia]
    }));
  };

  const updateExperiencia = (id: string, field: keyof Experience, value: string) => {
    setFormData(prev => ({
      ...prev,
      experiencias: prev.experiencias.map(e => 
        e.id === id ? { ...e, [field]: value } : e
      )
    }));
  };

  const removeExperiencia = (id: string) => {
    setFormData(prev => ({
      ...prev,
      experiencias: prev.experiencias.filter(e => e.id !== id)
    }));
  };

  const addCurso = () => {
    const newCurso: Course = {
      id: Date.now().toString(),
      nome: '',
      instituicao: '',
      ano: ''
    };
    setFormData(prev => ({
      ...prev,
      cursos: [...prev.cursos, newCurso]
    }));
  };

  const updateCurso = (id: string, field: keyof Course, value: string) => {
    setFormData(prev => ({
      ...prev,
      cursos: prev.cursos.map(c => 
        c.id === id ? { ...c, [field]: value } : c
      )
    }));
  };

  const removeCurso = (id: string) => {
    setFormData(prev => ({
      ...prev,
      cursos: prev.cursos.filter(c => c.id !== id)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error('Você precisa estar logado para salvar um currículo');
      return;
    }

    // Validação básica
    if (!formData.nomeCompleto || !formData.email) {
      toast.error('Nome completo e e-mail são obrigatórios');
      return;
    }

    try {
      // Salvar dados no localStorage para próxima página
      localStorage.setItem('growcv_form_data', JSON.stringify(formData));
      
      if (isEditing && editingId) {
        // Se está editando, ir direto para modelos
        navigate('/modelos');
      } else {
        // Se é novo, ir para modelos
        navigate('/modelos');
      }
    } catch (error) {
      console.error('Erro ao processar formulário:', error);
      toast.error('Erro ao processar dados do formulário');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/painel" className="text-2xl font-bold text-gray-800">Grow CV</Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            {isEditing ? 'Editar Currículo' : 'Criar Novo Currículo'}
          </h1>
          <p className="mt-2 text-gray-600">Preencha seus dados profissionais</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Foto de Perfil */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Foto de Perfil</h2>
              <ProfilePhotoUpload 
                currentPhotoUrl={formData.fotoUrl}
                onPhotoChange={handlePhotoChange}
              />
            </div>

            {/* Informações Pessoais */}
            <div className="border-b border-gray-200 pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Informações Pessoais</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="nomeCompleto"
                    value={formData.nomeCompleto}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Endereço
                  </label>
                  <input
                    type="text"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Objetivo Profissional
                </label>
                <textarea
                  name="objetivoProfissional"
                  value={formData.objetivoProfissional}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Descreva seu objetivo profissional..."
                />
              </div>
            </div>

            {/* Formação Acadêmica */}
            <div className="border-b border-gray-200 pb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Formação Acadêmica</h2>
                <button
                  type="button"
                  onClick={addFormacao}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  + Adicionar Formação
                </button>
              </div>

              {formData.formacoes.map((formacao, index) => (
                <div key={formacao.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium text-gray-700">Formação {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeFormacao(formacao.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remover
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Curso</label>
                      <input
                        type="text"
                        value={formacao.curso}
                        onChange={(e) => updateFormacao(formacao.id, 'curso', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Instituição</label>
                      <input
                        type="text"
                        value={formacao.instituicao}
                        onChange={(e) => updateFormacao(formacao.id, 'instituicao', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ano de Início</label>
                      <input
                        type="text"
                        value={formacao.anoInicio}
                        onChange={(e) => updateFormacao(formacao.id, 'anoInicio', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ano de Conclusão</label>
                      <input
                        type="text"
                        value={formacao.anoFim}
                        onChange={(e) => updateFormacao(formacao.id, 'anoFim', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Experiência Profissional */}
            <div className="border-b border-gray-200 pb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Experiência Profissional</h2>
                <button
                  type="button"
                  onClick={addExperiencia}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  + Adicionar Experiência
                </button>
              </div>

              {formData.experiencias.map((experiencia, index) => (
                <div key={experiencia.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium text-gray-700">Experiência {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeExperiencia(experiencia.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remover
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                      <input
                        type="text"
                        value={experiencia.cargo}
                        onChange={(e) => updateExperiencia(experiencia.id, 'cargo', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                      <input
                        type="text"
                        value={experiencia.empresa}
                        onChange={(e) => updateExperiencia(experiencia.id, 'empresa', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ano de Início</label>
                      <input
                        type="text"
                        value={experiencia.anoInicio}
                        onChange={(e) => updateExperiencia(experiencia.id, 'anoInicio', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ano de Saída</label>
                      <input
                        type="text"
                        value={experiencia.anoFim}
                        onChange={(e) => updateExperiencia(experiencia.id, 'anoFim', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição das Atividades</label>
                    <textarea
                      value={experiencia.descricao}
                      onChange={(e) => updateExperiencia(experiencia.id, 'descricao', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Cursos Complementares */}
            <div className="border-b border-gray-200 pb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Cursos Complementares</h2>
                <button
                  type="button"
                  onClick={addCurso}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  + Adicionar Curso
                </button>
              </div>

              {formData.cursos.map((curso, index) => (
                <div key={curso.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium text-gray-700">Curso {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeCurso(curso.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remover
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Curso</label>
                      <input
                        type="text"
                        value={curso.nome}
                        onChange={(e) => updateCurso(curso.id, 'nome', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Instituição</label>
                      <input
                        type="text"
                        value={curso.instituicao}
                        onChange={(e) => updateCurso(curso.id, 'instituicao', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Ano de Conclusão</label>
                      <input
                        type="text"
                        value={curso.ano}
                        onChange={(e) => updateCurso(curso.id, 'ano', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Habilidades */}
            <div className="pb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Habilidades</h2>
              <textarea
                name="habilidades"
                value={formData.habilidades}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Liste suas principais habilidades separadas por vírgula..."
              />
            </div>

            {/* Botões */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <Link
                to="/painel"
                className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
              >
                ← Voltar ao Painel
              </Link>

              <button
                type="submit"
                className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                Próximo: Escolher Modelo →
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
