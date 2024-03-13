
export default defineEventHandler(() => {
    const config = useRuntimeConfig()
    console.log(config.movieDb.accessToken)
    return
})