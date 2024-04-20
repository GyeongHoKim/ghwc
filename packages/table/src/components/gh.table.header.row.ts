import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("gh-table-header-row")
export class GHTableHeaderRow extends LitElement {
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
