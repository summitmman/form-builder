<template>
  <div class="main-body">
    <FormBuilder
      :form="form"
      :widgetMap="widgetMap"
      :eventMap="eventMap"
      :reactiveVariableMap="reactiveVariableMap"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, ComputedRef, computed } from 'vue';
import FormBuilder from '../formBuilder/FormBuilder.vue';
import { IForm, GenericObject, EventMap } from '../formBuilder/shared/interfaces';
import 'vuetify/styles';

import * as components from 'vuetify/components';

// Define here or globally
const widgetMap = {
  'v-container': components.VContainer,
  'v-row': components.VRow,
  'v-col': components.VCol,
  'v-card': components.VCard,
  'v-card-item': components.VCardItem,
  'v-card-title': components.VCardTitle,
  'v-card-subtitle': components.VCardSubtitle,
  'v-card-text': components.VCardText,
  'v-text-field': components.VTextField,
  'v-select': components.VSelect,
  'v-radio-group': components.VRadioGroup,
  'v-radio': components.VRadio,
  'v-btn': components.VBtn,
  'v-card-actions': components.VCardActions,
  'v-list': components.VList,
  'v-list-item': components.VListItem
};

const eventMap: EventMap = (reactiveVariables: GenericObject<Ref | ComputedRef>): GenericObject<Function> => ({
  sayHi: () => {
    alert(`Hi ${reactiveVariables.name?.value}!!!`);
    reactiveVariables.benefits?.value.push({
      title: 'New Benefit',
      subtitle: 'Get rewards for new benefit',
      icon: '/img/diamond.png'
    });
  }
});

const name = ref('Sumit');
const reactiveVariableMap = {
  name,
  nameHint: computed(() => `You have entered: ${name.value}`),
};

const form: IForm = {
  id: 'sample-form',
  initialData: {
    name: 'Sumit',
    benefits: [
      {
        title: 'Get Rewards',
        subtitle: 'Get rewards for every commit that you make',
        icon: '/img/diamond.png'
      },
      {
        title: 'Get Knowledge',
        subtitle: 'Professionals will peer review your code and help you learn',
        icon: '/img/deep-learning.png'
      },
      {
        title: 'Build AI',
        subtitle: 'Finally build AI bots which will help rule the world',
        icon: '/img/robotics.png'
      }
    ],
    cities: ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming'],
    city: null

  },
  children: [
    {
      type: 'v-container',
      children: [
        {
          type: 'v-row',
          children: [
            {
              type: 'v-col',
              children: [
                {
                  type: 'h1',
                  children: [
                    'Vuetify Demo'
                  ]
                },
                {
                  type: 'p',
                  children: [
                    'This page demonstrates the use of Page builder. Page builder can be used not only to create forms dynamically but also entire pages with mid-level complexity.'
                  ]
                },
              ]
            }
          ]
        },
        {
          type: 'v-row',
          props: {
            justify: 'start'
          },
          children: [
            {
              type: 'v-col',
              children: [
                {
                  type: 'div',
                  props: {
                    class: 'banner'
                  },
                  children: [
                    {
                      type: 'img',
                      props: {
                        src: '/img/path.jpg',
                        class: 'banner-img'
                      }
                    },
                    {
                      type: 'h1',
                      props: {
                        class: 'banner-text-container'
                      },
                      children: [
                        {
                          type: 'div',
                          props: {
                            class: 'frosted-glass'
                          }
                        },
                        {
                          type: 'div',
                          props: {
                            class: 'banner-text'
                          },
                          children: [
                            'PAGE BUILDER DEMO'
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: 'v-row',
          props: {
            justify: 'start'
          },
          children: [
            {
              type: 'v-col',
              children: [
                {
                  type: 'h2',
                  children: [
                    'Benefits'
                  ]
                },
                {
                  type: 'v-list',
                  props: {
                    lines: 'two'
                  },
                  children: [
                    {
                      type: 'v-for',
                      props: {
                        id: 'myBenefits',
                        loopOn: '{{ benefits }}'
                      },
                      children: [
                        {
                          type: 'v-list-item',
                          props: {
                            title: '{{ myBenefitsItem.title }}',
                            subtitle: '{{ myBenefitsItem.subtitle }}',
                            'prepend-avatar': '{{ myBenefitsItem.icon }}'
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: 'v-row',
          props: {
            justify: 'start'
          },
          children: [
            {
              type: 'v-col',
              children: [
                {
                  type: 'v-card',
                  props: {
                    variant: 'elevated'
                  },
                  children: [
                    {
                      type: 'v-card-item',
                      children: [
                        {
                          type: 'v-card-title',
                          children: [
                            'Enter your name'
                          ]
                        },
                        {
                          type: 'v-card-subtitle',
                          children: [
                            'Just a simple form demo'
                          ]
                        },
                      ]
                    },
                    {
                      type: 'v-card-text',
                      children: [
                        {
                          type: 'v-text-field',
                          props: {
                            'v-model': '{{ name }}',
                            hint: 'You have entered : "{{ name }}"; Thats what you entered',
                            'persistent-hint': true,
                            placeholder: 'Please enter your name',
                            label: 'Your name'
                          }
                        },
                        {
                          type: 'v-select',
                          props: {
                            label: 'Select City',
                            items: '{{ cities }}',
                            'v-model': '{{ city }}',
                            hint: '{{ city }}',
                            'persistent-hint': true,
                            class: 'mt-2'
                          }
                        },
                        {
                          type: 'v-radio-group',
                          props: {
                            'v-model': '{{ city }}',
                            hint: '{{ city }}',
                            'persistent-hint': true
                          },
                          children: [
                            {
                              type: 'v-for',
                              props: {
                                id: 'cities',
                                loopOn: '{{ cities }}'
                              },
                              children: [
                                {
                                  type: 'v-radio',
                                  props: {
                                    label: '{{ citiesItem }}',
                                    value: '{{ citiesItem }}'
                                  }
                                }
                              ]
                            }
                          ]
                        },
                        {
                          type: 'v-card-actions',
                          children: [
                            {
                              type: 'v-btn',
                              props: {
                                variant: 'tonal',
                                color: 'primary'
                              },
                              events: {
                                click: 'sayHi'
                              },
                              children: [
                                'Click to say Hi'
                              ]
                            }
                          ]
                        }
                      ]
                    },
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    
  ]
};
</script>

<style>
.main-body {
  padding: 20px;
}
.mt-2 {
  margin-top: 2px;
}
.banner {
  position: relative;
  text-align: center;
}
.banner-img {
  border-radius: 5px;
  width: 100%;
}
.banner-text-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: calc(100vw * 0.04);
  color: white;
  display: inline-block;
  padding: 10px;
}
.frosted-glass {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  border-radius: 5px;
  background-color: rgba(0,0,0,0.3);
  backdrop-filter: blur(3px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
.banner-text {
  position: relative;
}
</style>
