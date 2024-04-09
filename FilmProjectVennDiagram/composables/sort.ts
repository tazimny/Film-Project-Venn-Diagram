export default function (data: any, property?: string): any {
    if (property){
        return quickSort(data, 0, data.length - 1, property)
    }
    else {
        return "No property provided"
    }
}
async function quickSort(arr: any[], low: number, high: number, popularity: string) {
    if (high <= low){
        return
    }
    const pivotIndex = await partition(arr, low, high, popularity)
    await quickSort(arr, low, pivotIndex - 1, popularity)
    await quickSort(arr, pivotIndex + 1, high, popularity)
}

async function partition(arr: any[], low: number, high: number, popularity: string) {
    const pivotValue = arr[high][popularity]
    let idx = low - 1
    for (let i = low; i < high; ++i) {
        if (arr[i][popularity] >= pivotValue) {
            idx++
            const tmp = arr[i]
            arr[i]= arr[idx]
            arr[idx] = tmp
        }
    }
    idx++
    let tmp = arr[high]
    arr[high] = arr[idx]
    arr[idx] = tmp
    return idx
}