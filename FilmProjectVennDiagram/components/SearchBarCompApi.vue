<template>
    <div>
        <input
            :placeholder="label"
            :value="modelValue"
            @input="$emit('update:inputValue', $event.target.value)"
            @keyup="filterSearchBar"
            v-bind="$attrs"
        />
        <ul v-if="filteredResults && inputValue !== ''">
            <li v-for="person in filteredResults" :key="person.id" @click="selectPerson(person)" class="person-list">
                <div class="person-image">
                    <img :src="`${imageUrl}${person.profilePicture}`" height="100" width="67" loading="eager" />
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

<script setup lang="ts">
    const filteredResults: [] = ref([])
    const imageUrl = ref('https://image.tmdb.org/t/p/w500/')

    const props = defineProps({
        label: {
            type: String,
            default: 'Enter name...'
        },
        inputValue: {
            type: [String, Number],
            default: ''
        }
    })

    const emit = defineEmits(['update', 'update:modelValue'])

    const selectPerson = async (person: String): Promise<void> => {
        emit('update:inputValue', person.fullName)
        filteredResults.value = []
    }

    const filterSearchBar = async () => {
        if (props.inputValue){
            filteredResults.value = []
            const {data} = await useFetch(`/api/person/${props.inputValue}`)
            await sortSearchBarResults(data.value, 'popularity')
        }
    }

    const sortSearchBarResults = async (data: any, popularity: string) => {
        await sort(data, popularity)
        filteredResults.value = data
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
