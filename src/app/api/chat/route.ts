import { NextRequest, NextResponse } from "next/server";
import dns from "node:dns";
import net from "node:net";

try {
  dns.setDefaultResultOrder("ipv4first");
  if (typeof net.setDefaultAutoSelectFamily === "function") {
    net.setDefaultAutoSelectFamily(false);
  }
} catch {
  // Ignorar en entornos edge donde node:net no aplique
}

// Base de conocimiento experta 100% gratuita de Isaac POS
const ISAAC_KNOWLEDGE = [
  {
    triggers: ["offline", "internet", "sin señal", "conexion", "wifi", "luz", "corta", "cae"],
    title: "Operatividad 100% Offline y Sincronización Local",
    reply: `**Isaac POS funciona al 100% sin internet.** 🛡️⚡

* **Base de datos local ultrarrápida:** Utiliza SQLite nativo en cada dispositivo. Las ventas, comandas e inventarios se procesan a nivel local en menos de 2 segundos.
* **Sincronización WiFi Local P2P:** Puedes conectar múltiples tablets Android en los pasillos directamente a la PC o servidor central a través del router WiFi de tu tienda, **sin requerir internet externo**.
* **Cero riesgo de parálisis:** Si Cantv, la fibra óptica o la señal celular fallan, tu negocio sigue cobrando e imprimiendo tickets con total normalidad. Cuando regrese la conexión, todo se respalda automáticamente.`,
    suggestions: [
      "¿Qué impresoras térmicas son compatibles?",
      "¿Cómo funciona el Arqueo Ciego?",
      "Ver precios y planes",
    ],
  },
  {
    triggers: ["precio", "costo", "planes", "licencia", "vitalicia", "cuanto vale", "mensual", "anual", "promocion", "comprar"],
    title: "Planes y Precios Transparentes",
    reply: `**Planes de Isaac POS V24.04 Ultra (Sin comisiones por venta ni costos ocultos):** 💼💰

1. **Plan Emprendedor (1 Caja):**
   * **$12 USD / mes** o **$99 USD / año** (Ahorras 2 meses).
   * Tickets y ventas ilimitadas, cobro dual USD/Bs a tasa BCV en vivo, modo 100% offline, impresión térmica ESC/POS y corte de caja X y Z.

2. **Plan Profesional (Hasta 3 Cajas en Red) - MÁS ELEGIDO:**
   * **$24 USD / mes** o **$190 USD / año** (Ahorras 2 meses).
   * **Arqueo Ciego Anti-Robo**, **Visor de Cliente en 2da Pantalla con QR Pago Móvil**, inventario multialmacén con kardex, sugerencias predictivas de reposición, auditoría inmutable y soporte prioritario por AnyDesk.

3. **Licencia Vitalicia Perpetua (Pago Único):**
   * **$199 USD una sola vez** (De por vida, sin mensualidades jamás).
   * Incluye 1 Usuario Administrador + 1 Terminal de Caja activa (+$49 USD pago único por cada caja extra), base de datos local bajo tu control absoluto, migración de inventario desde Excel e instalación remota 1 a 1.`,
    suggestions: [
      "¿Cómo comprar con Pago Móvil o Zelle?",
      "¿Qué incluye la Licencia Vitalicia ($199)?",
      "Solicitar demostración guiada",
    ],
  },
  {
    triggers: ["bcv", "dolar", "tasa", "bolivar", "multimoneda", "cambio", "divisa", "moneda"],
    title: "Sincronización Multimoneda con Tasa Oficial BCV",
    reply: `**Cobros Duales y Tasa BCV Oficial en Tiempo Real:** 💵🇻🇪

* **Bimonetario Nativo:** Cada producto almacena su precio de referencia en dólares ($) y el sistema calcula automáticamente el monto en Bolívares (Bs.S) según la tasa oficial del Banco Central de Venezuela.
* **Actualización en 1 Clic:** La tasa oficial se sincroniza en vivo en la pantalla de cobro. Si necesitas ajustarla manualmente, puedes hacerlo en segundos.
* **Pagos Mixtos Flexibles:** Puedes cobrar una parte en dólares efectivo, otra parte en Pago Móvil y el restante en tarjeta de débito en un mismo ticket, con cálculo de cambio o vuelto exacto.`,
    suggestions: [
      "¿Qué métodos de pago acepta el checkout?",
      "¿Cómo funciona con el SENIAT y el IGTF?",
      "Probar el simulador de cobro",
    ],
  },
  {
    triggers: ["hardware", "impresora", "termica", "bluetooth", "lector", "codigo", "gaveta", "balanza", "sunmi", "tablet", "requisito"],
    title: "Hardware y Periféricos Compatibles",
    reply: `**Isaac POS es compatible con el hardware estándar abierto del mercado:** 🖨️📱

* **Tablets y Teléfonos:** Cualquier dispositivo Android 7.0 en adelante (Samsung, Xiaomi, Lenovo, etc.) y terminales POS inteligentes (SUNMI, PAX, Ingenico).
* **Computadoras:** Laptops y PCs con Windows 10/11 para el panel gerencial.
* **Impresoras Térmicas:** Modelos de **58mm y 80mm** con protocolo estándar **ESC/POS** (conexión Bluetooth, USB, Red LAN o Wi-Fi) como Xprinter, Epson, POS-D, etc.
* **Lectores de Barras:** Escáneres láser 1D y lectores de códigos QR 2D (USB o inalámbricos).
* **Gavetas de Dinero:** Cajones portamonedas con apertura automática RJ11 conectada a la impresora.
* **Balanzas Digitales:** Conexión serial/USB para pesaje en carnicerías, charcuterías y fruterías.`,
    suggestions: [
      "¿Cómo es la instalación?",
      "¿Funciona sin internet?",
      "Quiero hablar con un asesor",
    ],
  },
  {
    triggers: ["factura", "ticket", "recibo", "comprobante", "nota", "entrega"],
    title: "Emisión de Tickets y Comprobantes de Venta",
    reply: `**Emisión Ágil de Tickets y Comprobantes:** 🧾⚡

* **Tickets Térmicos:** Impresión instantánea en formato 58mm y 80mm con desglose bimonetario en dólares ($) y bolívares (Bs) a tasa oficial BCV.
* **Apertura de Gaveta:** Disparo automático por pulso eléctrico RJ11 al momento de confirmar cobros en efectivo.
* **Control Correlativo:** Registro consecutivo inalterable de cada operación para auditoría de caja y arqueo ciego.
* **Envío a WhatsApp:** Opción de enviar el comprobante de venta digital directamente al celular del comprador.`,
    suggestions: [
      "¿Genera tickets térmicos válidos?",
      "Ver precios y planes",
      "Probar el simulador",
    ],
  },
  {
    triggers: ["arqueo", "robo", "seguridad", "caja", "ciego", "faltante", "sobrante", "cajero", "turno"],
    title: "Arqueo Ciego Anti-Robo Hormiga",
    reply: `**El Arqueo Ciego es el mayor blindaje contra pérdidas de dinero:** 🛡️🔒

* **¿Cómo funciona?** Al terminar el turno, el cajero debe ingresar físicamente la cantidad de billetes contados en divisas y bolívares **sin que el sistema le revele cuánto dinero debería haber**.
* **Detección Instantánea:** Si falta o sobra dinero, el sistema genera una alerta inmediata al supervisor o dueño del negocio.
* **Cero Manipulación:** El empleado no puede "ajustar" los números ni ocultar diferencias.
* **Roles por PIN:** Permisos protegidos para que los cajeros no puedan borrar ventas ni alterar precios sin autorización.`,
    suggestions: [
      "¿Qué incluye el Plan Profesional?",
      "¿Cómo funciona el importador con IA?",
      "Agendar demo guiada",
    ],
  },
  {
    triggers: ["importador", "ia", "pdf", "factura proveedor", "polar", "nestle", "costos", "escaner"],
    title: "Importador Inteligente de Facturas con IA",
    reply: `**Actualiza Cientos de Costos en Segundos con Inteligencia Artificial:** 🤖📄

* **Adiós al tipeo manual:** Suelta una factura de tu proveedor (Empresas Polar, Nestlé, droguerías, mayoristas) en formato **PDF o imagen**.
* **Extracción Automática:** El motor de IA analiza los códigos, descripciones, bultos, unidades y precios de costo.
* **Actualización en 1 Clic:** Actualiza el inventario masivamente y ajusta tus precios de venta al instante respetando tu margen de ganancia.`,
    suggestions: [
      "Ver capturas reales del importador",
      "¿Cuánto cuesta el sistema?",
      "Probar simulador interactivo",
    ],
  },
  {
    triggers: ["pago", "pago movil", "zelle", "binance", "tarjeta", "stripe", "transferencia", "banco"],
    title: "Métodos de Pago Aceptados para Comprar Isaac POS",
    reply: `**Aceptamos métodos de pago locales e internacionales:** 💳🌐

* 🇻🇪 **Pago Móvil (Bolívares):** A tasa oficial BCV del día (Bancos Mercantil y Banesco).
* 🇺🇸 **Zelle (Dólares USD):** Transferencia directa a cuenta oficial.
* 🟡 **Binance Pay / USDT (Cripto):** Sin comisiones, acreditación inmediata 24/7.
* 💳 **Tarjetas Internacionales:** Procesamiento seguro con cifrado TLS 1.3 de grado bancario.

Al generar tu orden en la web, recibes tu número de orden y puedes confirmarla de inmediato por WhatsApp con nuestro equipo.`,
    suggestions: [
      "Comprar Licencia Vitalicia ($199)",
      "Comprar Plan Profesional ($24/mes)",
      "Hablar con un asesor por WhatsApp",
    ],
  },
  {
    triggers: ["whatsapp", "contacto", "soporte", "telefono", "asesor", "humano", "atencion", "ayuda"],
    title: "Atención y Soporte Técnico Directo",
    reply: `**Estamos a tu disposición para ayudarte:** 👨‍💻📞

* **WhatsApp Oficial:** [Contactar Asesor por WhatsApp](https://wa.me/584248302226)
* **Correo Electrónico:** isaacpospage@gmail.com
* **Horario de Soporte:** 24/7 en español.
* **Instalación:** Te acompañamos paso a paso por llamada o acceso remoto para dejar tu punto de venta 100% operativo en menos de 15 minutos.`,
    suggestions: [
      "Agendar demostración en vivo",
      "Ver precios y planes",
      "Probar el simulador de cobro",
    ],
  },
  {
    triggers: ["excel", "cargar", "migrar", "migracion", "catalogo", "inventario", "productos", "instalar", "instalacion", "anydesk", "remoto"],
    title: "Migración desde Excel e Instalación Remota Asistida",
    reply: `**¡Sí! Te ayudamos a cargar tu catálogo desde Excel y dejamos todo listo por AnyDesk:** 🤝📊

* **Migración Masiva desde Excel / CSV:** Si ya tienes tu lista de productos, códigos de barras, costos y precios en Excel o de otro sistema anterior, la importamos en minutos sin que tengas que tipear uno por uno.
* **Instalación Remota 1 a 1 (AnyDesk):** Nuestro equipo técnico se conecta a tu PC o laptop, instala la versión **V24.04 Ultra**, configura tu impresora térmica, lector de barras, balanza y 2da pantalla de cliente.
* **Capacitación Incluida:** Entrenamos a tus cajeros y encargados en vivo para que dominen la facturación bimonetaria y el arqueo ciego desde el primer día.`,
    suggestions: [
      "Agendar instalación asistida",
      "¿Qué incluye la Licencia Vitalicia ($199)?",
      "Hablar con un asesor por WhatsApp",
    ],
  },
  {
    triggers: ["ultra", "v24.04", "novedades", "actualizacion", "version", "nuevo"],
    title: "Novedades de la Nueva Edición Ultra V24.04",
    reply: `**¡Te presentamos la Nueva Edición Isaac POS V24.04 Ultra!** 🚀⚡

Un salto tecnológico mayúsculo frente a los puntos de venta tradicionales:

* ⚡ **Arranque en 3 Segundos (<150 MB RAM):** Motor nativo ultraligero con base de datos SQLite local cifrada que vuela incluso en PCs de mostrador de bajos recursos.
* 🖥️ **Visor de Cliente (2da Pantalla + QR Pago Móvil):** Conecta un monitor secundario o tablet orientada al comprador para mostrar cada artículo escaneado en USD/Bs y generar el **código QR de Pago Móvil** con el monto exacto en Bolívares.
* 🏭 **Producción & Recetas BOM (Bill of Materials):** Control de recetas con descuento automático de materias primas e ingredientes.
* 💊 **Farmacias, Lotes y Reposición Predictiva:** Control de fechas de vencimiento, psicotrópicos, kardex valorizado y alertas automáticas de compra con envío a proveedores por WhatsApp.
* 🛡️ **Arqueo Ciego & Monitoreo Remoto:** Cierre de turno a ciegas anti-faltantes y supervisión de múltiples cajas en tiempo real.`,
    suggestions: [
      "¿Cómo funciona el Visor de Cliente con QR?",
      "¿Me ayudan a cargar mis productos desde Excel?",
      "Ver precios y planes",
    ],
  },
  {
    triggers: ["visor", "display", "segunda pantalla", "pantalla cliente", "monitor cliente", "2da pantalla", "qr"],
    title: "Visor de Cliente Secundario con QR de Pago Móvil",
    reply: `**Visor de Cliente en 2da Pantalla + QR de Pago Móvil Automático:** 🖥️📲

* **Transparencia en el mostrador:** Conecta un segundo monitor HDMI/VGA o una tablet de cara al comprador.
* **Sincronización en vivo:** Mientras el cajero escanea cada producto, el cliente ve su descripción, cantidad, precio en dólares ($) y conversión en bolívares (Bs.) a tasa oficial BCV.
* **QR de Pago Móvil Dinámico:** Al seleccionar Pago Móvil, la 2da pantalla proyecta un **código QR bancario** con tu RIF/Cédula, teléfono, banco y el **monto exacto en Bolívares** para que el cliente pague en segundos sin errores de tipeo.`,
    suggestions: [
      "¿Requiere un monitor especial?",
      "Probar el Visor en el simulador",
      "Ver precios y planes",
    ],
  },
  {
    triggers: ["produccion", "receta", "recetas", "bom", "materia prima", "ingredientes", "panaderia", "merma", "costeo"],
    title: "Módulo de Producción BOM (Bill of Materials) y Costeo",
    reply: `**Control de Producción y Recetas para Fabricación y Cocina:** 🥖🍕🏭

* **Fórmulas y Recetas:** Define productos compuestos (panes, pizzas, combos, embutidos, platos preparados).
* **Descuento Automático de Stock:** Cada vez que registras una producción o venta, el sistema rebaja automáticamente los gramos, kilos o mililitros de materia prima (harina, levadura, carne, queso, empaques).
* **Costo Real por Unidad:** Calcula el costo unitario exacto sumando materias primas e insumos para proteger tu margen de ganancia.
* **Control de Mermas:** Registro de desperdicios y sobrantes de producción para evitar fugas de insumos.`,
    suggestions: [
      "¿Cómo maneja el inventario multialmacén?",
      "¿Qué hardware es compatible?",
      "Solicitar demo guiada",
    ],
  },
  {
    triggers: ["bancos", "tesoreria", "cuentas bancarias", "conciliacion", "conciliar", "lotes"],
    title: "Bancos y Conciliación de Tesorería Bimonetaria",
    reply: `**Tesorería y Conciliación de Cuentas:** 🏦💰

* **Multi-Bancos:** Administra saldos en bancos nacionales (Banesco, Mercantil, BDV, etc.) y cuentas internacionales en divisas (Zelle, cuentas en Panamá, BofA, Binance USDT).
* **Conciliación de Pago Móvil:** Cruza los reportes de ventas con tus movimientos bancarios reales para confirmar que ningún comprobante falso haya pasado en caja.
* **Control de Bóveda y Gaveta:** Cuadre de efectivo físico en caja y transferencias a custodia de gerencia.`,
    suggestions: [
      "¿Cómo funciona el Arqueo Ciego?",
      "Conocer la Edición Ultra",
      "Hablar por WhatsApp",
    ],
  },
  {
    triggers: ["farmacia", "drogueria", "medicamento", "medicina", "vencimiento", "lote", "psicotropico", "receta medica", "principio activo"],
    title: "Módulo Especializado para Farmacias y Droguerías",
    reply: `**Isaac POS V24.04 cuenta con un Módulo Especializado de Farmacia:** 💊🏥

* **Control de Lotes y Vencimientos:** Semáforo automático que alerta 30, 60 y 90 días antes de que caduque un medicamento.
* **Búsqueda por Principio Activo:** Encuentra al instante equivalentes genéricos cuando un cliente busca una marca agotada.
* **Libro de Psicotrópicos y Récipes:** Registro auditable de medicamentos controlados con datos del paciente y médico.
* **Sugerencias de Reposición:** Calcula qué medicamentos rotan más rápido y envía el pedido a droguerías por WhatsApp.`,
    suggestions: [
      "¿Me ayudan a cargar mis productos desde Excel?",
      "Ver precios y planes",
      "Solicitar demostración guiada",
    ],
  },
  {
    triggers: ["carniceria", "charcuteria", "fruteria", "pescaderia", "kilo", "gramo", "peso", "pesaje"],
    title: "Solución para Carnicerías, Charcuterías y Fruterías",
    reply: `**Pesaje Fraccionado y Control de Mermas para Carnicerías y Charcuterías:** 🥩⚖️

* **Cálculo Exacto por Peso:** Cobra al instante por gramos o kilos (ej. \`0.385 kg\` de queso o corte de res) con conversión automática en USD y Bolívares a tasa BCV.
* **Desposte y Recetas (BOM):** Registra medias reses o piezas enteras y controla el rendimiento por cortes y mermas.
* **Visor 2da Pantalla con QR:** El cliente ve en vivo el peso, precio por kilo y el QR de Pago Móvil con el monto exacto en Bs.`,
    suggestions: [
      "¿Qué balanzas e impresoras soporta?",
      "Ver precios y planes",
      "Agendar demostración en vivo",
    ],
  },
  {
    triggers: ["minimarket", "bodega", "abasto", "supermercado", "licoreria", "ferreteria", "repuesto", "tienda", "negocio", "comercio"],
    title: "Adaptación a Minimarkets, Bodegas, Ferreterías y Comercios",
    reply: `**Isaac POS V24.04 se adapta al flujo real de tu comercio:** 🏪🛒

* **Minimarkets, Bodegas y Licorerías:** Escaneo en menos de 2 segundos, venta por unidad o bulto/caja, cobros mixtos (Efectivo + Pago Móvil + Punto) y arqueo ciego de cajeros.
* **Ferreterías y Casas de Repuestos:** Búsqueda instantánea entre más de 50,000 referencias por código OEM, marca o medida, y actualización masiva de listas de precios desde Excel.
* **Cadenas y Multisucursales:** Monitoreo remoto de cajas en vivo y traslados de mercancía entre tiendas.`,
    suggestions: [
      "¿Cómo funciona sin internet?",
      "¿Qué incluye la Licencia Vitalicia ($199)?",
      "Agendar instalación asistida",
    ],
  },
];

