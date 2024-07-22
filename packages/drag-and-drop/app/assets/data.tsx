import * as UI from "@repo/ui";
import { ElementType } from "../../src/types";

export const data: ElementType[] = Object.keys(UI)
  .filter((ui) => !ui.includes("Default"))
  .map((ui) => ({ title: ui }));

const defaults: Record<string, any> = {};

Object.entries(UI)
  .filter(([title, _]) => title.includes("Default"))
  .forEach(([title, props]) => {
    defaults[title.replace("Default", "")] = props;
  });

export { defaults };
