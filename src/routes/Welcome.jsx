import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBirthPlan } from '../state/BirthPlanContext.jsx';
import { APP_TAGLINE, CLINIC_NAME } from '../content/config.js';
import styles from './Welcome.module.css';

export default function Welcome() {
  const { code } = useParams();
  const navigate = useNavigate();
  const { setPatientCode } = useBirthPlan();

  useEffect(() => {
    if (code) setPatientCode(code);
  }, [code, setPatientCode]);

  return (
    <div className={`${styles.wrapper} fade-in`}>
      <div className={styles.hero}>
        <div className={styles.badge} aria-hidden>
          💜
        </div>
        <h1 className={styles.title}>Projet de naissance</h1>
        <p className={styles.tagline}>{APP_TAGLINE}</p>
      </div>

      <div className={styles.card}>
        <p className={styles.info}>
          Ce parcours dure environ <strong>10 minutes</strong>. Vous pouvez l'interrompre à tout
          moment et le reprendre plus tard&nbsp;: vos réponses sont conservées sur cet appareil.
        </p>
        {code && (
          <p className={styles.codeLine}>
            Code&nbsp;: <strong>{code}</strong>
          </p>
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate('/journey/0')}
        >
          Commencer
        </button>
      </div>

      <p className={styles.footer}>
        {CLINIC_NAME}
      </p>
    </div>
  );
}
