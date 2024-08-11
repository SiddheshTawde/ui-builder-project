"use client";

import { z } from "zod";
import React from "react";
import { isEqual } from "lodash";
import { useClerk } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Provider,
  Draggable,
  Droppable,
  DnDState,
  DnDElementType,
} from "@repo/drag-and-drop";
import { Button } from "@root/components/ui/button";
import { Card } from "@root/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@root/components/ui/form";
import { Input } from "@root/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@root/components/ui/select";
import { supabase } from "@root/supabase";
import { Json, Tables } from "@root/supabase/supabase.types";
import { layoutElements } from "@root/constants/layout.elements";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { saveWireframe } from "@root/services/save-wireframe";
import { getWireframe } from "@root/services/get-wireframe";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@root/components/ui/alert-dialog";

const formSchema = z.object({
  wireframename: z.string({ required_error: "Name cannot be empty" }).min(2),
  template: z.string(),
});

const initialState: DnDState = {
  elements: [],
  selected: null,
  dragging: null,
};

export default function Page() {
  const { user } = useClerk();
  const [availableWireframes, updateAvailableWireframes] = React.useState<
    Tables<"wireframes">[]
  >([]);

  const [state, setState] = React.useState(initialState);

  const [discard, toggleDiscard] = React.useState(false);
  const [saving, toggleSaving] = React.useState(false);

  React.useEffect(() => {
    supabase
      .from("wireframes")
      .select("*")
      .then(({ error, data }) => {
        if (error !== null) {
          console.log(error);
        }
        if (data !== null) {
          updateAvailableWireframes(data);
        }
      });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wireframename: "",
      template: "",
    },
  });

  async function handleTemplateOnChange(value: string) {
    const response = await getWireframe(value);

    console.log(response);
    if (response !== null) {
      const updated = { ...state };

      if (
        updated.elements.length === 0 ||
        isEqual(response.template, updated.elements)
      ) {
        setState({
          elements: response.template as never as DnDElementType[],
          dragging: null,
          selected: null,
        });
      } else {
        // Show Alert
        toggleDiscard(true);
      }
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    toggleSaving(true);

    if (user) {
      await saveWireframe(
        user,
        values.wireframename,
        state.elements as never as Json,
      );

      toggleSaving(false);
    }
  }

  console.log(state);

  return (
    <>
      <main className="container mx-auto h-[calc(100vh-64px)]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full w-full flex-col gap-4"
          >
            <div className="grid grid-cols-12 gap-4">
              <FormField
                control={form.control}
                name="template"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Select Template</FormLabel>
                    <Select
                      onValueChange={handleTemplateOnChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="--" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableWireframes.map((wireframe) => (
                          <SelectItem key={wireframe.id} value={wireframe.id}>
                            {wireframe.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="wireframename"
                render={({ field }) => (
                  <FormItem className="col-span-5">
                    <FormLabel>Wireframe Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Untitled Wireframe"
                        className="lowercase"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-5 flex items-end justify-end gap-4">
                <Button variant="outline" type="button">
                  Go Back
                </Button>
                <Button
                  variant="default"
                  type="submit"
                  disabled={saving || !user}
                >
                  {saving ? (
                    <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Add Wireframe
                </Button>
              </div>
            </div>

            <Provider state={state} setState={setState}>
              <div className="mb-4 grid w-full flex-1 grid-cols-12 gap-4">
                <Card className="col-span-2 border-none shadow-none">
                  <p className="text-lg font-bold">Available Elements:</p>

                  <ul className="flex flex-col gap-2">
                    {layoutElements.map((element, index) => (
                      <Draggable
                        key={element.tag + "_" + (index + 1)}
                        dragdata={element}
                        className="border bg-white px-2 py-3 font-medium capitalize"
                      >
                        {element.title}
                      </Draggable>
                    ))}
                  </ul>
                </Card>
                <Card className="col-span-7 flex rounded shadow-none">
                  <Droppable className="flex h-full flex-1 flex-col gap-2 p-2" />
                </Card>
                <Card className="col-span-3 p-4 shadow-none">
                  <p className="text-lg font-bold">Edit Attributes:</p>

                  {state.selected === null ? null : <div>{state.selected}</div>}
                </Card>
              </div>
            </Provider>
          </form>
        </Form>
      </main>

      <AlertDialog open={discard} onOpenChange={toggleDiscard}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You have some unsaved changes</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Discard & Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
