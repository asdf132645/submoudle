import styles from './rectblock.module.css';

interface RectBlockProps {
  label?: string;
  width?: string;
  height?: string;
  type?: string;
  btnStyle: string;
  onClick?: () => void;
}

export const RectBlock = ({
  label,
  btnStyle,
  type = 'default',
  width = '100%',
  height = '100%',
  ...props
}: RectBlockProps) => {
  return (
    <div
      className={`${styles.block} ${styles[type]}`}
      style={{ width, height }}
    >
      <div>{label}</div>
      <button {...props}>{btnStyle}</button>
    </div>
  );
};
