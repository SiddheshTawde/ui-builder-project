import { supabase } from "@root/supabase";
import { columns } from "@root/constants/frame.column";
import { DataTable } from "@root/components/core/data-table.core";

export default async function WireframePage() {
  const { data, error } = await supabase.from("frames").select("*").limit(10);

  if (error) {
    return "There was some error";
  }

  return (
    <main className="container mx-auto h-[calc(100vh-64px)]">
      <DataTable
        data={data}
        columns={columns}
        add={{ title: "Add New Wireframe", href: "/wireframe/add" }}
      />
    </main>
  );
}
