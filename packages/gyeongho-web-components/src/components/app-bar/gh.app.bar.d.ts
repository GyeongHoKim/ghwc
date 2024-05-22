import {LitElement} from "lit";

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
export declare class GHAppBar extends LitElement {
  label: string | undefined;
  logoSrc: string | undefined;
  mobile: boolean | undefined;
  static override styles: import("lit").CSSResultGroup[];
  render(): import("lit").TemplateResult<1>;
  attributeChangedCallback(name: string, _old: string | null, value: string | null): void;
  handleLogoClick(): void;
}
