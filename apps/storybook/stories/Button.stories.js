import { fn } from "@storybook/test";

import { Button } from "@repo/ui";
import "@repo/ui/dist/index.css";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Components/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variant: {
      options: ["contained", "outlined", "link"],
      control: { type: "select" },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Contained = {
  args: {
    variant: "contained",
    children: "Button Text",
    loading: false,
  },
};

export const Outlined = {
  args: {
    variant: "outlined",
    children: "Button Text",
    loading: false,
  },
};

export const Link = {
  args: {
    variant: "link",
    children: "Button Text",
    loading: false,
  },
};
