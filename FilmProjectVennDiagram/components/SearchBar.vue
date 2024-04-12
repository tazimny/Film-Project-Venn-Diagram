<template>
    <div>
        <input
            :placeholder="label"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            @keyup="filterSearchBar"
            v-bind="$attrs"
        />
        <ul v-if="filteredResults">
            <li v-for="person in filteredResults" :key="person.id" @click="selectPerson(person)" class="person-list">
                <div>
                    <img :src="`${this.imageUrl}${person.profilePicture}`" height="75" width="50" loading="eager" />
                </div>
                <div>
                    {{ person.fullName }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: 'Enter name...'
        },
        modelValue: {
            type: [String, Number],
            default: ''
        },
    },
    data() {
        return {
            filteredResults: [],
            imageUrl: 'https://image.tmdb.org/t/p/w500/',
        }
    },
    methods: {
        async filterSearchBar() {
            if (this.modelValue) {
                this.filterResults = []
                const {data} = await useFetch(`/api/person/${this.modelValue}`)
                await this.sortSearchBarResults(data.value, 'popularity')

            }
        },
        async sortSearchBarResults(data, popularity){
            // sort the data based on popularity
            await sort(data, popularity)
            // push sorted results to filteredResults
            this.filteredResults = data
        },

        async selectPerson(person) {
            this.$emit('update:modelValue', person.fullName)
            this.filteredResults = []
        }
        
    
    }
}
</script>

<style scoped>
    .person-list {
        list-style-type: none;
    }
</style>