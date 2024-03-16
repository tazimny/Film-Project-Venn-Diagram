
export default defineEventHandler(async (event) => {

    const { person } = event.context.params    
    console.log(`person: ${person}`)
    const { baseUrl } = useRuntimeConfig()
    const { accessToken } = useRuntimeConfig()

    const uri = `https://api.themoviedb.org/3/search/person?query=${person}&include_adult=false&language=en_US$page=1`

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    }
    const relevantDetails = {
        movies: ['']
    }
    const personData = await $fetch(uri, options)
        .then(personData => personData = JSON.stringify(personData))
        .then(personData => personData.results.forEach(element => {
            relevantDetails.movies.push(element.results[0].known_for.title)
        }))
    console.log(JSON.parse(relevantDetails))
    return relevantDetails
})