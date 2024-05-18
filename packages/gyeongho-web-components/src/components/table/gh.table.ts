import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { sharedStyles } from "../../shared-styles.ts";

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
@customElement("gh-table")
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

  constructor() {
    super();
    this.columns = "repeat(24, 1fr)";
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
      <slot></slot>
    `;
  }
}
