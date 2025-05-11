
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

interface Category {
  id: string;
  name: string;
}

interface SubcategoryFormProps {
  initialData?: {
    id?: string;
    name: string;
    category_id: string;
  };
  onSuccess: () => void;
  onCancel: () => void;
}

const SubcategoryForm: React.FC<SubcategoryFormProps> = ({ initialData, onSuccess, onCancel }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Form state
  const [name, setName] = useState(initialData?.name || '');
  const [categoryId, setCategoryId] = useState(initialData?.category_id || '');
  
  // Errors
  const [errors, setErrors] = useState({
    name: '',
    categoryId: '',
  });
  
  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('id, name')
          .order('name');
        
        if (error) {
          throw error;
        }
        
        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast({
          title: 'Error',
          description: 'No se pudieron cargar las categorías',
          variant: 'destructive',
        });
      }
    };
    
    fetchCategories();
  }, [toast]);
  
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      categoryId: '',
    };
    
    if (!name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
      valid = false;
    }
    
    if (!categoryId) {
      newErrors.categoryId = 'Debe seleccionar una categoría';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const subcategoryData = {
        name,
        category_id: categoryId,
      };
      
      let result;
      
      if (initialData?.id) {
        // Update existing subcategory
        result = await supabase
          .from('subcategories')
          .update(subcategoryData)
          .eq('id', initialData.id)
          .select();
      } else {
        // Create new subcategory
        result = await supabase
          .from('subcategories')
          .insert(subcategoryData)
          .select();
      }
      
      if (result.error) {
        throw result.error;
      }
      
      toast({
        title: 'Éxito',
        description: initialData?.id 
          ? 'Subcategoría actualizada correctamente' 
          : 'Subcategoría creada correctamente',
      });
      
      onSuccess();
    } catch (error: any) {
      console.error('Error saving subcategory:', error);
      toast({
        title: 'Error',
        description: `No se pudo ${initialData?.id ? 'actualizar' : 'crear'} la subcategoría: ${error.message || 'Error desconocido'}`,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="category">Categoría Principal *</Label>
        <Select 
          value={categoryId} 
          onValueChange={setCategoryId}
        >
          <SelectTrigger className={errors.categoryId ? 'border-red-500' : ''}>
            <SelectValue placeholder="Seleccionar categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.categoryId && (
          <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="name">Nombre de la Subcategoría *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej. Alarmas sin llave"
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>
      
      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {initialData?.id ? 'Actualizar' : 'Crear'} Subcategoría
        </Button>
      </div>
    </form>
  );
};

export default SubcategoryForm;
