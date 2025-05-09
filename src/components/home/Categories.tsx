
import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
}

const Categories = () => {
  const categories: Category[] = [
    {
      id: "alarmas",
      title: "Seguridad Total para tu Vehículo",
      description: "Alarmas, GPS y sistemas antirrobo para tu tranquilidad.",
      image: "https://images.unsplash.com/photo-1577626655336-cba83ea9a110?q=80&w=1376&auto=format&fit=crop",
      icon: "🔒"
    },
    {
      id: "audio",
      title: "Potencia y Sonido con Car Audio",
      description: "Autoradios, parlantes y equipos para una experiencia única.",
      image: "https://images.unsplash.com/photo-1563302901-04cd8be3acf1?q=80&w=1450&auto=format&fit=crop",
      icon: "🎵"
    },
    {
      id: "luces",
      title: "Iluminación de Alto Rendimiento",
      description: "Luces LED, halógenos y accesorios de iluminación.",
      image: "https://images.unsplash.com/photo-1546819979-5c63635e4d05?q=80&w=1374&auto=format&fit=crop",
      icon: "💡"
    },
    {
      id: "llaves",
      title: "Duplicado Profesional de Llaves",
      description: "Llaves con chip y programación para todas las marcas.",
      image: "https://images.unsplash.com/photo-1622988619480-6a123bacad8d?q=80&w=1470&auto=format&fit=crop",
      icon: "🔑"
    },
    {
      id: "accesorios",
      title: "Accesorios para Personalizar",
      description: "Todo lo que necesitas para hacer tu vehículo único.",
      image: "https://images.unsplash.com/photo-1537677561551-85152de51d9f?q=80&w=1470&auto=format&fit=crop",
      icon: "🚗"
    }
  ];
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = 300;
      
      if (direction === "left") {
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        setScrollPosition(Math.max(0, scrollPosition - scrollAmount));
      } else {
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        setScrollPosition(Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount));
      }
    }
  };
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Encuentra lo que buscas</h2>
        <p className="text-gray-600 text-center mb-8">Navega a través de nuestras categorías principales y descubre productos de calidad para cada necesidad</p>
        
        <div className="relative">
          {/* Left Arrow */}
          <button 
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition-colors"
            aria-label="Scroll left"
            disabled={scrollPosition <= 0}
          >
            <ChevronLeft className={`w-6 h-6 ${scrollPosition <= 0 ? 'text-gray-300' : 'text-gray-600'}`} />
          </button>
          
          {/* Categories Slider */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar scroll-smooth"
          >
            {categories.map((category) => (
              <Link 
                to={`/categoria/${category.id}`}
                key={category.id} 
                className="flex-shrink-0 w-[280px] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  <div className="absolute top-4 left-4 bg-white rounded-full p-2">
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-2 group-hover:text-vicar-blue transition-colors">{category.title}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Right Arrow */}
          <button 
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition-colors"
            aria-label="Scroll right"
            disabled={scrollRef.current && scrollPosition >= (scrollRef.current.scrollWidth - scrollRef.current.clientWidth)}
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
