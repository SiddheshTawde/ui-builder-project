import { supabase } from "@root/supabase";
import { toast } from "@root/components/ui/use-toast";

export async function deleteWireframe(id: string) {
  console.log(id);
  const { data, error } = await supabase
    .from("wireframes")
    .delete()
    .eq("id", id);

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
        title: "Wireframe deleted",
        description: "Wireframe deleted successfully.",
      });
      window.location.reload();
      return null;
    } else {
      return data;
    }
  }
}
