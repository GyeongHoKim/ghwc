import type { Meta, StoryObj } from "@storybook/web-components";
import { fakerKO as faker } from "@faker-js/faker";
import { html } from "lit";
import { repeat } from "lit/directives/repeat.js";
import "./index";

type CustomArgs = { isSortable?: boolean };

const columns = ["id", "name", "bio", "gender", "job", "sex", "email"];
const dummyItems = Array.from({ length: 100 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  bio: faker.person.bio(),
  gender: faker.person.gender(),
  job: faker.person.jobTitle(),
  sex: faker.person.sex(),
  email: faker.internet.email(),
}));

const meta: Meta<CustomArgs> = {
  title: "GHWC/Table",
  tags: ["autodocs"],
  component: "gh-table",
  render: ({ isSortable }) => html`
    <gh-table>
      <gh-table-head ${isSortable ? "isSortable" : ""}>
        <gh-table-header-row>
          ${columns.map(
            (column) =>
              html` <gh-table-header-cell>${column}</gh-table-header-cell>`,
          )}
        </gh-table-header-row>
      </gh-table-head>
      <gh-table-body>
        ${repeat(
          dummyItems,
          (item) => item.id,
          (item) => html`
            <gh-table-row>
              ${columns.map(
                (column) =>
                  html` <gh-table-cell
                    >${item[column as keyof typeof item]}</gh-table-cell
                  >`,
              )}
            </gh-table-row>
          `,
        )}
      </gh-table-body>
    </gh-table>
  `,
};

export default meta;
type Story = StoryObj<CustomArgs>;

export const Basic: Story = {
  args: {
    isSortable: false,
  },
};
