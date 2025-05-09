
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';
import { useToast } from '@/hooks/use-toast';

export const useProductInteraction = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const requireAuth = (actionName: string): boolean => {
    if (!user) {
      toast({
        title: "Acceso restringido",
        description: `Necesitas iniciar sesión para ${actionName}`,
        variant: "destructive",
      });
      navigate('/auth');
      return false;
    }
    return true;
  };
  
  const addToFavorites = (productId: string, productName: string) => {
    if (requireAuth('añadir productos a favoritos')) {
      // Here would go the actual logic to add to favorites
      toast({
        title: "Añadido a favoritos",
        description: productName,
      });
    }
  };
  
  const addToCart = (productId: string, productName: string) => {
    if (requireAuth('añadir productos al carrito')) {
      // Here would go the actual logic to add to cart
      toast({
        title: "Añadido al carrito",
        description: productName,
      });
    }
  };
  
  const navigateToProduct = (productId: string) => {
    if (requireAuth('ver detalles del producto')) {
      navigate(`/producto/${productId}`);
    }
  };
  
  const navigateToCatalog = (filters?: Record<string, string>) => {
    if (requireAuth('acceder al catálogo')) {
      const queryParams = filters ? 
        '?' + Object.entries(filters)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&') 
        : '';
      
      navigate(`/productos${queryParams}`);
    }
  };
  
  return {
    addToFavorites,
    addToCart,
    navigateToProduct,
    navigateToCatalog,
    requireAuth
  };
};
