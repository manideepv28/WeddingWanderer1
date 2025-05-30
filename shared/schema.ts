import { z } from "zod";

// User schema
export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  createdAt: z.string(),
});

export type User = z.infer<typeof userSchema>;

export const insertUserSchema = userSchema.omit({ id: true, createdAt: true });
export type InsertUser = z.infer<typeof insertUserSchema>;

// Wedding event schema
export const weddingEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  coupleName: z.string(),
  location: z.string(),
  country: z.string(),
  date: z.string(),
  time: z.string(),
  venue: z.string(),
  description: z.string(),
  image: z.string(),
  maxGuests: z.number(),
  currentGuests: z.number(),
  price: z.number(),
  category: z.string(),
  features: z.array(z.string()),
  dresscode: z.string(),
  coupleStory: z.string(),
  isActive: z.boolean().default(true),
  createdAt: z.string(),
});

export type WeddingEvent = z.infer<typeof weddingEventSchema>;

export const insertWeddingEventSchema = weddingEventSchema.omit({ 
  id: true, 
  createdAt: true,
  currentGuests: true 
});
export type InsertWeddingEvent = z.infer<typeof insertWeddingEventSchema>;

// Registration schema
export const registrationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  eventId: z.string(),
  status: z.enum(['registered', 'cancelled']).default('registered'),
  registeredAt: z.string(),
  notes: z.string().optional(),
});

export type Registration = z.infer<typeof registrationSchema>;

export const insertRegistrationSchema = registrationSchema.omit({ 
  id: true, 
  registeredAt: true 
});
export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
