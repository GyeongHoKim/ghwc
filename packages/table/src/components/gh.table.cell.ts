import { customElement } from "lit/decorators.js";
import { css, html, LitElement } from "lit";

@customElement("gh-table-cell")
export class GHTableCell extends LitElement {
  static styles = css`
    :host {
      position: relative;
      display: table-cell;
    }
  `;

  protected render(): unknown {
    return html` <slot></slot> `;
  }
}
