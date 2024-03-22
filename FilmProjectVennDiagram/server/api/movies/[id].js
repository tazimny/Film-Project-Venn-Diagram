export default defineEventHandler(async (event) => {
    const {id} = event.context.params
    console.log(`personID: ${id}`)
    const { baseUrl } = useRuntimeConfig()
    const { accessToken } = useRuntimeConfig()
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`
        }
    }
    
    const movieList = [{
        title: String,
        releaseDate: String
    }]
    const uri = `${baseUrl}person/${id}/movie_credits`
    console.log(`uri: ${uri}`)
    const movieCredits = await $fetch(uri, options)
    // movieCredits.forEach(credit => {
    //     console.log(`credit.title: ${credit.title}`)
    //     console.log(`credit.release_date: ${credit.releaseDate}`)
    //     movieList.title.push(credit.title)
    //     movieList.releaseDate.push(credit.release_date)
    // });
    //console.log(`movieCredits: ${movieCredits[0].cast[0].title}`)
    // for (let cast in movieCredits.value){
    //     for (let credit in cast){
    //         console.log(`title: ${credit.title}`)
    //         console.log(`id: ${credit.id}`)
    //         console.log(`release_date: ${credit.release_date}`)
    //     }
    // }

    return movieCredits
})