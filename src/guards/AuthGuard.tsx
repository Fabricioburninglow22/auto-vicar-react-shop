
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';
import { useToast } from '@/hooks/use-toast';

interface AuthGuardProps {
  children: ReactNode;
  redirectTo?: string;
}

export const AuthGuard = ({ children, redirectTo = '/auth' }: AuthGuardProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  
  if (!user) {
    toast({
      title: "Acceso restringido",
      description: "Necesitas iniciar sesión para acceder a esta página",
      variant: "destructive",
    });
    
    // Save the path the user was trying to access
    const currentPath = location.pathname + location.search;
    return <Navigate to={redirectTo} state={{ from: currentPath }} replace />;
  }
  
  return <>{children}</>;
};
