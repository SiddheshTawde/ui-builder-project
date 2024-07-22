import { Button, Input } from "@repo/ui";

export const componentsMap = {
  Button,
  Input,
};

export type RendererProps = {
  name: string;
  props: Record<string, any>;
};

export function Renderer({ name, props }: RendererProps) {
  const Component = componentsMap[name as keyof typeof componentsMap];

  if (!Component) {
    return <div>Component not found</div>;
  }

  return <Component {...props} />;
}
