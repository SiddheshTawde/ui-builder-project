"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as UI from "@repo/ui";

import {
  Callback,
  DragElement,
  DropElement,
  ElementType,
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
import React from "react";
import { Tables } from "@root/supabase/supabase.types";
import {
  layoutUI,
  layoutElements,
  layoutDefault,
  elementDefaults,
} from "@root/constants/layout.elements";

const formSchema = z.object({
  wireframename: z.string({ required_error: "Name cannot be empty" }).min(2),
  template: z.string(),
});

export default function Page() {
  const [availableWireframes, updateAvailableWireframes] = React.useState<
    Tables<"wireframes">[]
  >([]);

  const [elements, setElements] = React.useState<ElementType[]>([]);
  const [elementProps, updateElementProps] = React.useState<
    Record<string, any>
  >({});
  const [selectedElement, handleElementClick] =
    React.useState<ElementType | null>(null);

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  const handleDrop = (parsed: Callback) => {
    const updated = [...elements];

    updated.push({ id: parsed.id, title: parsed.title });

    setElements(updated);
  };
  return (
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
                    onValueChange={field.onChange}
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
                    <Input placeholder="Untitled Wireframe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-5 flex items-end justify-end gap-4">
              <Button variant="outline" type="button">
                Go Back
              </Button>
              <Button variant="default" type="submit">
                Add Wireframe
              </Button>
            </div>
          </div>
          <div className="mb-4 grid w-full flex-1 grid-cols-12 gap-4">
            <Card className="col-span-2 border-none shadow-none">
              <p className="text-lg font-bold">Available Elements:</p>

              <div className="flex flex-col gap-2">
                {layoutElements.map((element) => (
                  <DragElement
                    key={element.title}
                    element={element}
                    className="flex items-center justify-between rounded border border-transparent p-2 transition-all hover:border-transparent/20"
                  >
                    {element.title}
                  </DragElement>
                ))}
                {Object.keys(UI)
                  .filter(
                    (ui) => !ui.includes("Default") && !ui.includes("Map"),
                  )
                  .map((ui) => ({ title: ui }))
                  .map((element, index) => (
                    <DragElement
                      key={index}
                      element={element}
                      className="flex items-center justify-between rounded border border-transparent p-2 transition-all hover:border-transparent/20"
                    >
                      {element.title}
                    </DragElement>
                  ))}
              </div>
            </Card>
            <Card
              className="col-span-7 flex shadow-none"
              onClick={() => handleElementClick(null)}
            >
              <DropElement
                className="flex-1"
                elements={elements}
                defaults={{...layoutDefault,...elementDefaults}}
                uicomponents={{ ...layoutUI, ...UI }}
                callback={handleDrop}
                setElements={setElements}
                selectedElement={selectedElement}
                handleElementClick={handleElementClick}
                elementProps={elementProps}
                updateElementProps={updateElementProps}
                axis={"y"}
              />
            </Card>
            <Card className="col-span-3 p-4 shadow-none">
              <p className="text-lg font-bold">Edit Attributes:</p>
            </Card>
          </div>
        </form>
      </Form>
    </main>
  );
}
