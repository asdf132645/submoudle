import { useToggle } from '../hooks/useToggle';
import styles from '../component.module.css';

interface ToggleProps {
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Toggle Button UI Component
 */
export const ToggleBox = ({ onClick }: ToggleProps) => {
  const [toggle, onToggle] = useToggle();
  return (
    <button
      type='button'
      className={`${styles['btn-toggle']} ${toggle ? styles.active : ''}`}
      onClick={() => {
        onClick && onClick();
        onToggle();
      }}
    />
  );
};
