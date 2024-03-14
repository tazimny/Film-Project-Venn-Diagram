// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    movieDb: {
      accessToken: process.env.NUXT_MOVIE_DB_ACCESS_TOKEN,
      apiKey: process.env.NUXT_MOVIE_DB_API_KEY,
      baseUrl: process.env.NUXT_MOVIE_DB_BASE_URL
    },
    public: {
      test: 'nuxt config test'
    }

  }
})
