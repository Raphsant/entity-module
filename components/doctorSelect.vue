<script setup lang="js">
//Imports
const config = useRuntimeConfig();

//emitter
const emit = defineEmits(['selectDoctor'])

//Variables
const specialtyList = [
  "Medicina Interna",
  "Tecnico Cardiopulmonar",
  "Neumonologia Pediatrica",
  "Neurologia",
  "Cirugia Vascular Periferica",
  "Cardiologia",
  "Cirugia General",
  "Gastroenterologia",
  "Otorrinolaringologia",
  "Radiologia",
  "Urologia",
  "Nefrologia",
  "Neumonologia",
  "Ginecologo / Obstetra",
  "Traumatologia",
  "Ginecologo / Mastologia",
  "Dermatologia",
  "Medicina General",
  "Cirugia Pediatrica",
  "Neurocirugia",
  "Pediatria",
];

//State Variables
const selectedSpecialty = ref([]) //Holds Specialty to trigger API Call
const doctorList = ref([]) // Holds the JSON response with the Doctor List
const selectedDoctor = ref([]) // Holds the selected Doctor

//Lifecycle hooks
/**
 * This watcher observes and reacts to changes in the `selectedSpecialty` data property.
 * When `selectedSpecialty` changes, a GET request is sent to fetch a list of doctors
 * from a server-side API endpoint, filtered by the selected specialty.
 *
 * @param {string} specialty The specialty that user has selected and the watcher is observing.
 */
watch(selectedSpecialty, async (specialty) => {
  const list = await $fetch(`${config.public.serverUri}/api/doctor/specialty`, {
    method: 'GET',
    query: {specialty: specialty}
  })
  if (list) {
    doctorList.value = list
  }
})
/**
 * Emits the doctor to the top component
 */

watch(selectedDoctor, async (doctor) => {
  emit('selectDoctor', doctor)
})

</script>

<template>
  <div class="space-y-2.5">
    <USelectMenu placeholder="Seleccione una especialidad" v-model="selectedSpecialty" :options="specialtyList"/>
    <div v-if="doctorList" class="grid  grid-cols-3 gap-4">
      <UButton @click="selectedDoctor = doctor" class="text-center flex justify-center items-center"
               :variant="selectedDoctor === doctor ? 'soft' : 'solid' " :key="doctor.id" v-for="doctor in doctorList"
               :label="doctor.firstName + ' ' + doctor.lastName"/>
    </div>
  </div>
</template>

<style scoped>

</style>