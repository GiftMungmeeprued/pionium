import { reactive } from "vue";

export const store = reactive({
  inputText: "",
  onShift: false,
  onAlpha: false,
});

export function resetShiftAlpha() {
  store.onShift = false;
  store.onAlpha = false;
}
