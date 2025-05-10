
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminSettings = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [siteName, setSiteName] = useState('VICAR-PERU');
  const [whatsappNumber, setWhatsappNumber] = useState('51999999999');
  const [maxSuperusers, setMaxSuperusers] = useState('5');
  const [maintenanceMessage, setMaintenanceMessage] = useState('Estamos realizando mejoras en nuestro sitio web. Volveremos pronto.');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Configuración</h2>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex h-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contacto">Contacto</TabsTrigger>
          <TabsTrigger value="mantenimiento">Mantenimiento</TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Configuración General</h3>
              
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="site-name">
                    Nombre del Sitio
                  </label>
                  <Input 
                    id="site-name"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="max-superusers">
                    Máximo de Superusuarios
                  </label>
                  <Input 
                    id="max-superusers"
                    type="number"
                    value={maxSuperusers}
                    onChange={(e) => setMaxSuperusers(e.target.value)}
                  />
                  <p className="text-sm text-gray-500">
                    Número máximo de usuarios que pueden tener el rol de superusuario.
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="analytics" defaultChecked />
                  <div>
                    <label
                      htmlFor="analytics"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Habilitar Análisis
                    </label>
                    <p className="text-sm text-gray-500">
                      Recolectar datos anónimos para mejorar la experiencia del usuario.
                    </p>
                  </div>
                </div>
                
                <Button className="bg-vicar-blue w-full sm:w-auto mt-2">
                  Guardar Cambios
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">SEO</h3>
              
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="meta-title">
                    Meta Título
                  </label>
                  <Input 
                    id="meta-title"
                    placeholder="VICAR-PERU | Autopartes y Accesorios para tu Vehículo"
                  />
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="meta-description">
                    Meta Descripción
                  </label>
                  <Textarea 
                    id="meta-description"
                    placeholder="VICAR-PERU ofrece la mejor selección de autopartes y accesorios de alta calidad para tu vehículo. Alarmas, autoradios, baterías y más."
                    className="min-h-[80px]"
                  />
                </div>
                
                <Button className="bg-vicar-blue w-full sm:w-auto mt-2">
                  Guardar Cambios
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Settings Tab */}
        <TabsContent value="contacto" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Información de Contacto</h3>
              
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="whatsapp-number">
                    Número de WhatsApp
                  </label>
                  <Input 
                    id="whatsapp-number"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="51999999999"
                  />
                  <p className="text-sm text-gray-500">
                    Número que recibirá los mensajes de WhatsApp (con código de país).
                  </p>
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="email">
                    Correo Electrónico
                  </label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="contacto@vicar.com"
                  />
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="address">
                    Dirección
                  </label>
                  <Textarea 
                    id="address"
                    placeholder="Av. Principal 123, Lima, Perú"
                    className="min-h-[80px]"
                  />
                </div>
                
                <Button className="bg-vicar-blue w-full sm:w-auto mt-2">
                  Guardar Cambios
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Redes Sociales</h3>
              
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="facebook">
                    Facebook
                  </label>
                  <Input 
                    id="facebook"
                    placeholder="https://facebook.com/vicar"
                  />
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="instagram">
                    Instagram
                  </label>
                  <Input 
                    id="instagram"
                    placeholder="https://instagram.com/vicar"
                  />
                </div>
                
                <Button className="bg-vicar-blue w-full sm:w-auto mt-2">
                  Guardar Cambios
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Maintenance Settings Tab */}
        <TabsContent value="mantenimiento" className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Modo Mantenimiento</h3>
              
              <div className="grid gap-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label
                      htmlFor="maintenance-mode"
                      className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Activar Modo Mantenimiento
                    </label>
                    <p className="text-sm text-gray-500">
                      Cuando está activo, solo los administradores y superusuarios pueden acceder al sitio.
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Switch 
                        id="maintenance-mode" 
                        checked={maintenanceMode}
                        onCheckedChange={setMaintenanceMode}
                      />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          {maintenanceMode 
                            ? "Desactivar el modo mantenimiento hará que el sitio sea visible para todos los usuarios." 
                            : "Activar el modo mantenimiento hará que el sitio no sea accesible para los usuarios normales."}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setMaintenanceMode(!maintenanceMode)}>
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction>Confirmar</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="maintenance-message">
                    Mensaje de Mantenimiento
                  </label>
                  <Textarea 
                    id="maintenance-message"
                    value={maintenanceMessage}
                    onChange={(e) => setMaintenanceMessage(e.target.value)}
                    className="min-h-[80px]"
                    disabled={!maintenanceMode}
                  />
                </div>
                
                <Button 
                  className="bg-vicar-blue w-full sm:w-auto mt-2"
                  disabled={!maintenanceMode}
                >
                  Guardar Cambios
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-red-600 mb-4">Zona de Peligro</h3>
              
              <div className="grid gap-6">
                <div>
                  <h4 className="text-base font-medium mb-1">Vaciar Caché</h4>
                  <p className="text-sm text-gray-500 mb-3">
                    Limpiar toda la caché del sistema. Esto puede ralentizar temporalmente el sitio.
                  </p>
                  <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
                    Vaciar Caché
                  </Button>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="text-base font-medium mb-1">Restablecer Base de Datos</h4>
                  <p className="text-sm text-gray-500 mb-3">
                    Esta acción eliminará todos los datos excepto los usuarios y es irreversible.
                  </p>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
                        Restablecer Base de Datos
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. Esto eliminará permanentemente todos los datos
                          excepto las cuentas de usuario.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                          Sí, restablecer
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
