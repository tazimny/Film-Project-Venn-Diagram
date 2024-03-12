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
        <!-- <div v-for="(movie, index) in movieData" :key="index">
            <p>{{ movie.knownFor[index].title }}</p>
        </div> -->
    </div>
</template>

<script>
import apiTest from '~/server/api/testApi'
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
        },
        searchMovie(){
            const url = "https://api.themoviedb.org/3/search/person?query=Christopher%20Nolan&include_adult=false&language=en-US&page=1"
            
            movieData = useFetch("")
            console.log(this.movieData)
        },
        async testApi(){
            const response = await useFetch("https://fakestoreapi.com/products/1")
            
            console.log(response.data)
        }
        
    }
}
</script>
