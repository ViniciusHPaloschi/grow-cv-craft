import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Curriculum, PersonalInfo, Education, Experience, Course } from '@/types/curriculum';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  FileText, 
  Palette, 
  Eye, 
  Pencil, 
  Trash2, 
  LogOut, 
  User,
  Calendar,
  TrendingUp,
  Loader2,
  X
} from 'lucide-react';

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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-hero pointer-events-none" />
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-[128px] pointer-events-none" />

      {/* Header */}
      <header className="relative glass-strong border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-xl blur-xl" />
                <img 
                  src="/lovable-uploads/5fe141ed-a11c-4e31-85cc-a650afdddec2.png" 
                  alt="Grow CV Logo" 
                  className="h-10 w-10 relative"
                />
              </div>
              <span className="text-xl font-display font-bold text-foreground">Grow CV</span>
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground hidden sm:block">
                Olá, <span className="text-foreground font-medium">{userProfile?.name || 'Usuário'}</span>
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowProfileEdit(!showProfileEdit)}
                className="text-muted-foreground hover:text-foreground"
              >
                <User className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-destructive"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Edit Modal */}
        {showProfileEdit && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="glass-strong rounded-3xl p-8 max-w-md w-full mx-4 border border-border">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-display font-semibold text-foreground">Informações do Perfil</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowProfileEdit(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">Nome</label>
                  <div className="px-4 py-3 bg-muted/50 rounded-xl text-foreground">
                    {userProfile?.name || 'Não informado'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">E-mail</label>
                  <div className="px-4 py-3 bg-muted/50 rounded-xl text-foreground">
                    {user.email || 'Não informado'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2">
            Meu Painel
          </h1>
          <p className="text-muted-foreground">Gerencie seus currículos e crie novos</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <button
            onClick={createNewCurriculum}
            className="group p-6 rounded-2xl bg-gradient-to-br from-primary to-purple-600 hover-lift glow-primary text-left transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-display font-semibold text-white mb-2">Novo Currículo</h3>
            <p className="text-white/70 text-sm">Comece um novo currículo do zero</p>
          </button>

          <div className="p-6 rounded-2xl glass border-gradient">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-display font-semibold text-foreground mb-2">Total</h3>
            <p className="text-4xl font-display font-bold text-gradient">{curriculums.length}</p>
          </div>

          <Link
            to="/modelos"
            className="group p-6 rounded-2xl bg-gradient-to-br from-secondary to-emerald-400 hover-lift glow-secondary text-left transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-display font-semibold text-white mb-2">Ver Modelos</h3>
            <p className="text-white/70 text-sm">Explore nossos modelos premium</p>
          </Link>
        </div>

        {/* Curriculums List */}
        <div className="glass-strong rounded-3xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-display font-semibold text-foreground">Meus Currículos</h2>
          </div>

          {loadingCurriculums ? (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Carregando currículos...</p>
            </div>
          ) : curriculums.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                Nenhum currículo ainda
              </h3>
              <p className="text-muted-foreground mb-6">
                Crie seu primeiro currículo profissional agora
              </p>
              <Button
                onClick={createNewCurriculum}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 rounded-xl glow-primary"
              >
                <Plus className="w-5 h-5 mr-2" />
                Criar Primeiro Currículo
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {curriculums.map((curriculum) => (
                <div key={curriculum.id} className="p-6 hover:bg-muted/30 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground mb-1 truncate">
                        {curriculum.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Palette className="w-4 h-4" />
                          <span className="capitalize">{curriculum.model}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          {formatDate(curriculum.created_at)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <User className="w-4 h-4" />
                          {curriculum.personal_info.nomeCompleto}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => viewCurriculum(curriculum)}
                        className="text-primary hover:text-primary/80 hover:bg-primary/10"
                      >
                        <Eye className="w-4 h-4 mr-1.5" />
                        Ver
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editCurriculum(curriculum)}
                        className="text-secondary hover:text-secondary/80 hover:bg-secondary/10"
                      >
                        <Pencil className="w-4 h-4 mr-1.5" />
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteCurriculum(curriculum.id)}
                        className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4 mr-1.5" />
                        Excluir
                      </Button>
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
            <div className="p-6 rounded-2xl glass border-gradient text-center">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Modelo Favorito</h3>
              <p className="text-xl font-display font-semibold text-foreground capitalize">
                {(() => {
                  const modelCount = curriculums.reduce((acc, curr) => {
                    acc[curr.model] = (acc[curr.model] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>);
                  
                  return Object.keys(modelCount).reduce((a, b) => 
                    modelCount[a] > modelCount[b] ? a : b, 
                    Object.keys(modelCount)[0] || 'Nenhum'
                  );
                })()}
              </p>
            </div>

            <div className="p-6 rounded-2xl glass border-gradient text-center">
              <Calendar className="w-8 h-8 text-secondary mx-auto mb-3" />
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Último Criado</h3>
              <p className="text-xl font-display font-semibold text-foreground">
                {formatDate(curriculums[0]?.created_at || new Date().toISOString())}
              </p>
            </div>

            <div className="p-6 rounded-2xl glass border-gradient text-center">
              <Plus className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Próxima Ação</h3>
              <Button
                onClick={createNewCurriculum}
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              >
                Criar Novo
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Painel;
