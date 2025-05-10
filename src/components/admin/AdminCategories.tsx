
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, ChevronRight, FolderClosed, Tag, Edit, Save, Trash2 } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const AdminCategories = () => {
  const { toast } = useToast();
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [subcategoryDialogOpen, setSubcategoryDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Mock categories data
  const [categories, setCategories] = useState([
    {
      id: '1',
      name: 'Alarmas',
      icon: '🚨',
      prefix: 'ALM',
      subcategories: [
        { id: '1-1', name: 'Alarmas Viper', categoryId: '1' },
        { id: '1-2', name: 'Alarmas Prestige', categoryId: '1' },
        { id: '1-3', name: 'Accesorios para alarmas', categoryId: '1' },
      ]
    },
    {
      id: '2',
      name: 'Autoradios',
      icon: '🔈',
      prefix: 'RAD',
      subcategories: [
        { id: '2-1', name: 'Autoradios Pioneer', categoryId: '2' },
        { id: '2-2', name: 'Autoradios Sony', categoryId: '2' },
        { id: '2-3', name: 'Accesorios para autoradios', categoryId: '2' },
      ]
    },
    {
      id: '3',
      name: 'Baterías',
      icon: '🔋',
      prefix: 'BAT',
      subcategories: [
        { id: '3-1', name: 'Baterías Bosch', categoryId: '3' },
        { id: '3-2', name: 'Baterías ETNA', categoryId: '3' },
        { id: '3-3', name: 'Accesorios para baterías', categoryId: '3' },
      ]
    }
  ]);

  // New category/subcategory handlers
  const handleNewCategory = () => {
    setSelectedCategory({ name: '', icon: '📦', prefix: '' });
    setIsEditing(false);
    setCategoryDialogOpen(true);
  };

  const handleEditCategory = (category: any) => {
    setSelectedCategory({...category});
    setIsEditing(true);
    setCategoryDialogOpen(true);
  };

  const handleDeleteCategory = (category: any) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  };

  const handleNewSubcategory = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    setSelectedCategory(category);
    setSelectedSubcategory({ name: '', categoryId });
    setIsEditing(false);
    setSubcategoryDialogOpen(true);
  };

  const handleEditSubcategory = (subcategory: any, categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    setSelectedCategory(category);
    setSelectedSubcategory({...subcategory});
    setIsEditing(true);
    setSubcategoryDialogOpen(true);
  };

  const handleDeleteSubcategory = (subcategory: any, categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    setDeleteDialogOpen(true);
  };

  // Save handlers
  const saveCategory = () => {
    if (!selectedCategory.name || !selectedCategory.prefix) {
      toast({
        title: "Datos incompletos",
        description: "Por favor complete todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    // Validate prefix is 3 uppercase letters
    if (!/^[A-Z]{3}$/.test(selectedCategory.prefix)) {
      toast({
        title: "Prefijo inválido",
        description: "El prefijo debe contener exactamente 3 letras mayúsculas",
        variant: "destructive"
      });
      return;
    }

    if (isEditing) {
      // Update existing category
      const updatedCategories = categories.map(cat => 
        cat.id === selectedCategory.id ? {...selectedCategory} : cat
      );
      setCategories(updatedCategories);
      toast({
        title: "Categoría actualizada",
        description: `${selectedCategory.name} ha sido actualizada correctamente`
      });
    } else {
      // Create new category
      const newCategory = {
        ...selectedCategory,
        id: `${categories.length + 1}`,
        subcategories: []
      };
      setCategories([...categories, newCategory]);
      toast({
        title: "Categoría creada",
        description: `${newCategory.name} ha sido creada correctamente`
      });
    }
    setCategoryDialogOpen(false);
  };

  const saveSubcategory = () => {
    if (!selectedSubcategory.name) {
      toast({
        title: "Nombre requerido",
        description: "Por favor ingrese un nombre para la subcategoría",
        variant: "destructive"
      });
      return;
    }

    const categoryIndex = categories.findIndex(cat => cat.id === selectedCategory.id);
    if (categoryIndex === -1) return;

    const updatedCategories = [...categories];
    
    if (isEditing) {
      // Update existing subcategory
      const subcategoryIndex = updatedCategories[categoryIndex].subcategories.findIndex(
        sub => sub.id === selectedSubcategory.id
      );
      
      if (subcategoryIndex !== -1) {
        updatedCategories[categoryIndex].subcategories[subcategoryIndex] = {
          ...selectedSubcategory
        };
        
        setCategories(updatedCategories);
        toast({
          title: "Subcategoría actualizada",
          description: `${selectedSubcategory.name} ha sido actualizada correctamente`
        });
      }
    } else {
      // Create new subcategory
      const newSubcategory = {
        ...selectedSubcategory,
        id: `${selectedCategory.id}-${updatedCategories[categoryIndex].subcategories.length + 1}`,
      };
      
      updatedCategories[categoryIndex].subcategories.push(newSubcategory);
      setCategories(updatedCategories);
      toast({
        title: "Subcategoría creada",
        description: `${newSubcategory.name} ha sido creada correctamente`
      });
    }
    
    setSubcategoryDialogOpen(false);
  };

  // Delete handlers
  const confirmDelete = () => {
    if (selectedSubcategory) {
      // Delete subcategory
      const categoryIndex = categories.findIndex(cat => cat.id === selectedCategory.id);
      if (categoryIndex === -1) return;
      
      const updatedCategories = [...categories];
      updatedCategories[categoryIndex].subcategories = updatedCategories[categoryIndex].subcategories.filter(
        sub => sub.id !== selectedSubcategory.id
      );
      
      setCategories(updatedCategories);
      toast({
        title: "Subcategoría eliminada",
        description: `${selectedSubcategory.name} ha sido eliminada correctamente`
      });
    } else {
      // Delete category
      const updatedCategories = categories.filter(cat => cat.id !== selectedCategory.id);
      setCategories(updatedCategories);
      toast({
        title: "Categoría eliminada",
        description: `${selectedCategory.name} ha sido eliminada correctamente`
      });
    }
    
    setDeleteDialogOpen(false);
    setSelectedSubcategory(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Categorías</h2>
        <div className="space-x-2">
          <Button variant="outline" onClick={handleNewCategory}>
            <Plus className="mr-2 h-4 w-4" /> Nueva Categoría
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <FolderClosed className="h-5 w-5 text-vicar-blue" />
              <div className="text-3xl font-bold">{categories.length}</div>
              <div className="text-gray-500">Categorías</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-vicar-blue" />
              <div className="text-3xl font-bold">
                {categories.reduce((acc, cat) => acc + cat.subcategories.length, 0)}
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
            {categories.map((category) => (
              <AccordionItem key={category.id} value={category.id}>
                <div className="flex items-center justify-between">
                  <AccordionTrigger className="flex-grow">
                    <div className="flex items-center">
                      <span className="mr-2">{category.icon}</span>
                      <span>{category.name}</span>
                      <span className="ml-2 text-sm text-gray-500">
                        ({category.subcategories.length} subcategorías)
                      </span>
                      <span className="ml-2 text-xs text-gray-400 font-mono">
                        PREFIX: {category.prefix}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <div className="flex items-center mr-4 space-x-2">
                    <Button variant="ghost" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      handleEditCategory(category);
                    }}>
                      <Edit className="h-4 w-4 mr-1" /> Editar
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600" onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(category);
                    }}>
                      <Trash2 className="h-4 w-4 mr-1" /> Eliminar
                    </Button>
                  </div>
                </div>
                <AccordionContent>
                  <div className="pl-6 space-y-2">
                    {category.subcategories.map((subcat) => (
                      <div key={subcat.id} className="flex justify-between items-center p-2 rounded hover:bg-gray-50">
                        <span>{subcat.name}</span>
                        <div className="space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditSubcategory(subcat, category.id)}
                          >
                            <Edit className="h-4 w-4 mr-1" /> Editar
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-red-600"
                            onClick={() => handleDeleteSubcategory(subcat, category.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Eliminar
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => handleNewSubcategory(category.id)}
                    >
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

      {/* Category Dialog */}
      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Editar Categoría' : 'Nueva Categoría'}</DialogTitle>
            <DialogDescription>
              Complete los detalles de la categoría. El prefijo debe ser de 3 letras mayúsculas.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cat-name">Nombre de la Categoría</Label>
              <Input 
                id="cat-name" 
                placeholder="Ej: Alarmas" 
                value={selectedCategory?.name || ''}
                onChange={(e) => setSelectedCategory({...selectedCategory, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cat-prefix">Prefijo para SKU (3 letras mayúsculas)</Label>
              <Input 
                id="cat-prefix" 
                placeholder="Ej: ALM" 
                maxLength={3}
                value={selectedCategory?.prefix || ''}
                onChange={(e) => setSelectedCategory({...selectedCategory, prefix: e.target.value.toUpperCase()})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cat-icon">Ícono</Label>
              <Select 
                value={selectedCategory?.icon || '📦'}
                onValueChange={(value) => setSelectedCategory({...selectedCategory, icon: value})}
              >
                <SelectTrigger id="cat-icon">
                  <SelectValue placeholder="Seleccionar ícono" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="🚨">🚨 Alarma</SelectItem>
                  <SelectItem value="🔈">🔈 Audio</SelectItem>
                  <SelectItem value="🔋">🔋 Batería</SelectItem>
                  <SelectItem value="💿">💿 CD/DVD</SelectItem>
                  <SelectItem value="💡">💡 Luces</SelectItem>
                  <SelectItem value="🔧">🔧 Herramientas</SelectItem>
                  <SelectItem value="📦">📦 Genérico</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCategoryDialogOpen(false)}>Cancelar</Button>
            <Button onClick={saveCategory} className="bg-vicar-blue">
              <Save className="mr-2 h-4 w-4" />
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Subcategory Dialog */}
      <Dialog open={subcategoryDialogOpen} onOpenChange={setSubcategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Editar Subcategoría' : 'Nueva Subcategoría'}</DialogTitle>
            <DialogDescription>
              Complete los detalles de la subcategoría para {selectedCategory?.name}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subcat-name">Nombre de la Subcategoría</Label>
              <Input 
                id="subcat-name" 
                placeholder="Ej: Alarmas Viper" 
                value={selectedSubcategory?.name || ''}
                onChange={(e) => setSelectedSubcategory({...selectedSubcategory, name: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setSubcategoryDialogOpen(false)}>Cancelar</Button>
            <Button onClick={saveSubcategory} className="bg-vicar-blue">
              <Save className="mr-2 h-4 w-4" />
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              {selectedSubcategory 
                ? `¿Está seguro de que desea eliminar la subcategoría "${selectedSubcategory.name}"?` 
                : `¿Está seguro de que desea eliminar la categoría "${selectedCategory?.name}" y todas sus subcategorías?`}
              Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCategories;
