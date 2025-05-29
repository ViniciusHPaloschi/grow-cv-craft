
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Camera, X } from 'lucide-react';

interface ProfilePhotoUploadProps {
  currentPhotoUrl?: string;
  onPhotoChange: (photoUrl: string | undefined) => void;
}

const ProfilePhotoUpload = ({ currentPhotoUrl, onPhotoChange }: ProfilePhotoUploadProps) => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);

  const uploadPhoto = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Você deve selecionar uma imagem para fazer upload.');
      }

      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const file = event.target.files[0];
      
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        throw new Error('Por favor, selecione apenas arquivos de imagem.');
      }

      // Validar tamanho do arquivo (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('O arquivo deve ter no máximo 5MB.');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-photos')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      // Obter URL pública
      const { data } = supabase.storage
        .from('profile-photos')
        .getPublicUrl(fileName);

      onPhotoChange(data.publicUrl);
      toast.success('Foto de perfil carregada com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      toast.error(error instanceof Error ? error.message : 'Erro ao fazer upload da imagem');
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = () => {
    onPhotoChange(undefined);
    toast.success('Foto de perfil removida');
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="w-32 h-32">
        <AvatarImage src={currentPhotoUrl} alt="Foto de perfil" />
        <AvatarFallback className="text-2xl">
          <Camera className="w-12 h-12 text-gray-400" />
        </AvatarFallback>
      </Avatar>

      <div className="flex gap-2">
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={uploadPhoto}
            disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="photo-upload"
          />
          <Button
            type="button"
            variant="outline"
            disabled={uploading}
            className="cursor-pointer"
          >
            <Camera className="w-4 h-4 mr-2" />
            {uploading ? 'Carregando...' : currentPhotoUrl ? 'Alterar Foto' : 'Adicionar Foto'}
          </Button>
        </div>

        {currentPhotoUrl && (
          <Button
            type="button"
            variant="outline"
            onClick={removePhoto}
            disabled={uploading}
            size="icon"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <p className="text-sm text-gray-500 text-center">
        Tamanho máximo: 5MB<br />
        Formatos aceitos: JPG, PNG, GIF
      </p>
    </div>
  );
};

export default ProfilePhotoUpload;
