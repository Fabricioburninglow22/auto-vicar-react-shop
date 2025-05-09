
const AnnouncementBar = () => {
  const announcements = [
    '¡15% OFF en alarmas Viper este mes!',
    'Envío gratis en compras mayores a S/200',
    'Nueva colección de autoradios Pioneer',
    'Garantía de 1 año en todos nuestros productos',
  ];

  return (
    <div className="bg-vicar-blue text-white py-2 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee-slow">
        {announcements.map((text, index) => (
          <span key={index} className="mx-8 font-medium">{text}</span>
        ))}
        {announcements.map((text, index) => (
          <span key={`repeat-${index}`} className="mx-8 font-medium">{text}</span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
