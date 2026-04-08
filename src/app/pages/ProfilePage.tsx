import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { User, Package, MapPin, LogOut } from 'lucide-react';
import { mockOrders } from '../data/mock-data';
import { Badge } from '../components/ui/badge';
import { useState } from 'react';
import { Input } from '../components/ui/input';

export function ProfilePage() {
  const { currentUser, logout, updateUser } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userOrders = mockOrders.filter(order => order.userId === currentUser.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Entregado';
      case 'processing':
        return 'En proceso';
      case 'shipped':
        return 'Enviado';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

    const [showEdit, setShowEdit] = useState(false);

    const [formData, setFormData] = useState({
      name: currentUser.name,
      email: currentUser.email,
      phone: currentUser.phone,
      address: currentUser.address
    });
  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-[#1a1f3a]">Mi Perfil</h1>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>

        <Tabs defaultValue="info" className="space-y-6">
          <TabsList className="bg-white">
            <TabsTrigger value="info">
              <User className="w-4 h-4 mr-2" />
              Información
            </TabsTrigger>
            <TabsTrigger value="orders">
              <Package className="w-4 h-4 mr-2" />
              Mis Pedidos
            </TabsTrigger>
            <TabsTrigger value="address">
              <MapPin className="w-4 h-4 mr-2" />
              Dirección
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Información Personal</CardTitle>

                <Button
                  className="bg-[#5b4c9f] hover:bg-[#4a3d85]"
                  onClick={() => setShowEdit(true)}
                >
                  Editar
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Nombre</p>
                    <p className="font-medium text-[#1a1f3a]">{currentUser.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email</p>
                    <p className="font-medium text-[#1a1f3a]">{currentUser.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Teléfono</p>
                    <p className="font-medium text-[#1a1f3a]">{currentUser.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Tipo de cuenta</p>
                    <Badge className={currentUser.isAdmin ? 'bg-[#5b4c9f]' : 'bg-gray-500'}>
                      {currentUser.isAdmin ? 'Administrador' : 'Cliente'}
                    </Badge>
                  </div>
                </div>

                {currentUser.isAdmin && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <Button
                      onClick={() => navigate('/admin')}
                      className="bg-[#5b4c9f] hover:bg-[#4a3d85]"
                    >
                      Ir al Panel de Administrador
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Pedidos</CardTitle>
              </CardHeader>
              <CardContent>
                {userOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No tienes pedidos todavía</p>
                    <Button
                      onClick={() => navigate('/catalogo')}
                      className="bg-[#5b4c9f] hover:bg-[#4a3d85]"
                    >
                      Explorar productos
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold text-[#1a1f3a]">
                              Pedido #{order.id.slice(0, 8).toUpperCase()}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">{order.date}</p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusText(order.status)}
                          </Badge>
                        </div>

                        <div className="space-y-2 mb-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-3 text-sm">
                              <img
                                src={item.product.materials[0].images[0]}
                                alt={item.product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-[#1a1f3a]">{item.product.name}</p>
                                <p className="text-gray-600">Cantidad: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <span className="text-sm text-gray-600">Total</span>
                          <span className="text-lg font-bold text-[#5b4c9f]">
                            ${order.total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="address">
            <Card>
              <CardHeader>
                <CardTitle>Dirección de Envío</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Dirección registrada</p>
                    <p className="font-medium text-[#1a1f3a]">{currentUser.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Teléfono de contacto</p>
                    <p className="font-medium text-[#1a1f3a]">{currentUser.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        {showEdit && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  Editar Información
                </h2>

                <button
                  onClick={() => setShowEdit(false)}
                  className="text-gray-400 text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">

                <Input
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <Input
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                <Input
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />

                <Input
                  placeholder="Dirección"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />

                <Button
                  className="w-full bg-[#5b4c9f]"
                  onClick={() => {
                    updateUser({
                      ...currentUser,
                      ...formData
                    });

                    setShowEdit(false);
                  }}
                >
                  Guardar
                </Button>

              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
