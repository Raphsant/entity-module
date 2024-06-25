<script setup lang="js">
//imports
import moment from "moment";
import {format} from "date-fns";
import {es} from 'date-fns/locale';

const {doctor, isLoading} = defineProps(['doctor', 'isLoading'])
const {firstName, lastName, specialty, schedule, id} = doctor;
const emit = defineEmits(['send'])
const config = useRuntimeConfig();

// Get Doctors apts

const {data, error} = await useFetch(`${config.public.serverUri}/api/apts/getDoctorApts`, {
  method: 'GET',
  query: {doctorId: doctor.id},
  onResponse({response}) {

  }
})


//state variables

const selectedDate = reactive({
  date: '',
  time: ''
})

const doctorApts = ref('')
doctorApts.value = data



//filtering

// Filtering active schedule
const filteredSchedule = Object.entries(schedule).filter(([day, data]) => data.active);
console.log(filteredSchedule);

// Time slot generation
const generateTimeSlots = (start, end) => {
  let slots = [];
  let current = moment(start);
  let endMoment = moment(end);

  while (current < endMoment) {
    slots.push(current.format('hh:mm A'));
    current.add(30, 'minutes');
  }

  return slots;
};

// Get upcoming dates for the next 2 weeks
const getUpcomingDates = (day) => {
  let dates = [];
  let today = moment().startOf('day');
  let dayIndex = moment().day(day).day();

  for (let i = 0; i < 14; i++) {
    let date = today.clone().day(dayIndex + (i * 7));
    if (date.isSameOrAfter(today) && date.diff(today, 'days') < 14) {
      dates.push(date);
    }
  }

  return dates;
};

// Get unavailable times
const getUnavailableTimes = (appointments, targetDate) => {
  console.log(appointments.value)
  return appointments.value
      .filter(appointment => moment(appointment.dateTime).isSame(targetDate, 'day'))
      .map(appointment => moment(appointment.dateTime).format('hh:mm A'));
};

// Generating results with available time slots
let result = {};

filteredSchedule.forEach(([day, data]) => {
  if (data.active) {
    let dates = getUpcomingDates(day);
    dates.forEach(date => {
      let startTime = moment(date.format('YYYY-MM-DD') + ' ' + data.times.startTime);
      let endTime = moment(date.format('YYYY-MM-DD') + ' ' + data.times.endTime);
      let availableSlots = generateTimeSlots(startTime, endTime);

      // Filter out unavailable times
      let unavailableTimes = getUnavailableTimes(doctorApts.value, date);
      availableSlots = availableSlots.filter(slot => !unavailableTimes.includes(slot));

      result[date.format('dddd, YYYY-MM-DD')] = availableSlots;
    });
  }
});

console.log(result);


// methods

function handleSelection(d, t) {
  selectedDate.date = d
  selectedDate.time = t
  console.log(selectedDate)
  navigateTo('#btn')
}

</script>

<template>

  <div class="space my-2.5">
    <div class="text-2xl text-center">
      Dr.{{ firstName + ' ' + lastName }}
    </div>
    <div class="mt-3">
      <template :key="[date, time]" v-for="(time, date) in result">
        <div class="space-y-3 mt-3">
          <div class=" text-xl">
            {{ format(date, 'PPPP', {locale: es}) }}
          </div>
          <div class="grid grid-cols-5 w-full gap-3 justify-center items-center">
            <UButton  :variant="selectedDate.time == timeslot && selectedDate.date == date ? 'soft' : 'solid' "
                     @click="handleSelection(date,timeslot)"
                     class="flex justify-center items-center text-md"
                     v-for="timeslot in time" :label="timeslot"/>
          </div>
        </div>
      </template>
      <div class="mt-10">
        <UButton :loading="isLoading" @click="$emit('send', selectedDate)" size="xl" v-if="selectedDate.time" label="Enviar" id="btn"/>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>