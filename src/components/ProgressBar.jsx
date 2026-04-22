import styles from './ProgressBar.module.css';

export default function ProgressBar({ current, total }) {
  const pct = Math.min(100, Math.round((current / total) * 100));
  return (
    <div className={styles.wrapper} aria-label={`Étape ${current} sur ${total}`}>
      <div className={styles.bar}>
        <div className={styles.fill} style={{ width: `${pct}%` }} />
      </div>
      <span className={styles.label}>
        {current} / {total}
      </span>
    </div>
  );
}
