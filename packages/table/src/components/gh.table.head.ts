import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("gh-table-head")
export class GHTableHead extends LitElement {
  static styles = css`
    :host {
      position: sticky;
      display: table-header-group;
      top: 0;
    }
  `;

  protected render(): unknown {
    return html` <slot></slot> `;
  }
}
