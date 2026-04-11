import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';

export function AdminAboutPage() {
  const { currentUser, storeInfo, updateStoreInfo } = useApp();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    welcomeTitle: storeInfo.welcomeTitle,
    welcomeText: storeInfo.welcomeText,
    aboutText: storeInfo.aboutText,
    materialsText: storeInfo.materialsText,
    address: storeInfo.address,
    phone: storeInfo.phone,
    whatsapp: storeInfo.whatsapp,
    schedule: storeInfo.schedule,
    facebook: storeInfo.socialMedia.facebook || '',
    instagram: storeInfo.socialMedia.instagram || '',
    twitter: storeInfo.socialMedia.twitter || ''
  });

  const [storeImages, setStoreImages] = useState<string[]>(
  storeInfo.storeImages
  );

  useEffect(() => {
    if (!currentUser?.isAdmin) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser?.isAdmin) {
    return null;
  }

  const handleSave = () => {
    const updatedStoreInfo = {
      ...storeInfo,
      welcomeTitle: formData.welcomeTitle,
      welcomeText: formData.welcomeText,
      aboutText: formData.aboutText,
      materialsText: formData.materialsText,
      address: formData.address,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      schedule: formData.schedule,
      storeImages: storeImages,
      socialMedia: {
        facebook: formData.facebook,
        instagram: formData.instagram,
        twitter: formData.twitter
      }
    };
    
    updateStoreInfo(updatedStoreInfo);
    toast.success('Información de la tienda actualizada correctamente');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      welcomeTitle: storeInfo.welcomeTitle,
      welcomeText: storeInfo.welcomeText,
      aboutText: storeInfo.aboutText,
      materialsText: storeInfo.materialsText,
      address: storeInfo.address,
      phone: storeInfo.phone,
      whatsapp: storeInfo.whatsapp,
      schedule: storeInfo.schedule,
      facebook: storeInfo.socialMedia.facebook || '',
      instagram: storeInfo.socialMedia.instagram || '',
      twitter: storeInfo.socialMedia.twitter || ''
    });
    setIsEditing(false);
  };

  const handleImageChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const updated = [...storeImages];
    updated[index] = URL.createObjectURL(file);

    setStoreImages(updated);
  };

  const removeImage = (index: number) => {
  const updated = [...storeImages];
    updated.splice(index, 1);
    setStoreImages(updated);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/admin')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al panel
        </Button>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#1a1f3a]">
            Editar Información de la Tienda
          </h1>
          
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-[#5b4c9f] hover:bg-[#4a3d85]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Cambios
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-[#5b4c9f] hover:bg-[#4a3d85]"
              >
                Editar Información
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#1a1f3a] mb-6">
              Sección de Bienvenida
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="welcomeTitle">Título principal</Label>
                <Input
                  id="welcomeTitle"
                  value={formData.welcomeTitle}
                  onChange={(e) => setFormData({ ...formData, welcomeTitle: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Ej: Bienvenidos a Joyas Meliá"
                />
              </div>

              <div>
                <Label htmlFor="welcomeText">Texto de bienvenida</Label>
                <Textarea
                  id="welcomeText"
                  value={formData.welcomeText}
                  onChange={(e) => setFormData({ ...formData, welcomeText: e.target.value })}
                  disabled={!isEditing}
                  rows={3}
                  placeholder="Describe tu tienda brevemente..."
                />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#1a1f3a] mb-6">
              Sobre Nosotros
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="aboutText">Historia de la tienda</Label>
                <Textarea
                  id="aboutText"
                  value={formData.aboutText}
                  onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
                  disabled={!isEditing}
                  rows={5}
                  placeholder="Cuenta la historia de tu tienda..."
                />
              </div>

              <div>
                <Label htmlFor="materialsText">Descripción de materiales</Label>
                <Textarea
                  id="materialsText"
                  value={formData.materialsText}
                  onChange={(e) => setFormData({ ...formData, materialsText: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                  placeholder="Describe los materiales que utilizas..."
                />
              </div>
            </div>
          </div>

          {/* Store Images */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#1a1f3a] mb-6">
              Imágenes de la Tienda
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              {storeImages.map((image, index) => (
                <div key={index} className="space-y-2 relative">

                  <img
                    src={image}
                    className="w-full h-48 object-cover rounded-lg"
                  />

                  {isEditing && (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        id={`store-${index}`}
                        className="hidden"
                        onChange={(e) => handleImageChange(index, e)}
                      />

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() =>
                          document.getElementById(`store-${index}`)?.click()
                        }
                      >
                        Cambiar imagen {index + 1}
                      </Button>

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-white rounded-full w-7 h-7 shadow"
                      >
                        ✕
                      </button>
                    </>
                  )}

                </div>
              ))}
            </div>
            
            {!isEditing && (
              <p className="text-xs text-gray-500 mt-4">
                Las imágenes se pueden cambiar al activar el modo de edición
              </p>
            )}
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#1a1f3a] mb-6">
              Información de Contacto
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Calle, número, ciudad"
                />
              </div>

              <div>
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  placeholder="+34 91 234 5678"
                />
              </div>

              <div>
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  disabled={!isEditing}
                  placeholder="+34 612 345 678"
                />
              </div>

              <div>
                <Label htmlFor="schedule">Horario</Label>
                <Input
                  id="schedule"
                  value={formData.schedule}
                  onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Lunes a Sábado: 10:00 - 20:00"
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#1a1f3a] mb-6">
              Redes Sociales
            </h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="facebook">Facebook (URL completa)</Label>
                <Input
                  id="facebook"
                  value={formData.facebook}
                  onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                  disabled={!isEditing}
                  placeholder="https://facebook.com/joyasmelia"
                />
              </div>

              <div>
                <Label htmlFor="instagram">Instagram (URL completa)</Label>
                <Input
                  id="instagram"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  disabled={!isEditing}
                  placeholder="https://instagram.com/joyasmelia"
                />
              </div>

              <div>
                <Label htmlFor="twitter">Twitter / X (URL completa)</Label>
                <Input
                  id="twitter"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  disabled={!isEditing}
                  placeholder="https://twitter.com/joyasmelia"
                />
              </div>
            </div>
          </div>

          {/* Preview Button */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[#1a1f3a] mb-1">
                  Vista Previa
                </h3>
                <p className="text-sm text-gray-600">
                  Ve cómo se ve la página pública con tu información
                </p>
              </div>
              <Button
                onClick={() => navigate('/bienvenida')}
                variant="outline"
              >
                Ver Página de Bienvenida
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
