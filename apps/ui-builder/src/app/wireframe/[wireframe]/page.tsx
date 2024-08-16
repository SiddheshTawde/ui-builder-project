import { Card } from "@root/components/ui/card";
import { render } from "@root/lib/utils";
import { supabase } from "@root/supabase";
import { DnDElementType } from "@siddheshtawde/drag-and-drop/dist";

export default async function Page({
  params,
}: {
  params: { wireframe: string };
}) {
  const { data, error } = await supabase
    .from("wireframes")
    .select("*")
    .eq("name", params.wireframe)
    .single();

  if (error) {
    return "There was some error";
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
                List(node),
              )}
            </div>
          </div>
        </Card>
        <Card className="col-span-9 flex h-full flex-col gap-2 border-none shadow-none">
          {render(data.template as never as DnDElementType[])}
        </Card>
      </div>
    </main>
  );
}

const List = (node: DnDElementType) => {
  return (
    <div>
      <p>{`<${node.tag}>`}</p>

      <div className="flex flex-col gap-2 pl-4">
        {node.children.map((child) => List(child))}
      </div>
    </div>
  );
};
