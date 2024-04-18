<template>
    <template
        v-for="(widget, index) in massagedWidgets"
        :key="(typeof widget === 'string' ? widget : widget.id) + index"
    >
        <DynamicString v-if="typeof widget === 'string'" :str="widget" :reactiveVariableMap="props.reactiveVariableMap" />
        <WidgetRenderer v-else :widget="widget" :widgetMap="props.widgetMap" :eventMap="props.eventMap" :reactiveVariableMap="props.reactiveVariableMap" />
    </template>
</template>
<script setup lang="ts">
import { ComputedRef, Ref, computed } from 'vue';
import { Widgets, GenericObject } from './shared/interfaces';
import { regex } from './shared/constants';
import WidgetRenderer from './WidgetRenderer.vue';
import DynamicString from './DynamicString.vue';

const props = defineProps({
    widgets: {
        type: Array as () => Widgets<string | Function>,
        default: () => [],
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

// Handle all string to mapped object conversions here; of only current level
const massagedWidgets: ComputedRef<Widgets<string | Function>> = computed(() => props.widgets.map(widget => {
    if (typeof widget === 'string') {
        return widget;
    }

    // prepare events
    if (widget.events) {
        Object.keys(widget.events).forEach(eventName => {
            if (!widget.events) {
                return;
            }

            const eventValue = widget.events && widget.events[eventName];
            if (typeof eventValue === 'function') {
                return;
            }
            if (eventValue && props.eventMap[eventValue]) {
                widget.events[eventName] = props.eventMap[eventValue];
            } else {
                widget.events[eventName] = () => {
                    console.error(`Event ${eventValue} not found`);
                };
            }
        });
    }

    // prepare props for v-model
    // NOTE: v-model will only work on custom Vue components not native html components
    if (widget.props) {
        Object.keys(widget.props).forEach(propName => {
            if (!widget.props) {
                return;
            }
            // provide dynamic values
            if (widget.props[propName]) {
                const value = widget.props[propName];
                if (typeof value === 'string') {
                    const match = regex.exec(value);
                    if (match) {
                        if (match.index === 0 && match[0].length === value.length) {
                            const variable = match[0].replace('{{', '').replace('}}', '').trim();
                            if (props.reactiveVariableMap[variable]) {
                                widget.props[propName] = props.reactiveVariableMap[variable];
                            }
                        }
                    }
                }
            }
            // handle v-model separately
            if (propName.includes('v-model')) {
                const vModelComponents = propName.split(':');
                const vModelName = vModelComponents[1] ?? 'modelValue';
                
                // add prop for v-model
                widget.props[vModelName] = widget.props[propName];

                // add event for v-model
                if (!widget.events) {
                    widget.events = {};
                }
                widget.events[`update:${vModelName}`] = (value: any): void => {
                    if (widget.props)
                        widget.props[propName].value = value;
                };
            }
        });
    }

    return widget;
}));

</script>