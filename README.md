# Isaac POS - Plataforma Web Comercial y Ventas Segura 🛡️🚀

Sitio web comercial, demostrador interactivo y plataforma de ventas para el sistema de punto de venta **Isaac POS**, diseñado con arquitectura de **Defensa en Profundidad** y estándares financieros **PCI-DSS**.

---

## ⚡ Características de la Plataforma

- **Simulador Interactivo en Vivo:** Permite a los clientes interactuar con un terminal Isaac POS real desde el navegador, simulando cobros en menos de 2 segundos, modo offline y generación de tickets térmicos.
- **Calculadora de Retorno de Inversión (ROI):** Estima el ahorro mensual en horas y dinero según el número de cajas y ventas del cliente.
- **Planes Transparentes:** Selector dinámico mensual, anual (con 2 meses gratis) y Licencia Vitalicia de pago único.
- **Compatibilidad con Periféricos:** Sección técnica de soporte para impresoras térmicas ESC/POS (Bluetooth/USB/LAN), lectores de código de barras, gavetas de dinero y tablets Android.

---

## 🛡️ Controles de Seguridad Implementados

1. **Cabeceras HTTP de Máxima Protección (`next.config.ts`):**
   - **CSP (Content Security Policy) Estricta:** Bloquea inyecciones de scripts no autorizados.
   - **HSTS Preload:** Fuerza HTTPS en todo momento durante 2 años (`max-age=63072000`).
   - **X-Frame-Options: DENY:** Protección total contra ataques de *Clickjacking*.
   - **X-Content-Type-Options: nosniff:** Neutraliza confusión de tipos MIME.
   - **Permissions-Policy:** Deshabilita acceso a sensores no utilizados (micrófono, cámara, geolocalización).
2. **Cumplimiento PCI-DSS SAQ A:**
   - Cero manipulación de números de tarjetas de crédito en el servidor. Los pagos se tokenizan y aíslan en entornos certificados.
3. **Validación y Sanitización Zod:**
   - Todas las entradas de datos en formularios y APIs son validadas con tipado estricto contra inyecciones SQL, NoSQL y XSS.
4. **Rate Limiting Anti-DDoS y Anti-Fuerza Bruta:**
   - Los endpoints de `/api/contact` y `/api/checkout` limitan peticiones por IP en ventanas deslizantes.
5. **Protección Anti-Bot Honeypot:**
   - Formularios protegidos con campos trampa para descartar automáticamente bots de spam sin molestar al usuario con captchas intrusivos.

---

## 🚀 Comandos de Ejecución

En Windows con PowerShell, ejecuta los comandos utilizando `npm.cmd`:

### Iniciar en Desarrollo:
```powershell
npm.cmd run dev
```
Abre tu navegador en [http://localhost:3000](http://localhost:3000).

### Compilar para Producción:
```powershell
npm.cmd run build
```

### Iniciar Servidor de Producción:
```powershell
npm.cmd run start
```

---

## 🔑 Configuración de Variables de Entorno

Copia el archivo `.env.example` a `.env.local` y agrega tus credenciales cuando las tengas:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
NOTIFICATION_EMAIL=ventas@isaacpos.com
```
