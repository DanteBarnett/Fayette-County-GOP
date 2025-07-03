/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching'

// @ts-nocheck

// self.__WB_MANIFEST is replaced by workbox injectManifest.
precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})