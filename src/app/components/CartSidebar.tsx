import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from "react";

export function CartSidebar() {
  const { cart, isCartOpen, closeCart, updateCartQuantity, removeFromCart } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
    useEffect(() => {
    closeCart();
  }, [location.pathname]);

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-[85%] max-w-[380px] sm:w-[400px] bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-[#1a1f3a]">Mi Carrito</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={closeCart}
            className="text-[#1a1f3a] hover:text-[#5b4c9f]"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 mb-2">Tu carrito está vacío</p>
              <p className="text-sm text-gray-400">Añade productos para comenzar</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => {
                const selectedMaterialData = item.product.materials.find(
                  m => m.type === item.selectedMaterial
                );
                const image = selectedMaterialData?.images[0] || '';

                return (
                  <div key={`${item.productId}-${item.selectedMaterial}-${item.selectedSize}`} 
                        className="flex gap-4 pb-4 border-b border-border">
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
                      <p className="text-sm font-semibold text-[#5b4c9f] mt-1">
                        ${item.product.price.toLocaleString()}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto text-red-500 hover:text-red-600 h-7 text-xs"
                          onClick={() => removeFromCart(item.productId)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-[#1a1f3a]">Total</span>
              <span className="text-2xl font-bold text-[#5b4c9f]">
                ${total.toLocaleString()}
              </span>
            </div>

            <Button
              onClick={handleCheckout}
              className="w-full bg-[#5b4c9f] hover:bg-[#4a3d85] text-white h-12"
            >
              Proceder al pago
            </Button>

            <Button
              variant="outline"
              onClick={closeCart}
              className="w-full"
            >
              Continuar comprando
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
