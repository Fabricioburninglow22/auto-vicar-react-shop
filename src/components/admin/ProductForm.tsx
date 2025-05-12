
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchProductData, generateSku, saveProduct, validateProductForm } from './product/ProductFormUtils';
import ProductFormWarning from './product/ProductFormWarning';
import ProductFormBasicInfo from './product/ProductFormBasicInfo';
import ProductFormCategories from './product/ProductFormCategories';
import ProductFormBrand from './product/ProductFormBrand';
import ProductFormFeatures from './product/ProductFormFeatures';
import ProductFormDates from './product/ProductFormDates';
import { Category, Subcategory, Brand } from './product/ProductFormUtils';

interface ProductFormProps {
  initialData?: {
    id?: string;
    name: string;
    description: string;
    features: any;
    sku: string;
    price: number;
    sale_price?: number | null;
    sale_start_date?: string | null;
    sale_end_date?: string | null;
    category_id?: string | null;
    subcategory_id?: string | null;
    brand_id?: string | null;
    is_active: boolean;
    is_featured: boolean;
    stock?: number;
  };
  onSuccess: () => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData, onSuccess, onCancel }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Data for dropdowns
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);
  
  // Form state
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [features, setFeatures] = useState<string[]>(
    initialData?.features?.items || []
  );
  const [sku, setSku] = useState(initialData?.sku || '');
  const [price, setPrice] = useState(initialData?.price?.toString() || '');
  const [salePrice, setSalePrice] = useState(initialData?.sale_price?.toString() || '');
  const [saleStartDate, setSaleStartDate] = useState<Date | undefined>(
    initialData?.sale_start_date ? new Date(initialData.sale_start_date) : undefined
  );
  const [saleEndDate, setSaleEndDate] = useState<Date | undefined>(
    initialData?.sale_end_date ? new Date(initialData.sale_end_date) : undefined
  );
  const [categoryId, setCategoryId] = useState(initialData?.category_id || '');
  const [subcategoryId, setSubcategoryId] = useState(initialData?.subcategory_id || '');
  const [brandId, setBrandId] = useState(initialData?.brand_id || '');
  const [isActive, setIsActive] = useState(initialData?.is_active !== false);
  const [isFeatured, setIsFeatured] = useState(initialData?.is_featured || false);
  const [stock, setStock] = useState(initialData?.stock?.toString() || '1');
  
  // Load necessary data on mount
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchProductData();
      setCategories(data.categories);
      setSubcategories(data.subcategories);
      setBrands(data.brands);
      
      if (initialData?.category_id) {
        const filtered = data.subcategories.filter(
          sub => sub.category_id === initialData.category_id
        );
        setFilteredSubcategories(filtered);
      }
    };
    
    loadData();
  }, [initialData]);
  
  // Update filtered subcategories when category changes
  useEffect(() => {
    if (categoryId) {
      const filtered = subcategories.filter(sub => sub.category_id === categoryId);
      setFilteredSubcategories(filtered);
    } else {
      setFilteredSubcategories([]);
      setSubcategoryId('');
    }
  }, [categoryId, subcategories]);
  
  // Generate SKU when category, brand, or name changes
  useEffect(() => {
    if (!initialData?.id && categoryId && brandId && name) {
      const selectedCategory = categories.find(cat => cat.id === categoryId);
      const selectedBrand = brands.find(brand => brand.id === brandId);
      
      if (selectedCategory && selectedBrand) {
        const newSku = generateSku(name, selectedCategory.prefix, selectedBrand.prefix);
        setSku(newSku);
      }
    }
  }, [categoryId, brandId, name, categories, brands, initialData?.id]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      id: initialData?.id,
      name,
      description,
      features,
      sku,
      price,
      sale_price: salePrice,
      sale_start_date: saleStartDate,
      sale_end_date: saleEndDate,
      category_id: categoryId,
      subcategory_id: subcategoryId,
      brand_id: brandId,
      is_active: isActive,
      is_featured: isFeatured,
      stock
    };
    
    if (!validateProductForm(formData)) return;
    
    setIsSubmitting(true);
    const success = await saveProduct(formData, !!initialData?.id);
    
    if (success) {
      onSuccess();
    }
    
    setIsSubmitting(false);
  };
  
  const hasBrands = brands.length > 0;
  const hasCategories = categories.length > 0;
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <ProductFormWarning hasBrands={hasBrands} hasCategories={hasCategories} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <ProductFormBasicInfo
            name={name}
            setName={setName}
            sku={sku}
            setSku={setSku}
            price={price}
            setPrice={setPrice}
            salePrice={salePrice}
            setSalePrice={setSalePrice}
            stock={stock}
            setStock={setStock}
            description={description}
            setDescription={setDescription}
            isActive={isActive}
            setIsActive={setIsActive}
            isFeatured={isFeatured}
            setIsFeatured={setIsFeatured}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <ProductFormDates
              saleStartDate={saleStartDate}
              saleEndDate={saleEndDate}
              onSaleStartDateChange={setSaleStartDate}
              onSaleEndDateChange={setSaleEndDate}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <ProductFormCategories
            categories={categories}
            subcategories={subcategories}
            filteredSubcategories={filteredSubcategories}
            categoryId={categoryId}
            subcategoryId={subcategoryId}
            onCategoryChange={setCategoryId}
            onSubcategoryChange={setSubcategoryId}
          />
          
          <ProductFormBrand
            brands={brands}
            brandId={brandId}
            onBrandChange={setBrandId}
          />
          
          <div>
            <label className="text-sm font-medium">Características</label>
            <ProductFormFeatures
              features={features}
              onChange={setFeatures}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting || !hasBrands || !hasCategories}>
          {isSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {initialData?.id ? 'Actualizar' : 'Crear'} Producto
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
