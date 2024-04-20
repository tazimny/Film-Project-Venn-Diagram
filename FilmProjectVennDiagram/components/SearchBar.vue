<template>
    <div>
        <input
            :placeholder="label"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            @keyup="filterSearchBar"
            v-bind="$attrs"
        />
        <ul v-if="filteredResults && modelValue !== ''">
            <li v-for="person in filteredResults" :key="person.id" @click="selectPerson(person)" class="person-list">
                <div class="person-image">
                    <img :src="`${this.imageUrl}${person.profilePicture}`" height="100" width="67" loading="eager" />
                </div>
                <div class="person-details">
                    <div class="person-name">
                        {{ person.fullName }}
                    </div>
                    <div class="person-job">
                        ({{ person.job }})
                    </div>
                </div>
               
            </li>
        </ul>
    </div>
</template>

<script>
export default {


    props:{ 
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
            imageUrl: 'https://image.tmdb.org/t/p/w500/'
        }
    },

    methods: {
        async selectPerson(person) {
            this.$emit('update:modelValue', person.fullName)
            this.filteredResults = []
        },
        async filterSearchBar() {
            if (this.modelValue){
                this.filteredResults = []
                const {data} = await useFetch(`/api/person/${this.modelValue}`)
                await this.sortSearchBarResults(data.value, 'popularity')
            }
        },

        async sortSearchBarResults(data, popularity){
            await sort(data, popularity)
            this.filteredResults = data
        }
    }

}
</script>


<style scoped>
    .person-list {
        list-style-type: none;
       
        display: flex;
    }
    .person-image {
        display: inline;   
        
    }
    .person-name {
        display: block;
        
        font-weight: bold;
        font-size: 19px;
    }
    .person-job {
        display: inline;
        font-weight: italic;
    }
    .person-details {
        display: block;
    }
</style>
