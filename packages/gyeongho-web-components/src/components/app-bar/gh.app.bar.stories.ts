import { Meta, StoryObj } from "@storybook/web-components";
import defaultLogo from "../../assets/logo.png";
import "./gh.app.bar.ts";

const meta: Meta = {
  title: "GHWC/AppBar",
  component: "gh-app-bar",
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    logoSrc: { control: "text" },
    mobile: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    label: "Label",
    logoSrc: defaultLogo,
    mobile: false,
  },
};

export const Mobile: Story = {
  args: {
    ...Primary.args,
    mobile: true,
  },
};
