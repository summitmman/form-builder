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
let tempStr = props.str;
// This code is not needed because tempStr is itself getting returned to template
// Hence resolving the ref issue
// if (typeof props.str !== 'string') {
//     tempStr = reactive(props.str);
// }
</script>