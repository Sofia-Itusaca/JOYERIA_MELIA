import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { mockOrders } from '../data/mock-data';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Package } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { toast } from 'sonner';

export function AdminOrders() {
  const { currentUser } = useApp();
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  useEffect(() => {
    if (currentUser?.role !== "admin") {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (currentUser?.role !== "admin") {
    return null;
  }

  const filteredOrders = selectedStatus === 'all' 
    ? mockOrders 
    : mockOrders.filter(order => order.status === selectedStatus);

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

  const handleStatusChange = (orderId: string, newStatus: string) => {
    toast.success(`Estado del pedido actualizado a: ${getStatusText(newStatus)}`);
  };

  const totalOrders = mockOrders.length;
  const pendingOrders = mockOrders.filter(o => o.status === 'pending').length;
  const processingOrders = mockOrders.filter(o => o.status === 'processing').length;
  const totalRevenue = mockOrders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="max-w-[1600px] mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/admin')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al panel
        </Button>

        <h1 className="text-3xl font-bold text-[#1a1f3a] mb-8">Gestión de Pedidos</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white rounded-lg p-3 md:p-5 shadow-sm text-center">
            <p className="text-xs md:text-sm text-gray-600 leading-tight">
              Total Pedidos
            </p>
            <p className="text-xl md:text-2xl font-bold text-[#1a1f3a] mt-1">
              {totalOrders}
            </p>
          </div>
          <div className="bg-white rounded-lg p-3 md:p-6 shadow-sm text-center">
            <p className="text-xs md:text-sm text-gray-600 leading-tight">Pendientes</p>
            <p className="text-xl md:text-2xl font-bold text-yellow-600 mt-1">{pendingOrders}</p>
          </div>
          <div className="bg-white rounded-lg p-3 md:p-6 shadow-sm text-center">
            <p className="text-xs md:text-sm text-gray-600 leading-tight">En Proceso</p>
            <p className="text-xl md:text-2xl font-bold text-blue-600 mt-1">{processingOrders}</p>
          </div>
          <div className="bg-white rounded-lg p-3 md:p-6 shadow-sm text-center">
            <p className="text-xs md:text-sm text-gray-600 leading-tight">Ingresos Totales</p>
            <p className="text-xl md:text-2xl font-bold text-[#5b4c9f] mt-1">
              ${totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-3 items-center">

            <div className="flex-1 relative w-full">
              <input
                type="text"
                placeholder="Buscar por ID, cliente..."
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="font-medium text-[#1a1f3a] whitespace-nowrap">
                Filtrar:
              </label>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="processing">En proceso</SelectItem>
                  <SelectItem value="shipped">Enviados</SelectItem>
                  <SelectItem value="delivered">Entregados</SelectItem>
                  <SelectItem value="cancelled">Cancelados</SelectItem>
                </SelectContent>
              </Select>

            </div>

          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center shadow-sm">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No hay pedidos con este estado</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-[#1a1f3a] mb-1">
                          Pedido #{order.id.slice(0, 8).toUpperCase()}
                        </h3>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>

                    {/* Customer Info */}
                    <div className="grid md:grid-cols-3 gap-4 mb-4 p-4 bg-[#f5f5f7] rounded-lg">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Cliente</p>
                        <p className="font-medium text-[#1a1f3a]">{order.userName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Teléfono</p>
                        <p className="font-medium text-[#1a1f3a]">{order.userPhone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Dirección</p>
                        <p className="font-medium text-[#1a1f3a]">{order.userAddress}</p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-[#1a1f3a]">Productos</h4>
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <img
                            src={item.product.materials[0].images[0]}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-[#1a1f3a]">{item.product.name}</p>
                            <p className="text-sm text-gray-600 capitalize">
                              {item.selectedMaterial.replace('-', ' ')}
                              {item.selectedSize && ` • Talla ${item.selectedSize}`}
                              {item.selectedLength && ` • ${item.selectedLength}cm`}
                            </p>
                            <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-[#5b4c9f]">
                            ${(item.product.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="lg:w-64 space-y-4">
                    <div className="p-4 bg-[#f5f5f7] rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Total del pedido</p>
                      <p className="text-2xl font-bold text-[#5b4c9f]">
                        ${order.total.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-[#1a1f3a] mb-2 block">
                        Cambiar estado
                      </label>
                      <Select
                        defaultValue={order.status}
                        onValueChange={(value) => handleStatusChange(order.id, value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendiente</SelectItem>
                          <SelectItem value="processing">En proceso</SelectItem>
                          <SelectItem value="shipped">Enviado</SelectItem>
                          <SelectItem value="delivered">Entregado</SelectItem>
                          <SelectItem value="cancelled">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button variant="outline" className="w-full">
                      Ver detalles completos
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
