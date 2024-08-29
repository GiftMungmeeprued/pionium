import { reactive } from "vue";

export const store = reactive({
  inputText: "",
  onShift: false,
  onAlpha: false,
  onSto: false,
  history: [],
  variables: {},
  variableList: ["A", "B", "C", "D", "F", "G", "x", "y", "Ans"],
});

export function resetShiftAlpha() {
  store.onShift = false;
  store.onSto = false;
}

export const colors = {
  white: "bg-white text-gray-800",
  blue: "bg-blue-500 text-white",
  gray: "bg-[#CBCED5] text-gray-800",
};
