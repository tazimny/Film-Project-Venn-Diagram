<template>
    <div>
        <input
            :placeholder="label"

        />
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