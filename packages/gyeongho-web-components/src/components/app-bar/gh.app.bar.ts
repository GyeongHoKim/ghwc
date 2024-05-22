import { customElement, property } from "lit/decorators.js";
import { css, html, LitElement } from "lit";
import { sharedStyles } from "../../shared-styles.ts";
import defaultLogo from "../../assets/logo.png";

/**
 * 경호 앱 바 컴포넌트
 *
 * @customElement gh-app-bar
 * @see https://kor-ui.com/components/app-bar
 *
 * @prop {String} label - 앱 바에 표시할 라벨, 기본은 왼쪽이고 모바일은 중앙에 표시됨.
 * @prop {String} logoSrc - 앱 바에 표시할 로고 이미지의 경로.
 * @prop {Boolean} mobile - 모바일 화면인지 여부를 나타냄.
 *
 * @cssprop --functions-gap - 함수 버튼들 사이의 간격을 설정함.
 */
@customElement("gh-app-bar")
export class GHAppBar extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        z-index: 3;
        height: calc(24px + var(--spacing-l) * 2);
        padding: 0 var(--spacing-l);
        display: flex;
        align-items: center;
        overflow: hidden;
        background-color: rgb(var(--base-0));
        box-shadow: var(--shadow-1);
        transition: var(--transition-1);
        gap: calc(var(--spacing-l) * 2);
        --functions-gap: var(--spacing-m);
      }
      .logo {
        height: 24px;
      }
      .label {
        font: var(--header-1);
        color: var(--text-1);
        max-width: 320px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      :host([mobile]) {
        gap: var(--spacing-l);
      }
      :host([mobile]) .label {
        flex: 1;
        max-width: unset;
        text-align: center;
      }
      slot {
        display: flex;
        align-items: center;
      }
      slot:not([name]) {
        flex: 1;
      }
      slot[name="functions"] {
        gap: var(--functions-gap, var(--spacing-m));
      }
      ::slotted(gh-tabs) {
        border-bottom: unset;
      }
      slot[name="right"],
      slot[name="left"] {
        min-width: 24px;
      }
      slot[name="right"] {
        margin-left: auto;
      }
    `,
  ];
  @property({ type: String, reflect: true })
  label: string | undefined;
  @property({ type: String, reflect: true })
  logoSrc: string | undefined;
  @property({ type: Boolean, reflect: true })
  mobile: boolean | undefined;

  constructor() {
    super();
    this.logoSrc = defaultLogo;
  }

  protected render(): unknown {
    return html`
      ${!this.mobile
        ? html`${this.logoSrc
              ? html`<img
                  class="logo"
                  src=${this.logoSrc}
                  @click=${this.handleLogoClick}
                />`
              : ""}
            ${this.label ? html`<div class="label">${this.label}</div>` : ""}
            <slot></slot>
            <slot name="functions"></slot>`
        : html`
            <slot name="left"></slot>
            ${this.label ? html`<div class="label">${this.label}</div>` : ""}
            <slot name="right"></slot>
          `}
    `;
  }

  attributeChangedCallback(
    name: string,
    _old: string | null,
    value: string | null,
  ) {
    super.attributeChangedCallback(name, _old, value);
    this.dispatchEvent(new Event(`${name}-changed`));
  }

  handleLogoClick() {
    this.dispatchEvent(new Event("logo-clicked"));
  }
}
