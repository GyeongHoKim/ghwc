import { customElement } from "lit/decorators.js";
import { css, html, LitElement } from "lit";

@customElement("gh-table-body")
export class GHTableBody extends LitElement {
  static override styles = css`
    :host {
      position: relative;
      display: table-row-group;
    }
  `;

  protected render(): unknown {
    return html` <slot></slot> `;
  }
}
