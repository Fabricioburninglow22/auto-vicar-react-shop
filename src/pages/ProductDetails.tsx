
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useProductInteraction } from '@/hooks/useProductInteraction';
import { Heart, Share2, Check } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  images: string[];
  brand: string;
  sku: string;
  features: string[];
  specs: Record<string, string>;
}

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useProductInteraction();

  useEffect(() => {
    // Simulate loading product data
    setTimeout(() => {
      // This would normally be a fetch from an API
      setProduct({
        id: productId || 'default-id',
        name: 'Alarma Viper 3305V con Encendido a Distancia',
        description: 'Sistema de seguridad de última generación para tu vehículo con encendido a distancia, sensores de impacto, y bloqueo de motor. Incluye 2 controles remotos de 2 vías con confirmación.',
        price: 349.99,
        oldPrice: 399.99,
        images: [
          'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1470&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1594642461502-38137c17f65b?q=80&w=1470&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1638316937391-ebc9768ed469?q=80&w=1470&auto=format&fit=crop'
        ],
        brand: 'Viper',
        sku: 'VP-3305V',
        features: [
          'Encendido a distancia hasta 500 metros',
          'Control remoto LCD de 2 vías con confirmación',
          'Bloqueo automático de puertas',
          'Sensor de impacto de doble zona',
          'Compatible con sistemas originales de fábrica'
        ],
        specs: {
          'Rango': '500 metros',
          'Controles': '2 incluidos',
          'Voltaje': '12V DC',
          'Garantía': '1 año',
          'Instalación': 'Profesional requerida'
        }
      });
      setLoading(false);
    }, 1000);
  }, [productId]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (loading || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar categories={[]} />
        <main className="flex-grow container mx-auto px-4 py-12 flex justify-center items-center">
          <div className="loader">Cargando...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar categories={[]} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden border">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded border overflow-hidden ${selectedImage === index ? 'ring-2 ring-vicar-blue' : ''}`}
                >
                  <img src={image} alt={`${product.name} - Vista ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gray-600">Marca: {product.brand}</span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">SKU: {product.sku}</span>
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                {product.oldPrice && (
                  <span className="text-gray-500 line-through">S/ {product.oldPrice.toFixed(2)}</span>
                )}
                <span className="text-vicar-blue text-3xl font-bold">S/ {product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    {Math.round((1 - product.price / product.oldPrice) * 100)}% OFF
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">Consulta por opciones de instalación</p>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700">{product.description}</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <button 
                onClick={() => addToCart(product.id, product.name)}
                className="w-full bg-vicar-blue text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Solicitar Cotización
              </button>
              
              <div className="flex gap-2">
                <button 
                  onClick={toggleFavorite}
                  className={`flex-1 py-3 rounded-md border font-medium flex items-center justify-center gap-2 ${
                    isFavorite ? 'bg-red-50 border-red-200 text-red-600' : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  <span>{isFavorite ? 'En Favoritos' : 'Añadir a Favoritos'}</span>
                </button>
                
                <button className="px-4 py-3 rounded-md border border-gray-300 hover:bg-gray-50">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="font-bold text-lg mb-2">Características principales</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="mt-1">
                      <Check className="w-4 h-4 text-vicar-blue" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Product Specs */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Especificaciones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="border-b pb-2">
                <span className="text-gray-600">{key}:</span> <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetails;
