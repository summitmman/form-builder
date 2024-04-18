<template>
    <div>
        <input type="text" v-model="name" @input="handleChange" />
        <input type="text" v-model="surname" />
        {{ props.singleName }} {{ name }}
    </div>
</template>
<script setup lang="ts">
    const props = defineProps({
        singleName: {
            type: String,
            default: '',
        }
    });
    const emit = defineEmits(['change']);
    const name = defineModel();
    const surname = defineModel('surname');
    const handleChange = () => {
        emit('change', name.value);
    };
</script>