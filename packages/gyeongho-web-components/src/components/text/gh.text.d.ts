import {LitElement} from "lit";

/**
 * 경호 텍스트 컴포넌트
 *
 * @customElement gh-text
 * @see https://kor-ui.com/components/table
 *
 * @prop {String} size - size, line height, font family, 그리고 initial color를 정의함. 디자인 토큰에 정의된 값 중 하나를 사용해야 함(css문법 상 올바른 커스텀 값).
 * @prop {String} color - 텍스트의 initial color를 override하는 값. 디자인 토큰에 정의된 값이나 올바른 css color값을 넣어야 함.
 */
export declare class GHText extends LitElement {
  size: string;
  color: string | undefined;
  static override styles: import('lit').CSSResultGroup[];
  render(): import('lit-html').TemplateResult<1>;
  attributeChangedCallback(name: string, _old: string | null, value: string | null): void;
}
