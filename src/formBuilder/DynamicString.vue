<template>
    <template v-for="(item, index) in sortedKeys" :key="(item.value ?? item) + index">{{ splitStr[item] }}</template>
</template>
<script setup lang="ts">
import { ComputedRef, Ref, computed, reactive } from 'vue';
import { GenericObject } from './shared/interfaces';
import { regex } from './shared/constants';

const props = defineProps({
    str: {
        type: String,
        default: ''
    },
    reactiveVariableMap: {
        type: Object as () => GenericObject<Ref | ComputedRef>,
        default: () => {}
    }
});

let tempStr = props.str;
// This could not be kept an array because reactive([]) does not work
// when the ref in the array is printed it includes ""
const splitStr = reactive<GenericObject<string | Ref | ComputedRef>>({});
let index = 0;
while (tempStr) {
    const match = regex.exec(tempStr);
    if (match == null) {
        splitStr[index++] = tempStr;
        tempStr = '';
        continue;
    }

    const variableStr = match[0];
    const start = match.index;
    const end = start + variableStr.length;

    if (start > 0) {
        splitStr[index++] = tempStr.substring(0, start);
    }
    const variable = variableStr.replace('{{', '').replace('}}', '').trim();
    if (props.reactiveVariableMap[variable]) {
        splitStr[index++] = props.reactiveVariableMap[variable];
    } else {
        splitStr[index++] = variableStr;
    }

    if (end >= tempStr.length) {
        tempStr = '';
    } else {
        tempStr = tempStr.substring(end);
    }
}
const sortedKeys = computed(() => {
    return Object.keys(splitStr).sort();
});
</script>