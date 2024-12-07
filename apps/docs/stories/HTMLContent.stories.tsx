import React from "react";
import type { Meta } from "@storybook/react";
import { HTMLContent } from "@siddheshtawde/ui";
import { Controls, Description, Primary, Subtitle, Title } from "@storybook/blocks";
import "@siddheshtawde/ui/dist/index.css";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/HTMLContent",
  component: HTMLContent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component:
          "Use the HTML component to render raw HTML content safely within your application, often for rich text or dynamic content.",
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
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof HTMLContent>;

export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  args: {
    children: "HTML Content",
  },
};
