import { customElement, property } from "lit/decorators.js";
import { css, html, LitElement } from "lit";
import { sharedStyles } from "../../shared-styles.ts";

/**
 * 경호 텍스트 컴포넌트
 *
 * @customElement gh-text
 * @see https://kor-ui.com/components/table
 *
 * @prop {String} size - size, line height, font family, 그리고 initial color를 정의함. 디자인 토큰에 정의된 값 중 하나를 사용해야 함(css문법 상 올바른 커스텀 값).
 * @prop {String} color - 텍스트의 initial color를 override하는 값. 디자인 토큰에 정의된 값이나 올바른 css color값을 넣어야 함.
 */
@customElement("gh-text")
export class GHText extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        color: var(--text-1);
        transition: var(--transition-1);
      }
      :host([size="body-1"]) {
        font: var(--body-1);
      }
      :host([size="body-2"]) {
        font: var(--body-2);
      }
      :host([size="header-1"]) {
        font: var(--header-1);
      }
      :host([size="hdeader-2"]) {
        font: var(--header-2);
      }
    `,
  ];

  @property({ type: String, reflect: true })
  size: string;
  @property({ type: String, reflect: true })
  color: string | undefined;

  constructor() {
    super();
    this.size = "body-1";
  }

  render() {
    return html`<slot></slot>`;
  }

  attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null,
  ) {
    super.attributeChangedCallback(name, _old, value);
    this.dispatchEvent(new Event(`${name}-changed`));
    if (name === "color" && this.color) {
      this.style.color = this.color;
    }
  }
}
