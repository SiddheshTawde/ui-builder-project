import { supabase } from "@root/supabase";
import { toast } from "@root/components/ui/use-toast";

export async function getWireframe(id: string) {
  const { data, error } = await supabase
    .from("wireframes")
    .select("*")
    .eq("id", id)
    .single();

  if (error !== null) {
    toast({
      title: "There was some error",
      description: "Please try again later.",
    });
    return null;
  } else {
    if (data === null) {
      toast({
        title: "There was some error",
        description: "Wireframe data not available.",
      });
      return null;
    } else {
      return data;
    }
  }
}
