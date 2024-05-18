import { customElement, property } from "lit/decorators.js";
import { css, html, LitElement } from "lit";
import { sharedStyles } from "../../shared-styles.ts";

/**
 * 경호 아이콘 컴포넌트
 *
 * @customElement gh-icon
 * @see https://kor-ui.com/components/icon
 *
 * @prop {String} icon - Material Design Library 내에 있는 아이콘 이름이나 커스텀 경로를 url('') 로 넣을 수 있음.
 * @prop {String} size - css 문법 상 올바른 font-size나 미리 정의되어있는 s, m, l, xl 가능(각각 16, 24, 32, 48px).
 * @prop {String} color - color override. css 문법 상 올바른 색상값 가능.
 * @prop {Boolean} button - hover시 hover 스타일 부여, 커서 변화, 클릭 이벤트를 생성
 * @prop {Boolean} disabled - 마우스 클릭 없앰, disable 스타일 부여
 *
 * @TODO: icon은 material icons만 사용하고 커스텀을 원하면 src prop을 따로 뚫는게 직관성이 더 좋아보임.
 */
@customElement("gh-icon")
export class GHIcon extends LitElement {
  @property({ type: String, reflect: true })
  icon: string | undefined;
  @property({ type: String, reflect: true })
  size: string | undefined;
  @property({ type: String, reflect: true })
  color: string | undefined;
  @property({ type: Boolean, reflect: true })
  button: boolean | undefined;
  @property({ type: Boolean, reflect: true })
  disabled: boolean | undefined;

  static override styles = [
    sharedStyles,
    css`
      :host {
        font-family: "md-icons";
        line-height: 1;
        -webkit-font-smoothing: none;
        text-rendering: optimizeLegibility;
        -moz-osx-font-smoothing: grayscale;
        font-feature-settings: "liga";
        opacity: 0.9;
        color: var(--text-1);
        transition: var(--transition-1);
        height: max-content;
        width: max-content;
        min-height: max-content;
        min-width: max-content;
        overflow: hidden;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }
      :host([button]) {
        opacity: 0.6;
        cursor: pointer;
      }
      :host([disabled]) {
        pointer-events: none;
        opacity: 0.2;
      }
      :host([size="xl"]) {
        height: 48px;
        width: 48px;
        font-size: 48px;
      }
      :host([size="l"]) {
        height: 32px;
        width: 32px;
        font-size: 32px;
      }
      :host([size="m"]) {
        height: 24px;
        width: 24px;
        font-size: 24px;
      }
      :host([size="s"]) {
        height: 16px;
        width: 16px;
        font-size: 16px;
      }
      @media (hover: hover) {
        :host([button]:hover:not(:active)) {
          opacity: 0.9;
        }
      }
    `,
  ];

  render() {
    return html`${this.icon ? html`${this.icon}` : ""}`;
  }

  attributeChangedCallback(name: string, _old: string, value: string) {
    super.attributeChangedCallback(name, _old, value);
    this.dispatchEvent(new Event(`${name}-changed`));
    if (name === "color" && this.color) {
      this.style.color = this.color;
    }
    if (name === "size" && value.includes("px")) {
      this.style.height = value;
      this.style.width = value;
      this.style.fontSize = value;
    }
    if (name === "icon" && value.indexOf("url") > -1) {
      this.setBackgroundImage(value);
    }
  }

  private setBackgroundImage(val: string): void {
    this.style.backgroundImage = val;
  }
}
