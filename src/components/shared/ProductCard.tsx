
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
  isNew?: boolean;
}

const ProductCard = ({
  id,
  name,
  description,
  price,
  oldPrice,
  image,
  badge,
  isNew = false
}: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsFavorite(!isFavorite);
    
    toast({
      title: !isFavorite ? 'Añadido a favoritos' : 'Eliminado de favoritos',
      description: name,
      duration: 3000,
    });
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toast({
      title: 'Añadido al carrito',
      description: name,
      duration: 3000,
    });
  };

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
      <div className="relative overflow-hidden">
        {/* Badge */}
        {badge && (
          <div className="absolute top-2 left-2 bg-vicar-blue text-white text-xs font-bold px-2 py-1 rounded-md z-10">
            {badge}
          </div>
        )}
        
        {/* New badge */}
        {isNew && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10">
            Nuevo
          </div>
        )}
        
        {/* Product Image */}
        <div className="overflow-hidden h-48">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay with details button */}
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
            <div className="w-full py-3 bg-black bg-opacity-50">
              <span className="text-white font-medium text-sm block text-center hover:underline cursor-pointer">
                Ver detalles
              </span>
            </div>
          </div>
        </div>
        
        {/* Favorite Button */}
        <button
          aria-label={isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
          onClick={handleFavoriteToggle}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition-transform z-20"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
        </button>
      </div>
      
      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-800 mb-1 line-clamp-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">{description}</p>
        
        <div className="flex justify-between items-end mt-auto">
          <div className="flex flex-col">
            {oldPrice && (
              <span className="text-gray-500 text-sm line-through">S/ {oldPrice.toFixed(2)}</span>
            )}
            <span className="text-vicar-blue font-bold text-lg">S/ {price.toFixed(2)}</span>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="bg-vicar-blue text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Cotizar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
