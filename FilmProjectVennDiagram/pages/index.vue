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
                searchBar1: '',
                searchBar2: ''
            }
        }

    },
    methods: {
        async getPersonData(person){
            const {data} = await useFetch(`/api/person/${person}`)
            this.personData.push(data)
            // console.log(person)
            // console.log(this.personData.results)
        },
        async submitNames(sb1, sb2){
            // console.log(`sb1: ${sb1}`)
            // console.log(`sb2: ${sb2}`)
            await this.getPersonData(sb1)
            await this.getPersonData(sb2)

        },
        async retrieveMovies() {
            // this.personData.forEach(person => {
            //     console.log(person.value)
            // })
            const personOne = this.personData[0].value.id
            const personTwo = this.personData[1].value.id
            // console.log(`personData.fullName: ${this.personData[0].value.fullName}`)
            // console.log(`personData.id: ${this.personData[0].value.id}`)
            // console.log(`personData.fullName: ${this.personData[1].value.fullName}`)
            // console.log(`personData.id: ${this.personData[1].value.id}`)
            await this.getMovieData(personOne)
            await this.getMovieData(personTwo)            
        },
        async getMovieData(id){
            const {data} = await useFetch(`/api/movies/${id}`)
            this.movieList.push(data)
            //console.log(`id: ${id}`)
            for (let cast in this.movieList.value){
                console.log(`cast: ${cast.value}`)
                // for(let movie in cast){
                //     console.log(`title: ${movie.title}`)
                // }
            }
            console.log(`title: ${this.movieList[0].value.cast[0].title}`)
        }
    }
}
</script>

