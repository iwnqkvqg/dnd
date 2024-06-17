import type { Meta, StoryObj } from "@storybook/react";

import Card from "./Card";

const meta = {
  args: {
    id: 1346749,
    isDragged: false,
    onDragEnd: () => {},
    onDragOver: () => {},
    onDragStart: () => {},
    placeholder: false,
    children: [<div>title</div>, <div>text</div>],
  },
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Card",
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Dragged: Story = {
  args: {
    isDragged: true,
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: true,
  },
};
