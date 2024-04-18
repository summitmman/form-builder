<template>
    <WidgetsRenderer
        :widgets="props.form.children"
        :widgetMap="props.widgetMap"
        :eventMap="newEventMap"
        :reactiveVariableMap="newReactiveVariableMap"
    />
</template>
<script setup lang="ts">
import { ref, Ref, ComputedRef, isRef, computed } from 'vue';
import { IForm, GenericObject, EventMap } from './shared/interfaces';
import WidgetsRenderer from './WidgetsRenderer.vue';

const props = defineProps({
    form: {
        type: Object as () => IForm,
        required: true,
    },
    widgetMap: {
        type: Object as () => GenericObject,
        default: () => {}
    },
    eventMap: {
        type: Function as unknown as () => EventMap,
        default: () => {}
    },
    reactiveVariableMap: {
        type: Object as () => GenericObject<Ref | ComputedRef>,
        default: () => {}
    }
});

const newReactiveVariableMap = computed(() => {
    if (props.form.initialData) {
        Object.keys(props.form.initialData).forEach((key) => {
            if (!props.form.initialData) {
                return;
            }
            if (!isRef(props.form.initialData[key])) {
                props.form.initialData[key] = ref(props.form.initialData[key]);
            }
        });
        return {
            ...props.form.initialData,
            ...props.reactiveVariableMap
        };
    }
    return props.reactiveVariableMap;
});
const newEventMap = computed(() => {
    return props.eventMap(newReactiveVariableMap.value);
});

</script>