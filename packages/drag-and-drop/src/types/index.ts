import React from "react";

export type DnDElementType = {
  id?: string;
  title: string;
  tag: keyof React.ReactHTML | "element";
  attributes: React.HTMLAttributes<keyof React.ReactHTML>;
  children: DnDElementType[];
};

export type DnDState = {
  elements: DnDElementType[];
  selected: string | null;
  dragging: DnDElementType | null;
};
