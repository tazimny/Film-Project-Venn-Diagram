export default defineEventHandler(async (event) => {

    const { person } = event.context.params
    const nameArray = person.split(" ")
    const { baseUrl } = useRuntimeConfig()
    const { accessToken } = useRuntimeConfig()

    const uri = `${baseUrl}?query=${nameArray[0]}%20${nameArray[1]}&include_adult=false&language=en_US$page=1`
    const options = {
        accept: 'application/json',
        Authorization: `Bearer ${accessToken}`
    }

    const { personData } = await $fetch(uri, options)

    return personData
})