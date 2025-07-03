/* eslint-disable no-underscore-dangle */
import { precacheAndRoute } from 'workbox-precaching';

// self.__WB_MANIFEST is injected by VitePWA plugin
declare let self: ServiceWorkerGlobalScope & { __WB_MANIFEST: any };
precacheAndRoute(self.__WB_MANIFEST);