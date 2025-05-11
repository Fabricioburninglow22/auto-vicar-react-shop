
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, MoreVertical, Loader2 } from "lucide-react";
import SubcategoryForm from '@/components/admin/SubcategoryForm';

interface Subcategory {
  id: string;
  name: string;
  category_id: string;
  category: {
    name: string;
  };
  products_count: number;
  created_at: string;
  updated_at: string;
}

const SubcategoriesPage = () => {
  const { toast } = useToast();
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [subcategoryToDelete, setSubcategoryToDelete] = useState<string | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  useEffect(() => {
    fetchSubcategories();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [subcategories, searchQuery]);

  const fetchSubcategories = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('subcategories')
        .select('*, category:categories(name), products_count:products(count)')
        .order('name', { ascending: true });

      if (error) throw error;

      const formattedSubcategories = data.map(subcategory => ({
        ...subcategory,
        products_count: subcategory.products_count ? subcategory.products_count[0]?.count || 0 : 0
      })) as Subcategory[];

      setSubcategories(formattedSubcategories);
    } catch (error: any) {
      console.error('Error fetching subcategories:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las subcategorías',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    if (!searchQuery) {
      setFilteredSubcategories(subcategories);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = subcategories.filter(
      subcategory => 
        subcategory.name.toLowerCase().includes(query) || 
        subcategory.category?.name.toLowerCase().includes(query)
    );
    setFilteredSubcategories(filtered);
  };

  const handleEditSubcategory = (subcategory: Subcategory) => {
    setEditingSubcategory(subcategory);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (subcategoryId: string) => {
    setSubcategoryToDelete(subcategoryId);
    setShowDeleteAlert(true);
  };

  const handleDeleteSubcategory = async () => {
    if (!subcategoryToDelete) return;

    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('subcategories')
        .delete()
        .eq('id', subcategoryToDelete);

      if (error) throw error;

      setSubcategories(prevSubcategories => 
        prevSubcategories.filter(subcategory => subcategory.id !== subcategoryToDelete)
      );

      toast({
        title: 'Éxito',
        description: 'Subcategoría eliminada correctamente'
      });
    } catch (error: any) {
      console.error('Error deleting subcategory:', error);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar la subcategoría',
        variant: 'destructive'
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteAlert(false);
      setSubcategoryToDelete(null);
    }
  };

  const handleFormSuccess = () => {
    setIsDialogOpen(false);
    setEditingSubcategory(null);
    fetchSubcategories();
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestión de Subcategorías</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-vicar-blue">
                <Plus className="mr-2 h-4 w-4" /> Nueva Subcategoría
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{editingSubcategory ? 'Editar' : 'Crear'} Subcategoría</DialogTitle>
                <DialogDescription>
                  {editingSubcategory 
                    ? 'Actualiza los datos de la subcategoría.' 
                    : 'Crea una nueva subcategoría para organizar los productos.'}
                </DialogDescription>
              </DialogHeader>
              <SubcategoryForm
                initialData={editingSubcategory || undefined}
                onSuccess={handleFormSuccess}
                onCancel={() => {
                  setIsDialogOpen(false);
                  setEditingSubcategory(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar subcategorías..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Productos</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      <div className="flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                        <span className="ml-2">Cargando subcategorías...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredSubcategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No se encontraron subcategorías
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubcategories.map((subcategory) => (
                    <TableRow key={subcategory.id}>
                      <TableCell className="font-medium">{subcategory.name}</TableCell>
                      <TableCell>{subcategory.category?.name || 'Sin categoría'}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {subcategory.products_count || 0} productos
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menú</span>
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem 
                              onClick={() => handleEditSubcategory(subcategory)}
                            >
                              Editar subcategoría
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleDeleteClick(subcategory.id)}
                              className="text-red-600"
                            >
                              Eliminar subcategoría
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Está seguro de eliminar esta subcategoría?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. La subcategoría será eliminada permanentemente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteSubcategory}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700"
              >
                {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
};

export default SubcategoriesPage;
