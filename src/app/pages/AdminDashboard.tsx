import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { mockProducts } from '../data/mock-data';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Search, Plus, Eye, ArrowLeft } from 'lucide-react';

const categories = [
  { value: 'all', label: 'Todos' },
  { value: 'rings', label: 'Anillos' },
  { value: 'necklaces', label: 'Collares' },
  { value: 'bracelets', label: 'Pulseras' },
  { value: 'earrings', label: 'Aretes' },
  { value: 'watches', label: 'Relojes' }
];

export function AdminDashboard() {
  const { currentUser } = useApp();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (!currentUser?.isAdmin) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return product.name.toLowerCase().includes(query) || 
               product.id.toLowerCase().includes(query);
      }
      
      return true;
    });
  }, [searchQuery, selectedCategory]);

  if (!currentUser?.isAdmin) {
    return null;
  }

  const totalProducts = mockProducts.length;
  const activeProducts = mockProducts.filter(p => p.active).length;
  const totalSold = mockProducts.reduce((sum, p) => sum + p.soldCount, 0);
  const totalInventoryValue = mockProducts.reduce((sum, p) => sum + (p.price * p.stock), 0);

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate('/perfil')}
              className="mb-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al perfil
            </Button>
            <h1 className="text-3xl font-bold text-[#1a1f3a]">Panel de Administrador</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => navigate('/admin/sobre-nosotros')}
              variant="outline"
            >
              Editar Información
            </Button>
            <Button
              onClick={() => navigate('/admin/pedidos')}
              variant="outline"
            >
              Ver Pedidos
            </Button>
            <Button 
              onClick={() => navigate('/admin/crear-producto')}
              className="bg-[#5b4c9f] hover:bg-[#4a3d85]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Producto
            </Button>
          </div>
        </div>
        

        {/* Stats Cards */}
        <div className="grid grid-cols-4 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white rounded-lg p-3 md:p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Total Productos</p>
            <p className="text-3xl font-bold text-[#1a1f3a]">{totalProducts}</p>
          </div>
          <div className="bg-white rounded-lg p-3 md:p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Productos Activos</p>
            <p className="text-3xl font-bold text-green-600">{activeProducts}</p>
          </div>
          <div className="bg-white rounded-lg p-3 md:p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Total Vendidos</p>
            <p className="text-3xl font-bold text-[#5b4c9f]">{totalSold}</p>
          </div>
          <div className="bg-white rounded-lg p-3 md:p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Valor Inventario</p>
            <p className="text-3xl font-bold text-[#1a1f3a]">
              ${totalInventoryValue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por nombre o ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.value)}
                  className={selectedCategory === category.value ? 'bg-[#5b4c9f] hover:bg-[#4a3d85]' : ''}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Imagen</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Ventas</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} className="hover:bg-[#f5f5f7]">
                    <TableCell>
                      <img
                        src={product.materials[0].images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium text-[#1a1f3a]">
                      {product.name}
                    </TableCell>
                    <TableCell className="capitalize">
                      {product.category.replace('-', ' ')}
                    </TableCell>
                    <TableCell className="font-semibold text-[#5b4c9f]">
                      ${product.price.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <span className={product.stock < 10 ? 'text-red-600 font-semibold' : ''}>
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell>{product.soldCount}</TableCell>
                    <TableCell>
                      <Badge className={product.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {product.active ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/admin/producto/${product.id}`)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No se encontraron productos</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}