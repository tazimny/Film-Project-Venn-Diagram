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
        <div v-if="showDiv">
            <div v-for="(index, artist) in movieList" :key="index">
                <div v-for="movie in artist" :key="movie.id">
                    <p>{{ movie.title }}</p>
                    <p>{{ movie.release_date }}</p>
                    <p>{{ movie.posterPath }}</p>
                </div>
            </div>
        </div>
        <div>
            <div v-for="(index, tests) in testsTests" :key="index">
                <div v-for="test in tests" :key="test.id">
                    <p>{{ test.name }}</p>
                    <p>{{ test.age }}</p>
                    <p>{{ test.id }}</p>
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
            movieList: [],
            inputValue: {
                searchBar1: 'Gary Poulter',
                searchBar2: 'Buddy Duress'
            },
            movies: [],
            imageUrl: 'https://image.tmdb.org/t/p/w500',
            testsTests: [
                [
                    {
                        id: 1,
                        name: 'Gary Poulter',
                        age: 21
                    },
                    {
                        id: 2,
                        name: 'Buddy Duress',
                        age: 22
                    },
                    {
                        id: 3,
                        name: 'jimmy smits',
                        age: 23
                    }
                ],
                [
                    {
                        id: 1,
                        name: 'smith',
                        age: 24
                    },
                    {
                        id: 2,
                        name: 'jones',
                        age: 25
                    }
                ]
            ]
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
            await this.retrieveMovies()

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
            // for (let movie in this.movieList){
            //     console.log(`title: ${movie.title}`)
            // }
            // console.log()
        }
    }
}
</script>

