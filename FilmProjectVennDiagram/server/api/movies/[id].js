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
    console.log(`artists.artistId: ${artists.artistId}`)
    const uri = `${baseUrl}person/${id}/movie_credits`
    const movieCredits = await $fetch(uri, options)

    movieCredits.cast.forEach(element => {
        let movie = {
            id: element.id,
            title: element.title,
            releaseDate: element.release_date,
            posterPath: element.poster_path         
        }
        console.log(`movie.title: ${movie.title}`)
        artists.movies.push(movie)
    })

    return artists 
})