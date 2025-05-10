
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';
import { useToast } from '@/hooks/use-toast';

interface AdminGuardProps {
  children: ReactNode;
  redirectTo?: string;
}

const AdminGuard = ({ children, redirectTo = '/auth' }: AdminGuardProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  
  // For now, we'll use a simple check based on email
  // In a real app, this would check user roles from the database
  const isAdmin = user?.email === 'fabricioburning22@gmail.com' || user?.email === 'admin@vicar.com';
  
  if (!user) {
    toast({
      title: "Acceso restringido",
      description: "Debe iniciar sesión para acceder al panel de administración",
      variant: "destructive",
    });
    
    // Save the path the user was trying to access
    const currentPath = location.pathname + location.search;
    return <Navigate to={redirectTo} state={{ from: currentPath }} replace />;
  }
  
  if (!isAdmin) {
    toast({
      title: "Acceso restringido",
      description: "No tiene permisos para acceder al panel de administración",
      variant: "destructive",
    });
    
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default AdminGuard;
