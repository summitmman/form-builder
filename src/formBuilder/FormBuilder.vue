<template>
    <WidgetsRenderer
        :widgets="localForm.children"
        :widgetMap="props.widgetMap"
        :eventMap="newEventMap"
        :reactiveVariableMap="newReactiveVariableMap"
    />
</template>
<script setup lang="ts">
import { ref, Ref, ComputedRef, isRef, computed, unref } from 'vue';
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

// Need to do this if props.form is a ref variable.
// Ref form would cause form to recursively update itself
// possible reason is that props.form.initialData is linked, maybe
const localForm = JSON.parse(JSON.stringify(props.form));

const newReactiveVariableMap = computed(() => {
    if (localForm.initialData) {
        Object.keys(localForm.initialData).forEach((key) => {
            if (!localForm.initialData) {
                return;
            }
            if (!isRef(localForm.initialData[key])) {
                localForm.initialData[key] = ref(localForm.initialData[key]);
            }
        });
        return {
            ...localForm.initialData,
            ...props.reactiveVariableMap
        };
    }
    return props.reactiveVariableMap;
});
const newEventMap = computed(() => {
    return props.eventMap(newReactiveVariableMap.value);
});

</script>