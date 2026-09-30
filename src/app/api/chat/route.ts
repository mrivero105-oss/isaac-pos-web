import { NextRequest, NextResponse } from "next/server";

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
    reply: `**Planes de Isaac POS (Sin comisiones por venta ni costos ocultos):** 💼💰

1. **Plan Emprendedor (1 Caja):**
   * **$29 USD / mes** o **$290 USD / año** (Incluye 2 meses GRATIS).
   * Tickets y ventas ilimitadas, modo 100% offline, impresión térmica ESC/POS y corte de caja X y Z.

2. **Plan Profesional (Hasta 3 Cajas) - MÁS ELEGIDO:**
   * **$59 USD / mes** o **$590 USD / año** (Incluye 2 meses GRATIS).
   * **Arqueo Ciego Anti-Robo**, inventario multialmacén con kardex, auditoría de cancelaciones con clave, reportes financieros y soporte prioritario 24/7.

3. **Licencia Vitalicia (Pago Único Perpetuo):**
   * **$499 USD una sola vez** (De por vida, sin mensualidades jamás).
   * Base de datos bajo tu control absoluto, 1 terminal todo incluido, actualizaciones continuas e instalación guiada 1 a 1.`,
    suggestions: [
      "¿Cómo comprar con Pago Móvil o Zelle?",
      "¿Qué incluye la Licencia Vitalicia?",
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
    triggers: ["seniat", "fiscal", "factura", "iva", "igtf", "libro", "impuesto", "retencion", "ley"],
    title: "Gestión Fiscal y Cumplimiento SENIAT",
    reply: `**Módulo Fiscal Completo Adaptado a la Normativa SENIAT:** 📑⚖️

* **Libros Oficiales:** Generación automática de **Libro de Ventas y Libro de Compras** con base imponible, alícuota, IVA 16% y ventas exentas.
* **Cálculo de IGTF (3%):** Identificación y cálculo automático del Impuesto a las Grandes Transacciones Financieras en cobros en divisas.
* **Notas de Crédito y Débito:** Emisión correlativa para devoluciones y correcciones contables.
* **Exportación Contable:** Exporta directamente a formatos Excel/CSV para que tu contador declare en minutos sin inconsistencias.`,
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
      "Comprar Licencia Vitalicia ($499)",
      "Comprar Plan Profesional ($59/mes)",
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
    triggers: ["ultra", "v24.04", "novedades", "actualizacion", "version", "nuevo", "instalador", "descargar", "descarga", "setup", "apk", "webview2"],
    title: "Novedades de la Nueva Edición Ultra V24.04",
    reply: `**¡Te presentamos la Nueva Edición Isaac POS V24.04 Ultra!** 🚀⚡

Un salto tecnológico mayúsculo frente a las versiones tradicionales:

* 📦 **Instalador Ultra Liviano:** Optimizado al máximo. Se descarga en pocos segundos y se instala al instante sin configuraciones complejas.
* 🧠 **Motor con Aceleración GPU:** Consume **70% menos memoria RAM**. Fluidez constante de **60 FPS** en pantallas táctiles y touch-screens.
* 🖥️ **Visor de Cliente (2da Pantalla en \`/#/display\`):** Conecta un monitor o tablet secundario de cara al comprador para que vea los artículos escaneados, precios unitarios, subtotal, IVA, tasa BCV y total dual en tiempo real.
* 🏭 **Producción & Recetas BOM (Bill of Materials):** Control de recetas con deducción automática de materias primas e ingredientes (ideal para panaderías, pizzerías y fábricas).
* 🏦 **Bancos & Tesorería Conciliada:** Cuadre de cuentas en Bolívares y Dólares, conciliación de lotes de Pago Móvil y transferencias.
* 🛡️ **Modo Blindado:** Bloqueo de atajos y accesos no autorizados para garantizar que los cajeros solo operen el sistema.
* 📥 **Descargas Oficiales Disponibles:** Puedes descargar el instalador directo para Windows (.exe) y Android (.apk) en la sección **Edición Ultra** de esta web.`,
    suggestions: [
      "¿Cómo funciona el Visor de Cliente?",
      "¿Cómo se calculan las recetas en Producción BOM?",
      "Descargar instalador para Windows o Android",
    ],
  },
  {
    triggers: ["visor", "display", "segunda pantalla", "pantalla cliente", "monitor cliente", "2da pantalla"],
    title: "Visor de Cliente Secundario en Tiempo Real (/#/display)",
    reply: `**Visor de Cliente para Segunda Pantalla:** 🖥️👀

* **Transparencia total:** Conecta un monitor secundario HDMI/USB o una tablet orientada al cliente abriendo la ruta \`/#/display\`.
* **Sincronización instantánea:** A medida que el cajero escanea cada código de barras, el comprador ve la foto del producto, cantidad, precio unitario y total.
* **Cálculo bimonetario claro:** Refleja el desglose de IVA 16%, IGTF y el total bimonetario en USD ($) y Bolívares (Bs) a tasa oficial BCV.
* **Reduce reclamos en caja:** El cliente verifica sus productos antes de pagar, acelerando la fila y eliminando discusiones por precios.`,
    suggestions: [
      "¿Requiere un monitor especial?",
      "¿Qué otras novedades tiene la versión Ultra?",
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
];

// Respuesta por defecto con resumen inteligente
const DEFAULT_REPLY = {
  reply: `¡Hola! Soy **Isaac AI**, el consultor técnico y comercial oficial de **Isaac POS V24.04 Ultra**. 🤖✨

Puedo responderte con total precisión sobre:
* 🚀 **Nueva Edición Ultra:** Aceleración por GPU, 70% menos RAM y descargas directas.
* 🖥️ **Visor de Cliente (2da Pantalla \`/#/display\`):** Monitoreo en vivo para el comprador con fotos, tasa BCV y total dual.
* 🏭 **Producción & Recetas BOM:** Fórmulas de panes, pizzas y platos con deducción automática de materia prima.
* ⚡ **Operatividad 100% Offline:** Sincronización WiFi local entre tablets y PC sin internet.
* 💵 **Multimoneda USD/Bs:** Tasa oficial BCV automática y cobros mixtos.
* 🛡️ **Arqueo Ciego Anti-Robo:** Blindaje de caja y auditoría de turnos.
* 💰 **Planes y Licencia Vitalicia:** Desde $29/mes o $499 vitalicio sin mensualidades.

¿Sobre qué punto te gustaría conocer más detalles?`,
  suggestions: [
    "¿Qué novedades trae la Edición Ultra?",
    "¿Cómo funciona el Visor de Cliente?",
    "¿Cuánto cuesta la Licencia Vitalicia?",
    "¿Cómo funciona sin internet?",
  ],
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userMessage: string = (body.message || "").trim().toLowerCase();

    if (!userMessage) {
      return NextResponse.json({
        success: true,
        reply: DEFAULT_REPLY.reply,
        suggestions: DEFAULT_REPLY.suggestions,
      });
    }

    // 1. Si existe GEMINI_API_KEY en variables de entorno, intentar consulta con Gemini Flash Free
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `Eres Isaac AI, el consultor comercial y técnico oficial de Isaac POS (versión v24.04).
Isaac POS es un sistema de punto de venta blindado para comercios en Venezuela y Latinoamérica.
Características clave:
- Modo 100% Offline con SQLite local y sync WiFi local P2P entre tablets Android y PC central.
- Bimonetario nativo USD / Bs con tasa oficial BCV automática.
- Arqueo Ciego anti-robo de caja.
- Módulo fiscal SENIAT (Libros de ventas/compras, IVA 16%, IGTF 3%).
- Importador de facturas PDF con IA.
- Precios: Plan Básico ($29/m o $290/a), Plan Profesional ($59/m o $590/a), Licencia Vitalicia ($499 pago único).
- Hardware: Tablets Android 7.0+, impresoras térmicas ESC/POS (58mm/80mm), lectores de barras, gavetas RJ11.
- Métodos de pago para comprar: Pago Móvil BCV, Zelle, Binance Pay USDT, Tarjetas.
- Canal de atención: Contacto directo por WhatsApp oficial desde los botones de la web.

Responde de forma concisa, profesional, persuasiva y amigable en formato markdown.
Pregunta del usuario: "${userMessage}"`,
                    },
                  ],
                },
              ],
            }),
          }
        );
        clearTimeout(timeoutId);

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const aiText =
            geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiText) {
            return NextResponse.json({
              success: true,
              reply: aiText,
              suggestions: [
                "¿Cómo funciona la Licencia Vitalicia?",
                "¿Qué impresoras recomiendan?",
                "Hablar con un asesor por WhatsApp",
              ],
              source: "gemini_free_tier",
            });
          }
        }
      } catch {
        // Fallback silencioso al motor local en caso de error de red o timeout
      }
    }

    // 2. Motor de inferencia semántica local (100% Gratuito y de latencia cero)
    let bestMatch = null;
    let maxMatches = 0;

    for (const item of ISAAC_KNOWLEDGE) {
      let matches = 0;
      for (const trigger of item.triggers) {
        if (userMessage.includes(trigger)) {
          matches++;
        }
      }
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = item;
      }
    }

    if (bestMatch && maxMatches > 0) {
      return NextResponse.json({
        success: true,
        reply: bestMatch.reply,
        suggestions: bestMatch.suggestions,
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
* ¿Deseas comparar el **Plan Profesional ($59/mes)** vs la **Licencia Vitalicia ($499 pago único)**?

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
