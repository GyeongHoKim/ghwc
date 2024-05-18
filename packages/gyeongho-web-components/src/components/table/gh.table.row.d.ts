import { LitElement } from 'lit';

/**
 * 경호 테이블 row 컴포넌트
 *
 * @customElement gh-table-row
 * @see https://kor-ui.com/components/table
 *
 * @prop {Boolean} active - active되면 스타일이 적용됨
 *
 * @slot - 테이블 cell
 */
export declare class GHTableRow extends LitElement {
  active: boolean | undefined;
  static override styles: import("lit").CSSResultGroup[];
  render(): import("lit-html").TemplateResult<1>;
  attributeChangedCallback(name: string, _old: string | null, value: string | null): void;
  connectedCallback(): void;
  handleActive(): void;
  handleColumns(): void;
}
