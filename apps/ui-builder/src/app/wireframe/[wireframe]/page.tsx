"use client";

import React from "react";
import { Card } from "@root/components/ui/card";
import { cn, render } from "@root/lib/utils";
import { supabase } from "@root/supabase";
import { DnDElementType } from "@siddheshtawde/drag-and-drop/src";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@root/components/ui/resizable";

export default function Page(props: { params: { wireframe: string } }) {
  const params = props.params;
  const [data, setData] = React.useState<any>(null);
  const [selected, setSelected] = React.useState<string | null>(null);

  React.useEffect(() => {
    supabase
      .from("wireframes")
      .select("*")
      .eq("name", params.wireframe)
      .single()
      .then(({ data, error }) => {
        if (error) {
          return "There was some error";
        }

        setData(data);
      });
  }, [params.wireframe]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container mx-auto h-[calc(100vh-64px)] px-8 py-4">
      <div className="mb-4 grid h-full w-full grid-cols-12 gap-4">
        <Card className="col-span-3 border-none shadow-none">
          <p className="text-2xl font-bold">{data.name}</p>
          <p>Created By: {data.created_by}</p>
          <p>Last Updated By: {data.updated_by}</p>

          <div className="mt-4">
            <p>{"<body>"}</p>
            <div className="flex flex-col gap-2 pl-4">
              {(data.template as never as DnDElementType[]).map((node) =>
                List(node, selected, setSelected),
              )}
            </div>
          </div>
        </Card>
        <Card className="col-span-9 h-full border-none shadow-none">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel
              className="flex h-full flex-col gap-2 border-b border-l border-t p-2"
              defaultSize={100}
              minSize={40}
            >
              {render(
                data.template as never as DnDElementType[],
                selected,
                setSelected,
              )}
            </ResizablePanel>
            <ResizableHandle className="mr-2" withHandle />

            <ResizablePanel>{null}</ResizablePanel>
          </ResizablePanelGroup>
        </Card>
      </div>
    </main>
  );
}

const List = (
  node: DnDElementType,
  selected: string | null,
  setSelected: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  return (
    <div
      key={node.id}
      onMouseLeave={() => setSelected(null)}
      onMouseEnter={() => setSelected(node?.id || null)}
    >
      <p
        className={cn("cursor-pointer", {
          "text-blue-500": selected === node.id,
        })}
      >
        {`<${node.tag}>`}
      </p>

      <div className="flex flex-col gap-2 pl-4">
        {node.children.map((child) => List(child, selected, setSelected))}
      </div>
    </div>
  );
};
