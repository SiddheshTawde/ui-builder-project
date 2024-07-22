import { supabase } from "@root/supabase";

export default async function WireframePage() {
  const { data, error } = await supabase.from("frames").select("*").limit(10);

  if (error) {
    return "There was some error";
  }

  return (
    <main className="container mx-auto h-[calc(100vh-64px)]">
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-xl text-transparent/60">Coming Soon</p>
      </div>
    </main>
  );
}
