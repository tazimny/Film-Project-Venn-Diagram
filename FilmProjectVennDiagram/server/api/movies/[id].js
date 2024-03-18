export default defineEventHandler(async (event) => {
    const personID = event.context.params
    const { baseUrl } = useRuntimeConfig()
    const { accessToken } = useRuntimeConfig()
    const options = {
        method: {
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        }
    }
    const movieList = [{
        title: '',
        releaseDate: ''
    }]
    const uri = `${baseUrl}person/${personID}/movie_credits`
    const movieCredits = await $fetch(uri, options)
    movieCredits.forEach(credit => {
        movieList.title.push(credit.title)
        movieList.releaseDate.push(credit.release_date)
    });

    return movieList
})