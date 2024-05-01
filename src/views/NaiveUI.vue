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
import {
  NButton,
  NCard,
  NCollapse,
  NCollapseItem,
  NAvatar,
  NInput,
  NSelect,
  NRadio,
  NRadioGroup,
  NSpace
} from 'naive-ui';

// Define here or globally
const widgetMap = {
  NButton,
  NCard,
  NCollapse,
  NCollapseItem,
  NAvatar,
  NInput,
  NSelect,
  NRadio,
  NRadioGroup,
  NSpace
};

const eventMap: EventMap = (reactiveVariables: GenericObject<Ref | ComputedRef>): GenericObject<Function> => ({
  sayHi: () => {
    alert(`Hi ${reactiveVariables.name?.value}!!!. This click also adds a dummy benefit "New Benefit"`);
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
  nameHint: computed(() => `You have entered: ${name.value}`)
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
    cities: [
      {
        label: 'California',
        value: 'California'
      },
      {
        label: 'Colorado',
        value: 'Colorado'
      },
      {
        label: 'Florida',
        value: 'Florida'
      },
      {
        label: 'Georgia',
        value: 'Georgia'
      },
      {
        label: 'Texas',
        value: 'Texas'
      },
      {
        label: 'Wyoming',
        value: 'Wyoming'
      }
    ],
    city: null,
    activeIndex: 0,
  },
  children: [
    {
      type: 'h1',
      children: [
        'Naive UI Demo'
      ]
    },
    {
      type: 'p',
      props: {
        class: 'mb-10'
      },
      children: [
        'This page demonstrates the use of Page builder. Page builder can be used not only to create forms dynamically but also entire pages with mid-level complexity.'
      ]
    },
    {
      type: 'div',
      props: {
        class: 'banner mb-10'
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
                'PAGE BUILDER DEMO - Naive UI'
              ]
            }
          ]
        }
      ]
    },
    {
      type: 'h2',
      props: {
        class: 'mb-10'
      },
      children: [
        'Benefits'
      ]
    },
    {
      type: 'NCollapse',
      props: {
        class: 'mb-20'
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
              type: 'NCollapseItem',
              props: {
                title: '{{ myBenefitsItem.title }}',
                name: '{{ myBenefitsIndex }}'
              },
              slots: {
                'header-extra': [
                  'This is {{ header-extraSlotProps.collapsed }}'
                ]
              },
              children: [
                {
                  type: 'div',
                  props: {
                    class: 'flex align-items-center'
                  },
                  children: [
                    {
                      type: 'div',
                      children: [
                        {
                          type: 'NAvatar',
                          props: {
                            size: 'large',
                            src: '{{ myBenefitsItem.icon }}',
                            round: true
                          }
                        }
                      ]
                    },
                    {
                      type: 'div',
                      props: {
                        class: 'ml-10',
                      },
                      children: [
                        '{{ myBenefitsItem.subtitle }}'
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
      type: 'NCard',
      props: {
        title: 'Enter your name (just a simple form demo)'
      },
      slots: {
        'header-extra': [
          'just a simple form demo'
        ],
        'action': [
          {
            type: 'NButton',
            props: {
              type: 'primary'
            },
            events: {
              click: 'sayHi'
            },
            children: [
              'Click to say Hi'
            ]
          }
        ]
      },
      children: [
        {
          type: 'div',
          props: {
            class: 'mb-10'
          },
          children: [
            {
              type: 'label',
              props: {
                for: 'firstName'
              },
              children: [
                'First Name'
              ]
            },
            {
              type: 'NInput',
              props: {
                id: 'firstName',
                'v-model:value': '{{ name }}',
                placeholder: 'Enter your name'
              }
            },
            {
              type: 'span',
              children: [
                'You have entered : "{{ name }}"; Thats what you entered'
              ]
            }
          ]
        },
        {
          type: 'div',
          props: {
            class: 'mb-10'
          },
          children: [
            {
              type: 'NSelect',
              props: {
                placeholder: 'Select City',
                options: '{{ cities }}',
                'v-model:value': '{{ city }}'
              }
            },
            {
              type: 'span',
              children: [
                '{{ city }}'
              ]
            }
          ]
        },
        {
          type: 'div',
          props: {
            class: 'mb-10'
          },
          children: [
            {
              type: 'NRadioGroup',
              props: {
                name: 'cityRadioGroup',
                'v-model:value': '{{ city }}',
                class: 'block'
              },
              children: [
                {
                  type: 'NSpace',
                  children: [
                    {
                      type: 'v-for',
                      props: {
                        id: 'citiesRadio',
                        loopOn: '{{ cities }}'
                      },
                      children: [
                        {
                          type: 'NRadio',
                          props: {
                            value: '{{ citiesRadioItem.value }}',
                            label: '{{ citiesRadioItem.label }}',
                            class: 'flex'
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              type: 'span',
              children: [
                '{{ city }}'
              ]
            }
          ]
        }
      ]
    }
  ]
    
};
</script>

<style scoped>
.main-body {
  padding: 20px;
}
</style>
