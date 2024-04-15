<template>
    <div>
        <input
            :placeholder="label"
            :value="modelValue"
            @input="$emit('update:props.modelValue', $event.target.value)"
            @keyup="filterSearchBar"
            v-bind="$attrs"
        />
        <ul v-if="filteredResults && props.modelValue !== ''">
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

<script setup>
    let props = defineProps({
        label: {
            type: String,
            default: 'Enter name...'
        },
        modelValue: {
            type: [String, Number],
            default: ''
        },
    })

    const emit = defineEmits(['update:modelValue'])

    let filteredResults = ref([])
    const imageUrl = 'https://image.tmdb.org/t/p/w500/'

    async function filterSearchBar() {
        if (props.modelValue){
            filteredResults = []
            const {data} = await useFetch(`/api/person/${props.modelValue}`)
            await sortSearchBarResults(data.value, 'popularity')
        }
    }

    async function sortSearchBarResults(data, popularity){
        await sort(data, popularity)
        filteredResults = data
    }

    async function selectPerson(person) {
        emit('update:props.modelValue', person.fullName)
        filteredResults = []
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