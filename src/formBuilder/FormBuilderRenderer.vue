<template>
    <DynamicString v-if="typeof tempWidget === 'string'" :str="tempWidget" :reactiveVariableMap="$props.reactiveVariableMap" />
    <component
        v-else
        :is="($props.widgetMap && $props.widgetMap[tempWidget.type]) ?? tempWidget.type"
        v-bind="tempWidget.props ?? {}"
        v-on="typeof tempWidget === 'string' ? {} : tempWidget.events ?? {}"
    >
        <FormBuilder
            v-if="$props.widget && typeof $props.widget !== 'string' && $props.widget.children"
            :widgets="$props.widget.children"
            :widgetMap="$props.widgetMap"
            :eventMap="$props.eventMap"
            :reactiveVariableMap="$props.reactiveVariableMap"
        />
    </component>
</template>
<script setup lang="ts">
import { Ref, ComputedRef, reactive } from 'vue';
import { IWidget, GenericObject } from './shared/interfaces';
import DynamicString from './DynamicString.vue';
import FormBuilder from './FormBuilder.vue';
const props = defineProps({
    widget: {
        type: [String, Object as () => IWidget<Function | string>],
        default: {}
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
let tempWidget = props.widget;
if (typeof props.widget !== 'string') {
    tempWidget = reactive(props.widget);
}
</script>