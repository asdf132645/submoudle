export interface IOption {
  value: string;
  name: string;
}

export interface SelectProps {
  /**
   * select 의 옵션 리스트
   */
  options?: IOption[];
  /**
   * 다중 선택 여부
   */
  isMultiple?: boolean;
  /** onChange */
  onClick?: (value: string[] | string) => void;
  /** classname */
  className?: string;
  /** form으로 받을 이름 */
  name?: string;
}

// TODO: stories > components > selectBox 내의 컴포넌트로 교체
export interface DynamicSelectProps {
  /**
   * select 가 label을 가지는가
   */
  label?: string;
  /**
   * 처음 mount 시 select에서의 위치, n - 1번째
   */
  defaultPOS?: number;
  /**
   * 다중 선택 여부
   */
  isMultiple?: boolean;
  /**
   * true인 경우 아래 직각, false인 경우 모두 뭉툭하게
   */
  isRadius?: boolean;
  /**
   * select box 모서리 설정
   */
  border?: string;
  /**
   * formData로 관리하는 키값
   */
  name?: string;
  /**
   * select 의 옵션 리스트
   */
  option?: IOption[];
  /**
   * select박스의 너비 (단위: rem)
   */
  width?: string;
  /**
   * size  (단위: rem)
   */
  size?: 'large' | 'medium' | 'small';
  onChange?: (input: any) => void;
  onClick?: () => void;
  defailtDate?: string;
}
