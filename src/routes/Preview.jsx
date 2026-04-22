import { useNavigate } from 'react-router-dom';
import OnePagerPreview from '../components/OnePagerPreview.jsx';
import { useBirthPlan } from '../state/BirthPlanContext.jsx';
import styles from './Preview.module.css';

export default function Preview() {
  const navigate = useNavigate();
  const { answers, patientCode, startedAt } = useBirthPlan();

  return (
    <div className={`${styles.wrapper} fade-in`}>
      <header className={styles.head}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigate(-1)}
          aria-label="Revenir au parcours"
        >
          <span aria-hidden>←</span> Retour au parcours
        </button>
        <h2 className={styles.title}>Votre projet de naissance</h2>
        <p className={styles.subtitle}>
          Relisez votre projet. Vous pouvez revenir sur chaque étape pour ajuster vos réponses.
        </p>
      </header>

      <OnePagerPreview
        answers={answers}
        patientCode={patientCode}
        startedAt={startedAt}
      />

      <div className={styles.actions}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate('/share')}
        >
          Envoyer à mon équipe
        </button>
      </div>
    </div>
  );
}
