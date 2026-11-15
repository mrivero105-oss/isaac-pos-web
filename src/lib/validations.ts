import { z } from "zod";

// Esquema de validación para solicitud de Demo o Cotización
export const LeadFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Por favor ingresa tu nombre completo")
    .max(100, "El nombre es demasiado largo"),
  email: z
    .string()
    .trim()
    .email("Ingresa un correo electrónico válido")
    .max(120, "El correo es demasiado largo"),
  phone: z
    .string()
    .trim()
    .min(6, "Ingresa un número de teléfono o WhatsApp válido")
    .max(30, "El teléfono es demasiado largo"),
  businessName: z
    .string()
    .trim()
    .min(1, "El nombre de tu negocio es requerido")
    .max(120, "Nombre de negocio muy largo"),
  businessType: z.string().trim().max(50).optional().default("otro"),
  branchesCount: z.string().trim().max(20).optional().default("1"),
  planInterested: z.string().trim().max(40).optional().default("pro_anual"),
  message: z.string().trim().max(500, "Mensaje muy largo").optional(),
  turnstileToken: z.string().trim().max(2048).optional(),
  // Campo Honeypot para neutralizar bots automatizados silenciosamente en el endpoint
  website_url_hp: z.string().max(200).optional(),
});

export type LeadFormData = z.infer<typeof LeadFormSchema>;

export const ChatHistoryItemSchema = z.object({
  sender: z.enum(["user", "ai"]),
  text: z.string().trim().min(1).max(800),
});

// Esquema de validación para consultas al asistente Isaac AI
export const ChatMessageSchema = z.object({
  message: z
    .string()
    .trim()
    .max(600, "La consulta excede el límite máximo de 600 caracteres.")
    .optional()
    .default(""),
  history: z.array(ChatHistoryItemSchema).max(8).optional().default([]),
});

// Esquema de validación para intención de compra o acuerdo directo
export const CheckoutIntentSchema = z.object({
  planId: z.string().trim().max(40).default("pro_anual"),
  customerEmail: z
    .string()
    .trim()
    .email("Correo electrónico no válido")
    .max(120)
    .optional()
    .or(z.literal("")),
  customerName: z
    .string()
    .trim()
    .min(2, "Ingresa tu nombre completo para emitir la orden")
    .max(100, "Nombre demasiado largo"),
  customerPhone: z
    .string()
    .trim()
    .min(6, "Ingresa un teléfono o WhatsApp válido para enviarte tu licencia")
    .max(30, "Teléfono demasiado largo"),
  companyTaxId: z.string().trim().max(30).optional(),
  paymentMethod: z
    .enum(["pago_movil", "zelle", "binance", "card", "acuerdo_directo"])
    .default("pago_movil"),
  paymentReference: z.string().trim().max(50).optional(),
  extraBoxes: z.number().int().min(0).max(20).default(0),
});

export type CheckoutIntentData = z.infer<typeof CheckoutIntentSchema>;

export interface CheckoutOrderResponse {
  orderId: string;
  plan: {
    name: string;
    amount: number;
    currency: string;
  };
  extraBoxes: number;
  amountUsd: number;
  amountBs: number;
  bcvRate: number;
  customer: {
    name: string;
    email: string;
    phone?: string;
    taxId?: string;
  };
  paymentMethod: string;
  paymentReference: string | null;
  checkoutUrl?: string | null;
  notified: boolean;
  instructions: {
    title: string;
    bank?: string;
    phone?: string;
    idNumber?: string;
    email?: string;
    payId?: string;
    crypto?: string;
    beneficiary?: string;
    description: string;
  } | null;
  whatsappConfirmationUrl: string;
  pciCompliant: boolean;
  encryption: string;
  timestamp: string;
}

// Esquema de validación para reseñas reales de clientes sujetas a moderación
export const CustomerReviewSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Ingresa tu nombre y apellido")
    .max(80, "El nombre es demasiado largo"),
  role: z
    .string()
    .trim()
    .max(60, "El cargo es demasiado largo")
    .optional()
    .default("Propietario"),
  business: z
    .string()
    .trim()
    .min(2, "Ingresa el nombre de tu comercio")
    .max(100, "El nombre del comercio es demasiado largo"),
  city: z
    .string()
    .trim()
    .min(2, "Ingresa tu ciudad")
    .max(60, "La ciudad es demasiado larga"),
  category: z
    .string()
    .trim()
    .min(2, "Selecciona el rubro de tu negocio")
    .max(60),
  rating: z.number().int().min(1).max(5).default(5),
  comment: z
    .string()
    .trim()
    .min(15, "Cuéntanos un poco más sobre tu experiencia (mínimo 15 caracteres)")
    .max(600, "El comentario no puede superar los 600 caracteres"),
  contactInfo: z
    .string()
    .trim()
    .min(5, "Ingresa tu WhatsApp o correo de licencia (solo para verificación interna)")
    .max(120, "Dato de contacto demasiado largo"),
  website_url_hp: z.string().max(200).optional(),
});

export type CustomerReviewData = z.infer<typeof CustomerReviewSchema>;
