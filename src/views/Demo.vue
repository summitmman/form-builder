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
import { defineAsyncComponent, ref, Ref, ComputedRef, computed } from 'vue';
import FormBuilder from '../formBuilder/FormBuilder.vue';
import { IForm, GenericObject, EventMap } from '../formBuilder/shared/interfaces';

const widgetMap = {
  Button: defineAsyncComponent(() => import(/* webpackChunkName: "Button" */ '../components/Button.vue')),
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
    ]
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
                    'Demo Page'
                  ]
                },
                {
                  type: 'p',
                  children: [
                    'This page demonstrates the use of Form builder. Form builder can be used not only to create forms dynamically but also entire pages with mid-level complexity.'
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
                    class: 'relative'
                  },
                  children: [
                    {
                      type: 'img',
                      props: {
                        src: '/img/banner.png',
                        class: 'br-4',
                        width: '100%'
                      }
                    },
                    {
                      type: 'h1',
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
                            hint: '{{ nameHint }}',
                            'persistent-hint': true,
                            placeholder: 'Please enter your name',
                            label: 'Your name'
                          }
                        },
                        {
                          type: 'v-card-actions',
                          children: [
                            {
                              type: 'v-btn',
                              props: {
                                variant: 'tonal'
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
.mb-20 {
  margin-bottom: 20px;
}
.br-4 {
  border-radius: 4px;
}
.relative {
  position: relative;
}
.banner-text {
  position: absolute;
  color: white;
  top: calc(50% - 47px);
  text-align: center;
  width: 100%;
  font-family: Dosis;
  font-size: 60px;
}
</style>
