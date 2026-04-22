import ProgressBar from './ProgressBar.jsx';
import styles from './StepLayout.module.css';

export default function StepLayout({
  progress,
  children,
  onBack,
  onNext,
  nextLabel = 'Continuer',
  nextDisabled = false,
  backLabel = 'Précédent'
}) {
  return (
    <div className={styles.layout}>
      {progress && (
        <header className={styles.header}>
          <ProgressBar current={progress.current} total={progress.total} />
        </header>
      )}

      <main className={`${styles.main} fade-in`}>{children}</main>

      <footer className={styles.footer}>
        {onBack && (
          <button type="button" className="btn-ghost" onClick={onBack}>
            ← {backLabel}
          </button>
        )}
        {onNext && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={onNext}
            disabled={nextDisabled}
          >
            {nextLabel}
          </button>
        )}
      </footer>
    </div>
  );
}
