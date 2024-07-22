import React from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";

import { data, defaults } from "./assets/data";
import { DragElement, DropElement, ElementType, Callback } from "@repo/drag-and-drop";


function App() {
  const [elements, setElements] = React.useState<ElementType[]>([]);

  const handleDrop = (parsed: Callback) => {
    const updated = [...elements];

    updated.push({ id: parsed.id, title: parsed.title });

    setElements(updated);
  };

  return (
    <main className="h-full w-full flex items-center justify-start flex-col py-2 px-4 gap-12 container mx-auto">
      <h1 className="w-full text-3xl font-bold text-transparent/80">Drag & Drop</h1>

      <section className="flex-1 w-full flex gap-4">
        <div className="border w-[300px] flex flex-col gap-2 p-2">
          {data.map((el, i) => (
            <DragElement
              key={i}
              effect="copy"
              element={el}
              className="border px-2 py-4 flex items-center justify-between pr-4 hover:pr-2 transition-all group"
            >
              <span>{el.title}</span>
              <ChevronDoubleRightIcon className="h-6 w-6 text-transparent/40 group-hover:text-transparent/80" />
            </DragElement>
          ))}
        </div>

        <div className="border flex-1">
          <DropElement
            className="dnd-h-full dnd-w-full"
            callback={handleDrop}
            elements={elements}
            setElements={setElements}
            defaults={defaults}
          />
        </div>
      </section>
    </main>
  );
}

export default App;
