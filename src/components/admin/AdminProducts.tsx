
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter, Edit, Trash2, Save } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const AdminProducts = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Mock product data - in a real app, this would come from the backend
  const [mockProducts, setMockProducts] = useState([
    {
      id: '1',
      sku: 'ALM-VIP-3606V',
      name: 'Alarma Viper 3606V',
      price: 699.99,
      category: 'Alarmas',
      subcategory: 'Alarmas sin llave',
      brand: 'Viper',
      description: 'Alarma de alta calidad con sistema de seguridad avanzado',
      isActive: true
    },
    {
      id: '2',
      sku: 'ALM-VIP-5806V',
      name: 'Alarma Viper 5806V',
      price: 899.99,
      category: 'Alarmas',
      subcategory: 'Alarmas sin llave',
      brand: 'Viper',
      description: 'Alarma premium con características adicionales de seguridad',
      isActive: true
    },
    {
      id: '3',
      sku: 'RAD-PIO-S215BT',
      name: 'Autoradio Pioneer MVH-S215BT',
      price: 449.99,
      category: 'Autoradios',
      subcategory: 'Autoradios con Bluetooth',
      brand: 'Pioneer',
      description: 'Autoradio con Bluetooth para conectividad móvil',
      isActive: false
    }
  ]);

  const handleNewProduct = () => {
    setEditingProduct({
      id: '',
      sku: '',
      name: '',
      price: 0,
      category: '',
      subcategory: '',
      brand: '',
      description: '',
      isActive: true
    });
    setDialogOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct({...product});
    setDialogOpen(true);
  };

  const handleDeleteProduct = (product: any) => {
    setEditingProduct(product);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // In a real app, you would call an API to delete the product
    const updatedProducts = mockProducts.filter(p => p.id !== editingProduct.id);
    setMockProducts(updatedProducts);
    
    toast({
      title: "Producto eliminado",
      description: `${editingProduct.name} ha sido eliminado correctamente`,
    });
    
    setDeleteDialogOpen(false);
  };

  const handleSaveProduct = () => {
    // Validate SKU format: [PREFIJO_CATEGORIA]-[PREFIJO_MARCA]-[IDENTIFICADOR_PRODUCTO]
    const skuPattern = /^[A-Z]{3}-[A-Z]{3}-[A-Z0-9]+$/;
    if (!skuPattern.test(editingProduct.sku)) {
      toast({
        title: "Error en SKU",
        description: "El SKU debe seguir el formato: [PREFIJO_CATEGORIA]-[PREFIJO_MARCA]-[IDENTIFICADOR_PRODUCTO]",
        variant: "destructive"
      });
      return;
    }

    // In a real app, you would call an API to save the product
    if (editingProduct.id) {
      // Update existing product
      const updatedProducts = mockProducts.map(p => 
        p.id === editingProduct.id ? editingProduct : p
      );
      setMockProducts(updatedProducts);
      toast({
        title: "Producto actualizado",
        description: `${editingProduct.name} ha sido actualizado correctamente`
      });
    } else {
      // Create new product
      const newProduct = {
        ...editingProduct,
        id: `${mockProducts.length + 1}`
      };
      setMockProducts([...mockProducts, newProduct]);
      toast({
        title: "Producto creado",
        description: `${newProduct.name} ha sido creado correctamente`
      });
    }
    
    setDialogOpen(false);
  };

  // Filter products based on search query
  const filteredProducts = mockProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Productos</h2>
        <Button className="bg-vicar-blue" onClick={handleNewProduct}>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">{mockProducts.length}</div>
              <div className="text-gray-500">Productos</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">{mockProducts.filter(p => p.isActive).length}</div>
              <div className="text-gray-500">Activos</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">{mockProducts.filter(p => !p.isActive).length}</div>
              <div className="text-gray-500">Inactivos</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            type="text"
            placeholder="Buscar por nombre, SKU, o categoría"
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filtros
        </Button>
      </div>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Precio (S/)</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>S/ {product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                        <Edit className="h-4 w-4 mr-1" /> Editar
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDeleteProduct(product)}>
                        <Trash2 className="h-4 w-4 mr-1" /> Eliminar
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit/Create Product Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingProduct?.id ? 'Editar Producto' : 'Nuevo Producto'}</DialogTitle>
            <DialogDescription>
              Complete los detalles del producto. El SKU debe seguir el formato: [PREFIJO_CATEGORIA]-[PREFIJO_MARCA]-[IDENTIFICADOR_PRODUCTO]
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input 
                id="sku" 
                placeholder="ALM-VIP-1234" 
                value={editingProduct?.sku || ''}
                onChange={(e) => setEditingProduct({...editingProduct, sku: e.target.value.toUpperCase()})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Producto</Label>
              <Input 
                id="name" 
                placeholder="Alarma Viper XYZ" 
                value={editingProduct?.name || ''}
                onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Precio (S/)</Label>
              <Input 
                id="price" 
                type="number" 
                min="0"
                step="0.01"
                placeholder="0.00" 
                value={editingProduct?.price || ''}
                onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <Select 
                value={editingProduct?.category || ''}
                onValueChange={(value) => setEditingProduct({...editingProduct, category: value})}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alarmas">Alarmas</SelectItem>
                  <SelectItem value="Autoradios">Autoradios</SelectItem>
                  <SelectItem value="Baterías">Baterías</SelectItem>
                  <SelectItem value="Parlantes">Parlantes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subcategory">Subcategoría</Label>
              <Select 
                value={editingProduct?.subcategory || ''}
                onValueChange={(value) => setEditingProduct({...editingProduct, subcategory: value})}
              >
                <SelectTrigger id="subcategory">
                  <SelectValue placeholder="Seleccionar subcategoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alarmas sin llave">Alarmas sin llave</SelectItem>
                  <SelectItem value="Alarmas con llave">Alarmas con llave</SelectItem>
                  <SelectItem value="Autoradios con Bluetooth">Autoradios con Bluetooth</SelectItem>
                  <SelectItem value="Autoradios con CD">Autoradios con CD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="brand">Marca</Label>
              <Select 
                value={editingProduct?.brand || ''}
                onValueChange={(value) => setEditingProduct({...editingProduct, brand: value})}
              >
                <SelectTrigger id="brand">
                  <SelectValue placeholder="Seleccionar marca" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Viper">Viper</SelectItem>
                  <SelectItem value="Prestige">Prestige</SelectItem>
                  <SelectItem value="Pioneer">Pioneer</SelectItem>
                  <SelectItem value="Sony">Sony</SelectItem>
                  <SelectItem value="Bosch">Bosch</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <Select 
                value={editingProduct?.isActive ? "active" : "inactive"}
                onValueChange={(value) => setEditingProduct({...editingProduct, isActive: value === "active"})}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="inactive">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 col-span-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea 
                id="description"
                placeholder="Descripción detallada del producto..."
                rows={4}
                value={editingProduct?.description || ''}
                onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveProduct} className="bg-vicar-blue">
              <Save className="mr-2 h-4 w-4" />
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Está seguro de que desea eliminar el producto "{editingProduct?.name}"?
              Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
