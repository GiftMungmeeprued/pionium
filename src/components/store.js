import { reactive } from "vue";

export const store = reactive({
  inputText: "",
  onShift: false,
  shiftLock: false,
  onSto: false,
  history: [],
  variables: {},
  variableList: ["A", "B", "C", "D", "F", "ans"],
  showSidePane: {
    historySidePane: false,
    variableSidePane: false,
  },
  id: 0,
  displaymodes: [],
  displaymodeId: 0,
});

export function resetShiftSto() {
  if (!store.shiftLock) {
    store.onShift = false;
  }
  store.onSto = false;
}

export const colors = {
  white: "bg-white text-gray-800",
  blue: "bg-[#1A73E9] text-white",
  gray: "bg-[#CBCED5] text-gray-800",
};
