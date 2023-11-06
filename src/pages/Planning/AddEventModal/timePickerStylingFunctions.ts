export const datePickerStyling = (isDarkMode: boolean) => {

  setTimeout(() => {
    const pickerShadowElement = document
      .querySelector("#datePicker")
      ?.shadowRoot?.querySelector(".calendar-day-today") as HTMLElement;

    if (pickerShadowElement) {
      pickerShadowElement.style.color = "#f06b42";
      pickerShadowElement.style.fontWeight = "800";
    }
  }, 50);
};

export const timePickerStyling = (isDarkMode: boolean) =>
  setTimeout(() => {
    const pickerShadowElements = document
      .querySelector("#timePicker")
      ?.shadowRoot?.querySelector("ion-picker-internal")?.shadowRoot;

    let before = pickerShadowElements?.querySelector(
      ".picker-before"
    ) as HTMLElement;
    let after = pickerShadowElements?.querySelector(
      ".picker-after"
    ) as HTMLElement;
    let highlight = pickerShadowElements?.querySelector(
      ".picker-highlight"
    ) as HTMLElement;

    if (before && after && highlight) {
      before.style.background = "unset";
      after.style.background = "unset";
      highlight.style.background = "rgba(0,0,0, 0.04)";
      if (isDarkMode) {
        before.style.background =
          "linear-gradient(to bottom, #78648b, transparent)";
        after.style.background =
          "linear-gradient(to top, #78648b, transparent)";
        highlight.style.background = "rgba(255,255,255, 0.08)";
      }
    }
  }, 50);
