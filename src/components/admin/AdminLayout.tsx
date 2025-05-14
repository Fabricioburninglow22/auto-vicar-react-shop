
import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from '@/components/layout/navbar/AdminNavbar';
import { useToast } from '@/hooks/use-toast';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Validación mejorada para administradores
  useEffect(() => {
    // Solo permitir acceso a administradores
    if (!user) {
      console.log("No hay usuario autenticado, redirigiendo a /auth");
      toast({
        title: "Acceso restringido",
        description: "Debe iniciar sesión para acceder al panel de administración",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }
    
    // Para mayor seguridad, hacer esto en el lado del cliente y también en el servidor (via AdminGuard)
    const isAdmin = user.email === 'fabricioburning22@gmail.com' || user.email === 'admin@vicar.com';
    
    if (!isAdmin) {
      console.log("Usuario no es administrador, redirigiendo a /");
      toast({
        title: "Acceso restringido",
        description: "No tiene permisos para acceder al panel de administración",
        variant: "destructive"
      });
      navigate('/');
      return;
    }
    
    console.log("Usuario administrador validado correctamente");
  }, [user, navigate, toast]);

  // Si el usuario no está autenticado o no es administrador, no renderizar el layout
  if (!user || !(user.email === 'fabricioburning22@gmail.com' || user.email === 'admin@vicar.com')) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
          <main className="py-6 px-4 sm:px-6 lg:px-8 min-h-screen">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
