<template>
    <div>
        <input 
            type="text"
            placeholder="Enter name..."
            :value="value"
            @input="$emit('udpate:value', $event.target.value)" />
        <button>x</button>
    </div>
</template>

<script setup lang="ts">
const value = ref("")

 

</script>