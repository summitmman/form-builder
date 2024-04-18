<template>
  <div>
    <FormBuilder
      :form="form"
      :widgetMap="widgetMap"
      :eventMap="eventMap"
      :reactiveVariableMap="reactiveVariableMap"
    />
    <input type="text" v-model="singleName" />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, Ref, ComputedRef } from 'vue';
import FormBuilder from './formBuilder/FormBuilder.vue';
import { IForm, GenericObject, EventMap } from './formBuilder/shared/interfaces';

const singleName = ref('optical fiber');
const widgetMap = {
  Button: defineAsyncComponent(() => import(/* webpackChunkName: "Button" */ './components/Button.vue')),
  TextBox: defineAsyncComponent(() => import(/* webpackChunkName: "TextBox" */ './components/TextBox.vue'))
};
const eventMap: EventMap = (reactiveVariables: GenericObject<Ref | ComputedRef>): GenericObject<Function> => ({
  handleAppClick: () => {
    alert('Hello World');
  },
  handleAppCustomClick: () => {
    alert(`custom button alert ${ reactiveVariables.name?.value }`);
  },
  handleChange: (val: any) => {
    console.log('SUMIT LOG', val, reactiveVariables.surname?.value);
  }
});
const reactiveVariableMap = {
  singleName
};

const form: IForm = {
  id: 'sample-form',
  initialData: {
    name: 'Hello',
    surname: 'World'
  },
  children: [
    {
      id: 'el1',
      type: 'div',
      props: {
        class: 'my-div'
      },
      children: [
        'Hello World',
        {
          id: 'nestedEl3',
          type: 'button',
          events: {
            click: 'handleAppClick'
          },
          children: [
            'Nested Click me'
          ]
        }
      ]
    },
    {
      id: 'el2',
      type: 'button',
      events: {
        click: 'handleAppClick'
      },
      children: [
        'Click me'
      ]
    },
    {
      id: 'customButton',
      type: 'Button',
      events: {
        click: 'handleAppCustomClick'
      },
      children: [
        'Custom button'
      ]
    },
    {
      id: 'sample',
      type: 'p',
      children: [    
        {
          id: 'inputExample',
          type: 'TextBox',
          props: {
            type: 'text',
            'v-model': '{{ name }}',
            'v-model:surname': '{{ surname }}',
            'singleName': '{{ singleName }}'
          },
          events: {
            change: 'handleChange'
          }
        },
        'This is the {{ name }} life {{ surname }} {{ singleName }}',
        {
          id: 'customButton',
          type: 'Button',
          events: {
            click: 'handleAppCustomClick'
          },
          children: [
            'Custom button'
          ]
        }
      ]
    }
  ]
};
</script>

<style>
.my-div {
  border: 1px solid #aaa;
  padding: 10px;
}
</style>
