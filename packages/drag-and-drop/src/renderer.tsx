export type RendererProps = {
  uicomponents: Record<string, any>;
  name: string;
  props: any;
};

export function Renderer({ uicomponents, name, props }: RendererProps) {
  const Component = uicomponents[name];

  const refinedProps = Object.keys(props).reduce(
    (refined: Record<string, any>, prop) => {
      refined[prop] = props[prop].default;

      return refined;
    },
    {},
  );

  if (!Component) {
    return <div>Component not found</div>;
  }

  return <Component {...refinedProps} />;
}
