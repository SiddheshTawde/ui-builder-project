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
    <main className="container mx-auto h-[calc(100vh-64px)] p-4">
      <div className="flex h-full w-full flex-col rounded border gap-2 p-2">
        {render(data.template as never as DnDElementType[])}
      </div>
    </main>
  );
}
