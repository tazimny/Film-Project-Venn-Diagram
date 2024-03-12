<template>
    <div>
        <input
            :value="inputText"
            placeholder="{{ inputPlaceholder }}"
            type="{{ inputType }}"
            @input="$emit('update:inputText', $event.target.value)"
        />
    </div>
</template>

<script>
    export default {
        props: {
            inputText: {
                type: [String, Number],
                default: ''
            },
            inputPlaceholder: {
                type: String,
                default: ''
            },
            inputType: {
                type: String,
                default: 'text'
            }
        }
    }
</script>