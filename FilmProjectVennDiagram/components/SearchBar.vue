<template>
    <div>
	<label>{{label}}</label>
        <input 
            type="text"
	    placeholder="label"
	    v-bind="$attrs"
            :value="modelValue"
            @input="$emit('udpate:modelValue', $event.target.value)" />
        <button>x</button>
    </div>
</template>

<script setup lang="ts">
export default {
    props: {
    	label: {
		type: String,
		default: ''
	},
	modelValue: {
	    type: [String, Number],
	    default: ''
	}
    }
    

</script>
