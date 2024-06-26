# Form Builder

Form Builder lets you create a page through JSON. You will be able to create any native or custom vue component with attributes, event bindings and nested children. This library can be used to create moderately complex pages on the go with some level of reactivity support.

### Use case
If a page in a user's UI journey needs to be customized (for each user, or service provider or any other marker) at runtime, you may store the JSON schema as per customizations in the database and let the Form Builder render the page for you.

### Demo
https://summitmman.github.io/form-builder/

## Features

- [X] Render any html element
- [X] Render custom vue component
- [X] Props support
- [X] Events support with access to reactive variables
- [X] v-model support (only supported for custom vue components and not native html ones)
- [X] Multiple v-model support
- [X] Dynamic text support
- [X] Dynamic props support
- [X] Named slots
- [X] Initial set of reactive variables from JSON
- [X] v-if
- [X] v-for with access to loop variables
- [X] Nested ref variables in template
- [X] Use any component library

## Basic usage

1. In Terminal
```
npm install summitmman-form-builder
```
2. In main.ts
```
import FormBuilder from 'summitmman-form-builder';

app.use(FormBuilder);
```
3. Create form schema which complies to IForm
```
import { IForm } from 'summitmman-form-builder';
```
4. Create widgetMap, which is a mapping of string keys to vue components. These keys are used in the form JSON schema. Components can be lazily loaded and mapped. If the components to be used are globally imported then there is no need of adding it to the widgetMap
```
const widgetMap = {
    Button: defineAsyncComponent(() => import(/* webpackChunkName: "Button" */ './components/Button.vue')),
    Name: defineAsyncComponent(() => import(/* webpackChunkName: "Name" */ './components/Name.vue'))
};
```
5. Create set of reactive variables. Note: the initialData that you pass through the JSON form schema are also added to this set.
```
const singleName = ref('Sumit');
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
```
6. Create eventMap, which is a mapping of string keys to functions. Each of these functions will have access to the set of reactive variables powered by Form Builder
```
const eventMap: EventMap = (reactiveVariables: GenericObject<Ref | ComputedRef>): GenericObject<Function> => ({
    handleAppCustomClick: () => {
        alert(`Hello ${ reactiveVariables.name?.value }`);
    },
    handleChange: (val: any) => {
        console.log('LOG', val, reactiveVariables.surname?.value);
    },
    singleNameLengthFn: () => {
        return reactiveVariables.singleNameLength?.value;
    }
});
```
7. Add to template
```
<FormBuilder
    :form="form"
    :widgetMap="widgetMap"
    :eventMap="eventMap"
    :reactiveVariableMap="reactiveVariableMap"
/>
```
## Other supported features
1. v-if
```
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
                'This text shows when both Single Name/Pet Name and First Name are invalid'
            ]
            },
            children: [
            'This text only shows when Single Name/Pet Name is invalid but First Name : "{{ name }}" is valid'
            ]
        }
        ]
    },
    children: [
        'This text only shows when Single Name/Pet Name length : "{{ singleNameLength }}" is a valid',
    ]
}
```
2. v-for
```
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
            '{{ name }} has lived in {{loopingIndex}}:{{ loopingItem.name }}'
        ]
        }
    ]
}
```
3. Named slots
```
"slots": {
    "footer": [
        "This footer is a ",
        {
            "type": "b",
            "children": [
                "named slot example "
            ]
        },
        "showing last name '{{ surname }}' and ",
        {
            "type": "b",
            "children": [
                "slotProps "
            ]
        },
        "'{{ footerSlotProps.message }}'"
    ]
}
```

### Findings
Ref when passed through an object and not directly returned to the template does not get opened by vue
Hence when vue encounters a variable which is not opened it simply prints the __value which is the value with double quotes
To resolve this we had to create Renderer components which simply return the ref variables inside the object to the template or open it ourselves using the reactive construct