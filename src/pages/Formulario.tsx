
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormData, Education, Experience, Course } from '@/types/curriculum';

const Formulario = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    nomeCompleto: '',
    email: '',
    telefone: '',
    endereco: '',
    objetivoProfissional: '',
    formacoes: [],
    experiencias: [],
    cursos: [],
    habilidades: ''
  });

  useEffect(() => {
    const savedData = localStorage.getItem('growcv_form_data');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

  const handleSubmit = (e: React.FormEvent) => {
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
          <p className="mt-2 text-gray-600">Insira suas informações para gerar seu currículo</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8 space-y-8">
          {/* Informações Pessoais */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações Pessoais</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nomeCompleto" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="nomeCompleto"
                  name="nomeCompleto"
                  value={formData.nomeCompleto}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="endereco" className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço
                </label>
                <input
                  type="text"
                  id="endereco"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="objetivoProfissional" className="block text-sm font-medium text-gray-700 mb-2">
                Objetivo Profissional
              </label>
              <textarea
                id="objetivoProfissional"
                name="objetivoProfissional"
                value={formData.objetivoProfissional}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </section>

          {/* Formações Acadêmicas */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Formações Acadêmicas</h2>
              <button
                type="button"
                onClick={addFormacao}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Adicionar Formação
              </button>
            </div>

            {formData.formacoes.map((formacao) => (
              <div key={formacao.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Curso
                    </label>
                    <input
                      type="text"
                      value={formacao.curso}
                      onChange={(e) => updateFormacao(formacao.id, 'curso', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instituição
                    </label>
                    <input
                      type="text"
                      value={formacao.instituicao}
                      onChange={(e) => updateFormacao(formacao.id, 'instituicao', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ano de Início
                    </label>
                    <input
                      type="text"
                      value={formacao.anoInicio}
                      onChange={(e) => updateFormacao(formacao.id, 'anoInicio', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: 2020"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ano de Conclusão
                    </label>
                    <input
                      type="text"
                      value={formacao.anoFim}
                      onChange={(e) => updateFormacao(formacao.id, 'anoFim', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: 2024 ou Em andamento"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => removeFormacao(formacao.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Remover Formação
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* Experiências Profissionais */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Experiências Profissionais</h2>
              <button
                type="button"
                onClick={addExperiencia}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Adicionar Experiência
              </button>
            </div>

            {formData.experiencias.map((experiencia) => (
              <div key={experiencia.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cargo
                    </label>
                    <input
                      type="text"
                      value={experiencia.cargo}
                      onChange={(e) => updateExperiencia(experiencia.id, 'cargo', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      value={experiencia.empresa}
                      onChange={(e) => updateExperiencia(experiencia.id, 'empresa', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ano de Início
                    </label>
                    <input
                      type="text"
                      value={experiencia.anoInicio}
                      onChange={(e) => updateExperiencia(experiencia.id, 'anoInicio', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: 2020"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ano de Saída
                    </label>
                    <input
                      type="text"
                      value={experiencia.anoFim}
                      onChange={(e) => updateExperiencia(experiencia.id, 'anoFim', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: 2024 ou Atual"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição das Atividades
                  </label>
                  <textarea
                    value={experiencia.descricao}
                    onChange={(e) => updateExperiencia(experiencia.id, 'descricao', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => removeExperiencia(experiencia.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Remover Experiência
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* Cursos Complementares */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Cursos Complementares</h2>
              <button
                type="button"
                onClick={addCurso}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Adicionar Curso
              </button>
            </div>

            {formData.cursos.map((curso) => (
              <div key={curso.id} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome do Curso
                    </label>
                    <input
                      type="text"
                      value={curso.nome}
                      onChange={(e) => updateCurso(curso.id, 'nome', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instituição
                    </label>
                    <input
                      type="text"
                      value={curso.instituicao}
                      onChange={(e) => updateCurso(curso.id, 'instituicao', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ano
                    </label>
                    <input
                      type="text"
                      value={curso.ano}
                      onChange={(e) => updateCurso(curso.id, 'ano', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Ex: 2023"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => removeCurso(curso.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Remover Curso
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* Habilidades */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Habilidades</h2>
            <textarea
              name="habilidades"
              value={formData.habilidades}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Liste suas principais habilidades, separadas por vírgula..."
              required
            />
          </section>

          {/* Navegação */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <Link
              to="/"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              ← Voltar ao início
            </Link>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Próximo: Escolher modelo →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
