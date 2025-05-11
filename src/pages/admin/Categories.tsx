
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { supabase } from '@/integrations/supabase/client';
import CategoryForm from '@/components/admin/CategoryForm';
import SubcategoryForm from '@/components/admin/SubcategoryForm';
import BrandForm from '@/components/admin/BrandForm';

interface Category {
  id: string;
  name: string;
  prefix: string;
  icon: string | null;
  subcategories_count?: number;
  products_count?: number;
}

interface Subcategory {
  id: string;
  name: string;
  category_id: string;
  category_name?: string;
  products_count?: number;
}

interface Brand {
  id: string;
  name: string;
  prefix: string;
  products_count?: number;
}

const CategoriesPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('categories');
  
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Dialog states
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [subcategoryDialogOpen, setSubcategoryDialogOpen] = useState(false);
  const [brandDialogOpen, setBrandDialogOpen] = useState(false);
  
  // Delete alerts
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [subcategoryToDelete, setSubcategoryToDelete] = useState<string | null>(null);
  const [brandToDelete, setBrandToDelete] = useState<string | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  
  // Edit states
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  
  // Data states
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);
  const [subcategorySearchQuery, setSubcategorySearchQuery] = useState('');
  
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>([]);
  const [brandSearchQuery, setBrandSearchQuery] = useState('');
  
  // Load data whenever active tab changes
  useEffect(() => {
    if (activeTab === 'categories') {
      fetchCategories();
    } else if (activeTab === 'subcategories') {
      fetchSubcategories();
    } else if (activeTab === 'brands') {
      fetchBrands();
    }
  }, [activeTab]);
  
  // Apply category filters when search query or categories change
  useEffect(() => {
    if (categorySearchQuery) {
      const query = categorySearchQuery.toLowerCase();
      setFilteredCategories(
        categories.filter(
          cat => cat.name.toLowerCase().includes(query) || cat.prefix.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredCategories(categories);
    }
  }, [categorySearchQuery, categories]);
  
  // Apply subcategory filters when search query or subcategories change
  useEffect(() => {
    if (subcategorySearchQuery) {
      const query = subcategorySearchQuery.toLowerCase();
      setFilteredSubcategories(
        subcategories.filter(
          sub => sub.name.toLowerCase().includes(query) || (sub.category_name && sub.category_name.toLowerCase().includes(query))
        )
      );
    } else {
      setFilteredSubcategories(subcategories);
    }
  }, [subcategorySearchQuery, subcategories]);
  
  // Apply brand filters when search query or brands change
  useEffect(() => {
    if (brandSearchQuery) {
      const query = brandSearchQuery.toLowerCase();
      setFilteredBrands(
        brands.filter(
          brand => brand.name.toLowerCase().includes(query) || brand.prefix.toLowerCase().includes(query)
        )
      );
    } else {
      setFilteredBrands(brands);
    }
  }, [brandSearchQuery, brands]);
  
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      // Get categories with counts of subcategories and products
      const { data, error } = await supabase
        .from('categories')
        .select(`
          *,
          subcategories_count: subcategories(count),
          products_count: products(count)
        `)
        .order('name');
      
      if (error) {
        throw error;
      }
      
      // Transform the data to get the counts
      const categoriesWithCounts = data.map(cat => ({
        ...cat,
        subcategories_count: cat.subcategories_count?.[0]?.count || 0,
        products_count: cat.products_count?.[0]?.count || 0
      }));
      
      setCategories(categoriesWithCounts);
      setFilteredCategories(categoriesWithCounts);
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las categorías',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchSubcategories = async () => {
    setIsLoading(true);
    try {
      // Get subcategories with category names and product counts
      const { data, error } = await supabase
        .from('subcategories')
        .select(`
          *,
          category:categories(name),
          products_count: products(count)
        `)
        .order('name');
      
      if (error) {
        throw error;
      }
      
      // Transform the data
      const subcategoriesWithData = data.map(sub => ({
        ...sub,
        category_name: sub.category?.name || null,
        products_count: sub.products_count?.[0]?.count || 0
      }));
      
      setSubcategories(subcategoriesWithData);
      setFilteredSubcategories(subcategoriesWithData);
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
  
  const fetchBrands = async () => {
    setIsLoading(true);
    try {
      // Get brands with product counts
      const { data, error } = await supabase
        .from('brands')
        .select(`
          *,
          products_count: products(count)
        `)
        .order('name');
      
      if (error) {
        throw error;
      }
      
      // Transform the data
      const brandsWithCounts = data.map(brand => ({
        ...brand,
        products_count: brand.products_count?.[0]?.count || 0
      }));
      
      setBrands(brandsWithCounts);
      setFilteredBrands(brandsWithCounts);
    } catch (error: any) {
      console.error('Error fetching brands:', error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las marcas',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Delete handlers
  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryToDelete);
      
      if (error) {
        throw error;
      }
      
      setCategories(prevCategories => 
        prevCategories.filter(cat => cat.id !== categoryToDelete)
      );
      
      toast({
        title: 'Éxito',
        description: 'Categoría eliminada correctamente'
      });
    } catch (error: any) {
      console.error('Error deleting category:', error);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar la categoría. Asegúrese de que no tenga subcategorías o productos asociados.',
        variant: 'destructive'
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteAlert(false);
      setCategoryToDelete(null);
    }
  };
  
  const handleDeleteSubcategory = async () => {
    if (!subcategoryToDelete) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('subcategories')
        .delete()
        .eq('id', subcategoryToDelete);
      
      if (error) {
        throw error;
      }
      
      setSubcategories(prevSubcategories => 
        prevSubcategories.filter(sub => sub.id !== subcategoryToDelete)
      );
      
      toast({
        title: 'Éxito',
        description: 'Subcategoría eliminada correctamente'
      });
    } catch (error: any) {
      console.error('Error deleting subcategory:', error);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar la subcategoría. Asegúrese de que no tenga productos asociados.',
        variant: 'destructive'
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteAlert(false);
      setSubcategoryToDelete(null);
    }
  };
  
  const handleDeleteBrand = async () => {
    if (!brandToDelete) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('brands')
        .delete()
        .eq('id', brandToDelete);
      
      if (error) {
        throw error;
      }
      
      setBrands(prevBrands => 
        prevBrands.filter(brand => brand.id !== brandToDelete)
      );
      
      toast({
        title: 'Éxito',
        description: 'Marca eliminada correctamente'
      });
    } catch (error: any) {
      console.error('Error deleting brand:', error);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar la marca. Asegúrese de que no tenga productos asociados.',
        variant: 'destructive'
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteAlert(false);
      setBrandToDelete(null);
    }
  };
  
  // Form success handlers
  const handleCategoryFormSuccess = () => {
    setCategoryDialogOpen(false);
    setEditingCategory(null);
    fetchCategories();
  };
  
  const handleSubcategoryFormSuccess = () => {
    setSubcategoryDialogOpen(false);
    setEditingSubcategory(null);
    fetchSubcategories();
  };
  
  const handleBrandFormSuccess = () => {
    setBrandDialogOpen(false);
    setEditingBrand(null);
    fetchBrands();
  };
  
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Gestión de Taxonomías</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="categories">Categorías</TabsTrigger>
            <TabsTrigger value="subcategories">Subcategorías</TabsTrigger>
            <TabsTrigger value="brands">Marcas</TabsTrigger>
          </TabsList>
          
          {/* Categories Tab */}
          <TabsContent value="categories" className="mt-0">
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar categorías..."
                  value={categorySearchQuery}
                  onChange={(e) => setCategorySearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-vicar-blue">
                    <Plus className="mr-2 h-4 w-4" /> Nueva Categoría
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingCategory ? 'Editar' : 'Crear'} Categoría</DialogTitle>
                  </DialogHeader>
                  <CategoryForm
                    initialData={editingCategory || undefined}
                    onSuccess={handleCategoryFormSuccess}
                    onCancel={() => {
                      setCategoryDialogOpen(false);
                      setEditingCategory(null);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Prefijo</TableHead>
                      <TableHead>Icono</TableHead>
                      <TableHead>Subcategorías</TableHead>
                      <TableHead>Productos</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          <div className="flex items-center justify-center">
                            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                            <span className="ml-2">Cargando categorías...</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : filteredCategories.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No se encontraron categorías
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCategories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">{category.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{category.prefix}</Badge>
                          </TableCell>
                          <TableCell>{category.icon || '-'}</TableCell>
                          <TableCell>{category.subcategories_count}</TableCell>
                          <TableCell>{category.products_count}</TableCell>
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
                                  onClick={() => {
                                    setEditingCategory(category);
                                    setCategoryDialogOpen(true);
                                  }}
                                >
                                  Editar categoría
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => {
                                    setCategoryToDelete(category.id);
                                    setShowDeleteAlert(true);
                                  }}
                                  className="text-red-600"
                                  disabled={category.subcategories_count > 0 || category.products_count > 0}
                                >
                                  Eliminar categoría
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
            
            <AlertDialog open={showDeleteAlert && categoryToDelete !== null} onOpenChange={setShowDeleteAlert}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Está seguro de eliminar esta categoría?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. La categoría será eliminada permanentemente.
                    Solo se pueden eliminar categorías sin subcategorías o productos asociados.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteCategory}
                    disabled={isDeleting}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TabsContent>
          
          {/* Subcategories Tab */}
          <TabsContent value="subcategories" className="mt-0">
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar subcategorías..."
                  value={subcategorySearchQuery}
                  onChange={(e) => setSubcategorySearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Dialog open={subcategoryDialogOpen} onOpenChange={setSubcategoryDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-vicar-blue">
                    <Plus className="mr-2 h-4 w-4" /> Nueva Subcategoría
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingSubcategory ? 'Editar' : 'Crear'} Subcategoría</DialogTitle>
                  </DialogHeader>
                  <SubcategoryForm
                    initialData={editingSubcategory || undefined}
                    onSuccess={handleSubcategoryFormSuccess}
                    onCancel={() => {
                      setSubcategoryDialogOpen(false);
                      setEditingSubcategory(null);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Categoría Principal</TableHead>
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
                          <TableCell>{subcategory.category_name || '-'}</TableCell>
                          <TableCell>{subcategory.products_count}</TableCell>
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
                                  onClick={() => {
                                    setEditingSubcategory(subcategory);
                                    setSubcategoryDialogOpen(true);
                                  }}
                                >
                                  Editar subcategoría
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => {
                                    setSubcategoryToDelete(subcategory.id);
                                    setShowDeleteAlert(true);
                                  }}
                                  className="text-red-600"
                                  disabled={subcategory.products_count > 0}
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
            
            <AlertDialog open={showDeleteAlert && subcategoryToDelete !== null} onOpenChange={setShowDeleteAlert}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Está seguro de eliminar esta subcategoría?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. La subcategoría será eliminada permanentemente.
                    Solo se pueden eliminar subcategorías sin productos asociados.
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
          </TabsContent>
          
          {/* Brands Tab */}
          <TabsContent value="brands" className="mt-0">
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar marcas..."
                  value={brandSearchQuery}
                  onChange={(e) => setBrandSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Dialog open={brandDialogOpen} onOpenChange={setBrandDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-vicar-blue">
                    <Plus className="mr-2 h-4 w-4" /> Nueva Marca
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingBrand ? 'Editar' : 'Crear'} Marca</DialogTitle>
                  </DialogHeader>
                  <BrandForm
                    initialData={editingBrand || undefined}
                    onSuccess={handleBrandFormSuccess}
                    onCancel={() => {
                      setBrandDialogOpen(false);
                      setEditingBrand(null);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Prefijo</TableHead>
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
                            <span className="ml-2">Cargando marcas...</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : filteredBrands.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          No se encontraron marcas
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredBrands.map((brand) => (
                        <TableRow key={brand.id}>
                          <TableCell className="font-medium">{brand.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{brand.prefix}</Badge>
                          </TableCell>
                          <TableCell>{brand.products_count}</TableCell>
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
                                  onClick={() => {
                                    setEditingBrand(brand);
                                    setBrandDialogOpen(true);
                                  }}
                                >
                                  Editar marca
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => {
                                    setBrandToDelete(brand.id);
                                    setShowDeleteAlert(true);
                                  }}
                                  className="text-red-600"
                                  disabled={brand.products_count > 0}
                                >
                                  Eliminar marca
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
            
            <AlertDialog open={showDeleteAlert && brandToDelete !== null} onOpenChange={setShowDeleteAlert}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Está seguro de eliminar esta marca?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer. La marca será eliminada permanentemente.
                    Solo se pueden eliminar marcas sin productos asociados.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteBrand}
                    disabled={isDeleting}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default CategoriesPage;
