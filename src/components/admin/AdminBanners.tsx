
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar as CalendarIcon, Image, ArrowUpDown, Eye, Pencil, Trash } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const AdminBanners = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  
  // Mock banners data - in a real app, this would come from the backend
  const mockBanners = [
    {
      id: '1',
      title: 'Nuevas alarmas Viper',
      subtitle: 'Protege tu vehículo con la mejor tecnología',
      image: '/placeholder.svg',
      linkText: 'Ver productos',
      linkUrl: '/categoria/alarmas',
      isActive: true,
      position: 'hero',
      order: 1
    },
    {
      id: '2',
      title: 'Baterías con 20% de descuento',
      subtitle: 'Promoción por tiempo limitado',
      image: '/placeholder.svg',
      linkText: 'Comprar ahora',
      linkUrl: '/categoria/baterias',
      isActive: true,
      position: 'home-middle',
      order: 1
    },
    {
      id: '3',
      title: 'Autoradios Pioneer',
      subtitle: 'La mejor calidad de sonido para tu vehículo',
      image: '/placeholder.svg',
      linkText: 'Descubrir',
      linkUrl: '/categoria/autoradios',
      isActive: false,
      position: 'home-bottom',
      order: 1
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Banners</h2>
        <Button className="bg-vicar-blue">
          Crear Nuevo Banner
        </Button>
      </div>
      
      {/* Current Banners */}
      <div className="grid gap-6">
        <h3 className="text-xl font-semibold">Banners Activos</h3>
        
        {mockBanners.map((banner) => (
          <Card key={banner.id} className={`${!banner.isActive ? 'opacity-60' : ''}`}>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-[200px_1fr] gap-6">
                <div className="bg-gray-100 rounded-md overflow-hidden aspect-[5/3] flex items-center justify-center">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold">{banner.title}</h4>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          banner.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}>
                          {banner.isActive ? "Activo" : "Inactivo"}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-500 mb-2">{banner.subtitle}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <span className="mr-3">Posición: {banner.position}</span>
                      <span className="mr-3">Orden: {banner.order}</span>
                      <span>Enlace: <a href={banner.linkUrl} className="text-vicar-blue">{banner.linkText}</a></span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" /> Vista previa
                    </Button>
                    <Button variant="outline" size="sm">
                      <ArrowUpDown className="mr-2 h-4 w-4" /> Cambiar orden
                    </Button>
                    <Button variant="outline" size="sm">
                      <Pencil className="mr-2 h-4 w-4" /> Editar
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                      <Trash className="mr-2 h-4 w-4" /> Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Banner Editor */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-6">Editor de Banner</h3>
          
          <div className="grid gap-6">
            <div className="grid gap-2">
              <label className="text-sm font-medium">
                Imagen del Banner
              </label>
              <div className="border-2 border-dashed rounded-md p-8 text-center">
                <Image className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4 flex text-sm leading-6 text-gray-500">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-vicar-blue hover:text-vicar-blue/80 focus-within:outline-none"
                  >
                    <span>Subir una imagen</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">o arrastra y suelta</p>
                </div>
                <p className="text-xs leading-5 text-gray-500">PNG, JPG, WEBP hasta 5MB</p>
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="title">
                  Título
                </label>
                <Input 
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej. Nuevas alarmas Viper"
                />
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="subtitle">
                  Subtítulo
                </label>
                <Input 
                  id="subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Ej. Protege tu vehículo con la mejor tecnología"
                />
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="linkText">
                  Texto del Botón
                </label>
                <Input 
                  id="linkText"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Ej. Ver productos"
                />
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="linkUrl">
                  URL del Botón
                </label>
                <Input 
                  id="linkUrl"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="Ej. /categoria/alarmas"
                />
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="position">
                  Posición
                </label>
                <Select defaultValue="hero">
                  <SelectTrigger id="position" className="w-full">
                    <SelectValue placeholder="Seleccionar posición" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hero">Hero (Principal)</SelectItem>
                    <SelectItem value="home-middle">Sección Media (Home)</SelectItem>
                    <SelectItem value="home-bottom">Sección Inferior (Home)</SelectItem>
                    <SelectItem value="category">Páginas de Categoría</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="order">
                  Orden
                </label>
                <Select defaultValue="1">
                  <SelectTrigger id="order" className="w-full">
                    <SelectValue placeholder="Seleccionar orden" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 (Primero)</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="active" defaultChecked />
              <label
                htmlFor="active"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Banner Activo
              </label>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancelar</Button>
              <Button className="bg-vicar-blue">Guardar Banner</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBanners;
