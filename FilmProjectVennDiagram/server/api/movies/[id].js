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
    
    const movieList = []
    const movieProperties = {
        id: Number,
        title: String,
        releaseDate: String
    }
    const uri = `${baseUrl}person/${id}/movie_credits`
    const movieCredits = await $fetch(uri, options)
    movieCredits.cast.forEach(element => {
        movieProperties.title = element.title
        movieProperties.id = element.id
        movieProperties.releaseDate = element.release_date
        movieList.push(movieProperties)
        //console.log(`movieProperties: ${JSON.stringify(movieProperties)}`)
    });
    console.log(`movieList: ${JSON.stringify(movieList[0])}`)
    // movieList.forEach(movie => {
    //     console.log(`title: ${movie.title}`)
    // })
    return movieList
})