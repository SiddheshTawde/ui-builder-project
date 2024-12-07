import React from "react";
import { fn } from "@storybook/test";

import type { Meta } from "@storybook/react";
import { Input } from "@siddheshtawde/ui";
import { Controls, Description, Primary, Subtitle, Title } from "@storybook/blocks";
import "@siddheshtawde/ui/dist/index.css";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component:
          "Use the Input component for capturing user data or enabling text-based interactions in forms and interfaces.",
      },
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />

          <Primary />
          <Controls />
        </>
      ),
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    type: {
      options: ["text", "email", "password", "number", "url", "search"],
      control: { type: "select" },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onChange: fn() },
} satisfies Meta<typeof Input>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Text = {
  args: {
    type: "text",
    value: "Default text value",
    label: "",
    helperText: "",
    error: "",
    loading: false,
  },
};

export const Password = {
  args: {
    label: "Password",
    value: "my-secure-password",
    type: "password",
    loading: false,
  },
};

export const InputDecorators = {
  args: {
    value: "example@gmail.com",
    label: "Email Address",
    helperText: "Do not use your personal email",
    error: "The email you have entered is invalid",
    type: "email",
    loading: false,
  },
};
