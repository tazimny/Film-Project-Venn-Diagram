<template>
    <div>
        <div>
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

        <div v-if="showDiv">
            <div class="mb-1" v-for="(artist, index) in movieCreditResults" :key="artist.artistId">
                <h2>Artist: {{personData[index].value.fullName}}</h2>
                <div v-for="movie in artist.value.movies" :key="movie.id">
                    <div>
                        <p>{{ movie.title }}</p>
                        <img :src="`${imageUrl}${movie.posterPath}`">
                        <p>{{ movie.releaseDate }}</p>
                    </div>
                </div>
            </div>
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

<script setup>

</script>

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

