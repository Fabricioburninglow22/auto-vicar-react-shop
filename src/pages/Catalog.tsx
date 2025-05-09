import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { 
  Filter, Star, ChevronDown, ChevronUp, Check, X, SlidersHorizontal, ArrowUpDown, Grid3X3 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/shared/ProductCard';
import { Button } from '@/components/ui/button';
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Sample data
import { products, brands, productCategories } from '@/data/catalog-data';

const CatalogPage = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const subcategoryParam = searchParams.get('sub');
  const showOffersParam = searchParams.get('offers');
  const { toast } = useToast();
  const { user } = useAuth();

  // States for filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryId ? [categoryId] : []
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    subcategoryParam ? [subcategoryParam] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showOffers, setShowOffers] = useState(showOffersParam === 'true');
  const [sortOption, setSortOption] = useState("recommended");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Handle subcategory and offers query params
  useEffect(() => {
    if (subcategoryParam) {
      setSelectedSubcategories([subcategoryParam]);
    }
    
    if (showOffersParam === 'true') {
      setShowOffers(true);
    }
  }, [subcategoryParam, showOffersParam]);

  // Handle category from URL
  useEffect(() => {
    if (categoryId) {
      setSelectedCategories([categoryId]);
    } else {
      setSelectedCategories([]);
    }
  }, [categoryId]);
  
  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];
    
    // Filter by price
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      result = result.filter(product => 
        selectedCategories.includes(product.category)
      );
    }
    
    // Filter by subcategories
    if (selectedSubcategories.length > 0) {
      result = result.filter(product => 
        product.subcategory && selectedSubcategories.includes(product.subcategory)
      );
    }
    
    // Filter by brands
    if (selectedBrands.length > 0) {
      result = result.filter(product => 
        selectedBrands.includes(product.brand)
      );
    }
    
    // Filter by favorites
    if (showFavorites) {
      result = result.filter(product => product.isFavorite);
    }
    
    // Filter by offers
    if (showOffers) {
      result = result.filter(product => product.oldPrice !== undefined);
    }
    
    // Apply sorting
    switch (sortOption) {
      case "price_low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "recommended":
        // In a real app this would use a recommendation algorithm
        // For now we'll sort by a combination of factors
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
  }, [
    priceRange, 
    selectedCategories, 
    selectedSubcategories,
    selectedBrands, 
    showFavorites, 
    showOffers, 
    sortOption
  ]);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubcategoryToggle = (subcategoryId: string) => {
    setSelectedSubcategories(prev => 
      prev.includes(subcategoryId)
        ? prev.filter(id => id !== subcategoryId)
        : [...prev, subcategoryId]
    );
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 5000]);
    setSelectedCategories(categoryId ? [categoryId] : []);
    setSelectedSubcategories(subcategoryParam ? [subcategoryParam] : []);
    setSelectedBrands([]);
    setShowFavorites(false);
    setShowOffers(false);
    setSortOption("recommended");
    
    toast({
      title: "Filtros limpiados",
      description: "Todos los filtros han sido restablecidos",
    });
  };

  // Determine active filter count for mobile badge
  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedCategories.length > 0) count++;
    if (selectedSubcategories.length > 0) count++;
    if (selectedBrands.length > 0) count++;
    if (showFavorites) count++;
    if (showOffers) count++;
    if (priceRange[0] > 0 || priceRange[1] < 5000) count++;
    return count;
  };

  // Filter sidebar component
  const FilterSidebar = ({ isMobile = false }) => (
    <div className={`
      ${isMobile ? 'w-full' : 'w-64 hidden md:block sticky top-24 h-[calc(100vh-100px)] overflow-y-auto'}
      bg-white shadow-sm rounded-lg
    `}>
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros
          </h3>
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMobileFiltersOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-5">
        {/* Price Range Filter */}
        <div className="space-y-2">
          <h4 className="font-medium">Precio</h4>
          <div className="px-1">
            <Slider 
              value={[priceRange[0], priceRange[1]]} 
              min={0} 
              max={5000} 
              step={50}
              onValueChange={(value) => setPriceRange([value[0], value[1]])}
              className="mt-6"
            />
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <div>S/ {priceRange[0]}</div>
              <div>S/ {priceRange[1]}</div>
            </div>
          </div>
        </div>

        {/* Recommended/Featured Filter */}
        <div className="space-y-2">
          <h4 className="font-medium">Recomendados</h4>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="recommended" 
              checked={sortOption === "recommended"}
              onCheckedChange={() => setSortOption("recommended")}
            />
            <label
              htmlFor="recommended"
              className="text-sm text-gray-700 leading-none cursor-pointer"
            >
              Productos recomendados
            </label>
          </div>
        </div>

        {/* Favorites Filter */}
        <div className="space-y-2">
          <h4 className="font-medium">Favoritos</h4>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="favorites" 
              checked={showFavorites}
              onCheckedChange={() => {
                if (!user) {
                  toast({
                    title: "Acceso restringido",
                    description: "Por favor inicia sesión para ver tus favoritos",
                    variant: "destructive"
                  });
                  return;
                }
                setShowFavorites(!showFavorites);
              }}
            />
            <label
              htmlFor="favorites"
              className="text-sm text-gray-700 leading-none cursor-pointer"
            >
              Ver solo favoritos
            </label>
          </div>
        </div>

        {/* Offers Filter */}
        <div className="space-y-2">
          <h4 className="font-medium">Ofertas</h4>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="offers" 
              checked={showOffers}
              onCheckedChange={() => setShowOffers(!showOffers)}
            />
            <label
              htmlFor="offers"
              className="text-sm text-gray-700 leading-none cursor-pointer"
            >
              Ver solo ofertas
            </label>
          </div>
        </div>

        {/* Categories Filter */}
        <Accordion type="multiple" defaultValue={selectedCategories}>
          <AccordionItem value="categories">
            <AccordionTrigger className="hover:no-underline">
              <span className="font-medium">Categorías</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {productCategories.map((category) => (
                  <div key={category.id}>
                    <div className="flex items-center space-x-2 mb-1">
                      <Checkbox 
                        id={`cat-${category.id}`} 
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => handleCategoryToggle(category.id)}
                      />
                      <label
                        htmlFor={`cat-${category.id}`}
                        className="text-sm font-medium text-gray-700 leading-none cursor-pointer"
                      >
                        {category.name}
                      </label>
                    </div>
                    
                    {selectedCategories.includes(category.id) && category.subcategories && (
                      <div className="ml-6 space-y-1 mt-1">
                        {category.subcategories.map((subcat) => (
                          <div key={subcat.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`subcat-${subcat.id}`} 
                              checked={selectedSubcategories.includes(subcat.id)}
                              onCheckedChange={() => handleSubcategoryToggle(subcat.id)}
                            />
                            <label
                              htmlFor={`subcat-${subcat.id}`}
                              className="text-sm text-gray-600 leading-none cursor-pointer"
                            >
                              {subcat.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Brands Filter */}
        <Accordion type="multiple">
          <AccordionItem value="brands">
            <AccordionTrigger className="hover:no-underline">
              <span className="font-medium">Marcas</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`brand-${brand}`} 
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => handleBrandToggle(brand)}
                    />
                    <label
                      htmlFor={`brand-${brand}`}
                      className="text-sm text-gray-700 leading-none cursor-pointer"
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Clear Filters Button */}
        <Button 
          variant="outline" 
          className="w-full mt-4"
          onClick={clearFilters}
        >
          Limpiar filtros
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar categories={productCategories} />
      
      <div className="container mx-auto px-4 py-6 flex-grow">
        {/* Breadcrumb */}
        <div className="mb-4 text-sm text-gray-600">
          <Link to="/" className="hover:text-vicar-blue">Inicio</Link>
          <span className="mx-2">/</span>
          <span>Catálogo</span>
          {categoryId && (
            <>
              <span className="mx-2">/</span>
              <span className="capitalize">{categoryId}</span>
            </>
          )}
          {subcategoryParam && (
            <>
              <span className="mx-2">/</span>
              <span className="capitalize">{subcategoryParam}</span>
            </>
          )}
          {showOffersParam === 'true' && (
            <>
              <span className="mx-2">/</span>
              <span>Ofertas</span>
            </>
          )}
        </div>
        
        {/* Page Title */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            {showOffersParam === 'true' ? (
              'Ofertas Especiales'
            ) : categoryId ? (
              <span className="capitalize">{categoryId}</span>
            ) : (
              'Catálogo de Productos'
            )}
          </h1>
          
          {/* Mobile Filter Button */}
          <Button 
            variant="outline" 
            className="flex items-center gap-1 md:hidden"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <Filter className="w-4 h-4" />
            Filtros
            {getActiveFilterCount() > 0 && (
              <span className="bg-vicar-blue text-white rounded-full text-xs w-5 h-5 flex items-center justify-center ml-1">
                {getActiveFilterCount()}
              </span>
            )}
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar - Desktop */}
          <FilterSidebar />
          
          {/* Main Content Area */}
          <div className="flex-grow">
            {/* Sort Options */}
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {filteredProducts.length} productos encontrados
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700 hidden sm:inline">Ordenar por:</span>
                    <select 
                      className="rounded-md border border-gray-300 py-1.5 pl-3 pr-8 text-sm"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                    >
                      <option value="recommended">Recomendados</option>
                      <option value="newest">Más nuevos</option>
                      <option value="price_low">Precio: Bajo a Alto</option>
                      <option value="price_high">Precio: Alto a Bajo</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    oldPrice={product.oldPrice}
                    image={product.image}
                    badge={product.badge}
                    isNew={product.isNew}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="text-gray-400 mb-3">
                  <X className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Sin resultados</h3>
                <p className="text-gray-500 mt-1">
                  No se encontraron productos que coincidan con los filtros seleccionados.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={clearFilters}
                >
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Filters Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex md:hidden">
          <div className="bg-white w-full max-w-sm ml-auto h-full overflow-y-auto animate-slide-in-right">
            <FilterSidebar isMobile={true} />
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default CatalogPage;
