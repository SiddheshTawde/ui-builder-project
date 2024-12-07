"use client";

import React, { use } from "react";
import { Card } from "@root/components/ui/card";
import { cn, render } from "@root/lib/utils";
import { supabase } from "@root/supabase";
import { DnDElementType } from "@siddheshtawde/drag-and-drop/src";

export default function Page(props: { params: Promise<{ page: string }> }) {
  const params = use(props.params);
  const [data, setData] = React.useState<any>(null);
  const [selected, setSelected] = React.useState<string | null>(null);

  React.useEffect(() => {
    supabase
      .from("pages")
      .select("*")
      .eq("name", params.page)
      .single()
      .then(({ data, error }) => {
        if (error) {
          return "There was some error";
        }

        setData(data);
      });
  }, [params.page]);

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
        <Card className="col-span-9 flex h-full flex-col gap-2 border-none shadow-none">
          {render(
            data.template as never as DnDElementType[],
            selected,
            setSelected,
          )}
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
