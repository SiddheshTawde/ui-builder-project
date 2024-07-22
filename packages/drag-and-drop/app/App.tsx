import React, { useState } from "react";
import { data } from "./assets/data";
import { DragElement, DropElement, ElementType, Callback, Renderer } from "../src";

function App() {
  const [selected, setSelected] = useState("");
  const [elements, setElements] = React.useState<ElementType[]>([]);

  const handleDrop = (parsed: Callback) => {
    const updated = [...elements];

    updated.push({ id: parsed.id, title: parsed.title });

    setElements(updated);
  };

  return (
    <main className="h-full w-full flex items-center justify-start flex-col py-2 px-4 gap-12">
      <h1 className="w-full text-3xl font-bold text-transparent/80">Drag & Drop</h1>

      <section className="flex-1 w-full flex gap-4">
        <div className="border w-[300px] flex flex-col gap-2 p-2">
          {data.map((el, i) => (
            <DragElement key={i} effect="copy" element={el} className="border px-2 py-4">
              {el.title}
            </DragElement>
          ))}
        </div>

        <div
          className="border flex-1"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();

            setSelected("");
          }}
        >
          <DropElement className="h-full w-full" callback={handleDrop}>
            {elements.map((element, index) => (
              <DragElement
                key={index}
                effect="move"
                id={element.id}
                element={element}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setSelected(element.id || "");
                }}
                className={`p-2 border-indigo-300 ${element.id === selected ? "border" : "bottom-0"}`}
              >
                <Renderer name={element.title} />
              </DragElement>
            ))}
          </DropElement>
        </div>

        <div className={`border transition-all flex flex-col gap-2 ${selected.length == 0 ? "w-0 p-0" : "w-[300px] p-2"}`}>
          Element Name: {elements.find((element) => element.id === selected)?.title}
        </div>
      </section>
    </main>
  );
}

export default App;
