
import { supabase } from '@/integrations/supabase/client';
import { Product } from './ProductsTypes';
import { toast } from "@/hooks/use-toast";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(name),
        brand:brands(name)
      `);
    
    if (error) {
      throw error;
    }
    
    return data.map(product => ({
      ...product,
      category: product.category?.name || null,
      brand: product.brand?.name || null
    }));
  } catch (error: any) {
    console.error('Error fetching products:', error);
    toast({
      title: 'Error',
      description: 'No se pudieron cargar los productos',
      variant: 'destructive'
    });
    return [];
  }
};

export const deleteProduct = async (productId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);
    
    if (error) {
      throw error;
    }
    
    toast({
      title: 'Éxito',
      description: 'Producto eliminado correctamente'
    });
    
    return true;
  } catch (error: any) {
    console.error('Error deleting product:', error);
    toast({
      title: 'Error',
      description: 'No se pudo eliminar el producto',
      variant: 'destructive'
    });
    return false;
  }
};

export const fetchCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name');
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const fetchBrands = async () => {
  try {
    const { data, error } = await supabase
      .from('brands')
      .select('id, name');
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
};
