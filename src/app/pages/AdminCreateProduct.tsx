import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabase';

export function AdminCreateProduct() {
  const { currentUser } = useApp();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'rings',
    stock: 0,
    targetGender: 'ella',
  });

  const [materials, setMaterials] = useState<string[]>(['gold']);
  const [sizes, setSizes] = useState<string[]>([]);
  const [lengths, setLengths] = useState<number[]>([]);
  const [newSize, setNewSize] = useState('');
  const [newLength, setNewLength] = useState('');

  const [materialImages, setMaterialImages] = useState<{
    [key: string]: string[];
  }>({});

  useEffect(() => {
    if (currentUser?.role !== "admin") {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (currentUser?.role !== "admin") {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.name || !formData.description || formData.price <= 0) {
    toast.error('Por favor completa todos los campos requeridos');
    return;
  }

  if (materials.length === 0) {
    toast.error('Selecciona al menos un material');
    return;
  }

  console.log(materialImages);

  const productData = {
    name: formData.name,
    description: formData.description,
    price: formData.price,

    category: formData.category,

    targetGender: formData.targetGender,

    image:
  Object.values(materialImages)[0]?.[0] || null,

    material: materials[0],

    size: sizes[0] || null,

    active: true
  };

  const { error } = await supabase
    .from('products')
    .insert([productData]);

  if (error) {
    console.log(error);
    toast.error('Error al crear producto');
    return;
  }

  toast.success('Producto creado exitosamente');

  navigate('/admin');
};

  const addMaterial = (material: string) => {
    if (!materials.includes(material)) {
      setMaterials([...materials, material]);
    }
  };

  const removeMaterial = (material: string) => {
    setMaterials(materials.filter(m => m !== material));
  };

  const addSize = () => {
    if (newSize && !sizes.includes(newSize)) {
      setSizes([...sizes, newSize]);
      setNewSize('');
    }
  };

  const removeSize = (size: string) => {
    setSizes(sizes.filter(s => s !== size));
  };

const handleImageUpload = async (
  material: string,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const files = e.target.files;

  if (!files) return;

  const uploadedUrls: string[] = [];

  for (const file of Array.from(files)) {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from('products')
      .upload(fileName, file);

    if (error) {
      console.log(error);
      continue;
    }

    const { data } = supabase.storage
      .from('products')
      .getPublicUrl(fileName);

    uploadedUrls.push(data.publicUrl);
  }

  const updatedImages = {
    ...materialImages,
    [material]: uploadedUrls
  };

  setMaterialImages(updatedImages);

  console.log(updatedImages);
};

  const addLength = () => {
    const length = parseInt(newLength);
    if (length && !lengths.includes(length)) {
      setLengths([...lengths, length].sort((a, b) => a - b));
      setNewLength('');
    }
  };

  const removeLength = (length: number) => {
    setLengths(lengths.filter(l => l !== length));
  };

  const materialOptions = [
    { value: 'gold', label: 'Oro' },
    { value: 'silver', label: 'Plata' },
    { value: 'stainless-steel', label: 'Acero Inoxidable' },
    { value: 'copper', label: 'Cobre' },
    { value: 'bronze', label: 'Bronce' },
    { value: 'rose-gold', label: 'Oro Rosa' },
    { value: 'gems', label: 'Gemas' }
  ];

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

        <h1 className="text-3xl font-bold text-[#1a1f3a] mb-8">Crear Nuevo Producto</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Basic Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-[#1a1f3a] mb-6">Información Básica</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nombre del producto *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej: Anillo Elegante Solitario"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Descripción *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe el producto detalladamente..."
                      rows={5}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Precio ($) *</Label>
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="stock">Stock inicial *</Label>
                      <Input
                        id="stock"
                        type="number"
                        min="0"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Categoría *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rings">Anillos</SelectItem>
                          <SelectItem value="necklaces">Collares</SelectItem>
                          <SelectItem value="bracelets">Pulseras</SelectItem>
                          <SelectItem value="earrings">Aretes</SelectItem>
                          <SelectItem value="watches">Relojes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="gender">Para quién *</Label>
                      <Select
                        value={formData.targetGender}
                        onValueChange={(value) => setFormData({ ...formData, targetGender: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ella">Ella</SelectItem>
                          <SelectItem value="ellos">Ellos</SelectItem>
                          <SelectItem value="babys">Babys</SelectItem>
                          <SelectItem value="unisex">Unisex</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Materials */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-[#1a1f3a] mb-4">Materiales</h2>
                
                <div className="space-y-3">
                  <Label>Selecciona los materiales disponibles</Label>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {materials.map((material) => (
                      <div
                        key={material}
                        className="flex items-center gap-2 bg-[#5b4c9f] text-white px-3 py-1.5 rounded-lg"
                      >
                        <span className="text-sm capitalize">
                          {materialOptions.find(m => m.value === material)?.label}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeMaterial(material)}
                          className="hover:bg-white/20 rounded"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {materialOptions.map((option) => (
                      <Button
                        key={option.value}
                        type="button"
                        variant={materials.includes(option.value) ? "default" : "outline"}
                        onClick={() => addMaterial(option.value)}
                        disabled={materials.includes(option.value)}
                        className={materials.includes(option.value) ? 'bg-[#5b4c9f] hover:bg-[#4a3d85]' : ''}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Variants */}
            <div className="space-y-6">
              {/* Sizes (for rings) */}
              {formData.category === 'rings' && (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-[#1a1f3a] mb-4">Tallas de Anillos</h2>
                  
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        value={newSize}
                        onChange={(e) => setNewSize(e.target.value)}
                        placeholder="Ej: 7"
                        className="flex-1"
                      />
                      <Button type="button" onClick={addSize} variant="outline">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    {sizes.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {sizes.map((size) => (
                          <div
                            key={size}
                            className="flex items-center gap-2 bg-[#f5f5f7] px-3 py-1.5 rounded-lg"
                          >
                            <span className="text-sm">Talla {size}</span>
                            <button
                              type="button"
                              onClick={() => removeSize(size)}
                              className="hover:bg-gray-300 rounded"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <p className="text-xs text-gray-500">
                      Tallas sugeridas: 5, 6, 7, 8, 9, 10
                    </p>
                  </div>
                </div>
              )}

              {/* Lengths (for necklaces) */}
              {formData.category === 'necklaces' && (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-[#1a1f3a] mb-4">Largos de Collares (cm)</h2>
                  
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        value={newLength}
                        onChange={(e) => setNewLength(e.target.value)}
                        placeholder="Ej: 40"
                        className="flex-1"
                      />
                      <Button type="button" onClick={addLength} variant="outline">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    {lengths.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {lengths.map((length) => (
                          <div
                            key={length}
                            className="flex items-center gap-2 bg-[#f5f5f7] px-3 py-1.5 rounded-lg"
                          >
                            <span className="text-sm">{length}cm</span>
                            <button
                              type="button"
                              onClick={() => removeLength(length)}
                              className="hover:bg-gray-300 rounded"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <p className="text-xs text-gray-500">
                      Largos sugeridos: 40, 45, 50, 55, 60cm
                    </p>
                  </div>
                </div>
              )}

              {/* Images */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-[#1a1f3a] mb-4">Imágenes del Producto</h2>
                
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Sube imágenes para cada material seleccionado. Se recomienda al menos 3 imágenes por material.
                  </p>
                  
                  {materials.map((material) => (
                    <div key={material} className="p-4 bg-[#f5f5f7] rounded-lg">
                      <h3 className="font-semibold text-[#1a1f3a] mb-3 capitalize">
                        {materialOptions.find(m => m.value === material)?.label}
                      </h3>
                      <div className="space-y-3">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          id={`upload-${material}`}
                          className="hidden"
                          onChange={(e) => handleImageUpload(material, e)}
                        />

                        <div
                          onClick={() =>
                            document.getElementById(`upload-${material}`)?.click()
                          }
                          className="w-28 h-28 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-[#5b4c9f] transition-colors cursor-pointer"
                        >
                          <Plus className="w-6 h-6 text-gray-400" />
                        </div>

                        {materialImages[material]?.length > 0 && (
                          <div className="grid grid-cols-3 gap-2">
                            {materialImages[material].map((img, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={img}
                                  className="w-full h-24 object-cover rounded-lg"
                                />

                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = materialImages[material].filter(
                                      (_, i) => i !== index
                                    );

                                    setMaterialImages({
                                      ...materialImages,
                                      [material]: updated
                                    });
                                  }}
                                  className="absolute top-1 right-1 bg-white rounded-full w-6 h-6 shadow"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <p className="text-xs text-gray-500">
                    En un entorno de producción, aquí se cargarían las imágenes reales
                  </p>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  💡 Asegúrate de completar toda la información antes de crear el producto. 
                  Podrás editarlo después desde el panel de administrador.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin')}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[#5b4c9f] hover:bg-[#4a3d85] px-8"
            >
              Crear Producto
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
