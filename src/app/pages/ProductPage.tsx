import { useState, useRef } from 'react';
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

  const touchStart = useRef(0);
  const touchEnd = useRef(0);

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
      <div className="max-w-[1400px] mx-auto px-4 py-2">

        <Button
          variant="ghost"
          onClick={() => navigate('/catalogo')}
          className="mb-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al catálogo
        </Button>

        <div className="grid lg:grid-cols-2 gap-4 bg-white rounded-lg p-4 shadow-sm">

          {/* Images */}
          <div className="space-y-4">
            <div
              className="relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-lg bg-[#f5f5f7]"
              onTouchStart={(e) => {
                touchStart.current = e.targetTouches[0].clientX;
              }}
              onTouchMove={(e) => {
                touchEnd.current = e.targetTouches[0].clientX;
              }}
              onTouchEnd={() => {
                if (touchStart.current - touchEnd.current > 50) {
                  setCurrentImageIndex(
                    (currentImageIndex + 1) % (images.length || 1)
                  );
                }

                if (touchStart.current - touchEnd.current < -50) {
                  setCurrentImageIndex(
                    currentImageIndex === 0
                      ? images.length - 1
                      : currentImageIndex - 1
                  );
                }
              }}
            >

              {/* IMAGE */}
              <img
                src={images[currentImageIndex] || images[0]}
                alt={product.name}
                className="w-full h-full object-contain"
              />

              {/* IMAGE COUNTER */}
              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                {currentImageIndex + 1}/{images.length}
              </div>

            </div>

            {/* Desktop thumbnails */}
            <div className="hidden lg:flex gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square w-20 overflow-hidden rounded-lg border-2 ${
                    index === currentImageIndex
                      ? 'border-[#5b4c9f]'
                      : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

          </div>

          {/* Product Info */}
          <div className="space-y-4">

            <div>
              <Badge className="mb-3 bg-[#5b4c9f]/10 text-[#5b4c9f]">
                {product.category.replace('-', ' ').toUpperCase()}
              </Badge>

              <h1 className="text-3xl font-bold text-[#1a1f3a] mb-3">
                {product.name}
              </h1>

              <p className="text-4xl font-bold text-[#5b4c9f] mb-4">
                ${product.price.toLocaleString()}
              </p>

              <p className="text-gray-600">
                {product.description}
              </p>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full h-14 bg-[#5b4c9f] hover:bg-[#4a3d85]"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Añadir al carrito
            </Button>

          </div>

        </div>

      </div>
    </div>
  );
}