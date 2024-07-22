import { Button, Input } from "@repo/ui";

const componentsMap = {
  Button,
  Input,
};

export type RendererProps = {
  name: string;
  props?: any; // Adjust this type according to your needs
};

export function Renderer({ name, props }: RendererProps) {
  const Component = componentsMap[name as keyof typeof componentsMap];

  if (!Component) {
    return <div>Component not found</div>;
  }

  return <Component {...props} />;
}
