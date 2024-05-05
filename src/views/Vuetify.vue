<template>
  <div class="main-body">
    <FormBuilder
      v-if="form"
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
  nameHint: computed(() => `You have entered: ${name.value}`),
};

const form: Ref<IForm | null> = ref(null);
fetch(`${import.meta.env.BASE_URL}/mocks/vuetify.json`).then(response => response.json()).then(response => {
  form.value = response;
});
</script>

<style scoped>
.main-body {
  padding: 20px;
}
</style>
