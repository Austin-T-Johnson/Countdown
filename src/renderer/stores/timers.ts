import { defineStore } from "pinia";
import { ref } from "vue";
import {
  TimerEngineUpdates,
  MessageUpdate,
} from "../../common/TimerInterfaces.ts";

export const useTimersStore = defineStore("timers", () => {
  const updates = ref<TimerEngineUpdates>({});
  const messages = ref<MessageUpdate[]>([]);

  return { updates, messages };
});
