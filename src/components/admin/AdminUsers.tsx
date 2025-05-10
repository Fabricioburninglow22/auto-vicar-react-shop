
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, MoreHorizontal, Check, X } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminUsers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock user data - in a real app, this would come from the backend
  const mockUsers = [
    {
      id: '1',
      email: 'admin@vicar.com',
      name: 'Admin Vicar',
      role: 'admin',
      status: 'active',
      lastLogin: '2024-05-09T14:30:00Z'
    },
    {
      id: '2',
      email: 'superuser@example.com',
      name: 'Super Usuario',
      role: 'superuser',
      status: 'active',
      lastLogin: '2024-05-09T10:15:00Z'
    },
    {
      id: '3',
      email: 'cliente1@example.com',
      name: 'Cliente Uno',
      role: 'customer',
      status: 'active',
      lastLogin: '2024-05-08T18:45:00Z'
    },
    {
      id: '4',
      email: 'cliente2@example.com',
      name: 'Cliente Dos',
      role: 'customer',
      status: 'inactive',
      lastLogin: '2024-04-25T09:20:00Z'
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

  // Function to get role badge style
  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'superuser':
        return 'bg-purple-100 text-purple-800';
      case 'customer':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Usuarios</h2>
        <Button className="bg-vicar-blue">
          Invitar Usuario
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="text-3xl font-bold">{mockUsers.length}</div>
              <div className="text-gray-500">Usuarios Totales</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="text-3xl font-bold">{mockUsers.filter(u => u.role === 'admin').length}</div>
              <div className="text-gray-500">Administradores</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="text-3xl font-bold">{mockUsers.filter(u => u.role === 'superuser').length}</div>
              <div className="text-gray-500">Superusuarios</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <div className="text-3xl font-bold">{mockUsers.filter(u => u.role === 'customer').length}</div>
              <div className="text-gray-500">Clientes</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            type="text"
            placeholder="Buscar por nombre o correo"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filtros
        </Button>
      </div>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Último Acceso</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeStyle(user.role)}`}>
                      {user.role === 'admin' ? 'Administrador' : 
                       user.role === 'superuser' ? 'Superusuario' : 'Cliente'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {user.status === 'active' ? (
                        <>
                          <Check className="h-4 w-4 text-green-500 mr-1" />
                          <span>Activo</span>
                        </>
                      ) : (
                        <>
                          <X className="h-4 w-4 text-red-500 mr-1" />
                          <span>Inactivo</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(user.lastLogin)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
                        {user.role === 'customer' && <DropdownMenuItem>Promover a Superusuario</DropdownMenuItem>}
                        <DropdownMenuItem>Cambiar Contraseña</DropdownMenuItem>
                        <DropdownMenuItem className={user.status === 'active' ? 'text-red-600' : 'text-green-600'}>
                          {user.status === 'active' ? 'Desactivar Usuario' : 'Activar Usuario'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default AdminUsers;
