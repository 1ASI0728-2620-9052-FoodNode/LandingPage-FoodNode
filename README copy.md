# Foodly · Landing Page

Landing page de **Foodly** (startup FoodNode), construida a partir del informe TP de
*Arquitecturas de Software Emergentes (1ASI0728)* de la UPC.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide Icons

## Ejecutar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # producción
```

## Qué incluye

| Sección | Contenido tomado del informe |
|---|---|
| Hero | H1 y buscador del SEO/Searching Systems («¿Qué antojo criollo tienes hoy?», «Distrito gastronómico», «Buscar huarique») + Radar H3 animado |
| ¿Por qué descubrir comida con Foodly? | Radio circular vs. celdas H3 (interactivo), propuesta de valor, metas de RNF |
| Huariques y Platos Icónicos | Categorías (Cevicherías, Criolla, Marina, Chifa, Sanguchería, Jugos), «Abierto ahora», tarjetas con calificación, precio y estado |
| ¿Cómo funciona la experiencia Foodly? | Flujo Radar → Lía → reserva, con chat de Lía simulado |
| Para Restaurantes | Panel «Foodly Admin» interactivo (estado, precio, reservas pendientes/aprobadas/rechazadas) |
| Historias Culinarias | Escenarios de los dos segmentos objetivo |
| ¿Quiénes Somos? | Misión, visión y equipo |
| Registro / Login | Modal con validación (RF-18, US-18) |

**Requisitos no funcionales cubiertos:** i18n ES/EN sin recargar (RNF-04), ARIA en navegación, botones
de idioma y modal, foco visible, `prefers-reduced-motion` (RNF-05), SEO tags y meta tags del informe (6.2.4).

## Paleta (informe 6.1.1)

`#964100` naranja principal · `#492906` marrón oscuro · `#FFF8F5` crema · `#FFF1E8` naranja claro ·
`#5A7D00` verde · `#C8F06E` verde claro · `#FFFFFF` blanco. Tokens en `tailwind.config.ts`.

## Notas

- **Datos de ejemplo:** los huariques, nombres y reservas son ilustrativos (no hay backend).
- **Registro/Login:** la validación es real pero el envío es simulado. Conecta `submit()` en
  `components/AuthModal.tsx` al servicio de identidad (IAM) de Foodly.
- **Canonical URL:** pendiente hasta tener dominio oficial (ver `app/layout.tsx`).
- **Fotos reales:** el informe pide fotografía gastronómica real; ahora las tarjetas usan ilustraciones.
  Reemplaza el bloque del emoji en `components/Huariques.tsx` por `<Image>` con tus fotos.
- Las tipografías (Bricolage Grotesque + Figtree) se cargan desde Google Fonts.
