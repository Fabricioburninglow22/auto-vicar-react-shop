
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthProvider';
import { useToast } from '@/hooks/use-toast';

// Components
import AnnouncementBar from './AnnouncementBar';
import MobileMenu from './MobileMenu';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

interface CategoryType {
  id: string;
  name: string;
  icon: string;
  subcategories: { id: string; name: string }[];
}

interface NavbarProps {
  categories: CategoryType[];
}

const Navbar = ({ categories }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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

  return (
    <header className={`sticky top-0 w-full z-40 ${mobileMenuOpen ? 'z-50' : ''}`}>
      <AnnouncementBar />
      
      {/* Mobile Header */}
      <MobileHeader openMobileMenu={() => setMobileMenuOpen(true)} />
      
      {/* Desktop Header */}
      <DesktopHeader 
        categories={categories}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
        isScrolled={isScrolled}
      />
      
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
