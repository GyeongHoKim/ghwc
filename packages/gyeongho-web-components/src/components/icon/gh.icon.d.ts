import { LitElement } from 'lit';

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
 */
export declare class GHIcon extends LitElement {
    icon: string | undefined;
    size: string | undefined;
    color: string | undefined;
    button: boolean | undefined;
    disabled: boolean | undefined;
    static styles: import("lit").CSSResult[];
    render(): import("lit").TemplateResult<1>;
}
