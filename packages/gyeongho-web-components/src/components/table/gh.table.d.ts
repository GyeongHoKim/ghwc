import { LitElement } from "lit";

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
export declare class GHTable extends LitElement {
  readonly: boolean | undefined;
  condensed: boolean | undefined;
  columns: string;
  static override styles: import("lit").CSSResultGroup[];
  render(): import("lit-html").TemplateResult<1>;
  attributeChangedCallback(name: string, _old: string | null, value: string | null): void;
}
