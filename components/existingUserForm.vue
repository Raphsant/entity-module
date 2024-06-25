<script setup>
const props = defineProps(['user'])
console.log(props)
</script>

<template>
  <div class="space-y-2.5 mt-2.5">
    <UFormGroup label="Nombre del paciente">
      <UInput disabled :placeholder="props.user.firstName + ' ' + props.user.lastName"/>
    </UFormGroup>
    <UFormGroup label="Email">
      <UInput disabled :placeholder="props.user.email"/>
    </UFormGroup>
    <UFormGroup label="Numero de telefono">
      <UInput disabled :placeholder="props.user.phone"/>
    </UFormGroup>
  </div>
</template>

<style scoped>

</style>