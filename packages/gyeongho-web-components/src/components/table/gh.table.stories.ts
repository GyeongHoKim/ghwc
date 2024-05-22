import type { Meta, StoryObj } from "@storybook/web-components";
import { fakerKO as faker } from "@faker-js/faker";
import { html } from "lit";
import { repeat } from "lit/directives/repeat.js";
import "./gh.table.ts";
import "./gh.table.row.ts";
import "./gh.table.cell.ts";
import "../text/gh.text.ts";
import "../icon/gh.icon.ts";

type CustomArgs = {
  readonly: boolean;
  condensed: boolean;
  columns: string;
  containerHeight: string;
};

faker.seed(123);
const dummyColumns = ["id", "name", "bio", "gender", "job", "sex", "email"];
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
  render: ({ readonly, condensed, columns, containerHeight }) => html`
    <section style=${`height: ${containerHeight}`}>
      <gh-table
        ?readonly=${readonly}
        ?condensed=${condensed}
        columns=${columns}
      >
        <gh-table-row slot="header">
          ${repeat(
            dummyColumns,
            (column) => column,
            (column) => html`
              <gh-table-cell head sortable>${column}</gh-table-cell>
            `,
          )}
        </gh-table-row>

        ${repeat(
          dummyItems,
          (item) => item.id,
          (item) => html`
            <gh-table-row>
              ${dummyColumns.map(
                (column) =>
                  html` <gh-table-cell
                    >${item[column as keyof typeof item]}</gh-table-cell
                  >`,
              )}
            </gh-table-row>
          `,
        )}
      </gh-table>
    </section>
  `,
};

export default meta;
type Story = StoryObj<CustomArgs>;

export const ReadOnly: Story = {
  args: {
    readonly: true,
    condensed: false,
    columns: "repeat(7, 1fr)",
    containerHeight: "500px",
  },
};

export const Condensed: Story = {
  args: {
    readonly: false,
    condensed: true,
    columns: "repeat(7, 1fr)",
    containerHeight: "500px",
  },
};

export const CustomColumns: Story = {
  args: {
    readonly: false,
    condensed: false,
    columns: "4fr 1fr 4fr 1fr 4fr 1fr 4fr",
    containerHeight: "500px",
  },
};
