
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Calendar as CalendarIcon, Loader2, X } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

interface Category {
  id: string;
  name: string;
  prefix: string;
}

interface Subcategory {
  id: string;
  name: string;
  category_id: string;
}

interface Brand {
  id: string;
  name: string;
  prefix: string;
}

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  
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
  
  // New feature input state
  const [newFeature, setNewFeature] = useState('');
  
  // Filtered subcategories based on selected category
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);
  
  // Load data
  useEffect(() => {
    const fetchData = async () => {
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*');
      
      if (categoriesError) {
        console.error('Error fetching categories:', categoriesError);
        toast({
          title: 'Error',
          description: 'No se pudieron cargar las categorías',
          variant: 'destructive',
        });
      } else {
        setCategories(categoriesData || []);
      }
      
      // Fetch subcategories
      const { data: subcategoriesData, error: subcategoriesError } = await supabase
        .from('subcategories')
        .select('*');
      
      if (subcategoriesError) {
        console.error('Error fetching subcategories:', subcategoriesError);
        toast({
          title: 'Error',
          description: 'No se pudieron cargar las subcategorías',
          variant: 'destructive',
        });
      } else {
        setSubcategories(subcategoriesData || []);
        
        // Filter subcategories if we have a category selected
        if (categoryId) {
          setFilteredSubcategories(
            subcategoriesData?.filter((sub) => sub.category_id === categoryId) || []
          );
        }
      }
      
      // Fetch brands
      const { data: brandsData, error: brandsError } = await supabase
        .from('brands')
        .select('*');
      
      if (brandsError) {
        console.error('Error fetching brands:', brandsError);
        toast({
          title: 'Error',
          description: 'No se pudieron cargar las marcas',
          variant: 'destructive',
        });
      } else {
        setBrands(brandsData || []);
      }
    };
    
    fetchData();
  }, [toast]);
  
  useEffect(() => {
    // Filter subcategories when category changes
    if (categoryId) {
      setFilteredSubcategories(
        subcategories.filter((sub) => sub.category_id === categoryId) || []
      );
    } else {
      setFilteredSubcategories([]);
      setSubcategoryId('');
    }
  }, [categoryId, subcategories]);
  
  // Auto-generate SKU when category or brand changes
  useEffect(() => {
    if (categoryId && brandId && !initialData?.id) {
      const selectedCategory = categories.find((cat) => cat.id === categoryId);
      const selectedBrand = brands.find((brand) => brand.id === brandId);
      
      if (selectedCategory && selectedBrand) {
        // Format: [PREFIX_CATEGORY]-[PREFIX_BRAND]-[NAME_SIMPLIFIED]
        const productIdentifier = name
          .replace(/[^a-zA-Z0-9]/g, '') // Remove special characters
          .substring(0, 8) // Limit to 8 chars
          .toUpperCase();
          
        const newSku = `${selectedCategory.prefix}-${selectedBrand.prefix}-${productIdentifier || 'XXXXX'}`;
        setSku(newSku);
      }
    }
  }, [categoryId, brandId, name, categories, brands, initialData?.id]);
  
  const handleAddFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };
  
  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };
  
  const validateForm = () => {
    if (!name) {
      toast({ title: 'Error', description: 'El nombre del producto es obligatorio', variant: 'destructive' });
      return false;
    }
    if (!sku || !/^[A-Z]{3}-[A-Z]{3}-[A-Z0-9]+$/.test(sku)) {
      toast({ title: 'Error', description: 'El SKU debe tener el formato AAA-BBB-XXXXX', variant: 'destructive' });
      return false;
    }
    if (!price || isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      toast({ title: 'Error', description: 'El precio debe ser un número mayor a 0', variant: 'destructive' });
      return false;
    }
    if (salePrice && (isNaN(parseFloat(salePrice)) || parseFloat(salePrice) <= 0)) {
      toast({ title: 'Error', description: 'El precio de oferta debe ser un número mayor a 0', variant: 'destructive' });
      return false;
    }
    if (salePrice && parseFloat(salePrice) >= parseFloat(price)) {
      toast({ title: 'Error', description: 'El precio de oferta debe ser menor al precio regular', variant: 'destructive' });
      return false;
    }
    if (saleStartDate && saleEndDate && saleStartDate >= saleEndDate) {
      toast({ title: 'Error', description: 'La fecha de inicio de oferta debe ser anterior a la fecha de fin', variant: 'destructive' });
      return false;
    }
    if (!categoryId) {
      toast({ title: 'Error', description: 'Debe seleccionar una categoría', variant: 'destructive' });
      return false;
    }
    if (!brandId) {
      toast({ title: 'Error', description: 'Debe seleccionar una marca', variant: 'destructive' });
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const productData = {
        name,
        description,
        features: { items: features },
        sku,
        price: parseFloat(price),
        sale_price: salePrice ? parseFloat(salePrice) : null,
        sale_start_date: saleStartDate ? saleStartDate.toISOString() : null,
        sale_end_date: saleEndDate ? saleEndDate.toISOString() : null,
        category_id: categoryId || null,
        subcategory_id: subcategoryId || null,
        brand_id: brandId || null,
        is_active: isActive,
        is_featured: isFeatured,
        stock: stock ? parseInt(stock) : 1
      };
      
      let result;
      
      if (initialData?.id) {
        // Update existing product
        result = await supabase
          .from('products')
          .update(productData)
          .eq('id', initialData.id)
          .select();
      } else {
        // Create new product
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
        description: initialData?.id 
          ? 'Producto actualizado correctamente' 
          : 'Producto creado correctamente',
      });
      
      onSuccess();
    } catch (error: any) {
      console.error('Error saving product:', error);
      toast({
        title: 'Error',
        description: `No se pudo ${initialData?.id ? 'actualizar' : 'crear'} el producto: ${error.message || 'Error desconocido'}`,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre del Producto *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Alarma Viper 3606V"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="sku">SKU *</Label>
            <Input
              id="sku"
              value={sku}
              onChange={(e) => setSku(e.target.value.toUpperCase())}
              placeholder="Formato: AAA-BBB-12345"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Formato: [PREFIJO_CATEGORIA]-[PREFIJO_MARCA]-[IDENTIFICADOR]
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Precio Regular (S/) *</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                min="0.01"
                step="0.01"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="salePrice">Precio de Oferta (S/)</Label>
              <Input
                id="salePrice"
                type="number"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                placeholder="0.00"
                min="0.01"
                step="0.01"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Fecha Inicio de Oferta</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {saleStartDate ? (
                      format(saleStartDate, "PPP", { locale: es })
                    ) : (
                      <span>Seleccionar fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={saleStartDate}
                    onSelect={setSaleStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label>Fecha Fin de Oferta</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {saleEndDate ? (
                      format(saleEndDate, "PPP", { locale: es })
                    ) : (
                      <span>Seleccionar fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={saleEndDate}
                    onSelect={setSaleEndDate}
                    initialFocus
                    disabled={(date) => 
                      saleStartDate ? date < saleStartDate : false
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div>
            <Label htmlFor="stock">Stock (Unidades)</Label>
            <Input
              id="stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="1"
              min="0"
            />
          </div>
          
          <div className="flex space-x-8">
            <div className="flex items-center space-x-2">
              <Switch
                id="is-active"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <Label htmlFor="is-active">Activo</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="is-featured"
                checked={isFeatured}
                onCheckedChange={setIsFeatured}
              />
              <Label htmlFor="is-featured">Destacado</Label>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="category">Categoría *</Label>
            <Select 
              value={categoryId} 
              onValueChange={setCategoryId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name} ({category.prefix})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="subcategory">Subcategoría</Label>
            <Select 
              value={subcategoryId} 
              onValueChange={setSubcategoryId}
              disabled={!categoryId || filteredSubcategories.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar subcategoría" />
              </SelectTrigger>
              <SelectContent>
                {/* Added a default option with non-empty value */}
                <SelectItem value="none">Sin subcategoría</SelectItem>
                {filteredSubcategories.map((subcategory) => (
                  <SelectItem key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="brand">Marca *</Label>
            <Select 
              value={brandId} 
              onValueChange={setBrandId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar marca" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.name} ({brand.prefix})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción detallada del producto..."
              rows={3}
            />
          </div>
          
          <div>
            <Label>Características</Label>
            <div className="flex space-x-2 mb-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Nueva característica..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
              />
              <Button 
                type="button" 
                variant="secondary" 
                onClick={handleAddFeature}
              >
                Agregar
              </Button>
            </div>
            
            <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                  <span>{feature}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFeature(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
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
