import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { DnDElementType } from "@siddheshtawde/drag-and-drop/dist";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function render(nodes: DnDElementType[]) {
  return (
    <>
      {nodes.map((node) => (
        <node.tag
          key={node.id}
          style={node.attributes.style}
          className={cn(
            "relative rounded border p-2 hover:border-indigo-500 hover:bg-indigo-500/5",
            node.attributes.className,
          )}
        >
          <p className="text-transparent/40">{node.title}</p>

          {node.children.length === 0 ? null : render(node.children)}
        </node.tag>
      ))}
    </>
  );
}
