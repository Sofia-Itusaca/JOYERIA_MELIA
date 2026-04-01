import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ArrowLeft, Package, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

export function CheckoutPage() {
  const { currentUser, cart, clearCart } = useApp();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    email: currentUser?.email || ''
  });

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    // Simulate order creation
    toast.success('¡Pedido realizado con éxito!');
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-lg shadow-sm">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#1a1f3a] mb-4">
            Tu carrito está vacío
          </h2>
          <Button onClick={() => navigate('/catalogo')} className="bg-[#5b4c9f] hover:bg-[#4a3d85]">
            Ir al catálogo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <Button
          variant="ghost"
          onClick={() => navigate('/catalogo')}
          className="mb-2"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al catálogo
        </Button>

        <h1 className="text-2xl md:text-3xl font-bold text-[#1a1f3a] mb-4">Finalizar Compra</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#1a1f3a] mb-6">
                Información de Envío
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tu nombre"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+34 600 000 000"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Dirección de envío *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Calle, número, ciudad, código postal"
                    required
                  />
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-[#1a1f3a] mb-6 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Método de Pago
              </h2>
              
              <div className="space-y-3">
                <div className="border border-border rounded-lg p-4 bg-[#f5f5f7]">
                  <p className="text-sm text-gray-600 mb-2">
                    El pago se realizará al momento de la entrega
                  </p>
                  <p className="text-xs text-gray-500">
                    Aceptamos efectivo y tarjetas (débito/crédito)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-semibold text-[#1a1f3a] mb-6">
                Resumen del Pedido
              </h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => {
                const selectedMaterialData = item.product.materials.find(
                m => m.type === item.selectedMaterial
                );
                const image = selectedMaterialData?.images[0] || '';

                return (
                <div
                key={`${item.productId}-${item.selectedMaterial}`}
                className="flex gap-4 items-start"
                >
                <img
                src={image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-md"
                />

                <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-[#1a1f3a] truncate">
                {item.product.name}
                </h3>

                <p className="text-xs text-gray-500 mt-1 capitalize">
                {item.selectedMaterial.replace('-', ' ')}
                {item.selectedSize && ` • Talla ${item.selectedSize}`}
                {item.selectedLength && ` • ${item.selectedLength}cm`}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                Cantidad: {item.quantity}
                </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                <p className="text-sm font-semibold text-[#5b4c9f]">
                ${(item.product.price * item.quantity).toLocaleString()}
                </p>

                <Button
                size="sm"
                className="bg-[#5b4c9f] hover:bg-[#4a3d85] text-white text-xs px-3 py-1 h-7"
                onClick={() => {
                navigate('/');
                setTimeout(() => {
                window.dispatchEvent(new Event("openCart"));
                }, 200);
                }}
                >
                Editar
                </Button>
                </div>

                </div>
                );
                })}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-[#1a1f3a]">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Envío</span>
                  <span className="font-medium text-[#1a1f3a]">
                    {shipping === 0 ? 'Gratis' : `$${shipping}`}
                  </span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-green-600">
                    ✓ Envío gratis en compras mayores a $5,000
                  </p>
                )}
              </div>

              <div className="border-t border-border pt-4 mt-4">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold text-[#1a1f3a]">Total</span>
                  <span className="text-2xl font-bold text-[#5b4c9f]">
                    ${total.toLocaleString()}
                  </span>
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full h-12 bg-[#5b4c9f] hover:bg-[#4a3d85] text-white"
                >
                  Confirmar Pedido
                </Button>
              </div>

              <div className="mt-6 p-4 bg-[#f5f5f7] rounded-lg">
                <p className="text-xs text-gray-600 text-center">
                  Al confirmar tu pedido, aceptas nuestros términos y condiciones
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
