
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, ChevronRight, FolderClosed, Tag } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AdminCategories = () => {
  // Mock categories data - in a real app, this would come from the backend
  const mockCategories = [
    {
      id: '1',
      name: 'Alarmas',
      icon: '🚨',
      subcategories: [
        { id: '1-1', name: 'Alarmas Viper' },
        { id: '1-2', name: 'Alarmas Prestige' },
        { id: '1-3', name: 'Accesorios para alarmas' },
      ]
    },
    {
      id: '2',
      name: 'Autoradios',
      icon: '🔈',
      subcategories: [
        { id: '2-1', name: 'Autoradios Pioneer' },
        { id: '2-2', name: 'Autoradios Sony' },
        { id: '2-3', name: 'Accesorios para autoradios' },
      ]
    },
    {
      id: '3',
      name: 'Baterías',
      icon: '🔋',
      subcategories: [
        { id: '3-1', name: 'Baterías Bosch' },
        { id: '3-2', name: 'Baterías ETNA' },
        { id: '3-3', name: 'Accesorios para baterías' },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Categorías</h2>
        <div className="space-x-2">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" /> Nueva Subcategoría
          </Button>
          <Button className="bg-vicar-blue">
            <Plus className="mr-2 h-4 w-4" /> Nueva Categoría
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <FolderClosed className="h-5 w-5 text-vicar-blue" />
              <div className="text-3xl font-bold">{mockCategories.length}</div>
              <div className="text-gray-500">Categorías</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-vicar-blue" />
              <div className="text-3xl font-bold">
                {mockCategories.reduce((acc, cat) => acc + cat.subcategories.length, 0)}
              </div>
              <div className="text-gray-500">Subcategorías</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories List */}
      <Card>
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full">
            {mockCategories.map((category) => (
              <AccordionItem key={category.id} value={category.id}>
                <AccordionTrigger>
                  <div className="flex items-center">
                    <span className="mr-2">{category.icon}</span>
                    <span>{category.name}</span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({category.subcategories.length} subcategorías)
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pl-6 space-y-2">
                    {category.subcategories.map((subcat) => (
                      <div key={subcat.id} className="flex justify-between items-center p-2 rounded hover:bg-gray-50">
                        <span>{subcat.name}</span>
                        <div>
                          <Button variant="ghost" size="sm">
                            Editar
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" className="mt-2">
                      <Plus className="mr-2 h-4 w-4" />
                      Añadir Subcategoría
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCategories;
