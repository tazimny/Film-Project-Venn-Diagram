<template>
    <div>
        <div>
            <AddButton @click="addSearchBar" />
        </div>
        <div>
            <SubmitButton/>
        </div>
        <div>
            <SearchBar v-model="inputValue" />
        </div>
    </div>
</template>

<script>
    export default {
    	data() {
            return {
                inputValue: '',
                searchBars: [
                    { value: ''}
                ]
            }
	    },
        methods: {
            removeSearchBar(){
                this.searchBars.pop()
            },
            addSearchBar(){
                this.searchBars.push({value:''})
            }
        }
    }
</script>
