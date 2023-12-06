// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './label.module.css';

export const Label = ({ label }: { label: string }) => {
  return <label className={styles.label}>{label}</label>;
};
