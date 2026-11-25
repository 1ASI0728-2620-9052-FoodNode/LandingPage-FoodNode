# LandingPage-FoodNode

## Configuración

El registro y el inicio de sesión llaman a IAM a través del gateway de Foodly (Kong).

```bash
cp .env.example .env.local   # NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
npm install
npm run dev
```

- `NEXT_PUBLIC_API_BASE_URL` es la URL base del gateway. Es pública (se incrusta en el navegador al compilar): no pongas secretos.
- El token de sesión se guarda solo en memoria (estado de React); recargar la página cierra la sesión.
- `npm run lint` y `npm run build` deben pasar antes de abrir un PR.
