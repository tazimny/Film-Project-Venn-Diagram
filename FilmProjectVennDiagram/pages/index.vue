<template>
    <div>
        <div>
            <AddButton @click="addSearchBar" />
        </div>
        <div>
            <SubmitButton @click="testApi"/>
        </div>
        <div>
            <SearchBar v-model="inputValue" />
        </div>
        <div>
            <button @click="searchMovie">search movie</button>
        </div>
        <!-- <div v-for="(movie, index) in movieData" :key="index">
            <p>{{ movie.knownFor[index].title }}</p>
        </div> -->
        <p>{{ $config.movieDb.accessToken }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inputValue: '',
            searchBars: [
                { value: ''}
            ],
            movieData: {
                knownFor: [{
                    title: String

                }]
            }
        }
    },
    methods: {
        removeSearchBar(){
            this.searchBars.pop()
        },
        addSearchBar(){
            this.searchBars.push({value:''})
            const runtimeConfig = useRuntimeConfig()
            console.log(runtimeConfig)
            
        },
        searchMovie(){
            const runtimeConfig = useRuntimeConfig()
            const baseUrl = `${runtimeConfig.movieDb.baseUrl}/authentication`
            const options = {
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${runtimeConfig.movieDb.accessToken}`
                }
            }
            console.log(options.headers.Authorization)
            console.log(baseUrl)
            
            // const response = useFetch(baseUrl, options)
            // console.log(response.data)
        },
        async testApi(){
            const response = await useFetch("https://fakestoreapi.com/products/1")

            console.log(response.data.value.title)
        }
        
    }
}
</script>
