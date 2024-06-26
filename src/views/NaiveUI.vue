<template>
  <div class="flex">
    <div class="w-50 flex-no-grow">
      <FormBuilder
        v-if="form"
        :form="form"
        :widgetMap="widgetMap"
        :eventMap="eventMap"
        :reactiveVariableMap="reactiveVariableMap"
      />
    </div>
    <div class="json-section">
      <h1>JSON</h1>
      <JsonViewer
        v-if="jsonData"
        :value="jsonData"
        expandDepth="2"
        theme="jv-light"
      />
    </div>
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

const jsonData = ref(null);

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
      icon: `${import.meta.env.BASE_URL}/img/diamond.png`
    });
  }
});

const name = ref('Sumit');
const reactiveVariableMap = {
  name,
  nameHint: computed(() => `You have entered: ${name.value}`)
};
const form: Ref<IForm | null> = ref(null);
fetch(`${import.meta.env.BASE_URL}/mocks/naiveui.json`).then(response => response.json()).then(response => {
  jsonData.value = JSON.parse(JSON.stringify(response));
  form.value = response;
});
</script>

<style scoped>
.main-body {
  padding: 20px;
}
</style>
