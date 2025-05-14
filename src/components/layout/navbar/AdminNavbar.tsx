
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminNavbar = () => {
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
  
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/admin" className="flex items-center">
          <LayoutDashboard className="h-6 w-6 text-vicar-blue mr-2" />
          <span className="font-bold text-xl text-vicar-blue">VICAR ADMIN</span>
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-gray-600 hover:text-vicar-blue">
            Ver tienda
          </Link>
          
          <button
            onClick={handleLogout}
            className="flex items-center text-red-600 hover:text-red-800"
          >
            <LogOut className="h-4 w-4 mr-1" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
