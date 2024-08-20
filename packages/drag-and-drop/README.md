# Drag and Drop | UI Builder

[![npm version](https://img.shields.io/npm/v/@siddheshtawde/drag-and-drop?style=for-the-badge)](https://www.npmjs.com/package/@siddheshtawde/drag-and-drop) [![npm Downloads](https://img.shields.io/npm/dt/@siddheshtawde/drag-and-drop?style=for-the-badge)](https://www.npmjs.com/package/@siddheshtawde/drag-and-drop)

A lightweight and flexible drag-and-drop library built with React, TypeScript, and Framer Motion.<br />
This library allows developers to create complex HTML interfaces with ease, supporting nested elements, customizable components, and state management.

## Features

- **Draggable & Droppable Components**: Easily create draggable and droppable elements with customizable behavior.
- **Nested Drag and Drop**: Support for nested drag-and-drop functionality, allowing elements to contain other draggable elements.
- **Dynamic State Management**: Powered by React's `useState` and `useContext` hooks for dynamic and centralized state management.
- **Customizable**: Fully customizable with TailwindCSS and other utilities like `clsx` and `tailwind-merge`.
- **TypeScript Support**: Strongly typed with TypeScript, ensuring type safety and better developer experience.

## Installation

```bash
npm install @siddheshtawde/drag-and-drop
```

## Usage

### Basic Setup

Wrap your application or specific part of the UI with the `Provider` component to manage the drag-and-drop state.

```tsx
import React from "react";
import {
  DnDState,
  Draggable,
  Droppable,
  Provider,
} from "@siddheshtawde/drag-and-drop";

import { layout } from "./data.ts"; // check Sample Data below

import "./index.css";

const initialState: DnDState = {
  elements: [],
  selected: null,
  dragging: null,
};

export default function App() {
  const [DnDState, setDnDState] = React.useState(initialState);

  return (
    <>
      <h1>Drag and Drop Demo</h1>

      <Provider state={DnDState} setState={setDnDState}>
        <div>
          <ul>
            {layout.map((element, index) => (
              <Draggable key={index} dragdata={element}>
                {element.title}
              </Draggable>
            ))}
          </ul>

          <Droppable />
        </div>
      </Provider>
    </>
  );
}
```

### Sample data

The `layout` array represents a sample data structure for your drag-and-drop elements.<br />
Each item in the array is an object that describes a particular element with properties such as `title`, `attributes`, `tag`, and `children`.<br />
This data can be used to render a basic layout with different HTML elements, which can be manipulated using your drag-and-drop functionality.

```ts
// data.ts

import { DnDElementType } from "@siddheshtawde/drag-and-drop";

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
```

## Customization

- **TailwindCSS**: Customize your components using TailwindCSS classes. The project comes with TailwindCSS set up by default.
- **Utils**: Utility functions like `cn`, `addElementToId`, `removeElementById`, and `updateChildrenById` are provided for advanced manipulation of drag-and-drop elements.

## License

This project is licensed under the [MIT License](https://github.com/SiddheshTawde/ui-builder-project/blob/main/packages/drag-and-drop/LICENSE.md).

## Author

Siddhesh Tawde

Find me on -

- [GitHub](https://github.com/SiddheshTawde)
- [LinkedIn](https://www.linkedin.com/in/tawdesiddhesh)

or email me @ [siddheshtawde35@gmail.com
](mailto:siddheshtawde35@gmail.com)
