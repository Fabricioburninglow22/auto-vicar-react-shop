
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Calendar as CalendarIcon, Check, Plus, Settings } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const AdminAnnouncements = () => {
  const [announcementType, setAnnouncementType] = useState("static");
  const [announcementText, setAnnouncementText] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  
  // Mock announcements data - in a real app, this would come from the backend
  const mockAnnouncements = [
    {
      id: '1',
      text: '¡15% OFF en alarmas Viper este mes!',
      type: 'static',
      isActive: true,
      startDate: '2024-05-01',
      endDate: '2024-05-31'
    },
    {
      id: '2',
      text: 'Envío gratis en compras mayores a S/200',
      type: 'static',
      isActive: true,
      startDate: '2024-04-15',
      endDate: '2024-06-15'
    },
    {
      id: '3',
      text: 'Nueva colección de autoradios Pioneer',
      type: 'dynamic',
      rule: 'Mostrar productos Pioneer en oferta',
      isActive: true,
      startDate: '2024-05-01',
      endDate: null
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Anuncios</h2>
      </div>
      
      {/* Editor for Top Announcement Bar */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-6">Crear Nuevo Anuncio</h3>
          
          <div className="grid gap-6">
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="announcement-type">
                Tipo de Anuncio
              </label>
              <Select
                value={announcementType}
                onValueChange={setAnnouncementType}
              >
                <SelectTrigger id="announcement-type" className="w-full">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="static">Estático (texto manual)</SelectItem>
                  <SelectItem value="dynamic">Dinámico (basado en ofertas)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {announcementType === "static" ? (
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="announcement-text">
                  Texto del Anuncio
                </label>
                <Textarea 
                  id="announcement-text"
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  placeholder="Ej. ¡15% OFF en alarmas Viper este mes!"
                />
              </div>
            ) : (
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="dynamic-rule">
                  Regla Dinámica
                </label>
                <Select defaultValue="category">
                  <SelectTrigger id="dynamic-rule" className="w-full">
                    <SelectValue placeholder="Seleccionar regla" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="category">Mostrar categoría con más ofertas</SelectItem>
                    <SelectItem value="best">Mostrar mejor oferta del día</SelectItem>
                    <SelectItem value="summary">Resumir las 3 mejores ofertas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Fecha de Inicio
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Fecha de Fin (opcional)
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP", { locale: es }) : <span>Sin fecha de fin</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      disabled={(date) => date < (startDate || new Date())}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <label
                htmlFor="active"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Activar inmediatamente
              </label>
            </div>
            
            <Button className="bg-vicar-blue w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Crear Anuncio
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Current Announcements */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Anuncios Actuales</h3>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Estado</TableHead>
                  <TableHead>Anuncio</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Vigencia</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAnnouncements.map((announcement) => (
                  <TableRow key={announcement.id}>
                    <TableCell>
                      {announcement.isActive ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="h-5 w-5 rounded-full bg-gray-200"></div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{announcement.text}</div>
                      {announcement.type === "dynamic" && (
                        <div className="text-sm text-gray-500">
                          Regla: {announcement.rule}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        announcement.type === "dynamic" 
                          ? "bg-purple-100 text-purple-800" 
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {announcement.type === "dynamic" ? "Dinámico" : "Estático"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div>{announcement.startDate} - {announcement.endDate || "Sin fecha fin"}</div>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnnouncements;
