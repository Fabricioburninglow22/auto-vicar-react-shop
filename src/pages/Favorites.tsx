
import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/shared/ProductCard';
import { Heart } from 'lucide-react';

const Favorites = () => {
  // Sample favorites data - in a real app, this would come from a database or state management
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading favorites
    setTimeout(() => {
      setFavorites([
        {
          id: 'prod-1',
          name: 'Alarma Viper 3305V',
          description: 'Sistema de alarma con encendido a distancia y 2-way respuesta',
          price: 349.99,
          oldPrice: 399.99,
          image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1470&auto=format&fit=crop',
          badge: 'Popular',
          isNew: false,
        },
        {
          id: 'prod-2',
          name: 'Cámara de retroceso HD',
          description: 'Visión nocturna y líneas guía para estacionamiento',
          price: 129.99,
          image: 'https://images.unsplash.com/photo-1622022526774-22924907a2a7?q=80&w=1471&auto=format&fit=crop',
          isNew: true,
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar categories={[]} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Heart className="w-8 h-8 text-red-500" />
          Mis Favoritos
        </h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader">Cargando...</div>
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map(product => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-medium text-gray-600 mb-2">No tienes favoritos</h2>
            <p className="text-gray-500 mb-6">Agrega productos a tu lista de favoritos para verlos aquí</p>
            <a href="/productos" className="bg-vicar-blue text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Explorar Productos
            </a>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Favorites;
