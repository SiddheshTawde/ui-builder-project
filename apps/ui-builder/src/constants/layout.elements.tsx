export const layoutElements = [
  { title: "Header" },
  { title: "Nav" },
  { title: "Main" },
  { title: "Row" },
  { title: "Column" },
  { title: "Section" },
  { title: "Footer" },
];

export const layoutUI = {
  Header: (props: any) => (
    <header {...props} className="h-16 border">
      <span>Header</span>
    </header>
  ),
  Nav: (props: any) => (
    <nav {...props} className="h-12 border">
      <span>Nav</span>
    </nav>
  ),
  Main: (props: any) => (
    <main {...props} className="h-full border">
      <span>Main</span>
    </main>
  ),
  Row: (props: any) => <div {...props} />,
  Column: (props: any) => <div {...props} />,
  Section: (props: any) => <section {...props} />,
  Footer: (props: any) => (
    <footer {...props} className="h-16 border">
      <span>Footer</span>
    </footer>
  ),
};

export const layoutDefault = {
  Header: {
    default: "",
    type: "string",
  },
  Nav: {
    default: "",
    type: "string",
  },
  Main: {
    default: "",
    type: "string",
  },
  Row: {
    default: "",
    type: "string",
  },
  Column: {
    default: "",
    type: "string",
  },
  Section: {
    default: "",
    type: "string",
  },
  Footer: {
    default: "",
    type: "string",
  },
};

export const elementDefaults = {
  Button: {
    variant: {
      default: "contained",
      type: "select",
      value: ["contained", "outlined", "link"],
    },
    loading: {
      default: false,
      type: "boolean",
      value: false,
    },
    children: {
      default: "Button Text",
      type: "string",
      value: "Button Text",
    },
  },
  Input: {
    type: {
      default: "text",
      type: "select",
      value: ["text", "email", "password"],
    },
    error: {
      default: "",
      type: "string",
      value: "",
    },
    label: {
      default: "Input Label",
      type: "string",
      value: "Input Label",
    },
    placeholder: {
      default: "Placeholder",
      type: "string",
      value: "Placeholder",
    },
    helperText: {
      default: "Small description for the above input.",
      type: "string",
      value: "Small description for the above input.",
    },
  },
};
