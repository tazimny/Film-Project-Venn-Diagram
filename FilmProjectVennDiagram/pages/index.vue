<template>
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
        <div>
            <button @click="submitNames(inputValue.searchBar1, inputValue.searchBar2)">TestApi</button>
        </div>
        <div>
        </div>
        <p>
            {{ inputValue.searchBar1 }}
        </p>
        <p>
            {{ inputValue.searchBar2 }}
        </p>
        <p>
            {{ personData }}
        </p>
        <div>
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
                searchBar1: 'Gary Poulter',
                searchBar2: 'Buddy Duress'
            },
            movies: [],
            imageUrl: 'https://image.tmdb.org/t/p/w500',
            careers: {
                locales : [{
                    region : 'South West',
                    roles : [
                        { name : 'Data Scientist', term: 'Contract' },
                        { name : 'Copywriter', term: 'Full' }
                    ]
                },
                {
                    region : 'London',
                    roles : [
                        { name : 'Full Stack Dev', term: 'Contract' },
                        { name : 'Back-end Dev', term: 'Full' }
                    ]
                }]
            }
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

        },
        async retrieveMovies() {
            const personOne = this.personData[0].value.id
            const personTwo = this.personData[1].value.id
            this.movieCreditResults = []
            await this.getMovieData(personOne)
            await this.getMovieData(personTwo)        
        },
        async getMovieData(id){
            const {data} = await useFetch(`/api/movies/${id}`)
            this.movieCreditResults.push(data)
            // for (let movie in this.movieList){
            //     console.log(`title: ${movie.title}`)
            // }
            // console.log()
        }
    }
}
</script>