// Respuesta por defecto con resumen inteligente
const DEFAULT_REPLY = {
  reply: `¡Hola! Soy **Isaac AI**, el consultor técnico y comercial oficial de **Isaac POS V24.04 Ultra**. 🤖✨

Puedo responderte con total precisión sobre:
* 🚀 **Edición V24.04 Ultra:** Arranque en 3 segundos, <150 MB de RAM y base de datos SQLite local cifrada.
* 🖥️ **Visor de Cliente (2da Pantalla):** Muestra al comprador su cuenta en vivo y genera el **código QR de Pago Móvil** con el monto exacto en Bs.
* 📦 **Inventario, Farmacia y Reposición:** Kardex valorizado, control de vencimientos/psicotrópicos, sugerencias predictivas de compra y pedidos a proveedores por WhatsApp.
* ⚡ **Operatividad 100% Offline:** Cobra sin interrupciones aunque falle el internet.
* 🛡️ **Arqueo Ciego & Auditoría Inmutable:** Conteo físico de billetes a ciegas y registro forense de cada evento.
* 💰 **Planes Accesibles:** Desde **$12/mes**, Plan Profesional (**$24/mes**) o **Licencia Vitalicia por $199 USD** (pago único sin mensualidades).

¿Sobre qué punto te gustaría conocer más detalles?`,
  suggestions: [
    "¿Cómo funciona el Visor con QR de Pago Móvil?",
    "¿Qué incluye la Licencia Vitalicia de $199?",
    "¿Cómo evita robos el Arqueo Ciego?",
    "¿Cómo funciona sin internet?",
  ],
};

