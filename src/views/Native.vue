<template>
  <div>
    <FormBuilder
      v-if="form"
      :form="form ?? {id: '', children: []}"
      :widgetMap="widgetMap"
      :eventMap="eventMap"
      :reactiveVariableMap="reactiveVariableMap"
    />
    <div class="boundary">
      <h2>This section is outside page builder</h2>
      <p>We will try to enter/change the Single Name/Pet Name</p>
      <input type="text" class="native-input block" v-model="singleName" />
      Your Single Name/Pet Name is "{{ singleName }}"
    </div>
  </div>
</template>
  
<script setup lang="ts">
  import { defineAsyncComponent, ref, Ref, ComputedRef, computed } from 'vue';
  import FormBuilder from '../formBuilder/FormBuilder.vue';
  import { IForm, GenericObject, EventMap } from '../formBuilder/shared/interfaces';
  
  const singleName = ref('Beta');
  const widgetMap = {
    Button: defineAsyncComponent(() => import(/* webpackChunkName: "Button" */ '../components/Button.vue')),
    Name: defineAsyncComponent(() => import(/* webpackChunkName: "Name" */ '../components/Name.vue'))
  };
  const eventMap: EventMap = (reactiveVariables: GenericObject<Ref | ComputedRef>): GenericObject<Function> => ({
    handleAppCustomClick: () => {
      alert(`Hello ${ reactiveVariables.name?.value }`);
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
  
  const form: Ref<IForm | null> = ref(null);
  fetch(`${import.meta.env.BASE_URL}/mocks/native.json`).then(response => response.json()).then(response => {
    form.value = response;
  });
</script>
  
<style scoped>
  .my-div {
    border: 1px solid #aaa;
    padding: 10px;
  }
  .random-native-input {
    border-style: solid;
  }
</style>
  