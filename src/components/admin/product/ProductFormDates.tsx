
import React from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface ProductFormDatesProps {
  saleStartDate?: Date;
  saleEndDate?: Date;
  onSaleStartDateChange: (date?: Date) => void;
  onSaleEndDateChange: (date?: Date) => void;
}

const ProductFormDates: React.FC<ProductFormDatesProps> = ({
  saleStartDate,
  saleEndDate,
  onSaleStartDateChange,
  onSaleEndDateChange
}) => {
  return (
    <>
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
              onSelect={onSaleStartDateChange}
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
              onSelect={onSaleEndDateChange}
              initialFocus
              disabled={(date) => 
                saleStartDate ? date < saleStartDate : false
              }
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default ProductFormDates;
