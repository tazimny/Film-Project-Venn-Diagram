<template>
    <div>
        <input
            :placeholder="label"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            @keyup="filterSearchBar"
            v-bind="$attrs"
        />
        <ul v-if="filteredResults">
            <li v-for="person in filteredResults" :key="person.id" @click="selectPerson(person)" class="person-list">
                <div>
                    <img :src="`${this.imageUrl}${person.profilePicture}`" height="75" width="50" loading="eager" />
                </div>
                <div>
                    {{ person.fullName }}
                </div>
            </li>
        </ul>
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
    },
    data() {
        return {
            filteredResults: [],
            imageUrl: 'https://image.tmdb.org/t/p/w500/',
        }
    },
    methods: {
        async filterSearchBar() {
            if (this.modelValue) {
                this.filterResults = []
                const {data} = await useFetch(`/api/person/${this.modelValue}`)
                //console.log(`data.length: ${JSON.stringify(data.value)}`)
                await this.sortSearchBarResults(data.value, 'popularity')
                //this.filterResults.push(sortedData)

            }
        },
        async sortSearchBarResults(data, popularity){
            // sort the data based on popularity
            //console.log(`data.length: ${data.length}`)
            await this.quickSort(data, 0, data.length - 1, popularity)
            // push sorted results to filteredResults
            this.filteredResults = data
        },
        async quickSort(arr, low, high, popularity) {
            if (high <= low){
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
                    idx++
                    const tmp = arr[i]
                    arr[i]= arr[idx]
                    arr[idx] = tmp
                }
            }
            idx++
            let pivotIndex = arr.findIndex((item) => item[popularity] === pivotValue)
            let tmp = arr[high]
            arr[high] = arr[idx]
            arr[idx] = tmp
            //arr[high] = arr[idx]
            //arr[idx] = arr[pivotIndex] // might return undefined
            return idx
        },

        async selectPerson(person) {
            this.$emit('update:modelValue', person.fullName)
            this.filteredResults = []
        }
        
    
    }
}
</script>

<style scoped>
    .person-list {
        list-style-type: none;
    }
</style>