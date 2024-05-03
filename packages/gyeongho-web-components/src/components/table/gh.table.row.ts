import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("gh-table-row")
export class GHTableRow extends LitElement {
  static styles = css`
    :host {
      position: relative;
      display: table-row;
    }
  `;

  protected render(): unknown {
    return html` <slot></slot> `;
  }
}
