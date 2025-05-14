
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Components
import { Navbar, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  order_number: string;
  items_count: number;
}

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      
      // Este es un ejemplo. En una implementación real, recuperaríamos órdenes desde la base de datos
      // Aquí simulamos datos de ejemplo
      const mockOrders: Order[] = [
        {
          id: '1',
          created_at: new Date(2024, 3, 15).toISOString(),
          status: 'completed',
          total: 320.50,
          order_number: 'OC-2024-001',
          items_count: 3
        },
        {
          id: '2',
          created_at: new Date(2024, 4, 5).toISOString(),
          status: 'processing',
          total: 120.75,
          order_number: 'OC-2024-002',
          items_count: 1
        },
        {
          id: '3',
          created_at: new Date(2024, 4, 10).toISOString(),
          status: 'pending',
          total: 450.00,
          order_number: 'OC-2024-003',
          items_count: 2
        }
      ];
      
      // Simulamos tiempo de carga
      setTimeout(() => {
        setOrders(mockOrders);
        setIsLoading(false);
      }, 500);
      
    } catch (error: any) {
      console.error('Error fetching orders:', error.message);
      toast({
        title: "Error",
        description: "No se pudieron cargar tus órdenes",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  // Función para devolver el color de la insignia según el estado
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'processing':
        return 'outline';
      case 'pending':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  // Traducir el estado
  const translateStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      'completed': 'Completado',
      'processing': 'En proceso',
      'pending': 'Pendiente',
      'cancelled': 'Cancelado'
    };
    
    return statusMap[status] || status;
  };

  // Formatear fecha
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy', { locale: es });
    } catch (e) {
      return dateString;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar categories={[]} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Mis Órdenes</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Navegación</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => navigate('/mi-perfil')}
                  >
                    Mi Perfil
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start font-medium"
                    onClick={() => navigate('/mis-ordenes')}
                  >
                    Mis Órdenes
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => navigate('/favoritos')}
                  >
                    Favoritos
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Historial de órdenes</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-8">
                      <p>Cargando órdenes...</p>
                    </div>
                  ) : orders.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Orden</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.order_number}</TableCell>
                            <TableCell>{formatDate(order.created_at)}</TableCell>
                            <TableCell>
                              <Badge variant={getStatusBadgeVariant(order.status)}>
                                {translateStatus(order.status)}
                              </Badge>
                            </TableCell>
                            <TableCell>S/ {order.total.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  toast({
                                    title: "Vista de detalle",
                                    description: `Viendo orden: ${order.order_number}`
                                  });
                                }}
                              >
                                Ver detalles
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No tienes órdenes registradas</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => navigate('/productos')}
                      >
                        Explorar productos
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Orders;
