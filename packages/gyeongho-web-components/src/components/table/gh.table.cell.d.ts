import {LitElement} from "lit";

/**
 * 경호 테이블 셀 컴포넌트
 *
 * @customElement gh-table-cell
 * @see https://kor-ui.com/components/table
 *
 * @prop {String} alignment - 셀 내부의 정렬을 정의함(left, center, right 중 하나).
 * @prop {Boolean} head - table header cell일 때 true, header row 내에 존재해야 함.
 * @prop {Boolean} sortable - header cell일 때 셀을 클릭하면 sorted property를 toggle한다.
 * @prop {Boolean} sorted - header cell이고 sortable일 때 arrow icon을 방향에 맞게 보여준다.
 * @prop {String} sortDirection - header cell이고 sortable이고 sorted일 때 정렬방향을 정한다(asc, desc 중 하나).
 */
export declare class GhTableCell extends LitElement {
  gridCols: number | undefined;
  alignment: string;
  head: boolean | undefined;
  sorted: boolean | undefined;
  sortable: boolean | undefined;
  sortDirection: string | undefined;
  static override styles: import("lit").CSSResultGroup[];
  render(): import("lit-html").TemplateResult<1>;
  attributeChangedCallback(name: string, _old: string | null, value: string | null): void;
  handleSort(): void;
}
