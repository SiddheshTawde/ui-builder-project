import React from "react";

export type ElementType = {
  title: string;
  className: string;
  content: React.ReactNode;
  children: ElementType[];
};
