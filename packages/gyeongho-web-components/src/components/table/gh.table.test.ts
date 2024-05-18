import { html, render } from "lit";
import { $, expect } from "@wdio/globals";
import { fakerKO as faker } from "@faker-js/faker";
import { repeat } from "lit/directives/repeat.js";
import "./index";

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

describe("gh-table test", () => {
  it("각 셀 내부에 텍스트 이외의 다른 컴포넌트가 포함되어 있을 때, 해당 컴포넌트를 렌더링한다", () => {
    render(
      html`
        <gh-table>
          <gh-table-head>
            <gh-table-header-row>
              <gh-table-header-cell>Logo</gh-table-header-cell>
              <gh-table-header-cell>Svg</gh-table-header-cell>
            </gh-table-header-row>
          </gh-table-head>
          <gh-table-body>
            <gh-table-row>
              <gh-table-cell>
                <a
                  href="https://webdriver.io/docs/component-testing"
                  target="_blank"
                >
                  <img
                    src="https://webdriver.io/assets/images/robot-3677788dd63849c56aa5cb3f332b12d5.svg"
                    className="logo"
                    alt="WebdriverIO logo"
                  />
                </a>
              </gh-table-cell>
              <gh-table-cell>
                <svg width="320" height="130" xmlns="http://www.w3.org/2000/svg">
                  <rect width="300" height="100" x="10" y="10" style="fill:rgb(0,0,255);stroke-width:3;stroke:red" />
                  Sorry, your browser does not support inline SVG.
                </svg>
            </gh-table-row>
          </gh-table-body>
        </gh-table>
      `,
      document.body,
    );

    const logo = $("gh-table")
      .$(">>>gh-table-body")
      .$(">>>gh-table-row")
      .$(">>>gh-table-cell")
      .$(">>>a");
    // 로고를 클릭하면 webdriver.io/docs/component-testing 페이지로 이동한다.
    expect(logo).toHaveAttribute(
      "href",
      "https://webdriver.io/docs/component-testing",
    );
    const svg = $("gh-table")
      .$(">>>gh-table-body")
      .$(">>>gh-table-row")
      .$(">>>gh-table-cell")
      .$(">>>svg");
    // svg 요소의 너비와 높이가 320, 130이다.
    expect(svg).toHaveAttribute("width", "320");
    expect(svg).toHaveAttribute("height", "130");
  });

  it("scroll property 추가 시, container의 height 혹은 max-height를 넘었을 때 스크롤이 보여야 한다", async () => {
    render(
      html`
        <div class="container" style="height: 100px; width: auto;">
          <gh-table scroll>
            <gh-table-head>
              <gh-table-header-row>
                ${columns.map(
                  (column) =>
                    html` <gh-table-header-cell
                      >${column}
                    </gh-table-header-cell>`,
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
                          >${item[column as keyof typeof item]}
                        </gh-table-cell>`,
                    )}
                  </gh-table-row>
                `,
              )}
            </gh-table-body>
          </gh-table>
        </div>
      `,
      document.body,
    );

    const table = $("gh-table");
    const scrollHeight = await table.getProperty("scrollHeight");
    expect(scrollHeight).toBeGreaterThan(100);
  });
});
