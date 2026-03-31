import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/mock-data';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ShoppingCart, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';

const categories = [
  { value: 'all', label: 'Todos' },
  { value: 'rings', label: 'Anillos' },
  { value: 'necklaces', label: 'Collares' },
  { value: 'bracelets', label: 'Pulseras' },
  { value: 'earrings', label: 'Aretes' },
  { value: 'watches', label: 'Relojes' }
];

const genderFilters = [
  { value: 'all', label: 'Todos' },
  { value: 'ella', label: 'Para Ella' },
  { value: 'ellos', label: 'Para Ellos' },
  { value: 'babys', label: 'Babys' }
];

const materialFilters = [
  { value: 'all', label: 'Todos' },
  { value: 'gold', label: 'Oro' },
  { value: 'silver', label: 'Plata' },
  { value: 'stainless-steel', label: 'Acero Inoxidable' },
  { value: 'copper', label: 'Cobre' },
  { value: 'bronze', label: 'Bronce' },
  { value: 'rose-gold', label: 'Oro Rosa' },
  { value: 'gems', label: 'Gemas' }
];

export function CatalogPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useApp();
  
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedGender, setSelectedGender] = useState(searchParams.get('gender') || 'all');
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [showFilter, setShowFilter] = useState(false);
  const [filterStep, setFilterStep] = useState(1);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      if (!product.active) return false;
      
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      
      if (selectedGender !== 'all' && product.targetGender !== selectedGender) {
        return false;
      }
      
      if (selectedMaterial !== 'all') {
        const hasMaterial = product.materials.some(m => m.type === selectedMaterial);
        if (!hasMaterial) return false;
      }
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return product.name.toLowerCase().includes(query) || 
              product.description.toLowerCase().includes(query);
      }
      
      return true;
    });
  }, [selectedCategory, selectedGender, selectedMaterial, searchQuery]);

  const handleAddToCart = (product: Product) => {
    const defaultMaterial = product.materials[0].type;
    addToCart(product, defaultMaterial);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="max-w-[1600px] mx-auto px-4 py-3">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Filters Sidebar */}
          <aside className="space-y-6 lg:block hidden">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[#1a1f3a] mb-4">Buscar</h2>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[#1a1f3a] mb-4">Categoría</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === category.value
                        ? 'bg-[#5b4c9f] text-white'
                        : 'hover:bg-[#f5f5f7] text-[#1a1f3a]'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[#1a1f3a] mb-4">Para Quién</h2>
              <div className="space-y-2">
                {genderFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setSelectedGender(filter.value)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedGender === filter.value
                        ? 'bg-[#5b4c9f] text-white'
                        : 'hover:bg-[#f5f5f7] text-[#1a1f3a]'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[#1a1f3a] mb-4">Material</h2>
              <div className="space-y-2">
                {materialFilters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setSelectedMaterial(filter.value)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedMaterial === filter.value
                        ? 'bg-[#5b4c9f] text-white'
                        : 'hover:bg-[#f5f5f7] text-[#1a1f3a]'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div>
            {/* Mobile Filters */}
            <div className="lg:hidden mb-3 space-y-2">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.slice(1).map((category) => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`whitespace-nowrap ${selectedCategory === category.value ? 'bg-[#5b4c9f] hover:bg-[#4a3d85]' : ''}`}
                    size="sm"
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <h1 className="text-2xl font-bold text-[#1a1f3a]">
                {filteredProducts.length} Productos
              </h1>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center shadow-sm">
                <p className="text-gray-500 text-lg">No se encontraron productos</p>
                <Button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedGender('all');
                    setSelectedMaterial('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 bg-[#5b4c9f] hover:bg-[#4a3d85]"
                >
                  Limpiar filtros
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => {
                  const mainImage = product.materials[0].images[0];
                  
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-300 group"
                    >
                      <button
                        onClick={() => navigate(`/producto/${product.id}`)}
                        className="w-full"
                      >
                        <div className="aspect-square md:aspect-square overflow-hidden bg-[#f5f5f7]">
                          <img
                            src={mainImage}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      </button>
                      
                      <div className="p-2">
                        <button
                          onClick={() => navigate(`/producto/${product.id}`)}
                          className="w-full text-left"
                        >
                          <h3 className="text-xs font-medium text-[#1a1f3a] mb-1 group-hover:text-[#5b4c9f] transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                        </button>
                        
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm font-semibold text-[#5b4c9f]">
                            ${product.price.toLocaleString()}
                          </p>
                          
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(product)}
                            className="bg-[#5b4c9f] hover:bg-[#4a3d85] text-white"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </Button>
                        </div>

                        <p className="text-[10px] text-gray-400 mt-1">
                          Vendido {product.soldCount} veces
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
          {/* Floating Filter Button */}
      <div className="lg:hidden fixed bottom-20 left-1/2 -translate-x-1/2 z-50">
              <Button
        onClick={() => {
          if (
            selectedCategory !== "all" ||
            selectedMaterial !== "all" ||
            selectedGender !== "all"
          ) {
            setSelectedCategory("all");
            setSelectedMaterial("all");
            setSelectedGender("all");
          } else {
            setFilterStep(1);
            setShowFilter(true);
          }
        }}
        className="bg-[#5b4c9f] hover:bg-[#4a3d85] text-white px-6 py-2 rounded-full shadow-lg"
      >
        {selectedCategory !== "all" ||
        selectedMaterial !== "all" ||
        selectedGender !== "all"
          ? "Limpiar filtro"
          : "Filtrar"}
      </Button>
      </div>
      {showFilter && (
      <div className="fixed inset-0 z-50 flex items-end pb-10">
        
        {/* Background */}
        <div 
          className="absolute inset-0 bg-black/40"
          onClick={() => setShowFilter(false)}
        />

        {/* Panel */}
        <div className="relative bg-white w-full rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto transition-transform duration-300">
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              Filtrar productos
            </h2>

            <button
              onClick={() => setShowFilter(false)}
              className="text-gray-500 text-xl"
            >
              ✕
            </button>
          </div>

          {filterStep === 1 && (
            <div className="grid grid-cols-3 gap-3">
              {categories.slice(1).map((category) => (
                <button
                  key={category.value}
                  onClick={() => {
                    setSelectedCategory(category.value);
                    setTimeout(() => setFilterStep(2), 300);
                  }}
                  className={`p-3 rounded-full text-sm border transition-all
                  ${
                  selectedCategory === category.value
                  ? "bg-[#5b4c9f] text-white border-[#5b4c9f]"
                  : "bg-white border-gray-300 hover:border-[#5b4c9f]"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          )}

          {filterStep === 2 && (
            <div className="grid grid-cols-3 gap-3">
              {materialFilters.slice(1).map((material) => (
                <button
                  key={material.value}
                  onClick={() => {
                    setSelectedMaterial(material.value);
                    setTimeout(() => setFilterStep(3), 300);
                  }}
                  className={`p-3 rounded-full text-sm border transition-all
                  ${
                    selectedMaterial === material.value
                    ? "bg-[#5b4c9f] text-white border-[#5b4c9f]"
                    : "bg-white border-gray-300 hover:border-[#5b4c9f]"
                  }`}
                >
                  {material.label}
                </button>
              ))}
            </div>
          )}

          {filterStep === 3 && (
            <div className="grid grid-cols-2 gap-3">
              {genderFilters.map((gender) => (
                <button
                  key={gender.value}
                  onClick={() => {
                    setSelectedGender(gender.value);
                    setTimeout(() => {
                      setShowFilter(false);
                      setFilterStep(1);
                    }, 300);
                  }}
                  className={`p-3 rounded-full text-sm border transition-all
                  ${
                    selectedGender === gender.value
                    ? "bg-[#5b4c9f] text-white border-[#5b4c9f]"
                    : "bg-white border-gray-300 hover:border-[#5b4c9f]"
                  }`}
                >
                  {gender.label}
                </button>
              ))}
            </div>
          )}

        </div>
      </div>
    )}
    </div>
  );
}