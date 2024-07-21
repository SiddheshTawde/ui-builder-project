import { supabase } from "@root/supabase";
import { columns } from "@root/constants/page.column";
import { DataTable } from "@root/components/core/data-table.core";

export default async function Page() {
  const { data, error } = await supabase.from("pages").select("*").limit(10);

  if (error) {
    return <div>There was some error</div>;
  }

  return (
    <main className="container mx-auto h-[calc(100vh-64px)]">
      <DataTable
        data={data}
        columns={columns}
        add={{ title: "Add New Page", href: "/page/add" }}
      />
    </main>
  );
}
