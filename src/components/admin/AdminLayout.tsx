
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';
import AdminSidebar from './AdminSidebar';
import { useToast } from '@/hooks/use-toast';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Only allow admin access
  React.useEffect(() => {
    // For now, just check email. In a real app, check role from database
    const isAdmin = user?.email === 'fabricioburning22@gmail.com' || user?.email === 'admin@vicar.com';
    
    if (!user) {
      toast({
        title: "Acceso restringido",
        description: "Debe iniciar sesión para acceder al panel de administración",
        variant: "destructive"
      });
      navigate('/auth');
    } else if (!isAdmin) {
      toast({
        title: "Acceso restringido",
        description: "No tiene permisos para acceder al panel de administración",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [user, navigate, toast]);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <main className="py-6 px-4 sm:px-6 lg:px-8 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
