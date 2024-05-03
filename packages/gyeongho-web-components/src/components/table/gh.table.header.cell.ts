import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("gh-table-header-cell")
export class GHTableHeaderCell extends LitElement {
  static override styles = css`
    :host {
      position: relative;
      display: table-cell;
    }
  `;

  protected render(): unknown {
    return html` <slot></slot> `;
  }
}