function normalizeText(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

const SYSTEM_PROMPT = `Eres Isaac AI, asesor técnico y comercial oficial de Isaac POS V24.04 Ultra (Venezuela y Latinoamérica).
Datos oficiales:
- 100% Offline (SQLite local cifrado, <150 MB RAM, arranque en 3s) y red local multi-caja.
- Bimonetario USD/Bs con tasa oficial BCV en vivo y pagos mixtos (Efectivo, Pago Móvil, Zelle, Biopago, Punto).
- Visor Cliente 2da Pantalla: Muestra productos en USD/Bs y código QR dinámico de Pago Móvil con monto exacto en Bs.
- Arqueo Ciego Anti-Faltantes, Monitoreo Remoto de Cajas, Kardex Valorizado, Reposición Predictiva por WhatsApp, Producción/Recetas BOM, Módulo de Farmacias (lotes/vencimientos/psicotrópicos) y Cuentas por Cobrar.
- Planes sin comisiones: Emprendedor $12/mes ($99/año, 1 caja), Profesional $24/mes ($190/año, 3 cajas), Licencia Vitalicia $199 pago único de por vida (1 Admin + 1 Caja; +$49 por caja extra).
- Incluye migración desde Excel e instalación remota 1 a 1 por AnyDesk. WhatsApp: +58 424-8302226.
Responde en español en máximo 90 palabras usando **negritas** y viñetas (* ).`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawMessage: string = (body.message || "").trim();
    const userMessage = normalizeText(rawMessage);

    if (!userMessage) {
      return NextResponse.json({
        success: true,
        reply: DEFAULT_REPLY.reply,
        suggestions: DEFAULT_REPLY.suggestions,
      });
    }

    // 1. Nivel Gratuito Oficial Google Gemini (gemini-3.8-flash) si GEMINI_API_KEY está configurada
    const geminiKey = process.env.GEMINI_API_KEY?.trim();
    if (geminiKey) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 22000);

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
            body: JSON.stringify({
              systemInstruction: {
                parts: [{ text: SYSTEM_PROMPT }],
              },
              contents: [
                {
                  role: "user",
                  parts: [{ text: rawMessage }],
                },
              ],
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 320,
                thinkingConfig: {
                  thinkingLevel: "LOW",
                },
              },
            }),
          }
        );
        clearTimeout(timeoutId);

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const parts: Array<{ text?: string; thought?: boolean }> =
            geminiData?.candidates?.[0]?.content?.parts || [];
          const aiText =
            parts.find((p) => p.text && !p.thought)?.text ||
            parts[parts.length - 1]?.text;
          if (aiText) {
            return NextResponse.json({
              success: true,
              reply: aiText,
              suggestions: [
                "¿Qué incluye la Licencia Vitalicia ($199)?",
                "¿Me ayudan a cargar mis productos desde Excel?",
                "Hablar con un asesor por WhatsApp",
              ],
              source: "gemini_3_8_flash_free",
            });
          }
        }
      } catch {
        // Fallback silencioso si hay timeout o límite de cuota
      }
    }

    // 2. Nivel Gratuito Oficial Groq (Llama 3.3 70B) si GROQ_API_KEY está configurada
    const groqKey = process.env.GROQ_API_KEY;
    if (groqKey) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const groqRes = await fetch(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${groqKey}`,
            },
            signal: controller.signal,
            body: JSON.stringify({
              model: "llama-3.3-70b-versatile",
              temperature: 0.35,
              max_tokens: 380,
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: rawMessage },
              ],
            }),
          }
        );
        clearTimeout(timeoutId);

        if (groqRes.ok) {
          const groqData = await groqRes.json();
          const aiText = groqData?.choices?.[0]?.message?.content;
          if (aiText) {
            return NextResponse.json({
              success: true,
              reply: aiText,
              suggestions: [
                "¿Qué incluye la Licencia Vitalicia ($199)?",
                "¿Me ayudan a cargar mis productos desde Excel?",
                "Hablar con un asesor por WhatsApp",
              ],
              source: "groq_llama3_free",
            });
          }
        }
      } catch {
        // Fallback silencioso al motor semántico local
      }
    }

    // 3. Motor de inferencia semántica local (100% Gratuito, sin llaves y latencia 0ms)
    const scoredItems = ISAAC_KNOWLEDGE.map((item) => {
      let matches = 0;
      for (const trigger of item.triggers) {
        const normTrigger = normalizeText(trigger);
        if (userMessage.includes(normTrigger)) {
          matches += normTrigger.includes(" ") ? 2 : 1;
        }
      }
      return { item, matches };
    })
      .filter((entry) => entry.matches > 0)
      .sort((a, b) => b.matches - a.matches);

    if (scoredItems.length > 0) {
      const primary = scoredItems[0].item;
      return NextResponse.json({
        success: true,
        reply: primary.reply,
        suggestions: primary.suggestions,
        source: "local_expert_engine",
      });
    }

    // Respuesta inteligente general si no hubo coincidencia específica
    return NextResponse.json({
      success: true,
      reply: `Comprendo tu consulta. **Isaac POS** está diseñado específicamente para resolver los retos operativos de comercios de alto volumen en Venezuela y Latinoamérica.

Para brindarte la mejor respuesta sobre tu negocio:
* ¿Quieres saber cómo **operar sin internet** y conectar varias tablets por WiFi?
* ¿Te gustaría conocer la **compatibilidad con tus impresoras térmicas** o lectores?
* ¿Deseas comparar el **Plan Profesional ($24/mes)** vs la **Licencia Vitalicia ($199 pago único)**?

O si lo prefieres, puedo conectarte de inmediato con un asesor humano en WhatsApp.`,
      suggestions: [
        "¿Cómo funciona sin internet?",
        "¿Qué hardware es compatible?",
        "Ver precios y planes",
        "Hablar por WhatsApp con un asesor",
      ],
      source: "local_expert_engine",
    });
  } catch (error) {
    console.error("[ERROR CHAT AI API]", error);
    return NextResponse.json(
      {
        success: true,
        reply: DEFAULT_REPLY.reply,
        suggestions: DEFAULT_REPLY.suggestions,
      },
      { status: 200 }
    );
  }
}
