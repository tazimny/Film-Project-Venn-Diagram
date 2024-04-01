<template>
    <div>
        <input
            :placeholder="label"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            @keyup="filterSearchBar"
            v-bind="$attrs"
        />
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: 'Enter name...'
        },
        modelValue: {
            type: [String, Number],
            default: ''
        },
        filteredResults: []
    },
    methods: {
        async filterSearchBar() {
            if (this.modelValue) {
                this.filterResults = []
                const {data} = await useFetch(`/api/person/${this.modelValue}`)
                console.log(`data: ${JSON.stringify(data)}`)
                await this.sortSearchBarResults(data.results, 'popularity')
                //this.filterResults.push(sortedData)

            }
        },
        async sortSearchBarResults(data, popularity){
            // sort the data based on popularity
            console.log(`data.value.length: ${data.length}`)
            await this.quickSort(data, 0, data.length - 1, popularity)
            // push sorted results to filteredResults
            this.filteredResults.push(data)
        },
        async quickSort(arr, low, high, popularity) {
            if (high >= low){
                return
            }
            const pivotIndex = await this.partition(arr, low, high, popularity)
            await this.quickSort(arr, low, pivotIndex - 1, popularity)
            await this.quickSort(arr, pivotIndex + 1, high, popularity)
        },
        async partition(arr, low, high, popularity) {
            const pivotValue = arr[high][popularity]
            console.log(`pivotValue: ${pivotValue}`)
            let idx = low - 1
            for (let i = low; i < high; ++i) {
                console.log(`arr[i][popularity]: ${arr[i][popularity]}`)
                if (arr[i][popularity] >= pivotValue) {
                    ++idx
                    const tmp = arr[i][popularity]
                    arr[i][popularity] = arr[idx][popularity]
                    arr[idx][popularity] = tmp
                }
            }
            idx++
            arr[high][popularity] = arr[idx][popularity]
            arr[idx][popularity] = pivotValue
            return idx
        }
        
    
    }
}
</script>