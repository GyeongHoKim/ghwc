import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { GHTable } from "./gh.table.ts";
import { sharedStyles } from "../../shared-styles.ts";

/**
 * 경호 테이블 row 컴포넌트
 *
 * @customElement gh-table-row
 * @see https://kor-ui.com/components/table
 *
 * @prop {Boolean} active - active되면 스타일이 적용됨
 *
 * @slot - 테이블 cell
 */
@customElement("gh-table-row")
export class GHTableRow extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        display: grid;
        border-bottom: 1px solid rgba(var(--neutral-1), 0.15);
        transition: var(--transition-1);
      }
      :host([slot="header"]) {
        border-color: rgba(var(--neutral-1), 0.4);
      }
      :host([active]) {
        background-color: rgba(var(--neutral-1), 0.1);
      }
      @media (hover: hover) {
        :host(:hover:not([active]):not([slot="header"])) {
          background-color: rgba(var(--neutral-1), 0.05);
        }
        :host(:host:not([active])):host-context(gh-table[readonly]) {
          background-color: transparent;
        }
      }
    `,
  ];

  @property({ type: Boolean, reflect: true })
  active: boolean;

  constructor() {
    super();
    this.active = false;
  }

  render(): unknown {
    return html`<slot @click=${this.handleActive}></slot>`;
  }

  attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null,
  ) {
    super.attributeChangedCallback(name, _old, value);
    this.dispatchEvent(new Event(`${name}-changed`));
  }

  connectedCallback() {
    super.connectedCallback();
    this.handleColumns();
  }

  handleActive() {
    let siblings: NodeList | undefined;
    const table: HTMLElement | null = this.closest("gh-table");
    if (!(<GHTable>table)?.readonly && this.slot != "header") {
      siblings = this.parentElement?.childNodes;
      siblings?.forEach((el: Node) => {
        if (el === this) {
          return;
        }
        (<GHTableRow>el).active = false;
      });
      this.active = !this.active;
    }
  }

  handleColumns() {
    const table: HTMLElement | null = this.closest("gh-table");
    this.style.gridTemplateColumns = (<GHTable>table)?.columns;
  }
}
