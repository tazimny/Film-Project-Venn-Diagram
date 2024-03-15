<template>
    <div>
        <div>
            <input v-model="inputValue" placeholder="Enter name..."/>
        </div>
        <div>
            <button @click="getPersonData">TestApi</button>
        </div>
        <p>
            {{ inputValue }}
        </p>
    </div>
</template>

<script setup>
let inputValue = ref('testset')
let personData = ref({})
console.log(inputValue.value)
console.log(personData.value)
</script>

<script>
export default {
    data() {
        return {
            //personData: Object
            //inputValue: String
        }

    },
    props: {
        //personData: Object,
        // inputValue: String
    },
    methods: {
        async getPersonData(inputValue, personData){
            const {data} = await useFetch(`/api/person/${inputValue.value}`)
            personData = data
            console.log(inputValue.value)
            console.log(personData.value)
        }
    }
}
</script>

