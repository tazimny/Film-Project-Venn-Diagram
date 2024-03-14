<template>
    <div>
        <div>
            <SearchBar />
        </div>
        <div>
            <button>TestApi</button>
        </div>
    </div>
</template>

<script setup>
import { apiConfig } from '~/composables/rtConfig';

const config = apiConfig()
console.log(config)
</script>