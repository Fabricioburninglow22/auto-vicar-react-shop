
import { Link } from 'react-router-dom';

interface ShowcaseItemProps {
  id: string;
  title: string;
  buttonText: string;
  imageUrl: string;
}

const CategoriesShowcase = () => {
  const showcaseItems: ShowcaseItemProps[] = [
    {
      id: "security",
      title: "Seguridad y Rastreo",
      buttonText: "Ver Alarmas y GPS",
      imageUrl: "https://images.unsplash.com/photo-1591138346067-417175df1186?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: "audio",
      title: "Audio y Multimedia",
      buttonText: "Ver Autoradios y Parlantes",
      imageUrl: "https://images.unsplash.com/photo-1601046543852-62b2db661a2a?q=80&w=1470&auto=format&fit=crop"
    },
    {
      id: "lights",
      title: "Iluminación Automotriz",
      buttonText: "Ver Luces LED y Accesorios",
      imageUrl: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=1528&auto=format&fit=crop"
    },
    {
      id: "keys",
      title: "Llaves y Controles",
      buttonText: "Ver Llaves con Chip",
      imageUrl: "https://images.unsplash.com/photo-1523919150525-93d35e8a913b?q=80&w=1469&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Explora Nuestras Categorías Principales</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {showcaseItems.map((item) => (
            <div 
              key={item.id}
              className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group h-64"
            >
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-bold mb-4">{item.title}</h3>
                <Link 
                  to={`/categoria/${item.id}`}
                  className="bg-white text-vicar-blue py-2 px-4 rounded-md font-medium hover:bg-gray-100 transition-colors inline-block text-center"
                >
                  {item.buttonText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesShowcase;
