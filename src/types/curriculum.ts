
export interface PersonalInfo {
  nomeCompleto: string;
  email: string;
  telefone: string;
  endereco: string;
  objetivoProfissional: string;
  fotoUrl?: string;
}

export interface Education {
  id: string;
  curso: string;
  instituicao: string;
  anoInicio: string;
  anoFim: string;
}

export interface Experience {
  id: string;
  cargo: string;
  empresa: string;
  anoInicio: string;
  anoFim: string;
  descricao: string;
}

export interface Course {
  id: string;
  nome: string;
  instituicao: string;
  ano: string;
}

export interface FormData {
  nomeCompleto: string;
  email: string;
  telefone: string;
  endereco: string;
  objetivoProfissional: string;
  fotoUrl?: string;
  formacoes: Education[];
  experiencias: Experience[];
  cursos: Course[];
  habilidades: string;
}

export interface Curriculum {
  id: string;
  user_id: string;
  name: string;
  model: string;
  personal_info: PersonalInfo;
  education: Education[];
  experience: Experience[];
  courses: Course[];
  skills: string;
  created_at: string;
}
