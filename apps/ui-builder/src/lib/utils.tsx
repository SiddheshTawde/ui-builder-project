import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { DnDElementType } from "@siddheshtawde/drag-and-drop";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function render(
  nodes: DnDElementType[],
  selected: string | null,
  setSelected: React.Dispatch<React.SetStateAction<string | null>>,
) {
  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement>,
    node: DnDElementType,
  ) => {
    event.stopPropagation();
    setSelected(node?.id || null);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setSelected(null);
  };

  return (
    <>
      {nodes.map((node) => (
        <node.tag
          key={node.id}
          style={node.attributes.style}
          className={cn(
            "relative gap-2 rounded border border-gray-500/10 p-2",
            {
              "border-indigo-500 bg-indigo-500/5": selected === node.id,
            },
            node.attributes.className,
          )}
          onMouseEnter={(event: React.MouseEvent<Element>) =>
            handleMouseEnter(event as React.MouseEvent<HTMLDivElement>, node)
          }
          onMouseLeave={(event: React.MouseEvent<Element>) =>
            handleMouseLeave(event as React.MouseEvent<HTMLDivElement>)
          }
        >
          <p className="text-sm font-bold text-transparent/40">{node.title}</p>

          {node.children.length === 0
            ? null
            : render(node.children, selected, setSelected)}
        </node.tag>
      ))}
    </>
  );
}
