import * as UI from "@repo/ui";

export const data = Object.keys(UI)
  .filter((ui) => !ui.includes("Default") && !ui.includes("Map"))
  .map((ui) => ({ title: ui }));
