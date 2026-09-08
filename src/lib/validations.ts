import { z } from "zod";

// Esquema de validación estricta para solicitud de Demo o Cotización
export const LeadFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(80, "El nombre es demasiado largo")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "El nombre contiene caracteres no válidos"),
  email: z
    .string()
    .trim()
    .email("Ingresa un correo electrónico válido")
    .max(100, "El correo es demasiado largo"),
  phone: z
    .string()
    .trim()
    .min(7, "El teléfono debe tener al menos 7 dígitos")
    .max(20, "El teléfono es demasiado largo")
    .regex(/^[+0-9\s()-]+$/, "El formato de teléfono no es válido"),
  businessName: z
    .string()
    .trim()
    .min(2, "El nombre de tu negocio es requerido")
    .max(100, "Nombre de negocio muy largo"),
  businessType: z.enum([
    "restaurante",
    "cafeteria",
    "tienda_retail",
    "minimarket",
    "farmacia",
    "servicios",
    "otro",
  ]),
  branchesCount: z.enum(["1", "2-5", "6-10", "10+"]),
  planInterested: z.enum(["basico", "pro", "vitalicia", "demo_gratis"]),
  message: z.string().trim().max(500, "Mensaje muy largo").optional(),
  // Campo Honeypot para neutralizar bots automatizados
  website_url_hp: z.string().max(0, "Acceso no autorizado").optional(),
});

export type LeadFormData = z.infer<typeof LeadFormSchema>;

// Esquema de validación para intención de compra directa
export const CheckoutIntentSchema = z.object({
  planId: z.enum(["basico_mensual", "basico_anual", "pro_mensual", "pro_anual", "vitalicia"]),
  currency: z.enum(["USD", "MXN", "EUR"]),
  customerEmail: z.string().trim().email("Correo electrónico no válido"),
  customerName: z.string().trim().min(2, "Nombre requerido"),
  companyTaxId: z.string().trim().max(30).optional(),
});

export type CheckoutIntentData = z.infer<typeof CheckoutIntentSchema>;
