<template>
    <div>
        <div>
            <SearchBar v-model="event.title" label="title" type="text" />
        </div>
        <div>
            <AddButton />
        </div>
        <div>
            <RemoveButton />
        </div>
        <div>
            <SubmitButton/>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
    	data() {
	    return {
	    	name: ''
	    }
	}
    }
</script>
