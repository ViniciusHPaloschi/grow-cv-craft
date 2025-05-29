import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { FormData } from '@/types/curriculum';
import { generatePDF } from '@/utils/pdfGenerator';
import { toast } from 'sonner';

const Visualizacao = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
      return;
    }

    // Carregar dados do localStorage
    const savedData = localStorage.getItem('growcv_form_data');
    const savedModel = localStorage.getItem('growcv_selected_model');

    if (!savedData || !savedModel) {
      navigate('/formulario');
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      setFormData(parsed);
      setSelectedModel(savedModel);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      navigate('/formulario');
    }
  }, [user, loading, navigate]);

  const handleEdit = () => {
    navigate('/formulario');
  };

  const handleDownloadPDF = async () => {
    if (!formData) {
      toast.error('Dados do currículo não encontrados');
      return;
    }

    setIsGeneratingPDF(true);
    toast.info('Gerando PDF... Aguarde um momento.');

    try {
      const fileName = `curriculo-${formData.nomeCompleto.replace(/\s+/g, '-').toLowerCase()}`;
      await generatePDF('curriculum-content', fileName);
      toast.success('PDF baixado com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast.error('Erro ao gerar PDF. Tente novamente.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  if (loading || !formData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Carregando...</div>
      </div>
    );
  }

  const renderClassicoModel = () => (
    <div className="bg-white p-8 max-w-4xl mx-auto shadow-lg">
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{formData.nomeCompleto}</h1>
        <div className="text-gray-600 space-y-1">
          <p>{formData.email} • {formData.telefone}</p>
          <p>{formData.endereco}</p>
        </div>
      </div>

      {/* Objetivo */}
      {formData.objetivoProfissional && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
            OBJETIVO PROFISSIONAL
          </h2>
          <p className="text-gray-700 leading-relaxed">{formData.objetivoProfissional}</p>
        </div>
      )}

      {/* Formação */}
      {formData.formacoes.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
            FORMAÇÃO ACADÊMICA
          </h2>
          {formData.formacoes.map((formacao, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{formacao.curso}</h3>
                  <p className="text-gray-600">{formacao.instituicao}</p>
                </div>
                <div className="text-gray-600 text-sm">
                  {formacao.anoInicio} - {formacao.anoFim}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experiência */}
      {formData.experiencias.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
            EXPERIÊNCIA PROFISSIONAL
          </h2>
          {formData.experiencias.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-800">{exp.cargo}</h3>
                  <p className="text-gray-600">{exp.empresa}</p>
                </div>
                <div className="text-gray-600 text-sm">
                  {exp.anoInicio} - {exp.anoFim}
                </div>
              </div>
              {exp.descricao && <p className="text-gray-700 text-sm">{exp.descricao}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Cursos */}
      {formData.cursos.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
            CURSOS COMPLEMENTARES
          </h2>
          {formData.cursos.map((curso, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-gray-800">{curso.nome}</span>
                  <span className="text-gray-600"> - {curso.instituicao}</span>
                </div>
                <span className="text-gray-600 text-sm">{curso.ano}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Habilidades */}
      {formData.habilidades && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">
            HABILIDADES
          </h2>
          <p className="text-gray-700">{formData.habilidades}</p>
        </div>
      )}
    </div>
  );

  const renderModernoModel = () => (
    <div className="bg-white max-w-4xl mx-auto shadow-lg overflow-hidden">
      {/* Header com cor */}
      <div className="bg-blue-500 text-white p-8">
        <h1 className="text-4xl font-bold mb-2">{formData.nomeCompleto}</h1>
        <div className="space-y-1 text-blue-100">
          <p>{formData.email} • {formData.telefone}</p>
          <p>{formData.endereco}</p>
        </div>
      </div>

      <div className="p-8">
        {/* Objetivo */}
        {formData.objetivoProfissional && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-500 mb-4 flex items-center">
              <span className="w-1 h-6 bg-blue-500 mr-3"></span>
              OBJETIVO PROFISSIONAL
            </h2>
            <p className="text-gray-700 leading-relaxed pl-4">{formData.objetivoProfissional}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Coluna Esquerda */}
          <div>
            {/* Experiência */}
            {formData.experiencias.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-500 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-blue-500 mr-3"></span>
                  EXPERIÊNCIA
                </h2>
                {formData.experiencias.map((exp, index) => (
                  <div key={index} className="mb-6 pl-4">
                    <div className="mb-2">
                      <h3 className="font-bold text-gray-800">{exp.cargo}</h3>
                      <p className="text-blue-600 font-medium">{exp.empresa}</p>
                      <p className="text-gray-500 text-sm">{exp.anoInicio} - {exp.anoFim}</p>
                    </div>
                    {exp.descricao && <p className="text-gray-700 text-sm">{exp.descricao}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Coluna Direita */}
          <div>
            {/* Formação */}
            {formData.formacoes.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-500 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-blue-500 mr-3"></span>
                  FORMAÇÃO
                </h2>
                {formData.formacoes.map((formacao, index) => (
                  <div key={index} className="mb-4 pl-4">
                    <h3 className="font-bold text-gray-800">{formacao.curso}</h3>
                    <p className="text-blue-600">{formacao.instituicao}</p>
                    <p className="text-gray-500 text-sm">{formacao.anoInicio} - {formacao.anoFim}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Cursos */}
            {formData.cursos.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-500 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-blue-500 mr-3"></span>
                  CURSOS
                </h2>
                <div className="pl-4">
                  {formData.cursos.map((curso, index) => (
                    <div key={index} className="mb-2">
                      <p className="font-medium text-gray-800">{curso.nome}</p>
                      <p className="text-gray-600 text-sm">{curso.instituicao} - {curso.ano}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Habilidades */}
            {formData.habilidades && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-500 mb-4 flex items-center">
                  <span className="w-1 h-6 bg-blue-500 mr-3"></span>
                  HABILIDADES
                </h2>
                <div className="pl-4">
                  <p className="text-gray-700">{formData.habilidades}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCriativoModel = () => (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 max-w-4xl mx-auto shadow-2xl rounded-lg overflow-hidden">
      {/* Header criativo */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">{formData.nomeCompleto}</h1>
          <div className="space-y-1 text-purple-100">
            <p>{formData.email} • {formData.telefone}</p>
            <p>{formData.endereco}</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Objetivo */}
        {formData.objetivoProfissional && (
          <div className="mb-8 bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
              <span className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></span>
              SOBRE MIM
            </h2>
            <p className="text-gray-700 leading-relaxed italic">{formData.objetivoProfissional}</p>
          </div>
        )}

        {/* Experiência */}
        {formData.experiencias.length > 0 && (
          <div className="mb-8 bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold text-purple-600 mb-6 flex items-center">
              <span className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></span>
              JORNADA PROFISSIONAL
            </h2>
            {formData.experiencias.map((exp, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="border-l-4 border-gradient-to-b from-purple-500 to-pink-500 pl-6">
                  <h3 className="font-bold text-lg text-gray-800">{exp.cargo}</h3>
                  <p className="text-purple-600 font-medium text-lg">{exp.empresa}</p>
                  <p className="text-gray-500 mb-2">{exp.anoInicio} - {exp.anoFim}</p>
                  {exp.descricao && <p className="text-gray-700">{exp.descricao}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Formação */}
          {formData.formacoes.length > 0 && (
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-bold text-purple-600 mb-4 flex items-center">
                <span className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></span>
                FORMAÇÃO
              </h2>
              {formData.formacoes.map((formacao, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <h3 className="font-semibold text-gray-800">{formacao.curso}</h3>
                  <p className="text-purple-600">{formacao.instituicao}</p>
                  <p className="text-gray-500 text-sm">{formacao.anoInicio} - {formacao.anoFim}</p>
                </div>
              ))}
            </div>
          )}

          {/* Cursos e Habilidades */}
          <div className="space-y-6">
            {formData.cursos.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-bold text-purple-600 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></span>
                  CURSOS
                </h2>
                {formData.cursos.map((curso, index) => (
                  <div key={index} className="mb-3 last:mb-0">
                    <p className="font-medium text-gray-800">{curso.nome}</p>
                    <p className="text-gray-600 text-sm">{curso.instituicao} • {curso.ano}</p>
                  </div>
                ))}
              </div>
            )}

            {formData.habilidades && (
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-bold text-purple-600 mb-4 flex items-center">
                  <span className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3"></span>
                  HABILIDADES
                </h2>
                <p className="text-gray-700">{formData.habilidades}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurriculum = () => {
    switch (selectedModel) {
      case 'classico':
        return renderClassicoModel();
      case 'moderno':
        return renderModernoModel();
      case 'criativo':
        return renderCriativoModel();
      default:
        return renderClassicoModel();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold text-gray-800">Grow CV</Link>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Seu Currículo Está Pronto!</h1>
          <p className="mt-2 text-gray-600">Modelo: <span className="capitalize font-medium">{selectedModel}</span></p>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={handleEdit}
            className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
          >
            ✏️ Editar Dados
          </button>
          
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className={`px-6 py-3 font-semibold rounded-lg transition-colors ${
              isGeneratingPDF
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {isGeneratingPDF ? '⏳ Gerando PDF...' : '📄 Download PDF'}
          </button>
        </div>

        {/* Curriculum Preview */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <div id="curriculum-content">
            {renderCurriculum()}
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center space-x-4">
          <Link
            to="/modelos"
            className="inline-block px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
          >
            ← Trocar Modelo
          </Link>
          
          <Link
            to="/painel"
            className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            Ir para o Painel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Visualizacao;
