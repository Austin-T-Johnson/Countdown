<script setup lang="ts">
import { ClockIcon } from "@heroicons/vue/24/solid";
import dayjs from "dayjs";
import { onMounted, onUnmounted, ref, watch } from "vue";

export interface Props {
  isBig: boolean;
  clockColor: string;
  textColor: string;
  secondsOnClock: boolean;
  use12HourClock: boolean;
}

const props = defineProps<Props>();

let currentTimeTimerId: ReturnType<typeof setInterval> | null = null;
let currentTime = ref(dayjs().format("HH:mm"));
function updateTime() {
  if (props.secondsOnClock && !props.use12HourClock) {
    currentTime.value = dayjs().format("HH:mm:ss");
  } else if (props.secondsOnClock && props.use12HourClock) {
    currentTime.value = dayjs().format("hh:mm:ss a");
  } else if (!props.secondsOnClock && props.use12HourClock) {
    currentTime.value = dayjs().format("hh:mm a");
  } else {
    currentTime.value = dayjs().format("HH:mm");
  }
}

// Watch for prop changes and update time format immediately
watch(
  [() => props.use12HourClock, () => props.secondsOnClock],
  () => {
    updateTime();
  },
  { immediate: true }
);

onMounted(() => {
  if (currentTimeTimerId === null) {
    currentTimeTimerId = setInterval(updateTime, 1000);
  }
});

onUnmounted(() => {
  if (currentTimeTimerId !== null) {
    clearInterval(currentTimeTimerId);
    currentTimeTimerId = null;
  }
});
</script>

<template>
  <div
    class="text-center text-clock font-digital-clock"
    :class="{
      'text-clock': !isBig,
      'text-clock-on-reset': isBig,
    }"
  >
    <clock-icon
      class="inline-block"
      :class="{
        'clock-icon': !isBig,
        'clock-icon-on-reset': isBig,
      }"
      :style="{ color: clockColor }"
    />
    <span class="ml-5" :style="{ color: textColor }">{{ currentTime }}</span>
  </div>
</template>

<style scoped>
.clock-icon {
  height: min(20vh, 15vw);
  width: min(20vh, 15vw);
}

.clock-icon-on-reset {
  height: min(40vh, 25vw);
  width: min(40vh, 25vw);
}

.text-clock {
  font-size: min(20vh, 15vw);
}

.text-clock-on-reset {
  font-size: min(40vh, 25vw);
}
</style>
