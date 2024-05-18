import { customElement, property } from "lit/decorators.js";
import { css, html, LitElement } from "lit";
import { sharedStyles } from "../../shared-styles.ts";

/**
 * 경호 테이블 셀 컴포넌트
 *
 * @customElement gh-table-cell
 * @see https://kor-ui.com/components/table
 *
 * @prop {String} alignment - 셀 내부의 정렬을 정의함(left, center, right 중 하나).
 * @prop {Boolean} head - table header cell일 때 true, header row 내에 존재해야 함.
 * @prop {Boolean} sortable - header cell일 때 셀을 클릭하면 sorted property를 toggle한다.
 * @prop {Boolean} sorted - header cell이고 sortable일 때 arrow icon을 방향에 맞게 보여준다.
 * @prop {String} sortDirection - header cell이고 sortable이고 sorted일 때 정렬방향을 정한다(asc, desc 중 하나).
 */
@customElement("gh-table-cell")
export class GHTableCell extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        align-items: center;
        padding: var(--spacing-m) var(--spacing-s);
        font: var(--body-1);
        overflow: hidden;
        cursor: default;
      }

      gh-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      :host:host-context(gh-table[condensed]) {
        padding: var(--spacing-s);
      }

      :host([head]) gh-text {
        font-weight: bold;
      }

      :host([alignment="center"]) {
        justify-content: center;
      }

      :host([alignment="right"]) {
        justify-content: flex-end;
      }

      :host([sortable]) {
        cursor: pointer;
      }

      :host([sort-direction="desc"]) .sort {
        transform: rotate(180deg);
      }

      .sort {
        margin: var(--spacing-xs) 0 var(--spacing-xs) var(--spacing-xs);
        color: var(--text-2);
      }
    `,
  ];
  @property({ type: Number, reflect: true, attribute: "grid-cols" })
  gridCols: number | undefined;
  @property({ type: String, reflect: true })
  alignment: string;
  @property({ type: Boolean, reflect: true })
  head: boolean | undefined;
  @property({ type: Boolean, reflect: true })
  sorted: boolean | undefined;
  @property({ type: Boolean, reflect: true })
  sortable: boolean | undefined;
  @property({ type: String, reflect: true, attribute: "sort-direction" })
  sortDirection: string | undefined;

  constructor() {
    super();
    this.alignment = "left";
  }

  /**
   * @TODO: arrow icon slot을 따로 두고 있으면 있는거 쓰고 없을 때만 gh-icon쓰도록. gh-text도 사용을 검토할 것.
   */
  render() {
    return html`
      <gh-text>
        <slot></slot>
      </gh-text>
      ${this.head && this.sorted
        ? html`<gh-icon size="s" icon="arrow_downward" class="sort"></gh-icon>`
        : ""}
    `;
  }

  attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null,
  ) {
    super.attributeChangedCallback(name, _old, value);
    this.dispatchEvent(new Event(`${name}-changed`));
    if (name === "grid-cols") {
      this.style.gridColumn = `span ${this.gridCols}`;
    }
    if (name === "sortable" && this.sortable) {
      if (!this.sortDirection) {
        this.sortDirection = "asc";
      }
      this.addEventListener("click", () => {
        this.handleSort();
      });
    }
  }

  handleSort() {
    if (this.sorted) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      return;
    }
    const siblings: NodeList | undefined = this.parentElement?.childNodes;
    siblings?.forEach((el: any) => {
      el.sorted = false;
    });
    this.sorted = true;
    this.sortDirection = "asc";
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.handleSort);
    super.disconnectedCallback();
  }
}
