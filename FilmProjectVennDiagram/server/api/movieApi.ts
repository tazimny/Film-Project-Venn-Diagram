
export default defineEventHandler(() => {
    const { data } = $fetch(`cels`)
    return data
})