<template>
    <div>
        <div class="search-bars">
            <SearchBar
                v-model="inputValue.searchBar1"
                label="Enter name..."
                type="text"
            />
            <SearchBar
                v-model="inputValue.searchBar2"
                label="Enter name..."
                type="text"
            />
        </div>

        <div>
            <button @click="submitNames(inputValue.searchBar1, inputValue.searchBar2)">TestApi</button>
        </div>

        <div>
            <div v-for="movie in movies" :key="movie.id">
                <h2>{{ movie.title }}</h2>
                <img :src="`${imageUrl}${movie.posterPath}`">
                <h3>{{ movie.releaseDate }}</h3>
            </div>
        </div>
    </div>
</template>

<!-- <script setup>
    //let personData = []
    //let movieCreditResults = []
    //let inputValue = {
        //searchBar1: '',
        //searchBar2: ''
    //}
    //let movies = []
    //const imageUrl = 'https://image.tmdb.org/t/p/w500'

    //async function getPersonData(person) {
        //const {data} = await useFetch(`/api/person/${person}`)
        //personData.push(data)
    //}

    //async function submitNames(sb1, sb2) {
        //personData = []
        //await getPersonData(sb1)
        //await getPersonData(sb2)
        //await retrieveMovies()
        //await crossReference(movieCreditResults)
    //}

    //async function retrieveMovies() {
        //const personOne = personData[0].value[0].id
        //const personTwo = personData[1].value[0].id
        //movieCreditResults = []
        //await getMovieData(personOne)
        //await getMovieData(personTwo)
    //}

    //async function getMovieData(id){
        //const {data} = await useFetch(`/api/movies/${id}`)
        //movieCreditResults.push(data)
    //}

    //async function sortMovieResults(movies) {
        //const property = 'popularity'
        //return sort(movies, property)
    //}

    //async function crossReference(movieCreditResults) {
        //const matchedMovies = []
        //for (let i = 0; i < movieCreditResults[0].value.movies.length; ++i) {
            //const movie1 = movieCreditResults[0].value.movies[i]

            //for (let j = 0; j < movieCreditResults[1].value.movies.length; ++j) {
                //const movie2 = movieCreditResults[1].value.movies[j]
                //if (movie1.id === movie2.id) {
                    //matchedMovies.push(movie1)
                //}
            //}            
        //}
        //movies = matchedMovies
        //await sortMovieResults(movies)
    //}
//</script>-->

<script>
export default {
    data() {
        return {
            showDiv: false,
            personData: [],
            movieCreditResults: [],
            inputValue: {
                searchBar1: '',
                searchBar2: ''
            },
            movies: [],
            imageUrl: 'https://image.tmdb.org/t/p/w500',
            testData: ""
        }

    },
    methods: {
        async getPersonData(person){
            const {data} = await useFetch(`/api/person/${person}`)
            this.personData.push(data)
        },
        async submitNames(sb1, sb2){
            this.personData = []
            await this.getPersonData(sb1)
            await this.getPersonData(sb2)
            await this.retrieveMovies()
            this.crossReference(this.movieCreditResults)

        },
        async retrieveMovies() {
            const personOne = this.personData[0].value[0].id
            const personTwo = this.personData[1].value[0].id
            this.movieCreditResults = []
            await this.getMovieData(personOne)
            await this.getMovieData(personTwo)        
        },
        async getMovieData(id){
            const {data} = await useFetch(`/api/movies/${id}`)
            this.movieCreditResults.push(data)
        },

        async sortMovieResults(movies){
            const searchBar = this.$refs.SearchBar
            if (searchBar){
                await searchBar.quickSort(movies, 0, movies.length - 1, 'popularity')
            }
            const property = 'popularity'
            return sort(movies, property)
        },


        async crossReference(movieCreditResults){
            const matchedMovies = []
            for (let i = 0; i < movieCreditResults[0].value.movies.length; ++i){
                const movie1 = movieCreditResults[0].value.movies[i]

                for (let j = 0; j < movieCreditResults[1].value.movies.length; ++j){
                    const movie2 = movieCreditResults[1].value.movies[j]
                    if (movie1.id === movie2.id){
                        matchedMovies.push(movie1)
                    }
                }
            }
            this.movies = matchedMovies
            await this.sortMovieResults(this.movies)
        }
    }
}
</script>
     
<style scoped>
    .search-bars {
        display: flex;
    }
</style>