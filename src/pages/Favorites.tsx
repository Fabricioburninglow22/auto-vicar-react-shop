
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/shared/ProductCard';
import { Heart } from 'lucide-react';
import { useShoppingContext } from '@/contexts/ShoppingContext';

const Favorites = () => {
  const { favorites } = useShoppingContext();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar categories={[]} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Heart className="w-8 h-8 text-red-500" />
          Mis Favoritos
        </h1>
        
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
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
