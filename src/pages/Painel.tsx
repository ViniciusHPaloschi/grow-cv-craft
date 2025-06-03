
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Curriculum, PersonalInfo, Education, Experience, Course } from '@/types/curriculum';
import { toast } from 'sonner';

const Painel = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [userProfile, setUserProfile] = useState<{ name: string } | null>(null);
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [loadingCurriculums, setLoadingCurriculums] = useState(true);
  const [showProfileEdit, setShowProfileEdit] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
      return;
    }
    
    if (user) {
      loadUserProfile();
      loadCurriculums();
    }
  }, [user, loading, navigate]);

  const loadUserProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Erro ao carregar perfil:', error);
        return;
      }

      setUserProfile(data);
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    }
  };

  const loadCurriculums = async () => {
    if (!user) return;
    
    try {
      setLoadingCurriculums(true);
      const { data, error } = await supabase
        .from('curriculums')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao carregar currículos:', error);
        toast.error('Erro ao carregar currículos');
        return;
      }

      // Cast the data to our Curriculum type with proper type conversion
      const typedCurriculums: Curriculum[] = (data || []).map(curriculum => ({
        ...curriculum,
        personal_info: curriculum.personal_info as unknown as PersonalInfo,
        education: (curriculum.education || []) as unknown as Education[],
        experience: (curriculum.experience || []) as unknown as Experience[],
        courses: (curriculum.courses || []) as unknown as Course[],
        skills: curriculum.skills || ''
      }));

      setCurriculums(typedCurriculums);
    } catch (error) {
      console.error('Erro ao carregar currículos:', error);
      toast.error('Erro ao carregar currículos');
    } finally {
      setLoadingCurriculums(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logout realizado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro no logout:', error);
      toast.error('Erro ao fazer logout');
    }
  };

  const deleteCurriculum = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este currículo?')) return;

    try {
      const { error } = await supabase
        .from('curriculums')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao excluir currículo:', error);
        toast.error('Erro ao excluir currículo');
        return;
      }

      setCurriculums(prev => prev.filter(cv => cv.id !== id));
      toast.success('Currículo excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir currículo:', error);
      toast.error('Erro ao excluir currículo');
    }
  };

  const editCurriculum = (curriculum: Curriculum) => {
    // Preparar dados para edição
    const formData = {
      nomeCompleto: curriculum.personal_info.nomeCompleto,
      email: curriculum.personal_info.email,
      telefone: curriculum.personal_info.telefone,
      endereco: curriculum.personal_info.endereco,
      objetivoProfissional: curriculum.personal_info.objetivoProfissional,
      fotoUrl: curriculum.personal_info.fotoUrl,
      formacoes: curriculum.education,
      experiencias: curriculum.experience,
      cursos: curriculum.courses,
      habilidades: curriculum.skills
    };

    localStorage.setItem('growcv_form_data', JSON.stringify(formData));
    localStorage.setItem('growcv_selected_model', curriculum.model);
    localStorage.setItem('growcv_editing_id', curriculum.id);
    navigate('/formulario');
  };

  const createNewCurriculum = () => {
    // Limpar dados salvos para garantir formulário vazio
    localStorage.removeItem('growcv_form_data');
    localStorage.removeItem('growcv_selected_model');
    localStorage.removeItem('growcv_editing_id');
    navigate('/formulario');
  };

  const viewCurriculum = (curriculum: Curriculum) => {
    const formData = {
      nomeCompleto: curriculum.personal_info.nomeCompleto,
      email: curriculum.personal_info.email,
      telefone: curriculum.personal_info.telefone,
      endereco: curriculum.personal_info.endereco,
      objetivoProfissional: curriculum.personal_info.objetivoProfissional,
      fotoUrl: curriculum.personal_info.fotoUrl,
      formacoes: curriculum.education,
      experiencias: curriculum.experience,
      cursos: curriculum.courses,
      habilidades: curriculum.skills
    };

    localStorage.setItem('growcv_form_data', JSON.stringify(formData));
    localStorage.setItem('growcv_selected_model', curriculum.model);
    navigate('/visualizacao');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/5fe141ed-a11c-4e31-85cc-a650afdddec2.png" 
                alt="Grow CV Logo" 
                className="h-10 w-10"
              />
              <span className="text-2xl font-bold text-gray-800">Grow CV</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Olá, {userProfile?.name || 'Usuário'}</span>
              <button
                onClick={() => setShowProfileEdit(!showProfileEdit)}
                className="px-4 py-2 text-blue-500 hover:text-blue-600 font-medium"
              >
                Perfil
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-red-500 hover:text-red-600 font-medium"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Edit Modal */}
        {showProfileEdit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-semibold mb-4">Informações do Perfil</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input
                    type="text"
                    value={userProfile?.name || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                  <input
                    type="email"
                    value={user.email || ''}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowProfileEdit(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meu Painel</h1>
          <p className="text-gray-600">Gerencie seus currículos e crie novos</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={createNewCurriculum}
            className="bg-blue-500 text-white p-6 rounded-lg hover:bg-blue-600 transition-colors text-center"
          >
            <div className="text-3xl mb-2">➕</div>
            <h3 className="text-xl font-semibold mb-2">Criar Novo Currículo</h3>
            <p className="text-blue-100">Comece um novo currículo do zero</p>
          </button>

          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-3xl mb-2">📄</div>
            <h3 className="text-xl font-semibold mb-2">Total de Currículos</h3>
            <p className="text-3xl font-bold text-blue-500">{curriculums.length}</p>
          </div>

          <Link
            to="/modelos"
            className="bg-green-500 text-white p-6 rounded-lg hover:bg-green-600 transition-colors text-center"
          >
            <div className="text-3xl mb-2">🎨</div>
            <h3 className="text-xl font-semibold mb-2">Ver Modelos</h3>
            <p className="text-green-100">Explore nossos modelos disponíveis</p>
          </Link>
        </div>

        {/* Curriculums List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Meus Currículos</h2>
          </div>

          {loadingCurriculums ? (
            <div className="p-8 text-center">
              <div>Carregando currículos...</div>
            </div>
          ) : curriculums.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum currículo criado ainda</h3>
              <p className="text-gray-500 mb-4">Crie seu primeiro currículo profissional agora</p>
              <button
                onClick={createNewCurriculum}
                className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Criar Primeiro Currículo
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {curriculums.map((curriculum) => (
                <div key={curriculum.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {curriculum.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 space-x-4">
                        <span>Modelo: <span className="capitalize">{curriculum.model}</span></span>
                        <span>Criado em: {formatDate(curriculum.created_at)}</span>
                        <span>Nome: {curriculum.personal_info.nomeCompleto}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => viewCurriculum(curriculum)}
                        className="px-4 py-2 text-blue-500 hover:text-blue-600 font-medium"
                      >
                        Visualizar
                      </button>
                      <button
                        onClick={() => editCurriculum(curriculum)}
                        className="px-4 py-2 text-green-500 hover:text-green-600 font-medium"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteCurriculum(curriculum.id)}
                        className="px-4 py-2 text-red-500 hover:text-red-600 font-medium"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        {curriculums.length > 0 && (
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Modelo Mais Usado</h3>
              <p className="text-2xl font-bold text-blue-500 capitalize">
                {(() => {
                  const modelCount = curriculums.reduce((acc, curr) => {
                    acc[curr.model] = (acc[curr.model] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>);
                  
                  const mostUsed = Object.keys(modelCount).reduce((a, b) => 
                    modelCount[a] > modelCount[b] ? a : b, 
                    Object.keys(modelCount)[0] || 'Nenhum'
                  );
                  
                  return mostUsed;
                })()}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Último Criado</h3>
              <p className="text-lg text-gray-600">
                {formatDate(curriculums[0]?.created_at || new Date().toISOString())}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Próxima Ação</h3>
              <button
                onClick={createNewCurriculum}
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Criar Novo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Painel;
