import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { generatePDF } from '@/utils/pdfGenerator';
import { toast } from 'sonner';
import { FormData } from '@/types/curriculum';

const Visualizacao = () => {
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

    if (!savedData || !savedModel) {
      navigate('/formulario');
      return;
    }

    try {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      setSelectedModel(savedModel);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      navigate('/formulario');
    }
  }, [user, loading, navigate]);

  const handleDownloadPDF = async () => {
    try {
      if (!selectedModel) {
        toast.error('Selecione um modelo antes de baixar o PDF.');
        return;
      }

      const fileName = formData?.nomeCompleto ? `Curriculo_${formData.nomeCompleto}` : 'Curriculo';
      const elementId = 'cv-content';
      const success = await generatePDF(elementId, fileName);

      if (success) {
        toast.success('Download do PDF iniciado!');
      } else {
        toast.error('Erro ao gerar o PDF.');
      }
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      toast.error('Erro ao gerar o PDF.');
    }
  };

  const renderClassicoModel = () => (
    <div className="bg-white p-8 max-w-4xl mx-auto shadow-lg">
      {/* Header */}
      <div className="text-center pb-4 mb-4 border-b-2 border-gray-800">
        {formData?.fotoUrl && (
          <div className="flex justify-center mb-3">
            <img
              src={formData.fotoUrl}
              alt="Foto de perfil"
              className="w-28 h-28 rounded-full object-cover border-4 border-gray-800"
              onError={(e) => {
                console.error('Erro ao carregar imagem:', formData.fotoUrl);
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{formData?.nomeCompleto}</h1>
        <div className="text-gray-600 space-y-1">
          <p>{formData?.email} • {formData?.telefone}</p>
          <p>{formData?.endereco}</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Objetivo */}
        {formData?.objetivoProfissional && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-2 pb-1 border-b border-gray-800">
              OBJETIVO PROFISSIONAL
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm">{formData.objetivoProfissional}</p>
          </div>
        )}

        {/* Experiência */}
        {formData?.experiencias.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-2 pb-1 border-b border-gray-800">
              EXPERIÊNCIA PROFISSIONAL
            </h2>
            <div className="space-y-3">
              {formData.experiencias.map((exp, index) => (
                <div key={exp.id || index}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-800 text-sm">{exp.cargo}</h3>
                    <span className="text-gray-600 text-xs">{exp.anoInicio} - {exp.anoFim}</span>
                  </div>
                  <p className="text-gray-700 font-medium text-sm mb-1">{exp.empresa}</p>
                  {exp.descricao && (
                    <p className="text-gray-600 text-sm leading-relaxed">{exp.descricao}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formação */}
        {formData?.formacoes.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-2 pb-1 border-b border-gray-800">
              FORMAÇÃO ACADÊMICA
            </h2>
            <div className="space-y-2">
              {formData.formacoes.map((formacao, index) => (
                <div key={formacao.id || index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">{formacao.curso}</h3>
                      <p className="text-gray-700 text-sm">{formacao.instituicao}</p>
                    </div>
                    <span className="text-gray-600 text-xs">{formacao.anoInicio} - {formacao.anoFim}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cursos */}
        {formData?.cursos.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-2 pb-1 border-b border-gray-800">
              CURSOS COMPLEMENTARES
            </h2>
            <div className="space-y-2">
              {formData.cursos.map((curso, index) => (
                <div key={curso.id || index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">{curso.nome}</h3>
                      <p className="text-gray-700 text-sm">{curso.instituicao}</p>
                    </div>
                    <span className="text-gray-600 text-xs">{curso.ano}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Habilidades */}
        {formData?.habilidades && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-2 pb-1 border-b border-gray-800">
              HABILIDADES
            </h2>
            <p className="text-gray-700 text-sm">{formData.habilidades}</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderModernoModel = () => (
    <div className="bg-white max-w-4xl mx-auto shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 text-white" style={{ backgroundColor: currentTheme.primary }}>
        <div className="flex items-center space-x-6">
          {formData?.fotoUrl && (
            <img
              src={formData.fotoUrl}
              alt="Foto de perfil"
              className="w-24 h-24 rounded-full object-cover border-4 border-white"
              onError={(e) => {
                console.error('Erro ao carregar imagem:', formData.fotoUrl);
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          <div>
            <h1 className="text-3xl font-bold mb-2">{formData?.nomeCompleto}</h1>
            <div className="text-white/90 space-y-1">
              <p>{formData?.email} • {formData?.telefone}</p>
              <p>{formData?.endereco}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Objetivo */}
        {formData?.objetivoProfissional && (
          <div>
            <h2 className="text-lg font-bold mb-2 pb-1 border-b-2" style={{ color: currentTheme.primary, borderColor: currentTheme.primary }}>
              OBJETIVO PROFISSIONAL
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm">{formData.objetivoProfissional}</p>
          </div>
        )}

        {/* Experiência */}
        {formData?.experiencias.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-2 pb-1 border-b-2" style={{ color: currentTheme.primary, borderColor: currentTheme.primary }}>
              EXPERIÊNCIA PROFISSIONAL
            </h2>
            <div className="space-y-3">
              {formData.experiencias.map((exp, index) => (
                <div key={exp.id || index}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-800 text-sm">{exp.cargo}</h3>
                    <span className="text-white text-xs px-2 py-1 rounded" style={{ backgroundColor: currentTheme.accent }}>
                      {exp.anoInicio} - {exp.anoFim}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium text-sm mb-1">{exp.empresa}</p>
                  {exp.descricao && (
                    <p className="text-gray-600 text-sm leading-relaxed">{exp.descricao}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formação */}
        {formData?.formacoes.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-2 pb-1 border-b-2" style={{ color: currentTheme.primary, borderColor: currentTheme.primary }}>
              FORMAÇÃO ACADÊMICA
            </h2>
            <div className="space-y-2">
              {formData.formacoes.map((formacao, index) => (
                <div key={formacao.id || index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">{formacao.curso}</h3>
                      <p className="text-gray-700 text-sm">{formacao.instituicao}</p>
                    </div>
                    <span className="text-white text-xs px-2 py-1 rounded" style={{ backgroundColor: currentTheme.accent }}>
                      {formacao.anoInicio} - {formacao.anoFim}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cursos */}
        {formData?.cursos.length > 0 && (
          <div>
            <h2 className="text-lg font-bold mb-2 pb-1 border-b-2" style={{ color: currentTheme.primary, borderColor: currentTheme.primary }}>
              CURSOS COMPLEMENTARES
            </h2>
            <div className="space-y-2">
              {formData.cursos.map((curso, index) => (
                <div key={curso.id || index}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">{curso.nome}</h3>
                      <p className="text-gray-700 text-sm">{curso.instituicao}</p>
                    </div>
                    <span className="text-white text-xs px-2 py-1 rounded" style={{ backgroundColor: currentTheme.accent }}>
                      {curso.ano}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Habilidades */}
        {formData?.habilidades && (
          <div>
            <h2 className="text-lg font-bold mb-2 pb-1 border-b-2" style={{ color: currentTheme.primary, borderColor: currentTheme.primary }}>
              HABILIDADES
            </h2>
            <p className="text-gray-700 text-sm">{formData.habilidades}</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderCriativoModel = () => (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 max-w-4xl mx-auto shadow-xl rounded-lg overflow-hidden">
      {/* Header */}
      <div className="relative p-6 text-white" style={{ background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.accent})` }}>
        <div className="flex items-center space-x-6">
          {formData?.fotoUrl && (
            <img
              src={formData.fotoUrl}
              alt="Foto de perfil"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
              onError={(e) => {
                console.error('Erro ao carregar imagem:', formData.fotoUrl);
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          <div>
            <h1 className="text-4xl font-bold mb-2">{formData?.nomeCompleto}</h1>
            <div className="text-white/90 space-y-1">
              <p className="text-lg">{formData?.email} • {formData?.telefone}</p>
              <p>{formData?.endereco}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Objetivo */}
        {formData?.objetivoProfissional && (
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4" style={{ borderColor: currentTheme.primary }}>
            <h2 className="text-lg font-bold mb-2" style={{ color: currentTheme.primary }}>
              OBJETIVO PROFISSIONAL
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm">{formData.objetivoProfissional}</p>
          </div>
        )}

        {/* Experiência */}
        {formData?.experiencias.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4" style={{ borderColor: currentTheme.primary }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: currentTheme.primary }}>
              EXPERIÊNCIA PROFISSIONAL
            </h2>
            <div className="space-y-3">
              {formData.experiencias.map((exp, index) => (
                <div key={exp.id || index} className="pb-3 border-b border-gray-200 last:border-b-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-800 text-sm">{exp.cargo}</h3>
                    <span className="text-white text-xs px-3 py-1 rounded-full" style={{ backgroundColor: currentTheme.accent }}>
                      {exp.anoInicio} - {exp.anoFim}
                    </span>
                  </div>
                  <p className="text-gray-700 font-medium text-sm mb-1">{exp.empresa}</p>
                  {exp.descricao && (
                    <p className="text-gray-600 text-sm leading-relaxed">{exp.descricao}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formação */}
        {formData?.formacoes.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4" style={{ borderColor: currentTheme.primary }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: currentTheme.primary }}>
              FORMAÇÃO ACADÊMICA
            </h2>
            <div className="space-y-2">
              {formData.formacoes.map((formacao, index) => (
                <div key={formacao.id || index} className="pb-2 border-b border-gray-200 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">{formacao.curso}</h3>
                      <p className="text-gray-700 text-sm">{formacao.instituicao}</p>
                    </div>
                    <span className="text-white text-xs px-3 py-1 rounded-full" style={{ backgroundColor: currentTheme.accent }}>
                      {formacao.anoInicio} - {formacao.anoFim}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cursos */}
        {formData?.cursos.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4" style={{ borderColor: currentTheme.primary }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: currentTheme.primary }}>
              CURSOS COMPLEMENTARES
            </h2>
            <div className="space-y-2">
              {formData.cursos.map((curso, index) => (
                <div key={curso.id || index} className="pb-2 border-b border-gray-200 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">{curso.nome}</h3>
                      <p className="text-gray-700 text-sm">{curso.instituicao}</p>
                    </div>
                    <span className="text-white text-xs px-3 py-1 rounded-full" style={{ backgroundColor: currentTheme.accent }}>
                      {curso.ano}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Habilidades */}
        {formData?.habilidades && (
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4" style={{ borderColor: currentTheme.primary }}>
            <h2 className="text-lg font-bold mb-2" style={{ color: currentTheme.primary }}>
              HABILIDADES
            </h2>
            <p className="text-gray-700 text-sm">{formData.habilidades}</p>
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
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Visualização do Currículo</h1>
          <p className="mt-2 text-gray-600">Confira como ficou seu currículo e baixe em PDF</p>
        </div>

        {/* Curriculum Content */}
        <div id="cv-content">
          {selectedModel === 'classico' && renderClassicoModel()}
          {selectedModel === 'moderno' && renderModernoModel()}
          {selectedModel === 'criativo' && renderCriativoModel()}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-8">
          <Link
            to="/modelos"
            className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
          >
            ← Voltar aos Modelos
          </Link>
          <button
            onClick={handleDownloadPDF}
            className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Baixar PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Visualizacao;
