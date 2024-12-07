import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { DnDElementType } from "@siddheshtawde/drag-and-drop/src";
import * as UIElements from "@siddheshtawde/ui/src";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type LoadComponentProps = {
  component: string;
  attributes: React.HTMLAttributes<keyof React.ReactHTML>;
};
export const DynamicComponentLoader = (props: LoadComponentProps) => {
  // @ts-expect-error - No index signature with a parameter of type 'string' was found on type 'typeof import(...)'.
  const Component = UIElements?.[props.component];

  return <Component {...props.attributes} />;
};

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

  const handleMouseOver = (
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
      {nodes.map((node) =>
        node?.tag === "element" ? (
          <DynamicComponentLoader
            key={node.id}
            component={node.title}
            attributes={node.attributes}
          />
        ) : (
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
            onMouseOver={(event: React.MouseEvent<Element>) =>
              handleMouseOver(event as React.MouseEvent<HTMLDivElement>, node)
            }
            onMouseLeave={(event: React.MouseEvent<Element>) =>
              handleMouseLeave(event as React.MouseEvent<HTMLDivElement>)
            }
          >
            <p className="text-sm font-bold text-transparent/40">
              {node.title}
            </p>

            {node.children.length === 0
              ? null
              : render(node.children, selected, setSelected)}
          </node.tag>
        ),
      )}
    </>
  );
}

export function findElementById(
  data: DnDElementType[],
  id: string,
): DnDElementType | null {
  // Iterate through each top-level element in the array
  for (const element of data) {
    // Use a helper function to search recursively
    const result = findElementByIdRecursive(element, id);
    if (result) {
      return result;
    }
  }
  // Return null if no match is found
  return null;
}

function findElementByIdRecursive(
  element: DnDElementType,
  id: string,
): DnDElementType | null {
  // Check if the current element matches the id
  if (element.id === id) {
    return element;
  }

  // Search recursively in children
  for (const child of element.children) {
    const result = findElementByIdRecursive(child, id);
    if (result) {
      return result;
    }
  }

  // Return null if no match is found
  return null;
}

export function updateElementById(
  data: DnDElementType[],
  id: string,
  updatedValues: Partial<Omit<DnDElementType, "children">>, // Allow updating all fields except children
): DnDElementType[] {
  // Helper function to update recursively
  function updateRecursive(element: DnDElementType): DnDElementType {
    if (element.id === id) {
      // Merge the updated values into the current node
      return { ...element, ...updatedValues };
    }

    // Recursively update children
    return {
      ...element,
      children: element.children.map(updateRecursive),
    };
  }

  // Return updated data with recursive updates
  return data.map(updateRecursive);
}
