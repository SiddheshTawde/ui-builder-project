import React from "react";
import { Draggable, Droppable, Provider, DnDState } from "@siddheshtawde/drag-and-drop";
import { layout } from "./assets/data";

import "@siddheshtawde/drag-and-drop/index.css";
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
      <p className="border-b bg-black px-4 py-4 text-3xl font-medium text-neutral-400">Drag and Drop Demo</p>

      <Provider state={DnDState} setState={setDnDState}>
        <div className="container mx-auto flex flex-1 items-stretch gap-4 py-4">
          <ul className="flex w-[300px] flex-col gap-y-2">
            {layout.map((element, index) => (
              <Draggable key={index} dragdata={element} className="border bg-white px-2 py-3 font-medium capitalize">
                {element.title}
              </Draggable>
            ))}
          </ul>

          <Droppable className="flex h-full flex-1 flex-col rounded border px-2" />
        </div>
      </Provider>
    </>
  );
}
