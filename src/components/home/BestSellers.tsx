
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../shared/ProductCard';

const BestSellers = () => {
  const navigate = useNavigate();
  const products = [
    {
      id: "1",
      name: "Alarma Viper 3606V Dos Vías",
      description: "Sistemas de seguridad de dos vías con encendido remoto y alcance extendido",
      price: 499.99,
      image: "https://via.placeholder.com/400x300?text=Alarma+Viper",
      badge: "Más Vendido"
    },
    {
      id: "2",
      name: "Autoradio Pioneer MVH-S215BT",
      description: "Radio con Bluetooth, USB y control para Spotify",
      price: 279.99,
      oldPrice: 329.99,
      image: "https://via.placeholder.com/400x300?text=Autoradio+Pioneer"
    },
    {
      id: "3",
      name: "Kit de Luces LED H7 Philips",
      description: "Mayor potencia y menor consumo para tus faros delanteros",
      price: 149.99,
      image: "https://via.placeholder.com/400x300?text=Luces+LED"
    },
    {
      id: "4",
      name: "Servicio de Duplicado de Llave con Chip Toyota",
      description: "Compatible con Toyota Corolla, Yaris, RAV4 y más modelos",
      price: 249.99,
      image: "https://via.placeholder.com/400x300?text=Llave+Chip"
    },
    {
      id: "5",
      name: "Parlantes Pioneer TS-A1670F 6.5\"",
      description: "Parlantes coaxiales de 6.5\" de 3 vías con potencia máxima de 320W",
      price: 199.99,
      oldPrice: 229.99,
      image: "https://via.placeholder.com/400x300?text=Parlantes"
    },
    {
      id: "6",
      name: "GPS Tracker Coban TK103B",
      description: "Control de ubicación en tiempo real con alarma antirrobo",
      price: 199.99,
      image: "https://via.placeholder.com/400x300?text=GPS+Tracker",
      badge: "Tendencia"
    }
  ];
  
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = 300;
      
      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/producto/${productId}`);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Nuestros Productos Más Populares</h2>
          <Link 
            to="/productos"
            className="text-vicar-blue hover:underline font-medium"
          >
            Ver todos los productos
          </Link>
        </div>
        
        <div className="relative">
          {/* Left Arrow */}
          <button 
            onClick={() => handleScroll("left")}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          
          {/* Products Slider */}
          <div 
            ref={scrollRef}
            className="grid grid-flow-col auto-cols-[280px] md:auto-cols-[300px] gap-5 overflow-x-auto pb-6 hide-scrollbar scroll-smooth"
          >
            {products.map((product) => (
              <div 
                key={product.id} 
                className="h-full cursor-pointer" 
                onClick={() => handleProductClick(product.id)}
              >
                <ProductCard 
                  {...product}
                  onClick={(e: any) => {
                    e.stopPropagation();
                    handleProductClick(product.id);
                  }}
                />
              </div>
            ))}
          </div>
          
          {/* Right Arrow */}
          <button 
            onClick={() => handleScroll("right")}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
