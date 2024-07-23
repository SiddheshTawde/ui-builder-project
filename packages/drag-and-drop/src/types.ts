import { ComponentsMap } from "@repo/ui";
type ComponentName = keyof typeof ComponentsMap;

export type ElementType = {
  id?: string;
  title: ComponentName;
};

export type Effect = "move" | "copy";

export type Callback = {
  id: string;
  title: ComponentName;
  effect: Effect;
};
