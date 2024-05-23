import { LitElement } from 'lit';

/**
 * 경호 카드 컴포넌트
 *
 * @customElement gh-card
 * @see https://kor-ui.com/components/card
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
export declare class GHCard extends LitElement {
  label: string | undefined;
  icon: string | undefined;
  image: string | undefined;
  flexDirection: 'column' | 'row';
  flat: boolean | undefined;
  emptyHeader: boolean;
  emptyFunctions: boolean;
  emptyFooter: boolean;
  static override styles: import("lit").CSSResultGroup[];
  render(): import("lit-html").TemplateResult<1>;
  attributeChangedCallback(name: string, oldval: string, newval: string): void;
}
