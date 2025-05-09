
// This is sample data for the catalog
// In a real application, this would come from a database or API

// Product type definition
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  subcategory?: string;
  brand: string;
  rating?: number;
  badge?: string;
  isNew?: boolean;
  isFavorite?: boolean;
}

// Product categories data structure
export const productCategories = [
  {
    id: "llaves",
    name: "Llaves",
    icon: "🔑",
    subcategories: [
      { id: "con-chip", name: "Con chip" },
      { id: "sin-chip", name: "Sin chip" },
      { id: "carcasas", name: "Carcasas" },
      { id: "controles", name: "Controles" }
    ]
  },
  {
    id: "alarmas",
    name: "Alarmas",
    icon: "🚨",
    subcategories: [
      { id: "con-llave", name: "Con llave" },
      { id: "sin-llave", name: "Sin llave" },
      { id: "viper", name: "Viper" },
      { id: "oem", name: "OEM" }
    ]
  },
  {
    id: "luces",
    name: "Luces",
    icon: "💡",
    subcategories: [
      { id: "led", name: "LED" },
      { id: "halogenos", name: "Halógenos" },
      { id: "barras", name: "Barras LED" },
      { id: "neblineros", name: "Neblineros" }
    ]
  },
  {
    id: "gps",
    name: "GPS",
    icon: "📍",
    subcategories: [
      { id: "tracker", name: "Tracker" },
      { id: "accesorios-gps", name: "Accesorios GPS" }
    ]
  },
  {
    id: "parlantes",
    name: "Parlantes",
    icon: "🔊",
    subcategories: [
      { id: "pioneer", name: "Pioneer" },
      { id: "subwoofer", name: "Subwoofer" },
      { id: "amplificadores", name: "Amplificadores" }
    ]
  },
  {
    id: "autoradios",
    name: "Autoradios",
    icon: "📻",
    subcategories: [
      { id: "con-chip", name: "Con chip" },
      { id: "sin-chip", name: "Sin chip" },
      { id: "consolas", name: "Consolas" }
    ]
  },
  {
    id: "corporativas",
    name: "Corporativas",
    icon: "🏢",
    subcategories: [
      { id: "alarmas-corp", name: "Alarmas" },
      { id: "gps-corp", name: "GPS" },
      { id: "cercos", name: "Cercos Electrónicos" }
    ]
  }
];

// Available brands
export const brands = [
  "Pioneer",
  "Viper",
  "Sony",
  "Kenwood",
  "Alpine",
  "JBL",
  "Genius",
  "3M",
  "Bosch",
  "Osram",
  "Philips"
];

// Sample products data
export const products: Product[] = [
  {
    id: "1",
    name: "Alarma Viper 3106V",
    description: "Sistema de seguridad básico con control remoto de 1 vía y sirena de 120dB",
    price: 299.90,
    oldPrice: 349.90,
    image: "https://via.placeholder.com/300x300?text=Alarma+Viper",
    category: "alarmas",
    subcategory: "viper",
    brand: "Viper",
    rating: 4.5,
    badge: "15% OFF",
    isFavorite: false
  },
  {
    id: "2",
    name: "GPS Tracker GT06N",
    description: "Localizador GPS para vehículos con corte de motor y monitoreo en tiempo real",
    price: 199.90,
    image: "https://via.placeholder.com/300x300?text=GPS+Tracker",
    category: "gps",
    subcategory: "tracker",
    brand: "Genius",
    rating: 4.2,
    isNew: true,
    isFavorite: true
  },
  {
    id: "3",
    name: "Llave con chip para Toyota",
    description: "Llave con transponder programable para vehículos Toyota Yaris, Corolla y RAV4",
    price: 149.90,
    image: "https://via.placeholder.com/300x300?text=Llave+Toyota",
    category: "llaves",
    subcategory: "con-chip",
    brand: "3M",
    rating: 4.0,
    isFavorite: false
  },
  {
    id: "4",
    name: "Autoradio Pioneer MVH-S215BT",
    description: "Radio con Bluetooth, USB, AUX y control desde smartphone",
    price: 399.90,
    oldPrice: 450.00,
    image: "https://via.placeholder.com/300x300?text=Radio+Pioneer",
    category: "autoradios",
    subcategory: "con-chip",
    brand: "Pioneer",
    rating: 4.8,
    badge: "Oferta",
    isFavorite: true
  },
  {
    id: "5",
    name: "Parlantes JBL Stage 6x9",
    description: "Par de parlantes coaxiales de tres vías, potencia máxima 300W",
    price: 259.90,
    image: "https://via.placeholder.com/300x300?text=Parlantes+JBL",
    category: "parlantes",
    subcategory: "pioneer",
    brand: "JBL",
    rating: 4.6,
    isFavorite: false
  },
  {
    id: "6",
    name: "Luces LED H7 Osram",
    description: "Kit de luces LED 6000K ultra brillantes para faros delanteros",
    price: 189.90,
    oldPrice: 210.00,
    image: "https://via.placeholder.com/300x300?text=Luces+LED",
    category: "luces",
    subcategory: "led",
    brand: "Osram",
    rating: 4.3,
    isFavorite: false
  },
  {
    id: "7",
    name: "Control remoto para alarma Viper",
    description: "Control de reemplazo para sistemas de seguridad Viper serie 350 PLUS",
    price: 120.00,
    image: "https://via.placeholder.com/300x300?text=Control+Viper",
    category: "llaves",
    subcategory: "controles",
    brand: "Viper",
    rating: 3.9,
    isFavorite: true
  },
  {
    id: "8",
    name: "Subwoofer Alpine SWE-1244",
    description: "Subwoofer de 12 pulgadas, 1500W de potencia máxima",
    price: 599.90,
    oldPrice: 650.00,
    image: "https://via.placeholder.com/300x300?text=Subwoofer+Alpine",
    category: "parlantes",
    subcategory: "subwoofer",
    brand: "Alpine",
    rating: 4.7,
    badge: "Hot",
    isFavorite: false
  },
  {
    id: "9",
    name: "Faros neblineros Philips H11",
    description: "Par de faros neblineros con tecnología Crystal Vision, luz blanca",
    price: 150.00,
    image: "https://via.placeholder.com/300x300?text=Neblineros+Philips",
    category: "luces",
    subcategory: "neblineros",
    brand: "Philips",
    rating: 4.1,
    isFavorite: false
  },
  {
    id: "10",
    name: "GPS para flotilla empresarial",
    description: "Sistema completo de monitoreo GPS para flotillas con plataforma web",
    price: 1200.00,
    image: "https://via.placeholder.com/300x300?text=GPS+Flotilla",
    category: "corporativas",
    subcategory: "gps-corp",
    brand: "Genius",
    rating: 4.9,
    isNew: true,
    isFavorite: false
  },
  {
    id: "11",
    name: "Barra LED 42\" para techo",
    description: "Barra de luces LED de 200W con doble hilera y soportes universales",
    price: 450.00,
    oldPrice: 520.00,
    image: "https://via.placeholder.com/300x300?text=Barra+LED",
    category: "luces",
    subcategory: "barras",
    brand: "Osram",
    rating: 4.4,
    badge: "Oferta especial",
    isFavorite: true
  },
  {
    id: "12",
    name: "Amplificador Kenwood KAC-PS702EX",
    description: "Amplificador estéreo de 2 canales, 500W de potencia máxima",
    price: 780.00,
    image: "https://via.placeholder.com/300x300?text=Amplificador+Kenwood",
    category: "parlantes",
    subcategory: "amplificadores",
    brand: "Kenwood",
    rating: 4.3,
    isFavorite: false
  }
];
