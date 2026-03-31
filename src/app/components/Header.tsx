import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const categories = [
  { name: 'Inicio', path: '/' },
  { name: 'Anillos', path: '/catalogo?category=rings' },
  { name: 'Collares', path: '/catalogo?category=necklaces' },
  { name: 'Pulseras', path: '/catalogo?category=bracelets' },
  { name: 'Aretes', path: '/catalogo?category=earrings' },
  { name: 'Relojes', path: '/catalogo?category=watches' },
  { name: 'Para ellos', path: '/catalogo?gender=ellos' },
  { name: 'Babys', path: '/catalogo?gender=babys' }
];

export function Header() {
  const { currentUser, cart, toggleCart } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogoClick = () => {
    // Si está en admin, perfil, checkout o carrito, va al catálogo
    const specialRoutes = ['/admin', '/perfil', '/checkout'];
    const isSpecialRoute = specialRoutes.some(route => location.pathname.startsWith(route));
    
    if (isSpecialRoute) {
      navigate('/catalogo');
    } else {
      navigate('/bienvenida');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalogo?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-[1600px] mx-auto">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <button 
            onClick={handleLogoClick}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5b4c9f] to-[#1a1f3a] flex items-center justify-center">
              <span className="text-white font-bold text-lg">JM</span>
            </div>
            <span className="text-2xl font-semibold text-[#1a1f3a]">Joyas Meliá</span>
          </button>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="text-sm text-[#1a1f3a] hover:text-[#5b4c9f] transition-colors font-medium"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 pr-10 bg-[#f5f5f7] border-0"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#1a1f3a] hover:text-[#5b4c9f]"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* User */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(currentUser ? '/perfil' : '/login')}
              className="text-[#1a1f3a] hover:text-[#5b4c9f]"
            >
              <User className="w-5 h-5" />
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className="relative text-[#1a1f3a] hover:text-[#5b4c9f]"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#5b4c9f] text-white text-xs flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3">
          <button 
            onClick={handleLogoClick}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5b4c9f] to-[#1a1f3a] flex items-center justify-center">
              <span className="text-white font-bold text-sm">JM</span>
            </div>
            <span className="text-lg font-semibold text-[#1a1f3a]">Joyas Meliá</span>
          </button>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(currentUser ? '/perfil' : '/login')}
              className="text-[#1a1f3a]"
            >
              <User className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className="relative text-[#1a1f3a]"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#5b4c9f] text-white text-[10px] flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#1a1f3a]"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed top-16 right-0 w-[260px] max-w-[85vw] bg-white shadow-xl z-50 rounded-l-xl border border-gray-100">
            <div className="px-4 py-3 overflow-y-auto max-h-[70vh]">
              <form onSubmit={handleSearch} className="relative mb-3">
                <Input
                  type="text"
                  placeholder="Buscar joyas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 bg-[#f5f5f7] border-0"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[#1a1f3a]"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>

              <nav className="space-y-2">
                <Link
                  to="/catalogo?gender=ella"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-[#1a1f3a] hover:bg-[#f5f5f7] rounded-lg"
                >
                  Para ellas
                </Link>

                <Link
                  to="/catalogo?gender=ellos"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-[#1a1f3a] hover:bg-[#f5f5f7] rounded-lg"
                >
                  Para ellos
                </Link>

                <Link
                  to="/catalogo?gender=babys"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-[#1a1f3a] hover:bg-[#f5f5f7] rounded-lg"
                >
                  Babys
                </Link>

                </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
