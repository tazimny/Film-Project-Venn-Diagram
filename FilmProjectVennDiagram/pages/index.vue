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
            <button @click="submitNames">TestApi</button>
        </div>
        <p>
            {{ inputValue.searchBar1 }}
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
            inputValue: {
                searchBar1: '',
                searchBar2: ''
            }
        }

    },
    methods: {
        async getPersonData(person){
            const options = {
                accept: 'application/json',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzJjMDc2ZWNhMjY3MWE0NGRjMjMxYmViOTJkNWU3MCIsInN1YiI6IjYzZWI5NjI3ZjkyNTMyMDA5ZDkyNzU1ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n9BPdZmVLOdmRfqdrp6b7O2QET-47rLeLRZqxW86ppc`
            }
            //const {data} = await useFetch(`https://api.themoviedb.org/3/movie/11?api_key=cc2c076eca2671a44dc231beb92d5e70`)
            const {data} = await useFetch(`/api/person/${person}`)
            this.personData.push(data)
            console.log(person)
            console.log(this.personData.results)
        },
        async submitNames(){
            getPersonData(this.searchBar1)
            getPersonData(this.searchBar2)
        }
    }
}
</script>

