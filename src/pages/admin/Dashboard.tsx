
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminLayout from '@/components/admin/AdminLayout';
import DashboardStats from '@/components/admin/DashboardStats';
import RecentActivity from '@/components/admin/RecentActivity';
import { Package, Tag, Bell, LayoutDashboard, Users, ShoppingBag, Heart, Calendar, Settings } from 'lucide-react';
import AdminProducts from '@/components/admin/AdminProducts';
import AdminCategories from '@/components/admin/AdminCategories';
import AdminUsers from '@/components/admin/AdminUsers';
import AdminAnnouncements from '@/components/admin/AdminAnnouncements';
import AdminBanners from '@/components/admin/AdminBanners';
import AdminOrders from '@/components/admin/AdminOrders';
import AdminFavorites from '@/components/admin/AdminFavorites';
import AdminSettings from '@/components/admin/AdminSettings';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract the active tab from the URL path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/admin') return 'dashboard';
    if (path.includes('/admin/productos')) return 'productos';
    if (path.includes('/admin/categorias')) return 'categorias';
    if (path.includes('/admin/usuarios')) return 'usuarios';
    if (path.includes('/admin/anuncios')) return 'anuncios';
    if (path.includes('/admin/banners')) return 'banners';
    if (path.includes('/admin/pedidos')) return 'pedidos';
    if (path.includes('/admin/favoritos')) return 'favoritos';
    if (path.includes('/admin/configuracion')) return 'configuracion';
    return 'dashboard';
  };
  
  const [activeTab, setActiveTab] = useState(getActiveTab());
  
  // Update the active tab when the location changes
  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location.pathname]);
  
  // Update the URL when the active tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    switch (value) {
      case 'dashboard':
        navigate('/admin');
        break;
      default:
        navigate(`/admin/${value}`);
        break;
    }
  };
  
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 mb-8">
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
            <TabsTrigger value="pedidos" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Pedidos</span>
            </TabsTrigger>
            <TabsTrigger value="favoritos" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Favoritos</span>
            </TabsTrigger>
            <TabsTrigger value="configuracion" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Config.</span>
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
            <AdminProducts />
          </TabsContent>
          
          <TabsContent value="categorias" className="mt-0">
            <AdminCategories />
          </TabsContent>
          
          <TabsContent value="usuarios" className="mt-0">
            <AdminUsers />
          </TabsContent>
          
          <TabsContent value="anuncios" className="mt-0">
            <AdminAnnouncements />
          </TabsContent>
          
          <TabsContent value="banners" className="mt-0">
            <AdminBanners />
          </TabsContent>
          
          <TabsContent value="pedidos" className="mt-0">
            <AdminOrders />
          </TabsContent>
          
          <TabsContent value="favoritos" className="mt-0">
            <AdminFavorites />
          </TabsContent>
          
          <TabsContent value="configuracion" className="mt-0">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
