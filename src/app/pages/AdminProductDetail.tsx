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

  if (!currentUser?.isAdmin) {
    return null;
  }

  if (!productData) {
      return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1a1f3a] mb-4">Producto no encontrado</h2>
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

    const removeMaterial = (material: string) => {
      setProductData({
        ...productData,
        materials: productData.materials?.filter(m => m.type !== material)
      });
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
            <h1 className="text-3xl font-bold text-[#1a1f3a]">Detalle del Producto</h1>
            <Badge className={formData.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
              {formData.active ? 'Activo' : 'Inactivo'}
            </Badge>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleToggleActive}
              className={formData.active ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}
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
              <Button
                onClick={handleSave}
                className="bg-[#5b4c9f] hover:bg-[#4a3d85]"
              >
                <Save className="w-4 h-4 mr-2" />
                Guardar Cambios
              </Button>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-[#5b4c9f] hover:bg-[#4a3d85]"
              >
                Editar Producto
              </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#1a1f3a] mb-4">Imágenes del Producto</h2>
              
              {productData.materials.map((material) => (
                <div key={material.type} className="mb-6">
                  <h3 className="text-sm font-semibold text-[#1a1f3a] mb-3 capitalize">
                    Material: {material.type.replace('-', ' ')}
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {material.images.map((image, index) => (
                      <div key={index} className="aspect-square overflow-hidden rounded-lg bg-[#f5f5f7]">
                        <img
                          src={image}
                          alt={`${productData.name} - ${material.type} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {isEditing && (
                <div className="mt-4">
                  <Button variant="outline" className="w-full">
                    Cambiar imágenes
                  </Button>
                </div>
              )}
            </div>

            {/* Materials */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#1a1f3a] mb-4">Materiales Disponibles</h2>
              <div className="flex flex-wrap gap-2">
                {productData.materials.map((material) => (
                  <div
                    key={material.type}
                    className="flex items-center gap-2 bg-[#f5f5f7] px-3 py-1 rounded-lg"
                  >
                    <span className="capitalize">
                      {material.type.replace('-', ' ')}
                    </span>

                    {isEditing && (
                      <button
                        onClick={() => removeMaterial(material.type)}
                        className="hover:bg-gray-300 rounded-full p-0.5"
                      >
                        ✕
                      </button>
                    )}

                  </div>
                ))}
              </div>
              </div>

            {/* Sizes / Lengths */}
            {(productData.sizes || productData.lengths) && (
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#1a1f3a] mb-4">
                {productData.sizes ? 'Tallas Disponibles' : 'Largos Disponibles'}
              </h2>

              <div className="flex flex-wrap gap-2">
                {productData.sizes?.map((size) => (
                  <div
                    key={size}
                    className="flex items-center gap-2 bg-[#f5f5f7] px-3 py-1 rounded-lg"
                  >
                    <span>Talla {size}</span>

                    {isEditing && (
                      <button
                        onClick={() => removeSize(size)}
                        className="hover:bg-gray-300 rounded-full p-0.5"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Product Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#1a1f3a] mb-6">Información del Producto</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre del producto</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="category">Categoría</Label>
                  <Input
                    id="category"
                    value={productData.category.replace('-', ' ')}
                    disabled
                    className="capitalize"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    disabled={!isEditing}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Precio ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label>Para quién</Label>
                  <Input
                    value={productData.targetGender === 'ella' ? 'Ella' : productData.targetGender === 'ellos' ? 'Ellos' : 'Babys'}
                    disabled
                    className="capitalize"
                  />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#1a1f3a] mb-6">Estadísticas de Ventas</h2>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Veces vendido</p>
                  <p className="text-3xl font-bold text-[#5b4c9f]">{productData.soldCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Ingresos totales</p>
                  <p className="text-3xl font-bold text-[#1a1f3a]">
                    ${(productData.soldCount * productData.price).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Stock actual</p>
                  <p className={`text-3xl font-bold ${productData.stock < 10 ? 'text-red-600' : 'text-green-600'}`}>
                    {productData.stock}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Valor en stock</p>
                  <p className="text-3xl font-bold text-[#1a1f3a]">
                    ${(productData.stock * productData.price).toLocaleString()}
                  </p>
                </div>
              </div>

              {productData.stock < 10 && (
                <div className="mt-4 p-3 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-600 font-medium">
                    ⚠️ Stock bajo - Considera reabastecer este producto
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}