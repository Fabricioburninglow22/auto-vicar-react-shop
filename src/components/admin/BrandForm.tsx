
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

interface BrandFormProps {
  initialData?: {
    id?: string;
    name: string;
    prefix: string;
  };
  onSuccess: () => void;
  onCancel: () => void;
}

const BrandForm: React.FC<BrandFormProps> = ({ initialData, onSuccess, onCancel }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [name, setName] = useState(initialData?.name || '');
  const [prefix, setPrefix] = useState(initialData?.prefix || '');
  
  // Errors
  const [errors, setErrors] = useState({
    name: '',
    prefix: '',
  });
  
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      prefix: '',
    };
    
    if (!name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
      valid = false;
    }
    
    if (!prefix.trim()) {
      newErrors.prefix = 'El prefijo es obligatorio';
      valid = false;
    } else if (prefix.length !== 3) {
      newErrors.prefix = 'El prefijo debe tener exactamente 3 caracteres';
      valid = false;
    } else if (prefix !== prefix.toUpperCase()) {
      newErrors.prefix = 'El prefijo debe estar en mayúsculas';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handlePrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convert to uppercase and limit to 3 characters
    const value = e.target.value.toUpperCase().slice(0, 3);
    setPrefix(value);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const brandData = {
        name,
        prefix,
      };
      
      let result;
      
      if (initialData?.id) {
        // Update existing brand
        result = await supabase
          .from('brands')
          .update(brandData)
          .eq('id', initialData.id)
          .select();
      } else {
        // Create new brand
        result = await supabase
          .from('brands')
          .insert(brandData)
          .select();
      }
      
      if (result.error) {
        throw result.error;
      }
      
      toast({
        title: 'Éxito',
        description: initialData?.id 
          ? 'Marca actualizada correctamente' 
          : 'Marca creada correctamente',
      });
      
      onSuccess();
    } catch (error: any) {
      console.error('Error saving brand:', error);
      toast({
        title: 'Error',
        description: `No se pudo ${initialData?.id ? 'actualizar' : 'crear'} la marca: ${error.message || 'Error desconocido'}`,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nombre de la Marca *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej. Pioneer"
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>
      
      <div>
        <Label htmlFor="prefix">Prefijo (3 caracteres) *</Label>
        <Input
          id="prefix"
          value={prefix}
          onChange={handlePrefixChange}
          placeholder="Ej. PIO"
          maxLength={3}
          className={errors.prefix ? 'border-red-500' : ''}
        />
        <p className="text-xs text-gray-500 mt-1">
          Debe ser exactamente 3 letras en mayúsculas (ej. PIO, SON)
        </p>
        {errors.prefix && (
          <p className="text-red-500 text-sm mt-1">{errors.prefix}</p>
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
          {initialData?.id ? 'Actualizar' : 'Crear'} Marca
        </Button>
      </div>
    </form>
  );
};

export default BrandForm;
