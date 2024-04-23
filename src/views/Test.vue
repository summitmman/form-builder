<template>
    <div>
      <FormBuilder
        :form="form"
        :widgetMap="widgetMap"
        :eventMap="eventMap"
        :reactiveVariableMap="reactiveVariableMap"
      />
      <div>
        Outside form builder
        <input type="text" v-model="singleName" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineAsyncComponent, ref, Ref, ComputedRef, computed } from 'vue';
  import FormBuilder from '../formBuilder/FormBuilder.vue';
  import { IForm, GenericObject, EventMap } from '../formBuilder/shared/interfaces';
  
  const singleName = ref('optical fiber');
  const widgetMap = {
    Button: defineAsyncComponent(() => import(/* webpackChunkName: "Button" */ '../components/Button.vue')),
    TextBox: defineAsyncComponent(() => import(/* webpackChunkName: "TextBox" */ '../components/TextBox.vue'))
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
    },
    singleNameLengthFn: () => {
      return reactiveVariables.singleNameLength?.value;
    }
  });
  const reactiveVariableMap = {
    singleName,
    singleNameLength: computed(() => singleName.value.length),
    cities: ref([
      {
        name: 'Mumbai',
      },
      {
        name: 'Bengaluru'
      }
    ])
  };
  
  const form: IForm = {
    id: 'sample-form',
    initialData: {
      name: 'Hello',
      surname: 'World'
    },
    children: [
      {
        type: 'div',
        props: {
          class: 'my-div'
        },
        children: [
          'Hello World',
          {
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
        type: 'p',
        children: [    
          {
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
            type: 'Button',
            events: {
              click: 'handleAppCustomClick'
            },
            children: [
              'Custom button'
            ]
          }
        ]
      },
      {
        type: 'v-if',
        props: {
          condition: '{{ singleNameLength }}',
          vElseChildren: [
            {
              type: 'v-if',
              props: {
                condition: '{{ name }}',
                vElseChildren: [
                  'This text shows when both singleNameLength and name are invalid'
                ]
              },
              children: [
                'This text only shows when singleNameLength is invalid and name: {{ name }} is valid'
              ]
            }
          ]
        },
        children: [
          'This text only shows when singleNameLength: {{ singleNameLength }} is a valid',
        ]
      },
      {
        type: 'v-for',
        props: {
          id: 'looping',
          loopOn: '{{ cities }}'
        },
        children: [
          {
            type: 'div',
            children: [
              'This is element {{ loopingItem.name }} at position {{ loopingIndex }} : {{ name }}'
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
  