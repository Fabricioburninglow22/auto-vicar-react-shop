import { useState, useEffect, useRef } from 'react';
import { Search, Bell, Heart, ShoppingCart, Menu, User, X, ChevronLeft, ChevronRight, LogOut, Smartphone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { NavbarSearchBar, NavbarActionIcons } from './NavbarActions';
import { ShoppingProvider } from '@/contexts/ShoppingContext';

interface CategoryType {
  id: string;
  name: string;
  icon: string;
  subcategories: { id: string; name: string }[];
}

interface NavbarProps {
  categories: CategoryType[];
}

const AnnouncementBar = () => {
  const announcements = [
    '¡15% OFF en alarmas Viper este mes!',
    'Envío gratis en compras mayores a S/200',
    'Nueva colección de autoradios Pioneer',
    'Garantía de 1 año en todos nuestros productos',
  ];

  return (
    <div className="bg-vicar-blue text-white py-2 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee-slow">
        {announcements.map((text, index) => (
          <span key={index} className="mx-8 font-medium">{text}</span>
        ))}
        {announcements.map((text, index) => (
          <span key={`repeat-${index}`} className="mx-8 font-medium">{text}</span>
        ))}
      </div>
    </div>
  );
};

const MobileMenu = ({ 
  isOpen, 
  onClose, 
  categories,
  user,
  handleLogout 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  categories: CategoryType[];
  user: any;
  handleLogout: () => void;
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fade-in" onClick={onClose}>
      <div 
        className="fixed top-0 left-0 h-full w-[80%] max-w-xs bg-white shadow-lg animate-slide-right z-50"
        onClick={e => e.stopPropagation()}
      >
        {/* Main Menu */}
        {!activeCategory ? (
          <>
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-bold text-lg">Menú</h2>
              <button onClick={onClose} aria-label="Cerrar menú">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* User Actions */}
            <div className="p-4 border-b">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-vicar-blue text-white flex items-center justify-center font-medium">
                      {user.email?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-gray-100 text-red-500"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              ) : (
                <Link 
                  to="/auth" 
                  className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-gray-100"
                  onClick={onClose}
                >
                  <User className="w-5 h-5" />
                  <span>Acceder / Registrarse</span>
                </Link>
              )}
            </div>
            
            {/* Categories */}
            <div className="p-4 border-b">
              <h3 className="font-medium text-sm text-gray-500 mb-2">Categorías</h3>
              <ul>
                {categories.map(category => (
                  <li key={category.id}>
                    <button 
                      className="flex justify-between items-center w-full py-2 hover:bg-gray-100 px-2 rounded-md"
                      onClick={() => setActiveCategory(category)}
                    >
                      <span className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Quick Links */}
            <div className="p-4">
              <Link 
                to="/productos" 
                className="block py-2 hover:text-vicar-blue" 
                onClick={onClose}
              >
                Catálogo Completo
              </Link>
              <Link 
                to="/favoritos" 
                className="block py-2 hover:text-vicar-blue" 
                onClick={onClose}
              >
                Favoritos
              </Link>
              <Link 
                to="/carrito" 
                className="block py-2 hover:text-vicar-blue" 
                onClick={onClose}
              >
                Carrito/Cotización
              </Link>
              <a 
                href="https://wa.me/51999999999?text=Hola,%20tengo%20una%20consulta%20sobre" 
                className="flex items-center gap-2 mt-4 text-vicar-whatsapp-green font-medium"
                onClick={onClose}
              >
                <span>Consultar vía WhatsApp</span>
              </a>
            </div>
          </>
        ) : (
          // Subcategories menu
          <>
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <button 
                onClick={() => setActiveCategory(null)} 
                className="flex items-center gap-1 text-vicar-blue"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Volver</span>
              </button>
              <button onClick={onClose} aria-label="Cerrar menú">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Category Title */}
            <div className="p-4 border-b">
              <h2 className="font-bold text-lg flex items-center gap-2">
                <span>{activeCategory.icon}</span>
                <span>{activeCategory.name}</span>
              </h2>
            </div>
            
            {/* Subcategories */}
            <div className="p-4">
              <ul>
                {activeCategory.subcategories.map(subcategory => (
                  <li key={subcategory.id}>
                    <Link 
                      to={`/categoria/${activeCategory.id.toLowerCase()}?sub=${subcategory.id}`}
                      className="block py-3 px-2 hover:bg-gray-100 rounded-md" 
                      onClick={onClose}
                    >
                      {subcategory.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Navbar = ({ categories }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
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
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    // Prevent scrolling when mobile menu is open
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && activeDropdown) {
        setActiveDropdown(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeDropdown]);

  // Wrap the NavbarActionIcons with ShoppingProvider to prevent context errors
  const WrappedNavbarActionIcons = () => (
    <ShoppingProvider>
      <NavbarActionIcons />
    </ShoppingProvider>
  );

  return (
    <header className={`sticky top-0 w-full z-40 ${mobileMenuOpen ? 'z-50' : ''}`}>
      <AnnouncementBar />
      
      {/* Mobile Header */}
      <div className="lg:hidden">
        {/* First Row */}
        <div className="flex items-center justify-between px-4 py-3 bg-white shadow-sm">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl">VICAR-PERU</Link>
          
          {/* Menu Trigger */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            className="p-1 hover:bg-gray-100 rounded-md"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          {/* Icons */}
          <WrappedNavbarActionIcons />
        </div>
        
        {/* Second Row */}
        <div className="flex items-center justify-between px-4 py-2 bg-white shadow">
          {/* Search Bar */}
          <div className="relative flex-grow">
            <NavbarSearchBar />
          </div>
          
          {/* WhatsApp Button */}
          <div className="flex items-center gap-2">
            <a 
              href="https://wa.me/51999999999?text=Hola,%20te%20quedaste%20sin%20batería?"
              className="ml-3 flex items-center justify-center bg-vicar-whatsapp-light text-vicar-whatsapp-green px-3 py-2 rounded-md font-medium text-sm whitespace-nowrap"
            >
              ¿Te quedaste sin batería?
            </a>
            <a 
              href="https://wa.me/51999999999"
              aria-label="Contactar por WhatsApp"
              className="flex items-center justify-center bg-vicar-whatsapp-green p-2 rounded-full"
            >
              <Smartphone className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Desktop Header */}
      <div className={`hidden lg:block ${isScrolled ? 'shadow-md' : ''}`}>
        {/* First Row */}
        <div className="container mx-auto flex items-center justify-between py-4 px-4 bg-white">
          {/* Logo and Menu */}
          <div className="flex items-center gap-6">
            <Link to="/" className="font-bold text-2xl">VICAR-PERU</Link>
            <button 
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle menu"
              className="p-1 hover:bg-gray-100 rounded-md"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-1/3">
            <NavbarSearchBar />
          </div>
          
          {/* User Actions - Using the wrapped version */}
          <div className="flex items-center gap-5">
            <WrappedNavbarActionIcons />
            
            {user ? (
              <div className="relative group">
                <div className="cursor-pointer flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200">
                  <div className="w-6 h-6 rounded-full bg-vicar-blue text-white flex items-center justify-center font-medium">
                    {user.email?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="font-medium text-sm">{user.email?.split('@')[0]}</span>
                </div>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 invisible group-hover:visible">
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs text-gray-500">
                      {user.email}
                    </div>
                    <div className="border-t border-gray-100"></div>
                    <Link to="/mi-perfil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Mi perfil
                    </Link>
                    <Link to="/mis-ordenes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Mis órdenes
                    </Link>
                    <div className="border-t border-gray-100"></div>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link 
                to="/auth"
                className="bg-vicar-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                ACCEDER
              </Link>
            )}
          </div>
        </div>
        
        {/* Second Row - Categories */}
        <div className="bg-white shadow" ref={dropdownRef}>
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex">
              {categories.map((category) => (
                <div 
                  key={category.id}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(category.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={`/categoria/${category.id.toLowerCase()}`}
                    className={`flex items-center gap-2 px-4 py-3 hover:text-vicar-blue transition-colors ${activeDropdown === category.id ? 'text-vicar-blue' : ''}`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </Link>
                  
                  {/* Dropdown */}
                  {activeDropdown === category.id && (
                    <div className="absolute top-full left-0 bg-white shadow-lg rounded-b-lg p-4 min-w-[200px] z-[9000] animate-fade-in">
                      <div className="grid gap-2">
                        {category.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory.id}
                            to={`/categoria/${category.id.toLowerCase()}?sub=${subcategory.id}`}
                            className="hover:bg-gray-100 px-3 py-2 rounded-md transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {subcategory.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <a 
                href="https://wa.me/51999999999?text=Hola,%20te%20quedaste%20sin%20batería?"
                className="flex items-center gap-2 bg-vicar-whatsapp-light text-vicar-whatsapp-green px-4 py-3 font-medium hover:bg-green-50 transition-colors"
              >
                ¿Te quedaste sin batería?
              </a>
              <a 
                href="https://wa.me/51999999999"
                aria-label="Contactar por WhatsApp"
                className="flex items-center justify-center bg-vicar-whatsapp-green p-2 rounded-full hover:bg-green-600 transition-colors"
              >
                <Smartphone className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        categories={categories}
        user={user}
        handleLogout={handleLogout}
      />
    </header>
  );
};

export default Navbar;
