<script setup>
const props = defineProps({
  'type': String,
  'placeholder' : String,
  'readonly' : Boolean,
  'required' : Boolean,
});

// 부모의 v-model과 연결되는 반응형 변수(버전3.4이상 부터)
const model = defineModel();
</script>

<template>
<input
  :type="props.type"
  :readonly="props.readonly"   
  :required="props.required"
  :placeholder="props.placeholder"
  v-model="model"
>
</template>

<style scoped>
input {
  padding: 0 10px;
  width: 300px;
  height: 85px;
  font-size: 24px;
  outline: none;
  border: 2px solid #000;
  border-radius: 10px;
  display: flex;
  align-items: center;
}
</style>
