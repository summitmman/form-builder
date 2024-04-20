<template>
    <template v-for="(item, index) in splitStrArr" :key="(item.value ?? item) + index">
        <DynamicStringRenderer :str="item" />
    </template>
</template>
<script setup lang="ts">
import { ComputedRef, Ref, computed, isRef } from 'vue';
import _get from 'lodash.get';
import { GenericObject } from './shared/interfaces';
import { regex } from './shared/constants';
import DynamicStringRenderer from './DynamicStringRenderer.vue';
import { getVariableAndParts } from './shared/utils';

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
const splitStrArr: ComputedRef<Array<string | Ref | ComputedRef>> = computed(() => []);
while (tempStr) {
    const match = regex.exec(tempStr);
    if (match == null) {
        splitStrArr.value.push(tempStr);
        tempStr = '';
        continue;
    }

    const variableStr = match[0];
    const start = match.index;
    const end = start + variableStr.length;

    if (start > 0) {
        splitStrArr.value.push(tempStr.substring(0, start));
    }
    const { variablePart, theRest } = getVariableAndParts(variableStr);
    if (props.reactiveVariableMap[variablePart] != null) {
        if (theRest) {
            if (isRef(props.reactiveVariableMap[variablePart])) {
                splitStrArr.value.push(
                    _get(props.reactiveVariableMap[variablePart].value, theRest)
                );
            } else {
                splitStrArr.value.push(
                    _get(props.reactiveVariableMap[variablePart], theRest)
                );
            }
        }
        else
            splitStrArr.value.push(props.reactiveVariableMap[variablePart]);
    } else {
        splitStrArr.value.push(variableStr);
    }

    if (end >= tempStr.length) {
        tempStr = '';
    } else {
        tempStr = tempStr.substring(end);
    }
}
</script>