import { z } from 'zod';

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_ANON_KEY: z.string().min(1),
  VITE_PUBLIC_SITE_URL: z.string().url().optional(),
  VITE_GA_ID: z.string().optional(),
  VITE_RSS_FEED_URL: z.string().url().optional(),
});

export type Env = z.infer<typeof envSchema>;

const processEnv = {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  VITE_PUBLIC_SITE_URL: import.meta.env.VITE_PUBLIC_SITE_URL,
  VITE_GA_ID: import.meta.env.VITE_GA_ID,
  VITE_RSS_FEED_URL: import.meta.env.VITE_RSS_FEED_URL,
};

export const env = envSchema.parse(processEnv);