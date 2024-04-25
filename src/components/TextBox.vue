<template>
    <div>
        <input class="native-input" type="text" v-model="name" @input="handleChange" />
        <input class="native-input" type="text" v-model="surname" />
        <div>{{ props.singleName }} {{ name }}</div>
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
<style scoped>
.native-input {
    border-style: solid;
}
</style>