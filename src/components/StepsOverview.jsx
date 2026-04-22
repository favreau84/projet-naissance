import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { JOURNEY_STEPS } from '../content/journey.js';
import { THEMES } from '../content/themes.js';
import { useBirthPlan } from '../state/BirthPlanContext.jsx';
import styles from './StepsOverview.module.css';

function isStepComplete(theme, answers) {
  return theme.questions.every((q) => {
    if (q.optional) return true;
    const v = answers[q.id];
    if (q.type === 'multi') return Array.isArray(v) && v.length > 0;
    if (q.type === 'open') return typeof v === 'string' && v.trim().length > 0;
    return v != null && v !== '';
  });
}

export default function StepsOverview({ open, onClose, currentIndex }) {
  const navigate = useNavigate();
  const { answers } = useBirthPlan();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const goTo = (index) => {
    onClose();
    navigate(`/journey/${index}`);
  };

  const goToPreview = () => {
    onClose();
    navigate('/preview');
  };

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <aside
        className={styles.panel}
        onClick={(e) => e.stopPropagation()}
        aria-label="Sommaire du parcours"
      >
        <header className={styles.header}>
          <h2 className={styles.title}>Sommaire</h2>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Fermer">
            ✕
          </button>
        </header>

        <ol className={styles.list}>
          {JOURNEY_STEPS.map((themeId, idx) => {
            const theme = THEMES[themeId];
            const done = isStepComplete(theme, answers);
            const current = idx === currentIndex;
            return (
              <li key={themeId}>
                <button
                  type="button"
                  className={`${styles.item} ${current ? styles.current : ''} ${
                    done ? styles.done : ''
                  }`}
                  onClick={() => goTo(idx)}
                >
                  <span className={styles.marker} aria-hidden>
                    {done ? '✓' : current ? '●' : idx + 1}
                  </span>
                  <span className={styles.labelGroup}>
                    <span className={styles.emoji} aria-hidden>
                      {theme.emoji}
                    </span>
                    <span className={styles.label}>{theme.title}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className={styles.footer}>
          <button type="button" className="btn btn-primary" onClick={goToPreview}>
            Voir mon projet
          </button>
        </div>
      </aside>
    </div>
  );
}
