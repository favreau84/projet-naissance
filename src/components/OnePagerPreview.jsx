import { THEMES } from '../content/themes.js';
import { JOURNEY_STEPS } from '../content/journey.js';
import { CLINIC_NAME, DOCTOR_NAME } from '../content/config.js';
import styles from './OnePagerPreview.module.css';

function renderAnswer(question, value) {
  if (value == null || value === '') return <em className={styles.empty}>Sans réponse</em>;
  if (question.type === 'open') return <span className={styles.openValue}>« {value} »</span>;
  if (question.type === 'multi') {
    const labels = (value || [])
      .map((v) => question.options.find((o) => o.value === v)?.label)
      .filter(Boolean);
    return labels.length ? labels.join(' · ') : <em className={styles.empty}>Sans réponse</em>;
  }
  // closed
  const opt = question.options.find((o) => o.value === value);
  return opt?.label ?? String(value);
}

export default function OnePagerPreview({ answers, patientCode, startedAt }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <article className={styles.page} aria-label="Aperçu de votre projet de naissance">
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Projet de naissance</h1>
          <p className={styles.subtitle}>
            {CLINIC_NAME} · {DOCTOR_NAME}
          </p>
        </div>
        <div className={styles.meta}>
          <div>
            <span className={styles.metaLabel}>Code patiente</span>
            <span className={styles.metaValue}>{patientCode ?? '—'}</span>
          </div>
          <div>
            <span className={styles.metaLabel}>Édité le</span>
            <span className={styles.metaValue}>{dateStr}</span>
          </div>
        </div>
      </header>

      <div className={styles.body}>
        {JOURNEY_STEPS.map((themeId) => {
          const theme = THEMES[themeId];
          if (!theme) return null;
          return (
            <section key={themeId} className={styles.section}>
              <h2 className={styles.sectionTitle}>
                {theme.emoji} {theme.title}
              </h2>
              <ul className={styles.answers}>
                {theme.questions.map((q) => (
                  <li key={q.id} className={styles.answer}>
                    <span className={styles.q}>{q.prompt}</span>
                    <span className={styles.a}>{renderAnswer(q, answers[q.id])}</span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <footer className={styles.footer}>
        <p>
          Document généré depuis l'application <strong>Projet de naissance</strong> — {DOCTOR_NAME}.
          Ce projet est une base de dialogue : l'équipe s'adapte en temps réel à votre situation le
          jour J.
        </p>
      </footer>
    </article>
  );
}
