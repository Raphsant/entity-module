// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["@nuxt/ui-pro"],
  runtimeConfig: {
    public: {
      serverUri: "",
    },
  },
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxt/ui",
    "@nuxtjs/fontaine",
    "@nuxtjs/google-fonts",
    "@nuxtjs/device",
    "@vueuse/nuxt",
    "@sidebase/nuxt-pdf",
  ],
  //@ts-ignore
  browser: "firefox",
  colorMode: {
    preference: "dark",
  },
  googleFonts: {
    display: "swap",
    download: true,
    families: {
      "DM+Sans": [400, 500, 600, 700],
    },
  },
  fontMetrics: {
    fonts: ["DM Sans"],
  },
  nitro: {
    // Nitro options
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ui: {
    icons: ["ph", "simple-icons"],
    //@ts-ignore
    notifications: {
      // Show toasts at the top right of the screen
      position: "top-0 bottom-auto",
    },
  },
  router: {
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth',
        };
      } else {
        return {top: 0};
      }
    }
  }
});