<template>
    <div>
        <input type="text" v-model="name" />
        <input type="text" v-model="surname" />
        {{ props.singleName }}
    </div>
</template>
<script setup lang="ts">
    const props = defineProps({
        singleName: {
            type: String,
            default: '',
        }
    });
    const name = defineModel();
    const surname = defineModel('surname');
</script>