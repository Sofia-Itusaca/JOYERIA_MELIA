import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/mock-data';
import { Button } from '../components/ui/button';
import { ShoppingCart, ArrowLeft, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/ui/badge';

export function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, currentUser } = useApp();
  
  const product = mockProducts.find(p => String(p.id) === id);  
  
  const [selectedMaterial, setSelectedMaterial] = useState(product?.materials[0].type || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedLength, setSelectedLength] = useState(product?.lengths?.[0] || 0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1a1f3a] mb-4">Producto no encontrado</h2>
          <Button onClick={() => navigate('/catalogo')}>
            Volver al catálogo
          </Button>
        </div>
      </div>
    );
  }

  const currentMaterial = product.materials.find(m => m.type === selectedMaterial);
  const images = currentMaterial?.images || [];

  const handleAddToCart = () => {
    addToCart(
      product,
      selectedMaterial,
      product.sizes ? selectedSize : undefined,
      product.lengths ? selectedLength : undefined
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/catalogo')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al catálogo
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-lg p-8 shadow-sm">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-[#f5f5f7]">
              <img
                src={images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square overflow-hidden rounded-lg ${
                      currentImageIndex === index
                        ? 'ring-2 ring-[#5b4c9f]'
                        : 'opacity-60 hover:opacity-100'
                    } transition-all`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-3 bg-[#5b4c9f]/10 text-[#5b4c9f] hover:bg-[#5b4c9f]/20">
                {product.category.replace('-', ' ').toUpperCase()}
              </Badge>
              <h1 className="text-3xl font-bold text-[#1a1f3a] mb-3">
                {product.name}
              </h1>
              <p className="text-4xl font-bold text-[#5b4c9f] mb-4">
                ${product.price.toLocaleString()}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Material Selection */}
            {product.materials.length > 1 && (
              <div>
                <label className="block text-sm font-semibold text-[#1a1f3a] mb-3">
                  Material
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.materials.map((material) => (
                    <button
                      key={material.type}
                      onClick={() => {
                        setSelectedMaterial(material.type);
                        setCurrentImageIndex(0);
                      }}
                      className={`px-4 py-2 rounded-lg capitalize transition-all ${
                        selectedMaterial === material.type
                          ? 'bg-[#5b4c9f] text-white shadow-md'
                          : 'bg-[#f5f5f7] text-[#1a1f3a] hover:bg-[#e8e8ea]'
                      }`}
                    >
                      {material.type.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection for Rings */}
            {product.sizes && (
              <div>
                <label className="block text-sm font-semibold text-[#1a1f3a] mb-3">
                  Talla
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg transition-all ${
                        selectedSize === size
                          ? 'bg-[#5b4c9f] text-white shadow-md'
                          : 'bg-[#f5f5f7] text-[#1a1f3a] hover:bg-[#e8e8ea]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Length Selection for Necklaces */}
            {product.lengths && (
              <div>
                <label className="block text-sm font-semibold text-[#1a1f3a] mb-3">
                  Largo (cm)
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.lengths.map((length) => (
                    <button
                      key={length}
                      onClick={() => setSelectedLength(length)}
                      className={`px-4 py-2 rounded-lg transition-all ${
                        selectedLength === length
                          ? 'bg-[#5b4c9f] text-white shadow-md'
                          : 'bg-[#f5f5f7] text-[#1a1f3a] hover:bg-[#e8e8ea]'
                      }`}
                    >
                      {length}cm
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Info */}
            <div className="flex items-center justify-between py-4 border-t border-b border-border">
              <div>
                <p className="text-sm text-gray-600">Disponibilidad</p>
                <p className="font-semibold text-[#1a1f3a]">
                  {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Vendido</p>
                <p className="font-semibold text-[#1a1f3a]">
                  {product.soldCount} veces
                </p>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full h-14 bg-[#5b4c9f] hover:bg-[#4a3d85] text-white text-lg"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {product.stock > 0 ? 'Añadir al carrito' : 'Agotado'}
            </Button>

            {/* Additional Info */}
            <div className="bg-[#f5f5f7] rounded-lg p-6 space-y-3">
              <h3 className="font-semibold text-[#1a1f3a]">Información adicional</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Envío gratuito en compras mayores a $5,000</li>
                <li>✓ Garantía de calidad premium</li>
                <li>✓ Certificado de autenticidad incluido</li>
                <li>✓ Devoluciones en 30 días</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1a1f3a] mb-6">
            Comentarios y Valoraciones
          </h2>
          
          {!currentUser ? (
            <div className="text-center py-12 bg-[#f5f5f7] rounded-lg">
              <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                Inicia sesión para ver y dejar comentarios
              </p>
              <Button
                onClick={() => navigate('/login')}
                className="bg-[#5b4c9f] hover:bg-[#4a3d85]"
              >
                Iniciar sesión
              </Button>
            </div>
          ) : product.reviews.length === 0 ? (
            <div className="text-center py-12 bg-[#f5f5f7] rounded-lg">
              <p className="text-gray-600">
                Sé el primero en comentar este producto
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b border-border pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-[#1a1f3a]">{review.userName}</span>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'fill-[#5b4c9f] text-[#5b4c9f]' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
