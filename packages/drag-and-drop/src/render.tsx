import { ComponentsMap, ComponentsDefault } from "@repo/ui";

type ComponentName = keyof typeof ComponentsMap;

export type RendererProps = {
  name: ComponentName;
};

export function Renderer({ name }: RendererProps) {
  const Component = ComponentsMap[name];
  const props = ComponentsDefault[name];

  if (!Component || !props) {
    return <div>Component not found</div>;
  }

  // @ts-expect-error - Types will clash from different PropTypes
  return <Component {...props} />;
}
