<script setup lang="js">
import {format} from 'date-fns';
import {es} from 'date-fns/locale';

const {apt, user, doctor} = defineProps(['apt', 'user', 'doctor'])
const isOpen = ref(true)
const router = useRouter();
</script>

<template>
  <UModal prevent-close v-model="isOpen">
    <UCard>
      <template #header>
        <span class="text-xl">Cita #{{ apt.apt.id }} agendada</span>
      </template>
      <template #default>
        <div class="text-center text-md flex flex-col justify-center items-center px-10">
          <div class="grid grid-cols-2 w-full content-center">
            <div class="text-gray-400  place-self-start">Fecha:</div>
            <div class="text-lg place-self-end">{{
                format(apt.apt.dateTime, "dd 'de' MMMM yyyy, HH:mm", {locale: es})
              }}
            </div>
          </div>
          <div class="grid grid-cols-2 w-full content-center">
            <div class="text-gray-400 place-self-start">Paciente:</div>
            <div class="text-lg place-self-end">{{ user.firstName + ' ' + user.lastName }}</div>

          </div>
          <div class="grid grid-cols-2 w-full content-center">
            <div class="text-gray-400 place-self-start">Doctor:</div>
            <span class="truncate text-lg place-self-end">{{ doctor.firstName + ' ' + doctor.lastName }}</span>

          </div>
        </div>
      </template>
      <template #footer>
        <UButton class="text-md" size="lg" variant="soft" block @click="router.go()">
          Agendar otra cita
        </UButton>
      </template>
    </UCard>
  </UModal>
</template>

<style scoped>

</style>