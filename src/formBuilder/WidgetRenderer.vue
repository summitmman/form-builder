<template>
    <component
        :is="props.widgetMap[props.widget.type] ?? props.widget.type"
        v-bind="widgetProps"
        v-on="widgetEvents"
    >
        <WidgetsRenderer
            v-if="props.widget.children"
            :widgets="props.widget.children"
            :widgetMap="props.widgetMap"
            :eventMap="props.eventMap"
            :reactiveVariableMap="props.reactiveVariableMap"
        />
    </component>
</template>
<script setup lang="ts">
import { Ref, ComputedRef, reactive } from 'vue';
import { IWidget, GenericObject } from './shared/interfaces';
import WidgetsRenderer from './WidgetsRenderer.vue';
const props = defineProps({
    widget: {
        type: Object as () => IWidget<Function | string>,
        default: () => {},
    },
    widgetMap: {
        type: Object as () => GenericObject,
        default: () => {}
    },
    eventMap: {
        type: Object as () => GenericObject<Function>,
        default: () => {}
    },
    reactiveVariableMap: {
        type: Object as () => GenericObject<Ref | ComputedRef>,
        default: () => {}
    }
});
// This component was needed to resolve the ref issue
// Ref when not returned from setup does not get opened through vue
// Hence when html gets a ref variable it simply prints __value which is with ""
// Here we are making the object containing refs reactive attempting to open it ourselves
// const tempWidget = reactive(props.widget);
const widgetProps = reactive(props.widget.props ?? {});
const widgetEvents = reactive(props.widget.events ?? {});
</script>