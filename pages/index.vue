<script setup>
import AptDatePicker from "~/components/aptDatePicker.vue";
import moment from "moment";

const config = useRuntimeConfig();
const insuranceList = ref(undefined)
onBeforeMount(() => {
  const {error, data, pending,} = useFetch(`${config.public.serverUri}/api/insurances/all`, {
    onResponse({response}) {

      const newArray = response._data.map(x => {
        return x.name
      })
      insuranceList.value = newArray

    }
  })
})

//State Variables
const user = ref('')
const selectedInsurance = ref("");
const selectedDoctor = ref("")
const selectedDate = ref("")
const isNew = ref(false)
const isLoading = ref(false)
const state = ({
  userId: undefined
})
const confirmedApt = ref(undefined)

//methods

/**
 * Retrieves user data from the server.
 *
 * @returns {Promise<void>} A promise that resolves when the user data is successfully retrieved.
 */

async function getUser() {
  const data = await $fetch(`${config.public.serverUri}/api/user/getUser`, {
    method: 'GET',
    query: {userId: state.userId}
  })
  user.value = await data
  if (user.value === null) {
    isNew.value = true;
  }
}

async function handleClick(n) {
  isLoading.value = true;
  selectedDate.value = n;
  // console.log(selectedDate.value)
  // console.log(selectedDoctor.value)
  // console.log(user)
  const format = "dddd, YYYY-MM-DD hh:mm A"; // Custom format matching your input
  const combinedDateTime = moment(selectedDate.value.date + " " + selectedDate.value.time, format);

// If you want to output this as an ISO string or any other format
  const isoDateTimeString = combinedDateTime.toISOString();
  const customFormattedString = combinedDateTime.format('YYYY-MM-DDTHH:mm:ss');

  try {
    const appointment = await $fetch(`${config.public.serverUri}/api/apts/entity/create`, {
      method: 'POST',
      body: {
        doctorId: selectedDoctor.value.id,
        dateTime: isoDateTimeString,
        user: user.value,
        isNew: isNew.value,
        insurance: selectedInsurance.value

      }
    })
    if (appointment) {
      console.log(appointment)
      isLoading.value = false
      confirmedApt.value = appointment
    }
  } catch (e) {
    console.error(e)
  }

}


</script>

<template>
  <ConfirmationModal :apt="confirmedApt" v-if="confirmedApt" :doctor="selectedDoctor" :user="user"/>
  <UPage>
    <template #default>
      <ULandingHero>
        <template #title>
          Modulo de aseguradoras
        </template>
        <template #description class="text-primary">
          Centro Clinico Vista Centro
        </template>
      </ULandingHero>
      <UContainer class="w-1/2">
        <UCard>
          <template #default>
            <UCard>
              <UForm :state="state" class="space-y-2.5">
                <UInputMenu v-if="insuranceList" v-model="selectedInsurance" :options="insuranceList"
                            placeholder="Seleccionar Aseguradora"></UInputMenu>
                <UFormGroup label="Cedula de identidad" name="userId">
                  <div class="flex w-full justify-start items-center space-x-3">
                    <UInput v-model="state.userId" placeholder="Numero de cedula"/>
                    <UButton @click="getUser" label="Buscar Paciente"/>
                  </div>
                  <ExistingUserForm v-if="user" :user="user"/>
                  <NewUserForm @submit-user="(n) => user = n" v-if="user === null"/>
                </UFormGroup>
              </UForm>
            </UCard>
            <UCard>
              <template #default>
                <DoctorSelect @select-doctor="(n) => selectedDoctor = n"/>
                <AptDatePicker @send="(d) => handleClick(d)" v-if="selectedDoctor" :doctor="selectedDoctor"
                               :key="selectedDoctor.id" :isLoading="isLoading"/>
              </template>
            </UCard>

          </template>
        </UCard>

      </UContainer>
    </template>
  </UPage>
</template>

<style scoped>

</style>