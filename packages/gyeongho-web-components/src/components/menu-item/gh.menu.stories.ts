import { Meta, StoryObj } from "@storybook/web-components";
import "./gh.menu.item.ts";
import "../icon/gh.icon.ts";
import "../text/gh.text.ts";
import { html } from "lit";

const meta: Meta<CustomArgs> = {
  title: "GHWC/MenuItem",
  component: "gh-menu-item",
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    icon: { control: "text" },
    toggle: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  render: ({ label, icon, toggle, disabled }) => html`
    <gh-menu-item
      label=${label}
      icon=${icon}
      ?toggle=${toggle}
      ?disabled=${disabled}
    >
    </gh-menu-item>
  `,
};
export default meta;
type Story = StoryObj<CustomArgs>;

type CustomArgs = {
  label: string;
  icon: string;
  toggle?: boolean;
  disabled?: boolean;
};

export const Primary: Story = {
  args: {
    label: "Label",
    icon: "favorite",
  },
};

export const Toggle: Story = {
  args: {
    ...Primary.args,
    toggle: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Primary.args,
    disabled: true,
  },
};
