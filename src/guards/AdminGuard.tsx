
import { ReactNode, useEffect } from 'react';
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
  
  // Para debugging
  useEffect(() => {
    if (!user) {
      console.log("AdminGuard: No hay usuario, redirigiendo a", redirectTo);
    } else {
      // Verificamos si el usuario es admin
      const isAdmin = user.email === 'fabricioburning22@gmail.com' || user.email === 'admin@vicar.com';
      console.log("AdminGuard: Usuario existente, es admin?", isAdmin);
    }
  }, [user, redirectTo]);
  
  // Si no hay usuario, redirigir a la página de autenticación
  if (!user) {
    toast({
      title: "Acceso restringido",
      description: "Debe iniciar sesión para acceder al panel de administración",
      variant: "destructive",
    });
    
    // Guardar la ruta a la que el usuario intentaba acceder
    const currentPath = location.pathname + location.search;
    return <Navigate to={redirectTo} state={{ from: currentPath }} replace />;
  }
  
  // Para ahora, verificaremos basado en el email
  // En una aplicación real, esto verificaría los roles desde la base de datos
  const isAdmin = user.email === 'fabricioburning22@gmail.com' || user.email === 'admin@vicar.com';
  
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
