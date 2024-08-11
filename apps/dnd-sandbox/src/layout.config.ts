export const layouts = {
  header: {
    fixed: {
      default: false,
      type: "boolean",
      value: false,
    },
  },
  main: {
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
