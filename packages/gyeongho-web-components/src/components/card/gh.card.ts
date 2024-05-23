import { customElement, property, state } from "lit/decorators.js";
import { css, html, LitElement } from "lit";
import { sharedStyles } from "../../shared-styles.ts";

/**
 * 경호 카드 컴포넌트
 *
 * @customElement gh-card
 * @see https://kor-ui.com/components/card
 *
 * @dependency {GHIcon} gh-icon
 *
 * @prop {String} label - 텍스트 라벨
 * @prop {string} icon - 아이콘 이름, 라벨 옆에 생성된다.
 * @prop {String} image - 카드 상단에 나오는 이미지 경로
 * @prop {'row' | 'column'} flexDirection - 레이아웃 방향
 * @prop {Boolean} flat - 배경, 그림자, 가장 바깥 패딩 제거
 *
 * @slot - 컨텐트 내용
 * @slot header - 카드 상단, 라벨이 있다면 라벨 아래에 위치
 * @slot functions - 라벨이 있으면 라벨 오른쪽, 아니면 헤더 오른쪽에 위치
 * @slot footer - 카드 하단에 위치
 *
 * @cssprop --body-gap - 슬롯 간의 간격
 * @cssprop --header-gap - 헤더 내부 요소 간격
 * @cssprop --function-gap - 기능 버튼 간격
 * @cssprop --footer-gap - 푸터 내부 요소 간격
 */
@customElement("gh-card")
export class GHCard extends LitElement {
  static override styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
        border-radius: var(--border-radius);
        box-sizing: border-box;
        overflow: hidden;
        /* css properties */
        --body-gap: var(--spacing-m);
        --header-gap: var(--spacing-m);
        --functions-gap: var(--spacing-m);
        --footer-gap: var(--spacing-m);
      }
      :host(:not([flat])) {
        background-color: rgb(var(--base-3));
        box-shadow: var(--shadow-1);
        padding: var(--spacing-l);
      }
      /* header */
      slot,
      .header,
      .top {
        display: flex;
        overflow: auto;
      }
      .header,
      slot[name="functions"] {
        height: max-content;
      }
      .header {
        flex: 1;
      }
      .top:not(.empty) {
        padding-bottom: var(--spacing-l);
      }
      slot[name="footer"]:not(.empty) {
        padding-top: var(--spacing-l);
      }
      .label {
        flex: 1;
        display: flex;
        gap: var(--spacing-s);
      }
      .label p {
        font: var(--header-1);
        color: var(--text-1);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: unset;
      }
      /* slots */
      slot[name="functions"] {
        gap: var(--functions-gap);
      }
      slot[name="header"] {
        gap: var(--header-gap);
      }
      slot:not([name]) {
        gap: var(--spacing-m);
      }
      slot[name="header"],
      slot[name="functions"],
      slot[name="footer"] {
        align-items: center;
      }
      /* content */
      slot:not([name]) {
        flex: 1;
        width: 100%;
        box-sizing: border-box;
        padding: 0 var(--spacing-l);
        margin-right: calc(var(--spacing-l) * -1);
        margin-left: calc(var(--spacing-l) * -1);
        gap: var(--body-gap);
      }
      :host([flex-direction="column"]) slot:not([name]),
      .header,
      .top {
        flex-direction: column;
      }
      /* footer */
      slot[name="footer"] {
        justify-content: flex-end;
        gap: var(--footer-gap);
      }
      /* image */
      .image {
        width: calc(100% + 32px);
        margin: calc(var(--spacing-l) * -1) calc(var(--spacing-l) * -1)
          var(--spacing-l) calc(var(--spacing-l) * -1);
      }
    `,
  ];
  @property({ type: String, reflect: true })
  label: string | undefined;
  @property({ type: String, reflect: true })
  icon: string | undefined;
  @property({ type: String, reflect: true })
  image: string | undefined;
  @property({ type: String, reflect: true, attribute: "flex-direction" })
  flexDirection: "row" | "column";
  @property({ type: Boolean, reflect: true })
  flat: boolean | undefined;

  @state()
  emptyHeader: boolean;
  @state()
  emptyFunctions: boolean;
  @state()
  emptyFooter: boolean;

  constructor() {
    super();
    this.flexDirection = "column";
    this.emptyHeader = true;
    this.emptyFunctions = true;
    this.emptyFooter = true;
  }

  protected render(): unknown {
    return html`
      ${this.image ? html`<img class="image" src=${this.image} />` : ""}
      <div
        class="top ${this.emptyHeader &&
        this.emptyFunctions &&
        !this.label &&
        !this.icon
          ? "empty"
          : ""}"
      >
        <div class="header">
          ${this.label || this.icon
            ? html`
                <div class="label">
                  ${this.icon
                    ? html`<gh-icon icon=${this.icon}></gh-icon>`
                    : ""}
                  <p>${this.label}</p>
                </div>
                ${!this.emptyHeader && (this.label || this.icon)
                  ? html`<div style="margin-top: var(--spacing-l);"></div>`
                  : ""}
              `
            : html``}
          <slot
            name="header"
            @slotchange=${(e: Event) =>
              (this.emptyHeader =
                (e.target as HTMLSlotElement).assignedNodes().length === 0)}
            class=${this.emptyHeader ? "empty" : ""}
          ></slot>
        </div>
        <slot></slot>
        <slot
          name="footer"
          @slotchange=${(e: Event) =>
            (this.emptyFooter =
              (e.target as HTMLSlotElement).assignedNodes().length === 0)}
          class=${this.emptyFooter ? "empty" : ""}
        ></slot>
      </div>
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
}
