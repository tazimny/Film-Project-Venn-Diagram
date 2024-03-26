// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    accessToken: process.env.MOVIE_DB_ACCESS_TOKEN,
    apiKey: process.env.MOVIE_DB_API_KEY,
    baseUrl: process.env.MOVIE_DB_BASE_URL,
    imageBaseUrl: process.env.MOVIE_DB_IMAGE_BASE_URL
  }
})
