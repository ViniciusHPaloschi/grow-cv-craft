
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Painel = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [curriculums, setCurriculums] = useState([]);
  const [showProfileEdit, setShowProfileEdit] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem('growcv_current_user');
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    setUser(JSON.parse(currentUser));
    loadCurriculums();
  }, [navigate]);

  const loadCurriculums = () => {
    const savedCurriculums = localStorage.getItem('growcv_curriculums');
    if (savedCurriculums) {
      setCurriculums(JSON.parse(savedCurriculums));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('growcv_current_user');
    navigate('/');
  };

  const deleteCurriculum = (id) => {
    if (confirm('Tem certeza que deseja excluir este currículo?')) {
      const updatedCurriculums = curriculums.filter(cv => cv.id !== id);
      setCurriculums(updatedCurriculums);
      localStorage.setItem('growcv_curriculums', JSON.stringify(updatedCurriculums));
    }
  };

  const editCurriculum = (curriculum) => {
    localStorage.setItem('growcv_form_data', JSON.stringify(curriculum.data));
    localStorage.setItem('growcv_selected_model', curriculum.model);
    navigate('/formulario');
  };

  const viewCurriculum = (curriculum) => {
    localStorage.setItem('growcv_form_data', JSON.stringify(curriculum.data));
    localStorage.setItem('growcv_selected_model', curriculum.model);
    navigate('/visualizacao');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800">Grow CV</Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Olá, {user.nome}</span>
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
              <h3 className="text-xl font-semibold mb-4">Editar Perfil</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input
                    type="text"
                    value={user.nome}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                  <input
                    type="email"
                    value={user.email}
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
          <Link
            to="/formulario"
            className="bg-blue-500 text-white p-6 rounded-lg hover:bg-blue-600 transition-colors text-center"
          >
            <div className="text-3xl mb-2">➕</div>
            <h3 className="text-xl font-semibold mb-2">Criar Novo Currículo</h3>
            <p className="text-blue-100">Comece um novo currículo do zero</p>
          </Link>

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

          {curriculums.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum currículo criado ainda</h3>
              <p className="text-gray-500 mb-4">Crie seu primeiro currículo profissional agora</p>
              <Link
                to="/formulario"
                className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Criar Primeiro Currículo
              </Link>
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
                        <span>Criado em: {formatDate(curriculum.createdAt)}</span>
                        <span>Nome: {curriculum.data.nomeCompleto}</span>
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
                {curriculums.reduce((acc, curr) => {
                  acc[curr.model] = (acc[curr.model] || 0) + 1;
                  return acc;
                }, {})}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Último Criado</h3>
              <p className="text-lg text-gray-600">
                {curriculums.length > 0 && formatDate(curriculums[curriculums.length - 1].createdAt)}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Próxima Ação</h3>
              <Link
                to="/formulario"
                className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Criar Novo
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Painel;
