export type ElementType = {
  id?: string;
  title: string;
};

export type Effect = "move" | "copy";

export type Callback = {
  id: string;
  title: string;
  effect: Effect;
};
