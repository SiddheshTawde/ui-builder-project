import { supabase } from "@root/supabase";
import { toast } from "@root/components/ui/use-toast";

export async function deletePage(id: string) {
  const { data, error } = await supabase.from("pages").delete().eq("id", id);

  if (error !== null) {
    console.log(error);
    toast({
      title: "There was some error",
      description: "Please try again later.",
    });
    return null;
  } else {
    if (data === null) {
      toast({
        title: "Page deleted",
        description: "Page deleted successfully.",
      });
      return null;
    } else {
      return data;
    }
  }
}
