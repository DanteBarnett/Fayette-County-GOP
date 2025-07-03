/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_PUBLIC_SITE_URL?: string;
  readonly VITE_GA_ID?: string;
  readonly VITE_RSS_FEED_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}