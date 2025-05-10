
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Package, 
  Tag, 
  Users, 
  Bell, 
  Calendar, 
  ShoppingBag, 
  Heart, 
  Settings, 
  LayoutDashboard, 
  LogOut 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión exitosamente"
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No se pudo cerrar la sesión",
        variant: "destructive"
      });
    }
  };
  
  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Productos', path: '/admin/productos', icon: Package },
    { name: 'Categorías', path: '/admin/categorias', icon: Tag },
    { name: 'Usuarios', path: '/admin/usuarios', icon: Users },
    { name: 'Anuncios', path: '/admin/anuncios', icon: Bell },
    { name: 'Banners', path: '/admin/banners', icon: Calendar },
    { name: 'Pedidos', path: '/admin/pedidos', icon: ShoppingBag },
    { name: 'Favoritos', path: '/admin/favoritos', icon: Heart },
    { name: 'Configuración', path: '/admin/configuracion', icon: Settings },
  ];
  
  // This function checks if the current path matches the menu item path
  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') {
      return true;
    }
    if (path !== '/admin' && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };
  
  return (
    <aside className="w-64 bg-white shadow-md h-screen">
      <div className="p-4 border-b">
        <Link to="/" className="flex items-center">
          <span className="font-bold text-xl text-vicar-blue">VICAR-PERU</span>
        </Link>
      </div>
      
      <div className="py-4">
        <div className="px-4 mb-4">
          <div className="text-xs uppercase text-gray-500 font-semibold">Administración</div>
        </div>
        
        <nav>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-gray-700 ${
                isActive(item.path) 
                  ? 'bg-blue-50 text-vicar-blue border-r-4 border-vicar-blue' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.name}</span>
            </Link>
          ))}
          
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-3 text-red-600 hover:bg-gray-100 w-full text-left"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>Cerrar sesión</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
