import type { Lang } from "./i18n";

export type CatId = "cevicheria" | "criolla" | "marina" | "chifa" | "sangucheria" | "jugos";

export type Huarique = {
  id: string;
  name: string;
  cat: CatId;
  district: string;
  dish: string;
  emoji: string;
  image: string;    // ruta desde /public
  tone: string;     // fondo del plato (fallback si no carga la imagen)
  price: [number, number];
  rating: number;
  meters: number;
  open: boolean;
  blurb: Record<Lang, string>;
};

// Datos de ejemplo (ilustrativos). No corresponden a negocios reales.
export const HUARIQUES: Huarique[] = [
  { id: "h1", name: "La Cevichería de Don Lucho", cat: "cevicheria", district: "Surquillo", dish: "Ceviche clásico", emoji: "🐟", image: "/assets/cevicheria.jpg", tone: "#C8F06E", price: [28, 45], rating: 4.8, meters: 250, open: true,
    blurb: { es: "Pescado del día, limón recién exprimido y camote glaseado. Cola de mediodía asegurada.", en: "Catch of the day, fresh-squeezed lime and glazed sweet potato. Expect a lunchtime line." } },
  { id: "h2", name: "Anticuchos Doña Carmela", cat: "criolla", district: "Barranco", dish: "Anticuchos de corazón", emoji: "🍢", image: "/assets/anticuchos.jpg", tone: "#FFDCC2", price: [15, 25], rating: 4.7, meters: 420, open: true,
    blurb: { es: "Parrilla de esquina con ají casero.", en: "Corner grill with house-made ají." } },
  { id: "h3", name: "Chifa Mi Barrio", cat: "chifa", district: "Lince", dish: "Arroz chaufa especial", emoji: "🥡", image: "/assets/chifa.jpg", tone: "#FFF1E8", price: [18, 30], rating: 4.5, meters: 600, open: false,
    blurb: { es: "Wok bien caliente y porciones generosas.", en: "Blazing hot wok and generous portions." } },
  { id: "h4", name: "El Rincón del Ají", cat: "criolla", district: "Jesús María", dish: "Ají de gallina", emoji: "🍗", image: "/assets/aji.jpg", tone: "#FFDCC2", price: [20, 32], rating: 4.6, meters: 350, open: true,
    blurb: { es: "Crema amarilla, pecana y papa sancochada, como en casa.", en: "Yellow cream sauce, pecan and boiled potato, like home." } },
  { id: "h5", name: "Sanguchería La Lima de Ayer", cat: "sangucheria", district: "Breña", dish: "Pan con chicharrón", emoji: "🥪", image: "/assets/sangucheria.jpg", tone: "#FFF1E8", price: [10, 18], rating: 4.4, meters: 800, open: true,
    blurb: { es: "Camote, sarsa criolla y pan crujiente.", en: "Sweet potato, salsa criolla and crusty bread." } },
  { id: "h6", name: "Jugos Doña Rosa", cat: "jugos", district: "Surquillo", dish: "Jugo surtido", emoji: "🧃", image: "/assets/jugos.jpg", tone: "#C8F06E", price: [6, 14], rating: 4.3, meters: 180, open: true,
    blurb: { es: "Fruta de temporada licuada al momento.", en: "In-season fruit blended to order." } },
  { id: "h7", name: "Rico Mar Chalaco", cat: "marina", district: "Callao", dish: "Tiradito al ají amarillo", emoji: "🦐", image: "/assets/ricomar.webp", tone: "#FFDCC2", price: [30, 50], rating: 4.9, meters: 1900, open: false,
    blurb: { es: "Cortes finos y leche de tigre intensa.", en: "Thin cuts and a bold leche de tigre." } },
  { id: "h8", name: "Lomo y Leña", cat: "criolla", district: "Miraflores", dish: "Lomo saltado", emoji: "🥩", image: "/assets/lomo.jpg", tone: "#FFF1E8", price: [24, 38], rating: 4.6, meters: 500, open: true,
    blurb: { es: "Fuego alto, papas fritas al momento.", en: "High flame, freshly fried potatoes." } }
];

export const DISTRICTS = ["Barranco", "Breña", "Callao", "Jesús María", "Lince", "Miraflores", "San Isidro", "Surquillo"];
