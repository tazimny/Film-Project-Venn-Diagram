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
    
    let artists = {
        artistId: id,
        movies: []
        
    }
    const uri = `${baseUrl}person/${id}/movie_credits`
    const movieCredits = await $fetch(uri, options)

    movieCredits.cast.forEach(element => {
        let movie = { // add "character" or "job" as a property to help identify the person/movie
            id: element.id,
            title: element.title,
            releaseDate: element.release_date,
            posterPath: element.poster_path,
            popularity: element.popularity
        } 
        artists.movies.push(movie)
    })

    return artists 
})