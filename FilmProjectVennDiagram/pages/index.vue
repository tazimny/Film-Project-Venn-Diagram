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
            <button @click="retrieveMovies">Retrieve Movies</button>
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
        <p>
            {{ movieList[0] }}
        </p>
        <p>
            {{ movieList[1] }}
        </p>
    </div>
</template>

<script setup>

</script>

<script>
export default {
    data() {
        return {
            personData: [],
            movieList: [],
            inputValue: {
                searchBar1: 'Gary Poulter',
                searchBar2: 'Buddy Duress'
            },
            movies: []
        }

    },
    methods: {
        async getPersonData(person){
            const {data} = await useFetch(`/api/person/${person}`)
            this.personData.push(data)
        },
        async submitNames(sb1, sb2){
            await this.getPersonData(sb1)
            await this.getPersonData(sb2)

        },
        async retrieveMovies() {
            const personOne = this.personData[0].value.id
            const personTwo = this.personData[1].value.id
            this.movieList = []
            await this.getMovieData(personOne)
            await this.getMovieData(personTwo)        
        },
        async getMovieData(id){
            const {data} = await useFetch(`/api/movies/${id}`)
            this.movieList.push(data)
            for (let movie in this.movieList){
                console.log(`title: ${movie.title}`)
            }
            console.log()
        }
    }
}
</script>

