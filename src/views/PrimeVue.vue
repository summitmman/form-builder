<template>
  <div class="main-body">
    <FormBuilder
      :form="form"
      :widgetMap="widgetMap"
      :eventMap="eventMap"
      :reactiveVariableMap="reactiveVariableMap"
    />
    <Accordion :activeIndex="0">
      <AccordionTab header="Header I">
          <p class="m-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
              laborum.
          </p>
      </AccordionTab>
      <AccordionTab header="Header II">
          <p class="m-0">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
              enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
          </p>
      </AccordionTab>
      <AccordionTab header="Header III">
          <p class="m-0">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
              culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
          </p>
      </AccordionTab>
  </Accordion>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, ComputedRef, computed, defineAsyncComponent } from 'vue';
import FormBuilder from '../formBuilder/FormBuilder.vue';
import { IForm, GenericObject, EventMap } from '../formBuilder/shared/interfaces';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';

// Define here or globally
const widgetMap = {
  // 'Accordion': defineAsyncComponent(() => import(/* webpackChunkName: "Accordion" */ 'primevue/accordion')),
  // 'AccordionTab': defineAsyncComponent(() => import(/* webpackChunkName: "AccordionTab" */ 'primevue/accordiontab')),
  Accordion,
  AccordionTab,
  Button,
  Card,
  InputText,
  FloatLabel
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
    city: null,
    activeIndex: 0,
  },
  children: [
    {
      type: 'h1',
      children: [
        'PrimeVue Demo'
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
                'PAGE BUILDER DEMO'
              ]
            }
          ]
        }
      ]
    },
    // {
    //   type: 'h2',
    //   children: [
    //     'Benefits'
    //   ]
    // },
    // {
    //   type: 'InputText',
    //   props: {
    //     type: 'text',
    //     'v-model': '{{ name }}'
    //   }
    // },
    {
      type: 'h2',
      children: [
        'Enter your name'
      ]
    },
    {
      type: 'p',
      props: {
        class: 'mb-10'
      },
      children: [
        'just a simple form demo'
      ]
    },
    {
      type: 'div',
      children: [
        {
          type: 'FloatLabel',
          children: [
            {
              type: 'InputText',
              props: {
                id: 'name',
                type: 'text',
                'v-model': '{{ name }}'
              }
            },
            {
              type: 'label',
              props: {
                for: 'name'
              },
              children: [
                'First Name'
              ]
            }
          ]
        },
      ]
    },
    {
      type: 'Button',
      props: {
        label: 'Check'
      }
    },
    // {
    //   type: 'Accordion',
    //   props: {
    //     activeIndex: '{{ activeIndex }}'
    //   },
    //   children: [
    //     // {
    //     //   type: 'v-for',
    //     //   props: {
    //     //     id: 'myBenefits',
    //     //     loopOn: '{{ benefits }}'
    //     //   },
    //     //   children: [
    //         {
    //           type: 'AccordionTab',
    //           props: {
    //             header: '{{ myBenefitsItem.title }}'
    //           },
    //           children: [
    //             {
    //               type: 'p',
    //               props: {
    //                 class: 'flex'
    //               },
    //               children: [
    //                 'Dekhte hain yeh chalta hai ki nahi'
    //                 // {
    //                 //   type: 'div',
    //                 //   children: [
    //                 //     {
    //                 //       type: 'img',
    //                 //       props: {
    //                 //         src: '{{ myBenefitsItem.icon }}',
    //                 //         class: 'native-avatar'
    //                 //       }
    //                 //     }
    //                 //   ]
    //                 // },
    //                 // {
    //                 //   type: 'div',
    //                 //   children: [
    //                 //     {
    //                 //       type: 'h4',
    //                 //       children: [
    //                 //         '{{ myBenefitsItem.title }}'
    //                 //       ]
    //                 //     },
    //                 //     {
    //                 //       type: 'div',
    //                 //       children: [
    //                 //         '{{ myBenefitsItem.subtitle }}'
    //                 //       ]
    //                 //     }
    //                 //   ]
    //                 // }
    //               ]
    //             }
    //           ]
    //         }
    //     //   ]
    //     // }
    //   ]
    // },
    {
      type: 'Card',
      children: [
        'Content'
      ]
    }
    // {
    //   type: 'v-row',
    //   props: {
    //     justify: 'start'
    //   },
    //   children: [
    //     {
    //       type: 'v-col',
    //       children: [
    //         {
    //           type: 'v-card',
    //           props: {
    //             variant: 'elevated'
    //           },
    //           children: [
    //             {
    //               type: 'v-card-item',
    //               children: [
    //                 {
    //                   type: 'v-card-title',
    //                   children: [
    //                     'Enter your name'
    //                   ]
    //                 },
    //                 {
    //                   type: 'v-card-subtitle',
    //                   children: [
    //                     'Just a simple form demo'
    //                   ]
    //                 },
    //               ]
    //             },
    //             {
    //               type: 'v-card-text',
    //               children: [
    //                 {
    //                   type: 'v-text-field',
    //                   props: {
    //                     'v-model': '{{ name }}',
    //                     hint: 'You have entered : "{{ name }}"; Thats what you entered',
    //                     'persistent-hint': true,
    //                     placeholder: 'Please enter your name',
    //                     label: 'Your name'
    //                   }
    //                 },
    //                 {
    //                   type: 'v-select',
    //                   props: {
    //                     label: 'Select City',
    //                     items: '{{ cities }}',
    //                     'v-model': '{{ city }}',
    //                     hint: '{{ city }}',
    //                     'persistent-hint': true,
    //                     class: 'mt-2'
    //                   }
    //                 },
    //                 {
    //                   type: 'v-radio-group',
    //                   props: {
    //                     'v-model': '{{ city }}',
    //                     hint: '{{ city }}',
    //                     'persistent-hint': true
    //                   },
    //                   children: [
    //                     {
    //                       type: 'v-for',
    //                       props: {
    //                         id: 'cities',
    //                         loopOn: '{{ cities }}'
    //                       },
    //                       children: [
    //                         {
    //                           type: 'v-radio',
    //                           props: {
    //                             label: '{{ citiesItem }}',
    //                             value: '{{ citiesItem }}'
    //                           }
    //                         }
    //                       ]
    //                     }
    //                   ]
    //                 },
    //                 {
    //                   type: 'v-card-actions',
    //                   children: [
    //                     {
    //                       type: 'v-btn',
    //                       props: {
    //                         variant: 'tonal',
    //                         color: 'primary'
    //                       },
    //                       events: {
    //                         click: 'sayHi'
    //                       },
    //                       children: [
    //                         'Click to say Hi'
    //                       ]
    //                     }
    //                   ]
    //                 }
    //               ]
    //             },
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // }
  ]
    
};
</script>

<style scoped>
.main-body {
  padding: 20px;
}
</style>
