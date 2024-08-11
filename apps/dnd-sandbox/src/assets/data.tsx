import * as UI from "@repo/ui";
import type { DnDElementType } from "@repo/drag-and-drop";

export const data = Object.keys(UI)
  .filter((ui) => !ui.includes("Default") && !ui.includes("Map"))
  .map((ui) => ({ title: ui }));

export const layout: DnDElementType[] = [
  {
    title: "Header",
    attributes: {
      style: {
        width: "100%",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      },
    },
    tag: "header",
    children: [],
  },
  {
    title: "Nav",
    attributes: {
      style: { width: "100%", height: "48px", display: "flex" },
    },
    tag: "nav",
    children: [],
  },
  {
    title: "Main",
    attributes: {
      style: {
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      },
    },
    tag: "main",
    children: [],
  },
  {
    title: "Column",
    attributes: {
      style: {
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      },
    },
    tag: "div",
    children: [],
  },
  {
    title: "Row",
    attributes: {
      style: {
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "row",
      },
    },
    tag: "div",
    children: [],
  },
  {
    title: "Section",
    attributes: {
      style: {
        flex: 1,
        width: "100%",
        display: "flex",
      },
    },
    tag: "section",
    children: [],
  },
  {
    title: "Footer",
    attributes: {
      style: {
        height: "64px",
        width: "100%",
        display: "flex",
      },
    },
    tag: "footer",
    children: [],
  },
];
