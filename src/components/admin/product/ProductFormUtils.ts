
import { supabase } from '@/integrations/supabase/client';
import { toast } from "@/hooks/use-toast";

interface ProductFormData {
  id?: string;
  name: string;
  description: string;
  features: string[];
  sku: string;
  price: string;
  sale_price?: string;
  sale_start_date?: Date;
  sale_end_date?: Date;
  category_id?: string;
  subcategory_id?: string;
  brand_id?: string;
  is_active: boolean;
  is_featured: boolean;
  stock: string;
}

export interface Category {
  id: string;
  name: string;
  prefix: string;
}

export interface Subcategory {
  id: string;
  name: string;
  category_id: string;
}

export interface Brand {
  id: string;
  name: string;
  prefix: string;
}

export const validateProductForm = (formData: ProductFormData): boolean => {
  if (!formData.name) {
    toast({ title: 'Error', description: 'El nombre del producto es obligatorio', variant: 'destructive' });
    return false;
  }
  if (!formData.sku || !/^[A-Z]{3}-[A-Z]{3}-[A-Z0-9]+$/.test(formData.sku)) {
    toast({ title: 'Error', description: 'El SKU debe tener el formato AAA-BBB-XXXXX', variant: 'destructive' });
    return false;
  }
  if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
    toast({ title: 'Error', description: 'El precio debe ser un número mayor a 0', variant: 'destructive' });
    return false;
  }
  if (formData.sale_price && (isNaN(parseFloat(formData.sale_price)) || parseFloat(formData.sale_price) <= 0)) {
    toast({ title: 'Error', description: 'El precio de oferta debe ser un número mayor a 0', variant: 'destructive' });
    return false;
  }
  if (formData.sale_price && parseFloat(formData.sale_price) >= parseFloat(formData.price)) {
    toast({ title: 'Error', description: 'El precio de oferta debe ser menor al precio regular', variant: 'destructive' });
    return false;
  }
  if (formData.sale_start_date && formData.sale_end_date && formData.sale_start_date >= formData.sale_end_date) {
    toast({ title: 'Error', description: 'La fecha de inicio de oferta debe ser anterior a la fecha de fin', variant: 'destructive' });
    return false;
  }
  if (!formData.category_id) {
    toast({ title: 'Error', description: 'Debe seleccionar una categoría', variant: 'destructive' });
    return false;
  }
  if (!formData.brand_id) {
    toast({ title: 'Error', description: 'Debe seleccionar una marca', variant: 'destructive' });
    return false;
  }
  
  return true;
};

export const saveProduct = async (
  formData: ProductFormData,
  isEditing: boolean
): Promise<boolean> => {
  try {
    const productData = {
      name: formData.name,
      description: formData.description,
      features: { items: formData.features },
      sku: formData.sku,
      price: parseFloat(formData.price),
      sale_price: formData.sale_price ? parseFloat(formData.sale_price) : null,
      sale_start_date: formData.sale_start_date ? formData.sale_start_date.toISOString() : null,
      sale_end_date: formData.sale_end_date ? formData.sale_end_date.toISOString() : null,
      category_id: formData.category_id || null,
      subcategory_id: formData.subcategory_id === 'none' ? null : formData.subcategory_id || null,
      brand_id: formData.brand_id || null,
      is_active: formData.is_active,
      is_featured: formData.is_featured,
      stock: formData.stock ? parseInt(formData.stock) : 1
    };
    
    let result;
    
    if (isEditing && formData.id) {
      result = await supabase
        .from('products')
        .update(productData)
        .eq('id', formData.id)
        .select();
    } else {
      result = await supabase
        .from('products')
        .insert(productData)
        .select();
    }
    
    if (result.error) {
      throw result.error;
    }
    
    toast({
      title: 'Éxito',
      description: isEditing
        ? 'Producto actualizado correctamente' 
        : 'Producto creado correctamente',
    });
    
    return true;
  } catch (error: any) {
    console.error('Error saving product:', error);
    toast({
      title: 'Error',
      description: `No se pudo ${isEditing ? 'actualizar' : 'crear'} el producto: ${error.message || 'Error desconocido'}`,
      variant: 'destructive',
    });
    
    return false;
  }
};

export const generateSku = (
  name: string, 
  categoryPrefix: string | undefined, 
  brandPrefix: string | undefined
): string => {
  if (!categoryPrefix || !brandPrefix) return '';
  
  // Format: [PREFIX_CATEGORY]-[PREFIX_BRAND]-[NAME_SIMPLIFIED]
  const productIdentifier = name
    .replace(/[^a-zA-Z0-9]/g, '') // Remove special characters
    .substring(0, 8) // Limit to 8 chars
    .toUpperCase();
  
  return `${categoryPrefix}-${brandPrefix}-${productIdentifier || 'XXXXX'}`;
};

export const fetchProductData = async () => {
  try {
    const [categoriesResult, subcategoriesResult, brandsResult] = await Promise.all([
      supabase.from('categories').select('*'),
      supabase.from('subcategories').select('*'),
      supabase.from('brands').select('*')
    ]);

    if (categoriesResult.error) throw categoriesResult.error;
    if (subcategoriesResult.error) throw subcategoriesResult.error;
    if (brandsResult.error) throw brandsResult.error;

    return {
      categories: categoriesResult.data || [],
      subcategories: subcategoriesResult.data || [],
      brands: brandsResult.data || []
    };
  } catch (error) {
    console.error('Error fetching product data:', error);
    toast({
      title: 'Error',
      description: 'No se pudieron cargar los datos necesarios',
      variant: 'destructive',
    });
    return { categories: [], subcategories: [], brands: [] };
  }
};
