<template>
    {{ tempStr }}
</template>
<script setup lang="ts">
import { ComputedRef, Ref } from 'vue';

const props = defineProps({
    str: {
        type: [String, Object as () => Ref | ComputedRef],
        default: ''
    }
});
// This is needed so that we can directly expose the str reactive variable
// so that vue can open it
let tempStr = props.str;
</script>