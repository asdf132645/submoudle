import styles from './label.module.css';

export const LabelAbove = ({ label }: { label: string }) => {
  return <label className={styles.label}>{label}</label>;
};
