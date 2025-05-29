
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const useAuthRedirect = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const redirectToFormulario = () => {
    if (loading) {
      return; // Aguarda o carregamento
    }

    if (user) {
      // Usuário autenticado, limpar dados antigos e ir para formulário
      localStorage.removeItem('growcv_form_data');
      localStorage.removeItem('growcv_editing_id');
      navigate('/formulario');
    } else {
      // Usuário não autenticado, ir para login
      navigate('/login');
    }
  };

  const redirectToModelos = () => {
    if (loading) {
      return; // Aguarda o carregamento
    }

    if (user) {
      // Usuário autenticado, ir para modelos
      navigate('/modelos');
    } else {
      // Usuário não autenticado, ir para login
      navigate('/login');
    }
  };

  return { redirectToFormulario, redirectToModelos, isAuthenticated: !!user, loading };
};
