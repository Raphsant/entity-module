<script setup lang="js">
const config = useRuntimeConfig();
const emit = defineEmits(['submitUser'])


const user = reactive({
  firstName: undefined,
  lastName: undefined,
  id: undefined,
  phone: undefined,
  email: undefined,
})

function postUser() {
  emit('submitUser', user)

}


</script>

<template>
  <div class="space-y-2.5 mt-2.5">
    <div class="py-1.5 w-full text-center font-bold">
      Usuario no existe en el sistema, por favor ingrese sus datos completos
    </div>
    <div class="flex w-full space-x-3.5">
      <UFormGroup label="Primer Nombre">
        <UInput v-model="user.firstName"/>
      </UFormGroup>
      <UFormGroup label="Cedula">
        <UInput v-model="user.id"/>
      </UFormGroup>
      <UFormGroup label="Apellido">
        <UInput v-model="user.lastName"/>
      </UFormGroup>
    </div>
    <UFormGroup label="Numero de Telefono">
      <UInput v-model="user.phone"/>
    </UFormGroup>
    <UFormGroup label="Correo Electronico">
      <UInput v-model="user.email"/>
    </UFormGroup>
    <UButton @click="postUser" label="Guardar Nuevo Usuario"/>
  </div>
</template>

<style scoped>

</style>