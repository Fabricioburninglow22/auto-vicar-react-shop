
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity?: number;
}

interface ShoppingContextType {
  cartItems: Product[];
  favorites: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  toggleFavorite: (product: Product) => boolean;
  isInFavorites: (productId: string) => boolean;
  cartCount: number;
  favoritesCount: number;
}

const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined);

export const useShoppingContext = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error('useShoppingContext must be used within a ShoppingProvider');
  }
  return context;
};

interface ShoppingProviderProps {
  children: ReactNode;
}

export const ShoppingProvider = ({ children }: ShoppingProviderProps) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  // Initialize cart and favorites when user is authenticated
  useEffect(() => {
    if (user) {
      // This is a simplified approach. In a real app, you'd load from database
      // For now, we'll use localStorage to persist the data
      const storedCart = localStorage.getItem(`cart_${user.id}`);
      const storedFavorites = localStorage.getItem(`favorites_${user.id}`);
      
      if (storedCart) {
        try {
          setCartItems(JSON.parse(storedCart));
        } catch (error) {
          console.error('Error parsing cart items from localStorage', error);
        }
      }
      
      if (storedFavorites) {
        try {
          setFavorites(JSON.parse(storedFavorites));
        } catch (error) {
          console.error('Error parsing favorites from localStorage', error);
        }
      }
    } else {
      // Clear when logged out
      setCartItems([]);
      setFavorites([]);
    }
  }, [user]);

  // Save to localStorage when cart or favorites change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const addToCart = (product: Product) => {
    if (!user) return;
    
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    toast({
      title: "Añadido al carrito",
      description: product.name,
    });
  };

  const removeFromCart = (productId: string) => {
    if (!user) return;
    
    setCartItems(prevItems => 
      prevItems.filter(item => item.id !== productId)
    );
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (!user || quantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleFavorite = (product: Product): boolean => {
    if (!user) return false;
    
    const isFavorite = favorites.some(item => item.id === product.id);
    
    if (isFavorite) {
      setFavorites(prevFavorites => 
        prevFavorites.filter(item => item.id !== product.id)
      );
      return false;
    } else {
      setFavorites(prevFavorites => [...prevFavorites, product]);
      toast({
        title: "Añadido a favoritos",
        description: product.name,
      });
      return true;
    }
  };

  const isInFavorites = (productId: string) => {
    return favorites.some(item => item.id === productId);
  };

  // Calculate counts
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  const favoritesCount = favorites.length;

  return (
    <ShoppingContext.Provider value={{
      cartItems,
      favorites,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      toggleFavorite,
      isInFavorites,
      cartCount,
      favoritesCount,
    }}>
      {children}
    </ShoppingContext.Provider>
  );
};
