/// <reference lib="webworker" />
/* eslint-disable no-underscore-dangle */
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { clientsClaim } from 'workbox-core';

// self.__WB_MANIFEST is injected by VitePWA plugin
declare let self: ServiceWorkerGlobalScope & { __WB_MANIFEST: any };
precacheAndRoute(self.__WB_MANIFEST);

self.skipWaiting();
clientsClaim();

// API requests (Supabase & RSS) – Network First with fallback cache
registerRoute(
  ({ url }) => url.pathname.startsWith('/static/') || url.hostname.includes('supabase.co'),
  new NetworkFirst({
    cacheName: 'api-cache',
    networkTimeoutSeconds: 10,
  }),
);

// Images – Cache First
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({ cacheName: 'image-cache' }),
);

// Google Fonts & CDN assets – Stale-While-Revalidate
registerRoute(
  ({ url }) => url.origin.includes('fonts.googleapis.com') || url.origin.includes('cdnjs'),
  new StaleWhileRevalidate({ cacheName: 'cdn-cache' }),
);

export {}