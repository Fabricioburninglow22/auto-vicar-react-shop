
import { useState } from 'react';
import { Search, Bell, Heart, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';
import { useToast } from '@/hooks/use-toast';

export const NavbarSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    if (!user) {
      toast({
        title: "Acceso restringido",
        description: "Necesitas iniciar sesión para buscar productos",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    
    navigate(`/productos?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <form className="relative flex-grow" onSubmit={handleSearch}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input 
        type="text" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Buscar"
        className="w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-vicar-blue focus:border-vicar-blue"
      />
    </form>
  );
};

export const NavbarActionIcons = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRestrictedAction = (path: string, actionName: string) => {
    if (!user) {
      toast({
        title: "Acceso restringido",
        description: `Necesitas iniciar sesión para acceder a ${actionName}`,
        variant: "destructive",
      });
      navigate('/auth');
      return false;
    }
    navigate(path);
    return true;
  };

  return (
    <div className="flex items-center gap-3">
      <button 
        onClick={() => handleRestrictedAction('/notificaciones', 'notificaciones')}
        aria-label="Notificaciones"
        className="text-gray-700 hover:text-vicar-blue transition-colors"
      >
        <Bell className="w-6 h-6" />
      </button>
      <button 
        onClick={() => handleRestrictedAction('/favoritos', 'favoritos')}
        aria-label="Favoritos"
        className="text-gray-700 hover:text-vicar-blue transition-colors"
      >
        <Heart className="w-6 h-6" />
      </button>
      <button 
        onClick={() => handleRestrictedAction('/carrito', 'carrito de compras')}
        aria-label="Carrito de compras" 
        className="relative text-gray-700 hover:text-vicar-blue transition-colors"
      >
        <ShoppingCart className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 bg-vicar-blue text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
          0
        </span>
      </button>
    </div>
  );
};
