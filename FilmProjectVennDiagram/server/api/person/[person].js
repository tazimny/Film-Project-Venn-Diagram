import { baseURL } from "#paths"

export default defineEventHandler(async (event) => {

    const { person } = event.context.params    
    console.log(`person: ${person}`)
    const nameArray = person.split(" ")
    const { baseUrl } = useRuntimeConfig().movieDb.baseUrl
    console.log(`baseUrl: ${baseUrl}`)
    const { accessToken } = useRuntimeConfig().movieDb.accessToken
    console.log(`accessToken: ${accessToken}`)

    //const uri = `https://api.themoviedb.org/3/search/person?query=${nameArray[0]}%20${nameArray[1]}&include_adult=false&language=en_US$page=1?api_key=cc2c076eca2671a44dc231beb92d5e70`
    const uri = `https://api.themoviedb.org/3/movie/11?api_key=cc2c076eca2671a44dc231beb92d5e70`
    console.log(uri)
    const options = {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
    }

    const { personData } = await $fetch(uri)
    console.log(`personData: ${personData}`)
    return personData
})