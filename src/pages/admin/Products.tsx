
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import ProductForm from '@/components/admin/ProductForm';
import ProductsFilter from '@/components/admin/product/ProductsFilter';
import ProductsTable from '@/components/admin/product/ProductsTable';
import ProductsDeleteDialog from '@/components/admin/product/ProductsDeleteDialog';
import { 
  fetchProducts, 
  fetchCategories, 
  fetchBrands, 
  deleteProduct 
} from '@/components/admin/product/ProductsService';
import { Product, Category, Brand, ProductFilter } from '@/components/admin/product/ProductsTypes';

const ProductsPage = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filters, setFilters] = useState<ProductFilter>({
    searchQuery: '',
    categoryFilter: 'all',
    brandFilter: 'all',
    statusFilter: 'all'
  });
  
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  
  // Fetch products, categories and brands on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const [productsData, categoriesData, brandsData] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
        fetchBrands()
      ]);
      
      setProducts(productsData);
      setCategories(categoriesData);
      setBrands(brandsData);
      setIsLoading(false);
    };
    
    loadData();
  }, []);
  
  // Apply filters whenever filters or products change
  useEffect(() => {
    applyFilters();
  }, [products, filters]);
  
  const applyFilters = () => {
    let result = [...products];
    const { searchQuery, categoryFilter, brandFilter, statusFilter } = filters;
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.sku.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (categoryFilter && categoryFilter !== 'all') {
      result = result.filter(product => product.category_id === categoryFilter);
    }
    
    // Apply brand filter
    if (brandFilter && brandFilter !== 'all') {
      result = result.filter(product => product.brand_id === brandFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      const isActive = statusFilter === 'active';
      result = result.filter(product => product.is_active === isActive);
    }
    
    setFilteredProducts(result);
  };
  
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };
  
  const handleDeleteClick = (productId: string) => {
    setProductToDelete(productId);
    setShowDeleteAlert(true);
  };
  
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    
    setIsDeleting(true);
    const success = await deleteProduct(productToDelete);
    
    if (success) {
      setProducts(prevProducts => 
        prevProducts.filter(product => product.id !== productToDelete)
      );
    }
    
    setIsDeleting(false);
    setShowDeleteAlert(false);
    setProductToDelete(null);
  };
  
  const handleFormSuccess = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
    
    // Refresh products list
    fetchProducts().then(data => {
      setProducts(data);
    });
  };
  
  const handleFiltersChange = (newFilters: ProductFilter) => {
    setFilters(newFilters);
  };
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestión de Productos</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-vicar-blue">
                <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-4xl">
              <DialogHeader>
                <DialogTitle>{editingProduct ? 'Editar' : 'Crear'} Producto</DialogTitle>
                {(!brands || brands.length === 0 || !categories || categories.length === 0) && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mt-2 flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-yellow-800">Atención</h3>
                      <div className="text-sm text-yellow-700 mt-1">
                        <p>Antes de crear productos, debes tener al menos:</p>
                        <ul className="list-disc ml-5 mt-1">
                          {(!categories || categories.length === 0) && (
                            <li className="mb-1">
                              Una <a href="/admin/categorias" className="text-blue-600 hover:underline">categoría</a>
                            </li>
                          )}
                          {(!brands || brands.length === 0) && (
                            <li>
                              Una <a href="/admin/marcas" className="text-blue-600 hover:underline">marca</a>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </DialogHeader>
              <ProductForm
                initialData={editingProduct || undefined}
                onSuccess={handleFormSuccess}
                onCancel={() => {
                  setIsDialogOpen(false);
                  setEditingProduct(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Filters */}
        <ProductsFilter 
          categories={categories}
          brands={brands}
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />
        
        {/* Products Table */}
        <Card>
          <CardContent className="p-0">
            <ProductsTable 
              products={filteredProducts}
              isLoading={isLoading}
              onEdit={handleEditProduct}
              onDelete={handleDeleteClick}
            />
          </CardContent>
        </Card>
        
        {/* Delete Confirmation Dialog */}
        <ProductsDeleteDialog 
          isOpen={showDeleteAlert}
          isDeleting={isDeleting}
          onClose={() => setShowDeleteAlert(false)}
          onConfirm={handleDeleteProduct}
        />
      </div>
    </AdminLayout>
  );
};

export default ProductsPage;
