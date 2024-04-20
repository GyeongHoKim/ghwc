import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("gh-table")
export class GHTable extends LitElement {
  static styles = css`
    :host {
      position: relative;
      display: block;
      max-height: 100%;
      max-width: 100%;
      overflow-y: auto;
    }

    .table {
      position: relative;
      display: table;
      table-layout: auto;
      border-collapse: collapse;
      width: auto;
    }
  `;

  @property({ type: Boolean, reflect: true })
  isSortable?;

  constructor() {
    super();
    this.isSortable = false;
  }

  protected render(): unknown {
    return html`
      <div class="table">
        <slot></slot>
      </div>
    `;
  }
}
