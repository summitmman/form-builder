<template>
  <div>
    <FormBuilder
      :widgets="form.children"
      :widgetMap="widgetMap"
      :eventMap="eventMap"
      :reactiveVariableMap="reactiveVariableMap"
    />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue';
import FormBuilder from './formBuilder/FormBuilder.vue';
import { IForm } from './formBuilder/shared/interfaces';

const widgetMap = {
  Button: defineAsyncComponent(() => import(/* webpackChunkName: "Button" */ './components/Button.vue')),
  TextBox: defineAsyncComponent(() => import(/* webpackChunkName: "TextBox" */ './components/TextBox.vue'))
};
const eventMap = {
  handleAppClick: () => {
    alert('Hello World');
  },
  handleAppCustomClick: () => {
    alert('custom button alert');
  }
};
const name = ref<string>('Hello');
const surname = ref<string>('World');
const singleName = ref('optical fiber');
const reactiveVariableMap = {
  name,
  surname,
  singleName
};

const form: IForm = {
  id: 'sample-form',
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
      id: 'inputExample',
      type: 'TextBox',
      props: {
        type: 'text',
        'v-model': '{{ name }}',
        'v-model:surname': '{{ surname }}',
        'singleName': '{{ singleName }}'
      }
    },
    {
      id: 'sample',
      type: 'p',
      children: [
        'This is the {{ name }} life {{ surname }}'
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
