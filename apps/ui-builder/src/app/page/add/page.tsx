"use client";

import { z } from "zod";
import React from "react";
import { useClerk } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Provider,
  Draggable,
  Droppable,
  DnDState,
  DnDElementType,
} from "@repo/drag-and-drop/src";
import { Button } from "@root/components/ui/button";
import { Card } from "@root/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
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
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { savePage } from "@root/services/save-page";
import { getWireframe } from "@root/services/get-wireframe";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@root/components/ui/alert-dialog";
import { toast } from "@root/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@root/components/ui/dialog";
import Link from "next/link";
import { pageElements } from "@root/constants/page.elements";

const formSchema = z.object({
  pagename: z
    .string({ required_error: "Name cannot be empty" })
    .min(2, { message: "Name must contain atleast 2 characters" })
    .regex(/^[a-zA-Z-]*$/, {
      message: "Only - are allowed",
    }),
});

const initialState: DnDState = {
  elements: [],
  selected: null,
  dragging: null,
};

export default function AddNewPage() {
  const router = useRouter();
  const { user } = useClerk();

  const [availableWireframes, updateAvailableWireframes] = React.useState<
    Tables<"wireframes">[]
  >([]);

  const [state, setState] = React.useState(initialState);

  const [template, changeTemplate] = React.useState("");
  const [discard, toggleDiscard] = React.useState(false);
  const [saving, toggleSaving] = React.useState(false);

  React.useEffect(() => {
    supabase
      .from("wireframes")
      .select("*")
      .then(({ error, data }) => {
        if (error) {
          toast({
            title: "There was some error",
            description: "Unable to get existing wireframes.",
          });
        } else if (data) {
          updateAvailableWireframes(data);
        }
      });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pagename: "",
    },
  });

  function handleTemplateOnChange(value: string) {
    changeTemplate(value);
    getWireframe(value).then((response) => {
      if (response) {
        if (state.elements.length === 0) {
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
    });
  }

  function handleDiscardAndContinue() {
    if (template) {
      getWireframe(template).then((response) => {
        if (response !== null) {
          setState({
            elements: response.template as never as DnDElementType[],
            dragging: null,
            selected: null,
          });
        }
      });
    }
  }
  function handleDiscardCancel() {
    changeTemplate("");
    toggleDiscard(false);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toggleSaving(true);

    if (user) {
      try {
        await savePage(user, values.pagename, state.elements as never as Json);
        toast({
          title: "Success",
          description: "Page saved successfully.",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to save Page.",
        });
      } finally {
        toggleSaving(false);
      }
    }
  }

  return (
    <>
      <main className="container mx-auto h-[calc(100vh-64px)]">
        <Form {...form}>
          <form
            id="add-wireframe-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full w-full flex-col gap-4"
          >
            <Provider state={state} setState={setState}>
              <div className="mt-4 grid w-full flex-1 grid-cols-12 gap-4">
                <Card className="col-span-2 border-none shadow-none">
                  <FormItem className="col-span-2 mb-4">
                    <FormLabel className="text-lg font-bold">
                      Select Template:
                    </FormLabel>
                    <Select
                      value={template}
                      onValueChange={handleTemplateOnChange}
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

                  <FormLabel className="text-lg font-bold">
                    Available Elements:
                  </FormLabel>

                  <ul className="flex flex-col gap-2">
                    {pageElements.map((element, index) => (
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
                <Card className="col-span-10 flex rounded shadow-none">
                  <Droppable className="flex h-full flex-1 flex-col px-2" />
                </Card>
              </div>
            </Provider>

            <div className="col-span-5 flex items-end justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Go Back
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="button"
                    variant="default"
                    disabled={state.elements.length === 0}
                  >
                    Add Page
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Page?</DialogTitle>
                    <DialogDescription>
                      You will be able to add elements to your Page in{" "}
                      <Link
                        href="/page"
                        className="text-blue-700 hover:underline"
                      >
                        Pages
                      </Link>{" "}
                      section.
                    </DialogDescription>
                  </DialogHeader>
                  <FormField
                    control={form.control}
                    name="pagename"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Page Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Untitled Page"
                            className="lowercase"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>
                          Note: Page name cannot have special characters except
                          dash (-).
                          <br />
                          Example: Valid Name: <code>page-name</code>
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button
                      type="submit"
                      variant="default"
                      disabled={saving || !user}
                      form="add-page-form"
                    >
                      {saving ? (
                        <ArrowPathIcon className="h-4 w-4 animate-spin" />
                      ) : null}
                      Add Page
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </form>
        </Form>
      </main>

      <AlertDialog open={discard} onOpenChange={toggleDiscard}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You have some unsaved changes</AlertDialogTitle>
            <AlertDialogDescription>
              Discarding will remove any changes you have made to the frame.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={handleDiscardCancel}>
              Cancel
            </Button>
            <AlertDialogAction onClick={handleDiscardAndContinue}>
              Discard & Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
