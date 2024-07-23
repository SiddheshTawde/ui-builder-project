import * as UI from "@repo/ui";
import { ElementType } from "@repo/drag-and-drop";

export const data: ElementType[] = Object.keys(UI)
  .filter((ui) => !ui.includes("Default") && !ui.includes("Map"))
  .map((ui) => ({ title: ui }));
