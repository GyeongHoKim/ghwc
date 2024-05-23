import { LitElement, css, html } from "lit";
import { property, customElement } from "lit/decorators.js";
import { sharedStyles } from "../../shared-styles";

/**
 * 경호 메뉴 아이템 컴포넌트
 *
 * @customElement gh-menu-item
 * @see https://kor-ui.com/components/menu-item
 *
 * @dependency {GHIcon} gh-icon
 * @dependency {GHText} gh-text
 *
 * @prop {String} label - Defines the text label.
 * @prop {String} icon - If set, defines the icon shown before the label.
 * @prop {Boolean} active - If set to true, a highlight style gets applied.
 * @prop {Boolean} toggle - If set to true, clicking on the component will toggle the active property between true and false.
 * @prop {Boolean} disabled - If set to true, disables mouse clicks and the style gets updated.
 *
 * @slot - Displayed inside the content area.
 * @slot functions - Shown on the right side.
 *
 * @csspart base - The main container.
 */
@customElement("gh-menu-item")
export class GHMenuItem extends LitElement {
  @property({ type: String, reflect: true }) label = "Label";
  @property({ type: String, reflect: true }) icon: string | undefined;
  @property({ type: Boolean, reflect: true }) active: boolean | undefined;
  @property({ type: Boolean, reflect: true }) toggle = true;
  @property({ type: Boolean, reflect: true }) disabled: boolean | undefined;

  static get styles() {
    return [
      sharedStyles,
      css`
        .container {
          padding: var(--spacing-s) 0;
          border-radius: var(--border-radius);
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: var(--transition-1);
          overflow: visible;
        }
        gh-icon {
          margin-right: var(--spacing-s);
        }
        .label {
          flex: 1;
        }
        /* label */
        gh-text {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          pointer-events: none;
        }
        slot[name="functions"]::slotted(*) {
          margin-left: var(--spacing-s);
        }
        :host([active]) .container {
          padding: var(--spacing-s);
          margin-left: calc(var(--spacing-s) * -1);
          margin-right: calc(var(--spacing-s) * -1);
          background: rgba(var(--neutral-1), 0.1);
        }
        /* disabled */
        :host([disabled]) .container {
          opacity: 0.2;
          pointer-events: none;
        }
        /* hover inputs */
        @media (hover: hover) {
          :host(:not([active]):hover) .container {
            padding: var(--spacing-s);
            margin-left: calc(var(--spacing-s) * -1);
            margin-right: calc(var(--spacing-s) * -1);
            background: rgba(var(--neutral-1), 0.05);
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <div
        class="container"
        part="base"
        @click=${() => {
          if (!this.toggle) {
            return;
          }
          this.active = !this.active;
        }}
      >
        ${this.icon ? html` <gh-icon icon="${this.icon}"></gh-icon> ` : ""}
        ${this.label ? html` <gh-text>${this.label}</gh-text> ` : ""}
        <!-- functions slot -->
        <slot name="functions"></slot>
      </div>
    `;
  }

  attributeChangedCallback(name: string, oldval: string, newval: string) {
    super.attributeChangedCallback(name, oldval, newval);
    this.dispatchEvent(new Event(`${name}-changed`));
  }
}
