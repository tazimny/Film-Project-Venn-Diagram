<template>
    <div>
        <input
            :placeholder="label"

        />
    </div>
</template>

<script setup lang="ts">
    import { ref, defineProps, defineEmits } from 'vue'
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
</script>