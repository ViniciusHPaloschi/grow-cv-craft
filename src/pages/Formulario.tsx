
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Formulario = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    telefone: '',
    endereco: '',
    objetivoProfissional: '',
    formacoes: [{ instituicao: '', curso: '', periodo: '' }],
    experiencias: [{ empresa: '', cargo: '', periodo: '', descricao: '' }],
    cursos: [{ nome: '', instituicao: '', periodo: '' }],
    habilidades: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addFormacao = () => {
    setFormData(prev => ({
      ...prev,
      formacoes: [...prev.formacoes, { instituicao: '', curso: '', periodo: '' }]
    }));
  };

  const removeFormacao = (index) => {
    setFormData(prev => ({
      ...prev,
      formacoes: prev.formacoes.filter((_, i) => i !== index)
    }));
  };

  const updateFormacao = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      formacoes: prev.formacoes.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addExperiencia = () => {
    setFormData(prev => ({
      ...prev,
      experiencias: [...prev.experiencias, { empresa: '', cargo: '', periodo: '', descricao: '' }]
    }));
  };

  const removeExperiencia = (index) => {
    setFormData(prev => ({
      ...prev,
      experiencias: prev.experiencias.filter((_, i) => i !== index)
    }));
  };

  const updateExperiencia = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      experiencias: prev.experiencias.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addCurso = () => {
    setFormData(prev => ({
      ...prev,
      cursos: [...prev.cursos, { nome: '', instituicao: '', periodo: '' }]
    }));
  };

  const removeCurso = (index) => {
    setFormData(prev => ({
      ...prev,
      cursos: prev.cursos.filter((_, i) => i !== index)
    }));
  };

  const updateCurso = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      cursos: prev.cursos.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('growcv_form_data', JSON.stringify(formData));
    navigate('/modelos');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-gray-800">Grow CV</Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Preencha seus dados</h1>
          <p className="mt-2 text-gray-600">Estas informações serão usadas para criar seu currículo</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8 space-y-8">
          {/* Dados Pessoais */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Dados Pessoais
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
                <input
                  type="text"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Objetivo Profissional</label>
              <textarea
                name="objetivoProfissional"
                value={formData.objetivoProfissional}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descreva brevemente seus objetivos profissionais..."
                required
              />
            </div>
          </section>

          {/* Formações Acadêmicas */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Formações Acadêmicas
              </h2>
              <button
                type="button"
                onClick={addFormacao}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                + Adicionar
              </button>
            </div>
            {formData.formacoes.map((formacao, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-700">Formação {index + 1}</h3>
                  {formData.formacoes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFormacao(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remover
                    </button>
                  )}
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Instituição"
                    value={formacao.instituicao}
                    onChange={(e) => updateFormacao(index, 'instituicao', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Curso"
                    value={formacao.curso}
                    onChange={(e) => updateFormacao(index, 'curso', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Período (ex: 2020 - 2024)"
                    value={formacao.periodo}
                    onChange={(e) => updateFormacao(index, 'periodo', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </section>

          {/* Experiências Profissionais */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Experiências Profissionais
              </h2>
              <button
                type="button"
                onClick={addExperiencia}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                + Adicionar
              </button>
            </div>
            {formData.experiencias.map((experiencia, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-700">Experiência {index + 1}</h3>
                  {formData.experiencias.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeExperiencia(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remover
                    </button>
                  )}
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Empresa"
                    value={experiencia.empresa}
                    onChange={(e) => updateExperiencia(index, 'empresa', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Cargo"
                    value={experiencia.cargo}
                    onChange={(e) => updateExperiencia(index, 'cargo', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Período"
                    value={experiencia.periodo}
                    onChange={(e) => updateExperiencia(index, 'periodo', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <textarea
                  placeholder="Descrição das atividades"
                  value={experiencia.descricao}
                  onChange={(e) => updateExperiencia(index, 'descricao', e.target.value)}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </section>

          {/* Cursos Complementares */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Cursos Complementares
              </h2>
              <button
                type="button"
                onClick={addCurso}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                + Adicionar
              </button>
            </div>
            {formData.cursos.map((curso, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-700">Curso {index + 1}</h3>
                  {formData.cursos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCurso(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remover
                    </button>
                  )}
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Nome do curso"
                    value={curso.nome}
                    onChange={(e) => updateCurso(index, 'nome', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Instituição"
                    value={curso.instituicao}
                    onChange={(e) => updateCurso(index, 'instituicao', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Período"
                    value={curso.periodo}
                    onChange={(e) => updateCurso(index, 'periodo', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
          </section>

          {/* Habilidades */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Habilidades
            </h2>
            <textarea
              name="habilidades"
              value={formData.habilidades}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Liste suas principais habilidades separadas por vírgula..."
              required
            />
          </section>

          {/* Botões */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <Link
              to="/"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Voltar
            </Link>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Próximo: Escolher Modelo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
