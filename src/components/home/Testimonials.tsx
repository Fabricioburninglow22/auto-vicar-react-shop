
import { Star } from 'lucide-react';

interface TestimonialProps {
  name: string;
  text: string;
  rating: number;
  context?: string;
}

const Testimonial = ({ name, text, rating, context }: TestimonialProps) => {
  return (
    <div className="flex-shrink-0 w-[300px] bg-white rounded-lg shadow p-6 mx-4 h-full hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <p className="text-gray-700 mb-4 line-clamp-4">{text}</p>
      <div>
        <p className="font-bold text-gray-800">{name}</p>
        {context && <p className="text-gray-500 text-sm">{context}</p>}
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ana R.",
      text: "Excelente servicio, instalaron una alarma Viper en mi auto y me explicaron todo el funcionamiento. Muy profesionales y atentos.",
      rating: 5,
      context: "Instalación de Alarma"
    },
    {
      id: 2,
      name: "Carlos M.",
      text: "Precios justos y trabajo de calidad. Me duplicaron la llave con chip de mi Toyota y funcionó perfectamente. Muy recomendados.",
      rating: 5,
      context: "Duplicado de Llave"
    },
    {
      id: 3,
      name: "Laura P.",
      text: "La instalación del autoradio Pioneer quedó impecable, los técnicos son muy detallistas y el sonido es excelente. Volveré para instalar los parlantes.",
      rating: 5,
      context: "Instalación de Audio"
    },
    {
      id: 4,
      name: "Miguel S.",
      text: "Compré un GPS rastreador para mi furgoneta de reparto y el servicio fue rápido y profesional. La aplicación funciona muy bien.",
      rating: 4,
      context: "GPS Tracker"
    },
    {
      id: 5,
      name: "Julia T.",
      text: "Las luces LED que instalaron en mi auto quedaron espectaculares, mucho mejor visibilidad y un aspecto más moderno. Recomiendo 100%.",
      rating: 5,
      context: "Luces LED"
    },
    {
      id: 6,
      name: "Roberto D.",
      text: "Servicio muy rápido y precios competitivos. Instalaron la alarma y el cierre centralizado en menos tiempo del estimado.",
      rating: 4,
      context: "Seguridad Vehicular"
    }
  ];
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Lo que dicen nuestros clientes satisfechos
        </h2>
        
        <div className="overflow-hidden">
          <div className="testimonial-scroll">
            <div className="testimonial-container animate-marquee-slow">
              {testimonials.map((testimonial) => (
                <Testimonial
                  key={testimonial.id}
                  name={testimonial.name}
                  text={testimonial.text}
                  rating={testimonial.rating}
                  context={testimonial.context}
                />
              ))}
            </div>
            <div className="testimonial-container animate-marquee-slow">
              {testimonials.map((testimonial) => (
                <Testimonial
                  key={`repeat-${testimonial.id}`}
                  name={testimonial.name}
                  text={testimonial.text}
                  rating={testimonial.rating}
                  context={testimonial.context}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
