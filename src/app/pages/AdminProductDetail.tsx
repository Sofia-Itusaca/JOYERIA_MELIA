import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { mockProducts } from '../data/mock-data';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { ArrowLeft, Save, Power, PowerOff } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '../components/ui/badge';

export function AdminProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useApp();

  const product = mockProducts.find(p => String(p.id) === id);
  const [productData, setProductData] = useState(product!);

  const [isEditing, setIsEditing] = useState(false);
  const [showAddSize, setShowAddSize] = useState(false);
  const [newSize, setNewSize] = useState('');
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [newMaterial, setNewMaterial] = useState('');

  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    stock: product?.stock || 0,
    active: product?.active ?? true
  });

  useEffect(() => {
    if (!currentUser?.isAdmin) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser?.isAdmin) return null;

  if (!productData) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1a1f3a] mb-4">
            Producto no encontrado
          </h2>
          <Button onClick={() => navigate('/admin')}>
            Volver al panel
          </Button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    toast.success('Producto actualizado correctamente');
    setIsEditing(false);
  };

  const handleToggleActive = () => {
    const newStatus = !formData.active;
    setFormData({ ...formData, active: newStatus });
    toast.success(`Producto ${newStatus ? 'activado' : 'desactivado'}`);
  };

  const removeSize = (size: string) => {
    setProductData({
      ...productData,
      sizes: productData.sizes?.filter(s => s !== size)
    });
  };

  const addSize = () => {
    if (!newSize) return;

    setProductData({
      ...productData,
      sizes: [...(productData.sizes || []), newSize]
    });

    setNewSize('');
    setShowAddSize(false);
  };

  const removeMaterial = (material: string) => {
    setProductData({
      ...productData,
      materials: productData.materials?.filter(
        m => m.type !== material
      )
    });
  };

  const addMaterial = () => {
    if (!newMaterial) return;

    setProductData({
      ...productData,
      materials: [
        ...(productData.materials || []),
        { type: newMaterial, images: [] }
      ]
    });

    setNewMaterial('');
    setShowAddMaterial(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/admin')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al panel
        </Button>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-[#1a1f3a]">
              Detalle del Producto
            </h1>

            <Badge
              className={
                formData.active
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }
            >
              {formData.active ? 'Activo' : 'Inactivo'}
            </Badge>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleToggleActive}
            >
              {formData.active ? (
                <>
                  <PowerOff className="w-4 h-4 mr-2" />
                  Desactivar
                </>
              ) : (
                <>
                  <Power className="w-4 h-4 mr-2" />
                  Activar
                </>
              )}
            </Button>

            {isEditing ? (
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Guardar
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                Editar
              </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Materials */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl mb-4">
                Materiales Disponibles
              </h2>

              <div className="flex flex-wrap gap-2">
                {productData.materials.map(material => (
                  <div
                    key={material.type}
                    className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded"
                  >
                    {material.type}

                    {isEditing && (
                      <button
                        onClick={() =>
                          removeMaterial(material.type)
                        }
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}

                {isEditing && (
                  <button
                    onClick={() => setShowAddMaterial(true)}
                  >
                    +
                  </button>
                )}
              </div>

              {showAddMaterial && (
                <div className="flex gap-2 mt-3">
                  <Input
                    value={newMaterial}
                    onChange={e =>
                      setNewMaterial(e.target.value)
                    }
                  />

                  <Button onClick={addMaterial}>
                    Añadir
                  </Button>

                  <Button
                    onClick={() =>
                      setShowAddMaterial(false)
                    }
                  >
                    X
                  </Button>
                </div>
              )}
            </div>

            {/* Sizes */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl mb-4">
                Tallas Disponibles
              </h2>

              <div className="flex flex-wrap gap-2">
                {productData.sizes?.map(size => (
                  <div
                    key={size}
                    className="flex gap-2 bg-gray-100 px-3 py-1 rounded"
                  >
                    {size}

                    {isEditing && (
                      <button
                        onClick={() => removeSize(size)}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}

                {isEditing && (
                  <button
                    onClick={() => setShowAddSize(true)}
                  >
                    +
                  </button>
                )}
              </div>

              {showAddSize && (
                <div className="flex gap-2 mt-3">
                  <Input
                    value={newSize}
                    onChange={e =>
                      setNewSize(e.target.value)
                    }
                  />

                  <Button onClick={addSize}>
                    Añadir
                  </Button>

                  <Button
                    onClick={() => setShowAddSize(false)}
                  >
                    X
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}