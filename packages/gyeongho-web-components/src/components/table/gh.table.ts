import {css, html, LitElement} from "lit";
import {property} from "lit/decorators.js";
import {sharedStyles} from "../../shared-styles.ts";
import {GHTableRow} from "./gh.table.row.ts";

/**
 * 경호 테이블 컴포넌트
 *
 * @customElement gh-table
 * @see https://kor-ui.com/components/table
 *
 * @prop {Boolean} readonly - true일 때, 마우스 클릭과 호버 효과를 없앤다.
 * @prop {Boolean} condensed - true일 때, 테이블 cell의 padding을 small size spacing token으로 설정한다.
 * @prop {String} columns - column 너비를 설정한다. grid-template-columns를 string으로 받는다.
 *
 * @slot header - 테이블 헤더
 * @slot - 테이블 row
 */
export class GHTable extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        max-height: 100%;
        margin: 0 !important;
      }

      slot {
        display: block;
      }

      slot:not([name]) {
        flex: 1;
        overflow: auto;
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  readonly: boolean | undefined;
  @property({ type: Boolean, reflect: true })
  condensed: boolean | undefined;
  @property({ type: String, reflect: true })
  columns: string;
  @property({ type: Object })
  data: Array<Array<string>>;
  @property({ type: Object })
  sortedData?: Array<Array<string>>;

  constructor() {
    super();
    this.columns = "repeat(24, 1fr)";
    this.data = [];
  }

  connectedCallback() {
    this.addEventListener("sorted", this.sortHandler as EventListener);
    super.connectedCallback();
  }

  disconnectedCallback() {
    this.removeEventListener("sorted", this.sortHandler as EventListener);
    super.disconnectedCallback();
  }

  attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null,
  ) {
    super.attributeChangedCallback(name, _old, value);
    this.dispatchEvent(new Event(`${name}-changed`));
  }

  protected render(): unknown {
    return html`
      <slot name="header"></slot>
      <slot @slotchange=${this.handleRows}></slot>
    `;
  }

  private sortHandler(event: CustomEvent) {
    this.sortedData = event.detail as Array<Array<string>>;
    const slots = this.shadowRoot?.querySelectorAll(
      "slot:not([name='header'])",
    );
    if (!slots) {
      return;
    }
    const slot: HTMLSlotElement = slots[0] as HTMLSlotElement;
    const rows = slot
      .assignedElements()
      .filter((el) => el instanceof GHTableRow);
    this.sortedData.forEach((rowData, index) => {
      const row = new GHTableRow();
      rowData.forEach((cellData) => {
        const cell = document.createElement("gh-table-cell");
        cell.textContent = cellData;
        row.appendChild(cell);
      });
      rows[index].replaceWith(row);
    });
  }

  private handleRows() {
    const slots = this.shadowRoot?.querySelectorAll(
      'slot:not([name="header"])',
    );
    if (!slots) {
      return;
    }
    const slot: HTMLSlotElement = slots[0] as HTMLSlotElement;
    const rows = slot.assignedElements();
    const data: Map<string, string[]> = new Map();
    rows.forEach((row) => {
      if (!(<GHTableRow>row).rowId) {
        return;
      }
      const slots = row.shadowRoot?.querySelectorAll("slot");
      if (!slots) {
        return;
      }
      const slot: HTMLSlotElement = slots[0];
      const cells = slot.assignedElements();
      if (!cells) {
        return;
      }
      const rowData: string[] = [];
      cells.forEach((cell) => {
        if (cell.nodeType !== Node.ELEMENT_NODE) {
          return;
        }
        const slots = cell.shadowRoot?.querySelectorAll("slot");
        if (!slots) {
          return;
        }
        const slot: HTMLSlotElement = slots[0];
        if (!slot) {
          return;
        }
        const assignedNode = slot.assignedNodes()[0];
        if (
          assignedNode.nodeType === Node.TEXT_NODE ||
          assignedNode.nodeType === Node.ELEMENT_NODE
        ) {
          rowData.push(assignedNode.textContent || "");
        }
      });
      data.set((<GHTableRow>row).rowId, rowData);
    });
    this.data = Array.from(data.values());
  }
}

if (!window.customElements.get("gh-table")) {
  window.customElements.define("gh-table", GHTable);
}
