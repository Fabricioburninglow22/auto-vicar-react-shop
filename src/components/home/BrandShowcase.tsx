
const BrandShowcase = () => {
  const brands = [
    { id: 1, name: 'Pioneer', logo: 'https://via.placeholder.com/150x80?text=Pioneer' },
    { id: 2, name: 'Viper', logo: 'https://via.placeholder.com/150x80?text=Viper' },
    { id: 3, name: 'Sony', logo: 'https://via.placeholder.com/150x80?text=Sony' },
    { id: 4, name: 'JVC', logo: 'https://via.placeholder.com/150x80?text=JVC' },
    { id: 5, name: 'Alpine', logo: 'https://via.placeholder.com/150x80?text=Alpine' },
    { id: 6, name: 'Kenwood', logo: 'https://via.placeholder.com/150x80?text=Kenwood' },
    { id: 7, name: 'Cobra', logo: 'https://via.placeholder.com/150x80?text=Cobra' },
    { id: 8, name: 'Bosch', logo: 'https://via.placeholder.com/150x80?text=Bosch' },
    { id: 9, name: 'Clarion', logo: 'https://via.placeholder.com/150x80?text=Clarion' },
    { id: 10, name: 'JBL', logo: 'https://via.placeholder.com/150x80?text=JBL' },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Nuestras Marcas</h2>
        <p className="text-gray-600 text-center mb-8">Calidad, garantía y soporte en cada producto que ofrecemos.</p>
        
        <div className="overflow-hidden">
          {/* First row - left to right */}
          <div className="brand-scroll-container">
            <div className="brand-row animate-marquee-slow">
              {brands.slice(0, 5).map((brand) => (
                <div 
                  key={`row1-${brand.id}`}
                  className="flex-shrink-0 w-[150px] h-[80px] mx-4 bg-white rounded-md shadow hover:shadow-md transition-shadow duration-300 flex items-center justify-center"
                >
                  <img 
                    src={brand.logo} 
                    alt={`Logo de ${brand.name}`} 
                    className="max-w-[80%] max-h-[60%] object-contain"
                  />
                </div>
              ))}
              {brands.slice(0, 5).map((brand) => (
                <div 
                  key={`row1-repeat-${brand.id}`}
                  className="flex-shrink-0 w-[150px] h-[80px] mx-4 bg-white rounded-md shadow hover:shadow-md transition-shadow duration-300 flex items-center justify-center"
                >
                  <img 
                    src={brand.logo} 
                    alt={`Logo de ${brand.name}`} 
                    className="max-w-[80%] max-h-[60%] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Second row - right to left */}
          <div className="brand-scroll-container mt-6">
            <div className="brand-row animate-marquee-reverse-slow">
              {brands.slice(5, 10).map((brand) => (
                <div 
                  key={`row2-${brand.id}`}
                  className="flex-shrink-0 w-[150px] h-[80px] mx-4 bg-white rounded-md shadow hover:shadow-md transition-shadow duration-300 flex items-center justify-center"
                >
                  <img 
                    src={brand.logo} 
                    alt={`Logo de ${brand.name}`} 
                    className="max-w-[80%] max-h-[60%] object-contain"
                  />
                </div>
              ))}
              {brands.slice(5, 10).map((brand) => (
                <div 
                  key={`row2-repeat-${brand.id}`}
                  className="flex-shrink-0 w-[150px] h-[80px] mx-4 bg-white rounded-md shadow hover:shadow-md transition-shadow duration-300 flex items-center justify-center"
                >
                  <img 
                    src={brand.logo} 
                    alt={`Logo de ${brand.name}`} 
                    className="max-w-[80%] max-h-[60%] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
