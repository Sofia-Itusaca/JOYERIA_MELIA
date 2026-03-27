import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, CartItem, Product, StoreInfo } from '../types';
import { mockUsers, mockStoreInfo } from '../data/mock-data';

interface AppContextType {
  currentUser: User | null;
  cart: CartItem[];
  isCartOpen: boolean;
  storeInfo: StoreInfo;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string, phone: string, address: string) => boolean;
  addToCart: (product: Product, material: string, size?: string, length?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  updateStoreInfo: (info: StoreInfo) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [storeInfo, setStoreInfo] = useState<StoreInfo>(mockStoreInfo);

  // Load from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('joyasMeliaUser');
    const savedCart = localStorage.getItem('joyasMeliaCart');
    
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('joyasMeliaUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('joyasMeliaUser');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('joyasMeliaCart', JSON.stringify(cart));
  }, [cart]);

  const login = (email: string, password: string): boolean => {
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const register = (name: string, email: string, password: string, phone: string, address: string): boolean => {
    const newUser: User = {
      id: `user${Date.now()}`,
      name,
      email,
      phone,
      address,
      isAdmin: false
    };
    setCurrentUser(newUser);
    return true;
  };

  const addToCart = (product: Product, material: string, size?: string, length?: number) => {
    const existingItem = cart.find(
      item => 
        item.productId === product.id && 
        item.selectedMaterial === material &&
        item.selectedSize === size &&
        item.selectedLength === length
    );

    if (existingItem) {
      setCart(cart.map(item =>
        item === existingItem
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        productId: product.id,
        product,
        quantity: 1,
        selectedMaterial: material,
        selectedSize: size,
        selectedLength: length
      }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.productId !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const updateStoreInfo = (info: StoreInfo) => {
    setStoreInfo(info);
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      cart,
      isCartOpen,
      storeInfo,
      login,
      logout,
      register,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      toggleCart,
      closeCart,
      updateStoreInfo
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
