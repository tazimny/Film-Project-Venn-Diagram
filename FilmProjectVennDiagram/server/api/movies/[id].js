export default defineEventHandler(async (event) => {
    const {id} = event.context.params
    const { baseUrl } = useRuntimeConfig()
    const { accessToken } = useRuntimeConfig()
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    }
    
    let movieList = []

    const uri = `${baseUrl}person/${id}/movie_credits`
    const movieCredits = await $fetch(uri, options)

    movieCredits.cast.forEach(element => {
        let movieProperties = {
            id: element.id,
            title: element.title,
            releaseDate: element.release_date
        }
        movieList.push(movieProperties)        
    })

    return movieList
})