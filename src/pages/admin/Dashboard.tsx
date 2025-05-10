
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from '@/components/admin/AdminLayout';
import DashboardStats from '@/components/admin/DashboardStats';
import RecentActivity from '@/components/admin/RecentActivity';
import { Package, Tag, Bell, LayoutDashboard, Users, ShoppingBag, Calendar } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>
        
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-7 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="productos" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Productos</span>
            </TabsTrigger>
            <TabsTrigger value="categorias" className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span className="hidden sm:inline">Categorías</span>
            </TabsTrigger>
            <TabsTrigger value="usuarios" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Usuarios</span>
            </TabsTrigger>
            <TabsTrigger value="anuncios" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Anuncios</span>
            </TabsTrigger>
            <TabsTrigger value="banners" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Banners</span>
            </TabsTrigger>
            <TabsTrigger value="carritos" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Pedidos</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="mt-0">
            <DashboardStats />
            
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Actividad Reciente</h2>
              <RecentActivity />
            </div>
          </TabsContent>
          
          <TabsContent value="productos" className="mt-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Administración de Productos</h2>
              <p className="text-gray-500">
                Aquí se mostrarán los productos disponibles en el catálogo y se podrán crear, editar o eliminar productos.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="categorias" className="mt-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Gestión de Categorías</h2>
              <p className="text-gray-500">
                Administra las categorías y subcategorías de productos para organizar el catálogo.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="usuarios" className="mt-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Administración de Usuarios</h2>
              <p className="text-gray-500">
                Gestiona los usuarios de la plataforma y sus roles.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="anuncios" className="mt-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Gestión de Anuncios</h2>
              <p className="text-gray-500">
                Configura los anuncios que aparecerán en la barra superior del sitio.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="banners" className="mt-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Gestión de Banners</h2>
              <p className="text-gray-500">
                Administra los banners promocionales que aparecerán en diferentes secciones del sitio.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="carritos" className="mt-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Gestión de Pedidos</h2>
              <p className="text-gray-500">
                Visualiza y gestiona los pedidos realizados por los clientes.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
