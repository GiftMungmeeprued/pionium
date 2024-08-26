import { reactive } from "vue";

export const store = reactive({
  inputText: "",
  onShift: false,
  onAlpha: false,
  onSto: false,
  history: [],
});

export function resetShiftAlpha() {
  store.onShift = false;
  store.onAlpha = false;
  store.onSto = false;
}
