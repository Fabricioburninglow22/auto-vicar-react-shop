
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthProvider';
import { useToast } from '@/hooks/use-toast';

// Components
import { Navbar, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

// Define the complete profile interface according to the database schema
interface ProfileData {
  name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
}

const Profile = () => {
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    email: user?.email || '',
    phone: '',
    address: '',
  });

  // Fetch profile data
  useEffect(() => {
    if (user) {
      fetchProfileData(user);
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchProfileData = async (user: User) => {
    try {
      setIsLoading(true);
      
      // Usar maybeSingle en lugar de single para evitar errores cuando no hay perfil
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (data) {
        setProfileData({
          name: data.name || '',
          email: user.email || '',
          phone: data.phone || '',
          address: data.address || '',
        });
      } else {
        // Si no hay perfil, intentamos crear uno
        await createUserProfile(user);
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error.message);
      toast({
        title: "Error",
        description: "No se pudo cargar la información del perfil",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Crear un perfil de usuario si no existe
  const createUserProfile = async (user: User) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name || user.email?.split('@')[0] || '',
        });

      if (error) throw error;

      // Después de crear el perfil, intentamos cargarlo de nuevo
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
      
      if (fetchError) throw fetchError;

      if (data) {
        setProfileData({
          name: data.name || '',
          email: user.email || '',
          phone: data.phone || '',
          address: data.address || '',
        });
      }
    } catch (error: any) {
      console.error('Error creating profile:', error.message);
      toast({
        title: "Error",
        description: "No se pudo crear el perfil de usuario",
        variant: "destructive"
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from('profiles')
        .update({
          name: profileData.name,
          phone: profileData.phone,
          address: profileData.address,
        })
        .eq('id', user?.id);
        
      if (error) throw error;
      
      toast({
        title: "Perfil actualizado",
        description: "Tu información ha sido actualizada correctamente"
      });
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
      toast({
        title: "Error",
        description: "No se pudo actualizar la información del perfil",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar categories={[]} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Navegación</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => navigate('/mi-perfil')}
                  >
                    Mi Perfil
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => navigate('/mis-ordenes')}
                  >
                    Mis Órdenes
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => navigate('/favoritos')}
                  >
                    Favoritos
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                  <CardDescription>
                    Actualiza tu información personal
                  </CardDescription>
                </CardHeader>
                {isLoading ? (
                  <CardContent className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2">Cargando información...</span>
                  </CardContent>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={profileData.name || ''} 
                          onChange={handleChange}
                          placeholder="Tu nombre completo" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          value={profileData.email || ''} 
                          disabled
                          placeholder="tu@email.com" 
                        />
                        <p className="text-xs text-muted-foreground">
                          El correo electrónico no puede ser modificado
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={profileData.phone || ''} 
                          onChange={handleChange}
                          placeholder="Tu número de teléfono" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Dirección</Label>
                        <Input 
                          id="address" 
                          name="address" 
                          value={profileData.address || ''} 
                          onChange={handleChange}
                          placeholder="Tu dirección" 
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Guardando...' : 'Guardar cambios'}
                      </Button>
                    </CardFooter>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
