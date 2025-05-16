
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Components
import { Navbar, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from "@/components/ui/skeleton";

interface Order {
  id: string;
  created_at: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  order_number: string;
}

// Mock data for orders until we implement the real orders table
const mockOrders: Order[] = [
  {
    id: '1',
    created_at: '2025-05-10T12:00:00Z',
    status: 'delivered',
    total_amount: 152.50,
    order_number: 'ORD-2025-0001'
  },
  {
    id: '2',
    created_at: '2025-05-05T15:30:00Z',
    status: 'shipped',
    total_amount: 87.25,
    order_number: 'ORD-2025-0002'
  },
  {
    id: '3',
    created_at: '2025-04-28T09:15:00Z',
    status: 'processing',
    total_amount: 210.00,
    order_number: 'ORD-2025-0003'
  }
];

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In the future, replace this with actual order data from Supabase
    const fetchOrders = async () => {
      try {
        // Simulate network delay
        setTimeout(() => {
          setOrders(mockOrders);
          setIsLoading(false);
        }, 1000);
        
        // When we have a real orders table, use this:
        // const { data, error } = await supabase
        //   .from('orders')
        //   .select('*')
        //   .eq('user_id', user?.id)
        //   .order('created_at', { ascending: false });
        
        // if (error) throw error;
        // setOrders(data || []);
      } catch (error: any) {
        console.error('Error fetching orders:', error.message);
        toast({
          title: "Error",
          description: "No se pudieron cargar tus órdenes",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusBadge = (status: Order['status']) => {
    switch(status) {
      case 'pending':
        return <Badge variant="outline">Pendiente</Badge>;
      case 'processing':
        return <Badge variant="secondary">Procesando</Badge>;
      case 'shipped':
        return <Badge variant="default">Enviado</Badge>;
      case 'delivered':
        return <Badge variant="default" className="bg-green-600">Entregado</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
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
        <div className="max-w-5xl mx-auto">
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
                    className="w-full justify-start" 
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
                  <CardTitle>Historial de Pedidos</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  ) : orders.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Número de Orden</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Monto</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>{order.order_number}</TableCell>
                            <TableCell>{formatDate(order.created_at)}</TableCell>
                            <TableCell>S/ {order.total_amount.toFixed(2)}</TableCell>
                            <TableCell>{getStatusBadge(order.status)}</TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  // Future: navigate to order details
                                  toast({
                                    title: "Próximamente",
                                    description: "Detalles del pedido estará disponible pronto"
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
                      <p className="text-muted-foreground">No tienes órdenes recientes</p>
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
