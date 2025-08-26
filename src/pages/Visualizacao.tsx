import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { FormData } from '@/types/curriculum';
import { generatePDF } from '@/utils/pdfGenerator';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const Visualizacao = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<string>('sand');
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const themes = {
    sand: { primary: '#FFF7ED', light: '#FFFBEB', dark: '#F3E8D3', accent: '#EA580C' },
    mint: { primary: '#ECFDF5', light: '#F0FDF4', dark: '#D1FAE5', accent: '#10B981' },
    lilac: { primary: '#EDE9FE', light: '#F5F3FF', dark: '#DDD6FE', accent: '#8B5CF6' },
    neutral: { primary: '#E1E1E3', light: '#F3F4F6', dark: '#D1D5DB', accent: '#6B7280' },
    light: { primary: '#F9FAFB', light: '#FFFFFF', dark: '#F3F4F6', accent: '#6B7280' },
    blue: { primary: '#BFDBFE', light: '#DBEAFE', dark: '#93C5FD', accent: '#3B82F6' }
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
      return;
    }

    // Carregar dados do localStorage
    const savedData = localStorage.getItem('growcv_form_data');
    const savedModel = localStorage.getItem('growcv_selected_model');

    console.log('Carregando dados na visualização...');
    console.log('Dados salvos:', savedData);
    console.log('Modelo salvo:', savedModel);

    if (!savedData || !savedModel) {
      console.log('Dados não encontrados, redirecionando para formulário');
      navigate('/formulario');
      return;
    }

    try {
      const parsed = JSON.parse(savedData);
      console.log('Dados parseados:', parsed);
      console.log('URL da foto:', parsed.fotoUrl);
      setFormData(parsed);
      setSelectedModel(savedModel);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      navigate('/formulario');
    }
  }, [user, loading, navigate]);

  const handleEdit = () => {
    if (!formData) {
      toast.error('Dados do currículo não encontrados');
      return;
    }

    // Gerar um ID único para esta edição
    const editId = Date.now().toString();
    
    console.log('Iniciando edição, salvando dados no localStorage');
    console.log('Form data para edição:', formData);
    console.log('Edit ID:', editId);
    
    // Salvar os dados atuais e o ID de edição no localStorage
    localStorage.setItem('growcv_form_data', JSON.stringify(formData));
    localStorage.setItem('growcv_editing_id', editId);
    
    // Navegar para o formulário
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

  const currentTheme = themes[selectedTheme as keyof typeof themes];

  const renderClassicoModel = () => (
    <div className="bg-white p-8 max-w-4xl mx-auto shadow-lg">
      {/* Header */}
      <div className="text-center pb-6 mb-6 border-b-2 border-gray-800">
        {formData.fotoUrl && (
          <div className="flex justify-center mb-4">
            <img
              src={formData.fotoUrl}
              alt="Foto de perfil"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-800"
              onError={(e) => {
                console.error('Erro ao carregar imagem:', formData.fotoUrl);
                e.currentTarget.style.display = 'none';
              }}
              onLoad={() => {
                console.log('Imagem carregada com sucesso:', formData.fotoUrl);
              }}
            />
          </div>
        )}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{formData.nomeCompleto}</h1>
        <div className="text-gray-600 space-y-1">
          <p>{formData.email} • {formData.telefone}</p>
          <p>{formData.endereco}</p>
        </div>
      </div>

      {/* Objetivo */}
      {formData.objetivoProfissional && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 pb-1 border-b border-gray-800">
            OBJETIVO PROFISSIONAL
          </h2>
          <p className="text-gray-700 leading-relaxed">{formData.objetivoProfissional}</p>
        </div>
      )}

      {/* Formação */}
      {formData.formacoes.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3 pb-1 border-b border-gray-800">
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
          <h2 className="text-xl font-bold text-gray-800 mb-3 pb-1 border-b border-gray-800">
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
          <h2 className="text-xl font-bold text-gray-800 mb-3 pb-1 border-b border-gray-800">
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
          <h2 className="text-xl font-bold text-gray-800 mb-3 pb-1 border-b border-gray-800">
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
      <div className="text-gray-800 p-8" style={{ backgroundColor: currentTheme.primary }}>
        <div className="flex items-center gap-6">
          {formData.fotoUrl && (
            <img
              src={formData.fotoUrl}
              alt="Foto de perfil"
              className="w-24 h-24 rounded-full object-cover border-4 border-white"
              onError={(e) => {
                console.error('Erro ao carregar imagem:', formData.fotoUrl);
                e.currentTarget.style.display = 'none';
              }}
              onLoad={() => {
                console.log('Imagem carregada com sucesso:', formData.fotoUrl);
              }}
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{formData.nomeCompleto}</h1>
            <div className="space-y-1 text-gray-800">
              <p>{formData.email} • {formData.telefone}</p>
              <p>{formData.endereco}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Objetivo */}
        {formData.objetivoProfissional && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center" style={{ color: currentTheme.accent }}>
              <span className="w-1 h-6 mr-3" style={{ backgroundColor: currentTheme.accent }}></span>
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
                <h2 className="text-2xl font-bold mb-4 flex items-center" style={{ color: currentTheme.accent }}>
                  <span className="w-1 h-6 mr-3" style={{ backgroundColor: currentTheme.accent }}></span>
                  EXPERIÊNCIA
                </h2>
                {formData.experiencias.map((exp, index) => (
                  <div key={index} className="mb-6 pl-4">
                    <div className="mb-2">
                      <h3 className="font-bold text-gray-800">{exp.cargo}</h3>
                       <p className="font-medium" style={{ color: currentTheme.accent }}>{exp.empresa}</p>
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
                <h2 className="text-2xl font-bold mb-4 flex items-center" style={{ color: currentTheme.accent }}>
                  <span className="w-1 h-6 mr-3" style={{ backgroundColor: currentTheme.accent }}></span>
                  FORMAÇÃO
                </h2>
                {formData.formacoes.map((formacao, index) => (
                  <div key={index} className="mb-4 pl-4">
                    <h3 className="font-bold text-gray-800">{formacao.curso}</h3>
                     <p style={{ color: currentTheme.accent }}>{formacao.instituicao}</p>
                    <p className="text-gray-500 text-sm">{formacao.anoInicio} - {formacao.anoFim}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Cursos */}
            {formData.cursos.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center" style={{ color: currentTheme.accent }}>
                  <span className="w-1 h-6 mr-3" style={{ backgroundColor: currentTheme.accent }}></span>
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
                <h2 className="text-2xl font-bold mb-4 flex items-center" style={{ color: currentTheme.accent }}>
                  <span className="w-1 h-6 mr-3" style={{ backgroundColor: currentTheme.accent }}></span>
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
    <div className="max-w-4xl mx-auto shadow-2xl rounded-lg overflow-hidden" style={{ background: `linear-gradient(135deg, ${currentTheme.light} 0%, ${currentTheme.light} 100%)` }}>
      {/* Header criativo */}
      <div className="text-gray-800 p-8 relative break-inside-avoid" style={{ background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.dark} 100%)` }}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
        <div className="relative z-10 flex items-center gap-6">
          {formData.fotoUrl && (
            <img
              src={formData.fotoUrl}
              alt="Foto de perfil"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
              onError={(e) => {
                console.error('Erro ao carregar imagem:', formData.fotoUrl);
                e.currentTarget.style.display = 'none';
              }}
              onLoad={() => {
                console.log('Imagem carregada com sucesso:', formData.fotoUrl);
              }}
            />
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{formData.nomeCompleto}</h1>
            <div className="space-y-1 text-gray-800">
              <p>{formData.email} • {formData.telefone}</p>
              <p>{formData.endereco}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Objetivo */}
        {formData.objetivoProfissional && (
          <div className="bg-white rounded-lg p-6 shadow-md break-inside-avoid">
            <h2 className="text-2xl font-bold mb-4 flex items-center" style={{ color: currentTheme.accent }}>
              <span className="w-3 h-3 rounded-full mr-3" style={{ background: `linear-gradient(135deg, ${currentTheme.accent} 0%, ${currentTheme.dark} 100%)` }}></span>
              SOBRE MIM
            </h2>
            <p className="text-gray-700 leading-relaxed italic">{formData.objetivoProfissional}</p>
          </div>
        )}

        {/* Experiência */}
        {formData.experiencias.length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-md break-inside-avoid">
            <h2 className="text-2xl font-bold mb-6 flex items-center" style={{ color: currentTheme.accent }}>
              <span className="w-3 h-3 rounded-full mr-3" style={{ background: `linear-gradient(135deg, ${currentTheme.accent} 0%, ${currentTheme.dark} 100%)` }}></span>
              JORNADA PROFISSIONAL
            </h2>
            <div className="space-y-6">
              {formData.experiencias.map((exp, index) => (
                <div key={index} className="break-inside-avoid">
                  <div className="border-l-4 pl-6" style={{ borderColor: currentTheme.accent }}>
                    <h3 className="font-bold text-lg text-gray-800">{exp.cargo}</h3>
                    <p className="font-medium" style={{ color: currentTheme.accent }}>{exp.empresa}</p>
                    <p className="text-gray-500 mb-2">{exp.anoInicio} - {exp.anoFim}</p>
                    {exp.descricao && <p className="text-gray-700">{exp.descricao}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formação */}
        {formData.formacoes.length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-md break-inside-avoid">
            <h2 className="text-xl font-bold mb-4 flex items-center" style={{ color: currentTheme.accent }}>
              <span className="w-3 h-3 rounded-full mr-3" style={{ background: `linear-gradient(135deg, ${currentTheme.accent} 0%, ${currentTheme.dark} 100%)` }}></span>
              FORMAÇÃO
            </h2>
            <div className="space-y-4">
              {formData.formacoes.map((formacao, index) => (
                <div key={index} className="break-inside-avoid">
                  <h3 className="font-semibold text-gray-800">{formacao.curso}</h3>
                  <p style={{ color: currentTheme.accent }}>{formacao.instituicao}</p>
                  <p className="text-gray-500 text-sm">{formacao.anoInicio} - {formacao.anoFim}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cursos */}
        {formData.cursos.length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-md break-inside-avoid">
            <h2 className="text-xl font-bold mb-4 flex items-center" style={{ color: currentTheme.accent }}>
              <span className="w-3 h-3 rounded-full mr-3" style={{ background: `linear-gradient(135deg, ${currentTheme.accent} 0%, ${currentTheme.dark} 100%)` }}></span>
              CURSOS
            </h2>
            <div className="space-y-3">
              {formData.cursos.map((curso, index) => (
                <div key={index} className="break-inside-avoid">
                  <p className="font-medium text-gray-800">{curso.nome}</p>
                  <p className="text-gray-600 text-sm">{curso.instituicao} • {curso.ano}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Habilidades */}
        {formData.habilidades && (
          <div className="bg-white rounded-lg p-6 shadow-md break-inside-avoid">
            <h2 className="text-xl font-bold mb-4 flex items-center" style={{ color: currentTheme.accent }}>
              <span className="w-3 h-3 rounded-full mr-3" style={{ background: `linear-gradient(135deg, ${currentTheme.accent} 0%, ${currentTheme.dark} 100%)` }}></span>
              HABILIDADES
            </h2>
            <p className="text-gray-700">{formData.habilidades}</p>
          </div>
        )}
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

  if (loading || !formData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Carregando...</div>
      </div>
    );
  }

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

        {/* Theme Selector - Only show for non-classic models */}
        {selectedModel !== 'classico' && (
          <div className="flex justify-center mb-8">
            <div className="flex gap-3">
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTheme(key)}
                  className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                    selectedTheme === key 
                      ? 'border-gray-800 shadow-lg scale-110' 
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                  style={{ backgroundColor: theme.primary }}
                  title={key === 'sand' ? 'Areia Clara' : key === 'mint' ? 'Verde Menta' : key === 'lilac' ? 'Lilás' : key === 'neutral' ? 'Cinza Neutro' : key === 'light' ? 'Cinza Claro' : 'Azul Elegante'}
                />
              ))}
            </div>
          </div>
        )}

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
