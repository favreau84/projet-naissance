import { useState } from 'react';
import ProgressBar from './ProgressBar.jsx';
import StepsOverview from './StepsOverview.jsx';
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.layout}>
      {progress && (
        <header className={styles.header}>
          <ProgressBar current={progress.current} total={progress.total} />
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setMenuOpen(true)}
            aria-label="Voir le sommaire du parcours"
            aria-expanded={menuOpen}
          >
            <span aria-hidden>☰</span>
          </button>
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

      <StepsOverview
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentIndex={progress ? progress.current - 1 : 0}
      />
    </div>
  );
}
