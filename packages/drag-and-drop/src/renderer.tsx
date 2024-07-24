export type RendererProps = {
  uicomponents: Record<string, any>;
  name: string;
  props: any;
};

export function Renderer({ uicomponents, name, props }: RendererProps) {
  const Component = uicomponents[name];

  if (!Component) {
    return <div>Component not found</div>;
  }

  return <Component {...props} />;
}
