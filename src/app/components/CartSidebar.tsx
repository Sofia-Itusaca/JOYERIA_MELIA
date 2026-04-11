import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from "react";
import { useState } from "react";

export function CartSidebar() {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedLength, setSelectedLength] = useState<number | undefined>(undefined);
    useEffect(() => {
    const handleOpenCart = () => {
      toggleCart();
    };

    window.addEventListener("openCart", handleOpenCart);

    return () => {
      window.removeEventListener("openCart", handleOpenCart);
    };
  }, []);

  const { cart, isCartOpen, closeCart, updateCartQuantity, removeFromCart, toggleCart, addToCart } = useApp();
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
                  <div 
                    key={`${item.productId}-${item.selectedMaterial}-${item.selectedSize}-${item.selectedLength}`}
                    className="flex gap-4 pb-4 border-b border-border cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      if (target.closest("button")) return;
                      navigate(`/producto/${item.productId}`);
                      closeCart();
                      }}
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
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedItem(item);
                            setSelectedMaterial(item.selectedMaterial);
                            setShowOptions(true);
                          }}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto text-red-500 hover:text-red-600 h-7 text-xs"
                          onClick={() =>
                            removeFromCart(
                              item.productId,
                              item.selectedMaterial,
                              item.selectedSize,
                              item.selectedLength
                            )
                          }
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

      {showOptions && selectedItem && (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">

      <div className="bg-white rounded-xl p-5 w-full max-w-sm shadow-xl">

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#1a1f3a]">
          Seleccionar opciones
        </h3>

        <button
          onClick={() => setShowOptions(false)}
          className="text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>
      </div>

      {selectedItem.product.materials.length > 1 && (
      <div className="mb-4">
      <p className="text-sm font-medium mb-2">Material</p>
      <div className="flex gap-2 flex-wrap">
      {selectedItem.product.materials.map((m: any) => (
      <button
      key={m.type}
      onClick={() => setSelectedMaterial(m.type)}
      className={`px-3 py-1 rounded-full border text-sm
      ${selectedMaterial === m.type 
      ? "bg-[#5b4c9f] text-white border-[#5b4c9f]" 
      : "bg-white border-gray-300"}
      `}
      >
      {m.type}
      </button>
      ))}
      </div>
      </div>
      )}

      {selectedItem.product.sizes && (
        <div className="mb-4">
        <p className="text-sm font-medium mb-2">Talla</p>
        <div className="flex gap-2 flex-wrap">
        {selectedItem.product.sizes.map((size: any) => (
        <button
        key={size}
        onClick={() => setSelectedSize(size)}
        className={`px-3 py-1 rounded-full border text-sm
        ${selectedSize === size 
        ? "bg-[#5b4c9f] text-white border-[#5b4c9f]" 
        : "bg-white border-gray-300"}
        `}
        >
        {size}
        </button>
        ))}
        </div>
        </div>
        )}

        {selectedItem.product.lengths && (
          <div className="mb-4">
          <p className="text-sm font-medium mb-2">Largo</p>
          <div className="flex gap-2 flex-wrap">
          {selectedItem.product.lengths.map((length: any) => (
          <button
          key={length}
          onClick={() => setSelectedLength(length)}
          className={`px-3 py-1 rounded-full border text-sm
          ${selectedLength === length 
          ? "bg-[#5b4c9f] text-white border-[#5b4c9f]" 
          : "bg-white border-gray-300"}
          `}
          >
          {length}cm
          </button>
          ))}
          </div>
          </div>
          )}

      <button
        onClick={() => {
        addToCart(
        selectedItem.product,
        selectedMaterial || selectedItem.selectedMaterial,
        selectedSize || selectedItem.selectedSize,
        selectedLength || selectedItem.selectedLength
        );
        setShowOptions(false);
        }}
      className="w-full mt-3 bg-[#5b4c9f] text-white py-2 rounded-lg"
      >
      Agregar al carrito
      </button>

      </div>
      </div>
      )}
    </>
  );
}
