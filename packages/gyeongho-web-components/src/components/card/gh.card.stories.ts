import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./gh.card.ts";
import "../icon/gh.icon.ts";

type CustomArgs = {
  label: string | undefined;
  icon: string | undefined;
  image: string | undefined;
  flexDirection: "row" | "column";
  flat: boolean;
};

const meta: Meta<CustomArgs> = {
  title: "GHWC/Card",
  tags: ["autodocs"],
  component: "gh-card",
  argTypes: {
    label: { control: "text" },
    icon: { control: "text" },
    image: { control: "text" },
    flexDirection: { control: "radio", options: ["row", "column"] },
    flat: { control: "boolean" },
  },
  render: ({ label, icon, image, flexDirection, flat }) => {
    return html`
      <section style="width: 500px; height: 500px">
        <gh-card
          image=${image}
          label=${label}
          ${icon ? `icon=${icon}` : ""}
          flex-direction=${flexDirection}
          ?flat=${flat}
        >
          Content goes here
        </gh-card>
      </section>
    `;
  },
};

export default meta;

type Story = StoryObj<CustomArgs>;

export const WithLabel: Story = {
  args: {
    label: "Label",
    image: "https://i.ytimg.com/vi/BfCwN4iy6T8/maxresdefault.jpg",
    flexDirection: "column",
    flat: false,
  },
};
