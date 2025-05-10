
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, ArrowUpDown, Eye } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const AdminOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Mock order data - in a real app, this would come from the backend
  const mockOrders = [
    {
      id: 'ORD-001',
      customer: 'Juan Pérez',
      email: 'juan@example.com',
      date: '2024-05-09T14:30:00Z',
      items: 3,
      total: 899.97,
      status: 'pending',
      whatsappSent: true
    },
    {
      id: 'ORD-002',
      customer: 'María Rodríguez',
      email: 'maria@example.com',
      date: '2024-05-08T10:15:00Z',
      items: 2,
      total: 1249.98,
      status: 'processed',
      whatsappSent: true
    },
    {
      id: 'ORD-003',
      customer: 'Carlos Gómez',
      email: 'carlos@example.com',
      date: '2024-05-07T16:45:00Z',
      items: 1,
      total: 499.99,
      status: 'completed',
      whatsappSent: true
    },
    {
      id: 'ORD-004',
      customer: 'Ana Sánchez',
      email: 'ana@example.com',
      date: '2024-05-06T09:20:00Z',
      items: 4,
      total: 1899.96,
      status: 'cancelled',
      whatsappSent: false
    }
  ];

  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('es-PE', options);
  };

  // Function to get status badge style
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pendiente</Badge>;
      case 'processed':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Procesado</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Completado</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Cancelado</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  // Filter orders based on status
  const filteredOrders = statusFilter === 'all' 
    ? mockOrders 
    : mockOrders.filter(order => order.status === statusFilter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Pedidos</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="text-3xl font-bold">{mockOrders.length}</div>
              <div className="text-gray-500">Total de Pedidos</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="text-3xl font-bold">
                {mockOrders.filter(o => o.status === 'pending').length}
              </div>
              <div className="text-gray-500">Pendientes</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="text-3xl font-bold">
                {mockOrders.filter(o => o.status === 'processed' || o.status === 'completed').length}
              </div>
              <div className="text-gray-500">Procesados</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="text-3xl font-bold">
                S/ {mockOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
              </div>
              <div className="text-gray-500">Valor Total</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            type="text"
            placeholder="Buscar por ID o cliente"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select 
          value={statusFilter} 
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="pending">Pendientes</SelectItem>
            <SelectItem value="processed">Procesados</SelectItem>
            <SelectItem value="completed">Completados</SelectItem>
            <SelectItem value="cancelled">Cancelados</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Más Filtros
        </Button>
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                  <div className="flex items-center">
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>
                  <div className="flex items-center">
                    Fecha
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Artículos</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>WhatsApp</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(order.date)}</TableCell>
                  <TableCell>{order.items} items</TableCell>
                  <TableCell>S/ {order.total.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>
                    {order.whatsappSent ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Enviado</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">No enviado</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrders;
