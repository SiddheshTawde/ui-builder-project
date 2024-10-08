import { supabase } from "@root/supabase";
import { UserResource } from "@clerk/types";

import { Json } from "@root/supabase/supabase.types";
import { toast } from "@root/components/ui/use-toast";
import { saveWireframeErrorMap } from "@root/constants/error-map";

export async function saveWireframe(
  user: UserResource,
  name: string,
  template: Json,
) {
  const { error } = await supabase.from("wireframes").insert({
    name: name.toLowerCase(),
    template: template,
    created_by_id: user.id,
    created_by: user.fullName || "",
    updated_by_id: user.id,
    updated_by: user.fullName || "",
  });

  if (error) {
    toast({
      title: "There was some error",
      description:
        saveWireframeErrorMap[error.code] || "Please try again later.",
    });
  } else {
    toast({ title: "Success", description: "Wireframe added to library." });
  }
}
