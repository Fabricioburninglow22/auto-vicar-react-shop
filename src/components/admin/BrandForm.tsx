
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
  
  const [name, setName] = useState(initialData?.name || '');
  const [prefix, setPrefix] = useState(initialData?.prefix || '');

  // Función para convertir el texto a mayúsculas y limitar a 3 caracteres
  const handlePrefixChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3);
    setPrefix(value);
  };

  const validateForm = () => {
    if (!name) {
      toast({ title: 'Error', description: 'El nombre de la marca es obligatorio', variant: 'destructive' });
      return false;
    }
    if (!prefix || prefix.length !== 3) {
      toast({ title: 'Error', description: 'El prefijo debe tener exactamente 3 letras mayúsculas', variant: 'destructive' });
      return false;
    }
    return true;
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
      <div className="space-y-2">
        <Label htmlFor="name">Nombre de la Marca *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej. Sony, Pioneer, Viper"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="prefix">Prefijo (3 letras) *</Label>
        <Input
          id="prefix"
          value={prefix}
          onChange={handlePrefixChange}
          placeholder="Ej. SNY, PIO, VIP"
          maxLength={3}
          required
        />
        <p className="text-xs text-gray-500">
          El prefijo debe ser de exactamente 3 letras mayúsculas y se utilizará para generar los SKUs de los productos.
        </p>
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
