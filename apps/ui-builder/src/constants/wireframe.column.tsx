"use client";

import Link from "next/link";
import moment from "moment";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@root/components/ui/button";
import { Tables } from "@root/supabase/supabase.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@root/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { deleteWireframe } from "@root/services/delete-wireframe";
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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const handleDelete = (id: string) => {
  deleteWireframe(id);
  window.location.reload();
};

export const columns: ColumnDef<Tables<"wireframes">>[] = [
  {
    accessorKey: "name",
    header: ({ header }) => (
      <span className="px-4 capitalize">{header.id.replaceAll("_", " ")}</span>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-4">
          <Button variant="link" asChild>
            <Link href={"/wireframe/" + row.getValue("name")} className="px-0">
              {row.getValue("name")}
            </Link>
          </Button>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "updated_by",
    header: ({ header }) => (
      <span className="capitalize">{header.id.replaceAll("_", " ")}</span>
    ),
  },
  {
    accessorKey: "updated_at",
    header: ({ header }) => (
      <span className="capitalize">{header.id.replaceAll("_", " ")}</span>
    ),
    cell: ({ row }) =>
      moment(row.getValue("updated_at")).format("MMM DD, YYYY"),
  },
  {
    accessorKey: "created_by",
    header: ({ header }) => (
      <span className="capitalize">{header.id.replaceAll("_", " ")}</span>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ header }) => (
      <span className="capitalize">{header.id.replaceAll("_", " ")}</span>
    ),
    cell: ({ row }) =>
      moment(row.getValue("created_at")).format("MMM DD, YYYY"),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href={"/wireframe/" + row.getValue("name") + "/edit"}>
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Clone</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={(e) => e.preventDefault()}>
            <AlertDialog>
              <AlertDialogTrigger className="!hover:text-red-600 text-red-500">
                Delete
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Wireframe?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Deleting this wireframe will not affect any pages that are
                    using it.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(row.original.id)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    size: 48,
    enableResizing: false,
  },
];
