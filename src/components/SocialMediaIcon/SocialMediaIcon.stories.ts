import type { Meta, StoryObj } from "@storybook/react";

import SocialMediaIcon, { Media } from "./SocialMediaIcon";

const meta = {
  component: SocialMediaIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "SocialMediaIcon",
} satisfies Meta<typeof SocialMediaIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Linkedin: Story = {
  args: {
    media: Media.LinkedIn,
    href: "#linkedin",
  },
};

export const Github: Story = {
  args: {
    media: Media.GitHub,
    href: "#github",
  },
};
