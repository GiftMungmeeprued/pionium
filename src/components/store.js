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
  darkmode: false,
  exponMin: -2,
  exponMax: 7,
  roundToNumDigits: 7,
  displaySetting: "Norm",
});

export function resetShiftSto() {
  if (!store.shiftLock) {
    store.onShift = false;
  }
  store.onSto = false;
}

export const colors = {
  white: "bg-white text-gray-800 dark:bg-[#484C4F] dark:text-white",
  blue: "bg-[#1A73E9] text-white dark:bg-[#5F97F6]",
  gray: "bg-[#CBCED5] text-gray-800 dark:bg-[#373C40] dark:text-white",
};
