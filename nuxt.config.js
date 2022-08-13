import colors from "vuetify/es5/util/colors"

export default {
  head: {
    title: "Fellowship",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      {charset: "utf-8"},
      {name: "viewport", content: "width=device-width, initial-scale=1"},
      {property: "og:title", name: "og:title", content: "Fellowship"},
      {property: "og:url", name: "og:url", content: "https://fellowship-frontend-six.vercel.app/"},
      {property: "og:image", name: "og:image", content: "/v.png"},
      {property: "og:type", name: "og:type", content: "web application"},
      {property: "og:description", name: "og:description", content: "Fellowship - A scholarship aggregator"},
      {property: "description", name: "description", content: "Fellowship - A scholarship aggregator"}
    ],
    link: [
      {rel: "icon", type: "image/x-icon", href: "/logo.svg"}
    ]
  },
  loading: {
    color: "#2096f3",
    height: "3px"
  },
  css: [],
  plugins: [],
  components: false,
  buildModules: [
    "@nuxtjs/vuetify"
  ],
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth-next"
  ],
  axios: {
    baseURL: process.env.BACKEND_BASE_URL || "http://localhost:8080/api/v1"
  },
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  auth: {
    strategies: {
      local: {
        scheme: "refresh",
        cookie: {
          prefix: "auth.",
          maxAge: 86400,
          secure: true
        },
        token: {
          prefix: "access_token.",
          property: "data.access_token",
          maxAge: 86400,
          type: "Bearer"
        },
        refresh_token: {
          prefix: "refresh_token.",
          property: "data.refresh_token",
          data: "refresh_token",
          maxAge: 129600
        },
        user: {
          property: "user",
          autoFetch: true
        },
        endpoints: {
          login: {url: "/login", method: "post"},
          refresh: {url: "/user/token/refresh", method: "post"},
          user: {url: "/user", method: "get"},
          logout: false
        },
        autoLogout: false
      }
    },
    redirect: {
      login: "/login",
      logout: "/",
      callback: "/login",
      home: "/"
    },
    localStorage: false
  },
  build: {
    transpile: ["countries-list"]
  }
}
