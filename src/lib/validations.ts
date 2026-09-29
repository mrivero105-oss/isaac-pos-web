import { z } from "zod";

// Esquema de validación flexible y amigable para solicitud de Demo o Cotización
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
  businessType: z.string().optional().default("otro"),
  branchesCount: z.string().optional().default("1"),
  planInterested: z.string().optional().default("pro_anual"),
  message: z.string().trim().max(500, "Mensaje muy largo").optional(),
  // Campo Honeypot para neutralizar bots automatizados
  website_url_hp: z.string().max(0, "Acceso no autorizado").optional(),
});

export type LeadFormData = z.infer<typeof LeadFormSchema>;

// Esquema de validación para intención de compra o acuerdo directo
export const CheckoutIntentSchema = z.object({
  planId: z.string().default("pro_anual"),
  currency: z.enum(["USD", "VES", "EUR", "MXN"]).default("USD"),
  customerEmail: z.string().trim().email("Correo electrónico no válido"),
  customerName: z.string().trim().min(2, "Nombre requerido"),
  customerPhone: z.string().trim().min(6, "Teléfono requerido").optional(),
  companyTaxId: z.string().trim().max(30).optional(),
  paymentMethod: z.string().default("acuerdo_directo"),
  paymentReference: z.string().trim().max(50).optional(),
});

export type CheckoutIntentData = z.infer<typeof CheckoutIntentSchema>;
