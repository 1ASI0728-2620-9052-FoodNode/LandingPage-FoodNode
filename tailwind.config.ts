import type { Config } from "tailwindcss";

// Paleta documentada en el informe (6.1.1 General Style Guidelines)
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#964100", soft: "#B85A12", tint: "#FFDCC2" }, // Naranja principal
        brown: { DEFAULT: "#492906", soft: "#6B4A2B" },                    // Marrón oscuro
        cream: "#FFF8F5",                                                  // Fondo crema
        peach: "#FFF1E8",                                                  // Naranja claro
        leaf: { DEFAULT: "#5A7D00", light: "#C8F06E" },                    // Verde / Verde claro
        flame: "#F97316",                                                  // Naranja brillante (alertas / pendientes)
        danger: "#B3261E",                                                 // Rojo (errores / rechazos)
        line: "#EBD3C3"
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Figtree"', "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(73,41,6,.22)",
        lift: "0 24px 50px -20px rgba(73,41,6,.35)"
      }
    }
  },
  plugins: []
};
export default config;
