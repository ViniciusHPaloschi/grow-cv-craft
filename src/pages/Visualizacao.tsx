
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Visualizacao = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('growcv_form_data');
    const model = localStorage.getItem('growcv_selected_model');
    
    if (!data || !model) {
      navigate('/formulario');
      return;
    }
    
    setFormData(JSON.parse(data));
    setSelectedModel(model);
  }, [navigate]);

  const handleDownload = () => {
    alert('Funcionalidade de download será implementada em breve!');
  };

  const handleSave = () => {
    const curriculums = JSON.parse(localStorage.getItem('growcv_curriculums') || '[]');
    const newCurriculum = {
      id: Date.now(),
      name: `Currículo ${selectedModel}`,
      model: selectedModel,
      data: formData,
      createdAt: new Date().toISOString()
    };
    
    curriculums.push(newCurriculum);
    localStorage.setItem('growcv_curriculums', JSON.stringify(curriculums));
    
    alert('Currículo salvo com sucesso!');
    navigate('/painel');
  };

  if (!formData || !selectedModel) {
    return <div>Carregando...</div>;
  }

  const renderClassicModel = () => (
    <div className="bg-white p-8 shadow-lg max-w-4xl mx-auto" style={{ fontFamily: 'serif' }}>
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{formData.nomeCompleto}</h1>
        <div className="text-gray-600">
          <p>{formData.email} | {formData.telefone}</p>
          <p>{formData.endereco}</p>
        </div>
      </div>

      {/* Objetivo */}
      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 border-b border-gray-400 mb-3">OBJETIVO PROFISSIONAL</h2>
        <p className="text-gray-700 text-justify">{formData.objetivoProfissional}</p>
      </section>

      {/* Formação */}
      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 border-b border-gray-400 mb-3">FORMAÇÃO ACADÊMICA</h2>
        {formData.formacoes.filter(f => f.curso).map((formacao, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">{formacao.curso}</h3>
                <p className="text-gray-600">{formacao.instituicao}</p>
              </div>
              <p className="text-gray-600">{formacao.periodo}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Experiência */}
      <section className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 border-b border-gray-400 mb-3">EXPERIÊNCIA PROFISSIONAL</h2>
        {formData.experiencias.filter(e => e.cargo).map((experiencia, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-800">{experiencia.cargo}</h3>
                <p className="text-gray-600">{experiencia.empresa}</p>
              </div>
              <p className="text-gray-600">{experiencia.periodo}</p>
            </div>
            {experiencia.descricao && <p className="text-gray-700 text-sm">{experiencia.descricao}</p>}
          </div>
        ))}
      </section>

      {/* Cursos */}
      {formData.cursos.filter(c => c.nome).length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 border-b border-gray-400 mb-3">CURSOS COMPLEMENTARES</h2>
          {formData.cursos.filter(c => c.nome).map((curso, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-gray-800">{curso.nome}</span>
                  <span className="text-gray-600"> - {curso.instituicao}</span>
                </div>
                <p className="text-gray-600">{curso.periodo}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Habilidades */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 border-b border-gray-400 mb-3">HABILIDADES</h2>
        <p className="text-gray-700">{formData.habilidades}</p>
      </section>
    </div>
  );

  const renderModernModel = () => (
    <div className="bg-white p-8 shadow-lg max-w-4xl mx-auto">
      {/* Header with blue accent */}
      <div className="bg-blue-500 text-white p-6 rounded-t-lg mb-6">
        <h1 className="text-4xl font-bold mb-2">{formData.nomeCompleto}</h1>
        <div className="flex flex-wrap gap-4 text-blue-100">
          <span>{formData.email}</span>
          <span>{formData.telefone}</span>
          <span>{formData.endereco}</span>
        </div>
      </div>

      {/* Two column layout */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="md:col-span-2 space-y-6">
          {/* Objetivo */}
          <section>
            <h2 className="text-2xl font-bold text-blue-500 mb-3 flex items-center">
              <div className="w-1 h-6 bg-blue-500 mr-3"></div>
              OBJETIVO PROFISSIONAL
            </h2>
            <p className="text-gray-700 leading-relaxed">{formData.objetivoProfissional}</p>
          </section>

          {/* Experiência */}
          <section>
            <h2 className="text-2xl font-bold text-blue-500 mb-3 flex items-center">
              <div className="w-1 h-6 bg-blue-500 mr-3"></div>
              EXPERIÊNCIA PROFISSIONAL
            </h2>
            {formData.experiencias.filter(e => e.cargo).map((experiencia, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{experiencia.cargo}</h3>
                    <p className="text-blue-600 font-medium">{experiencia.empresa}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {experiencia.periodo}
                  </span>
                </div>
                {experiencia.descricao && <p className="text-gray-700 text-sm">{experiencia.descricao}</p>}
              </div>
            ))}
          </section>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Formação */}
          <section>
            <h2 className="text-xl font-bold text-blue-500 mb-3">FORMAÇÃO</h2>
            {formData.formacoes.filter(f => f.curso).map((formacao, index) => (
              <div key={index} className="mb-3 p-3 border-l-4 border-blue-500 bg-blue-50">
                <h3 className="font-semibold text-gray-800">{formacao.curso}</h3>
                <p className="text-gray-600 text-sm">{formacao.instituicao}</p>
                <p className="text-blue-600 text-sm">{formacao.periodo}</p>
              </div>
            ))}
          </section>

          {/* Cursos */}
          {formData.cursos.filter(c => c.nome).length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-500 mb-3">CURSOS</h2>
              {formData.cursos.filter(c => c.nome).map((curso, index) => (
                <div key={index} className="mb-2 p-2 bg-gray-50 rounded">
                  <p className="font-medium text-gray-800">{curso.nome}</p>
                  <p className="text-gray-600 text-sm">{curso.instituicao} - {curso.periodo}</p>
                </div>
              ))}
            </section>
          )}

          {/* Habilidades */}
          <section>
            <h2 className="text-xl font-bold text-blue-500 mb-3">HABILIDADES</h2>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-gray-700 text-sm">{formData.habilidades}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  const renderCreativeModel = () => (
    <div className="bg-white p-8 shadow-lg max-w-4xl mx-auto">
      {/* Creative header with geometric shapes */}
      <div className="relative bg-gradient-to-r from-green-400 to-blue-500 text-white p-8 rounded-lg mb-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">{formData.nomeCompleto}</h1>
          <div className="flex flex-wrap gap-4 text-green-100">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
              {formData.email}
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
              {formData.telefone}
            </span>
            <span className="flex items-center">
              <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
              {formData.endereco}
            </span>
          </div>
        </div>
      </div>

      {/* Creative layout */}
      <div className="space-y-8">
        {/* Objetivo com design criativo */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-l-4 border-green-500">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full mr-3 flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            OBJETIVO PROFISSIONAL
          </h2>
          <p className="text-gray-700 leading-relaxed italic">{formData.objetivoProfissional}</p>
        </section>

        {/* Grid layout para experiência e formação */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Experiência */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full mr-3 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              EXPERIÊNCIA
            </h2>
            {formData.experiencias.filter(e => e.cargo).map((experiencia, index) => (
              <div key={index} className="mb-4 relative">
                <div className="bg-white border-2 border-blue-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <div className="absolute -left-2 top-4 w-4 h-4 bg-blue-500 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-800">{experiencia.cargo}</h3>
                  <p className="text-blue-600 font-medium">{experiencia.empresa}</p>
                  <p className="text-gray-500 text-sm">{experiencia.periodo}</p>
                  {experiencia.descricao && (
                    <p className="text-gray-700 text-sm mt-2">{experiencia.descricao}</p>
                  )}
                </div>
              </div>
            ))}
          </section>

          {/* Formação */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full mr-3 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              FORMAÇÃO
            </h2>
            {formData.formacoes.filter(f => f.curso).map((formacao, index) => (
              <div key={index} className="mb-4 relative">
                <div className="bg-white border-2 border-green-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <div className="absolute -left-2 top-4 w-4 h-4 bg-green-500 rounded-full"></div>
                  <h3 className="font-semibold text-gray-800">{formacao.curso}</h3>
                  <p className="text-green-600 font-medium">{formacao.instituicao}</p>
                  <p className="text-gray-500 text-sm">{formacao.periodo}</p>
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Cursos e Habilidades em cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Cursos */}
          {formData.cursos.filter(c => c.nome).length > 0 && (
            <section className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4">🎓 CURSOS COMPLEMENTARES</h2>
              <div className="space-y-2">
                {formData.cursos.filter(c => c.nome).map((curso, index) => (
                  <div key={index} className="bg-white p-3 rounded border-l-4 border-purple-400">
                    <p className="font-medium text-gray-800">{curso.nome}</p>
                    <p className="text-gray-600 text-sm">{curso.instituicao} - {curso.periodo}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Habilidades */}
          <section className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">🚀 HABILIDADES</h2>
            <div className="bg-white p-4 rounded border-l-4 border-orange-400">
              <p className="text-gray-700">{formData.habilidades}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  const renderModel = () => {
    switch (selectedModel) {
      case 'classico':
        return renderClassicModel();
      case 'moderno':
        return renderModernModel();
      case 'criativo':
        return renderCreativeModel();
      default:
        return renderClassicModel();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-gray-800">Grow CV</Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Seu currículo está pronto!</h1>
          <p className="mt-2 text-gray-600">Modelo: <span className="capitalize font-semibold">{selectedModel}</span></p>
        </div>

        {/* CV Preview */}
        <div className="mb-8">
          {renderModel()}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleDownload}
            className="px-8 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
          >
            📄 Download PDF
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            💾 Salvar Currículo
          </button>
          <Link
            to="/formulario"
            className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            ✏️ Editar Dados
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <Link
            to="/modelos"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Trocar modelo
          </Link>
          <div className="text-gray-500 text-sm flex items-center">
            Passo 3 de 3 - Concluído!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizacao;
