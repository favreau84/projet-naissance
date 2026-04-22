import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBirthPlan } from '../state/BirthPlanContext.jsx';
import { generateBirthPlanPdf, pdfFileName } from '../utils/pdf.js';
import { sharePdf, downloadBlob, openMailTo } from '../utils/share.js';
import { CLINIC_EMAIL } from '../content/config.js';
import styles from './Share.module.css';

export default function Share() {
  const navigate = useNavigate();
  const { answers, patientCode } = useBirthPlan();
  const [status, setStatus] = useState('idle'); // idle | generating | done | error
  const [method, setMethod] = useState(null);
  const [error, setError] = useState(null);

  const handleShare = async () => {
    setStatus('generating');
    setError(null);
    try {
      const blob = await generateBirthPlanPdf({ answers, patientCode });
      const fileName = pdfFileName(patientCode);
      const res = await sharePdf({ blob, fileName, patientCode });
      setMethod(res.method);
      setStatus('done');
    } catch (err) {
      console.error(err);
      setError(err?.message ?? 'Erreur inattendue');
      setStatus('error');
    }
  };

  const handleDownloadOnly = async () => {
    setStatus('generating');
    try {
      const blob = await generateBirthPlanPdf({ answers, patientCode });
      downloadBlob(blob, pdfFileName(patientCode));
      setStatus('done');
      setMethod('download');
    } catch (err) {
      setError(err?.message ?? 'Erreur inattendue');
      setStatus('error');
    }
  };

  return (
    <div className={`${styles.wrapper} fade-in`}>
      <header className={styles.head}>
        <button type="button" className="btn-ghost" onClick={() => navigate(-1)}>
          ← Retour
        </button>
        <h1 className={styles.title}>Partager votre projet</h1>
        <p className={styles.subtitle}>
          Nous allons générer un PDF d'une page que vous pourrez envoyer à l'équipe
          ({CLINIC_EMAIL}).
        </p>
      </header>

      <div className={styles.card}>
        {status === 'idle' && (
          <>
            <p className={styles.explain}>
              Au clic, votre téléphone proposera Mail (ou une autre app) avec le PDF en pièce
              jointe. Sur ordinateur, le PDF sera téléchargé et votre client mail s'ouvrira.
            </p>
            <button type="button" className="btn btn-primary" onClick={handleShare}>
              📤 Envoyer à mon équipe
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleDownloadOnly}>
              Télécharger le PDF uniquement
            </button>
          </>
        )}

        {status === 'generating' && (
          <p className={styles.explain}>⏳ Génération du PDF en cours…</p>
        )}

        {status === 'done' && (
          <>
            <p className={styles.success}>
              ✅ {method === 'web-share'
                ? 'Votre PDF a été partagé. Finalisez l\'envoi dans l\'application choisie.'
                : method === 'cancelled'
                  ? 'Partage annulé. Vous pouvez réessayer quand vous voulez.'
                  : method === 'download'
                    ? 'PDF téléchargé.'
                    : 'PDF téléchargé et votre client mail s\'est ouvert. Pensez à attacher le PDF au message.'}
            </p>
            <button type="button" className="btn btn-secondary" onClick={handleShare}>
              Renvoyer
            </button>
            <button type="button" className="btn-ghost" onClick={() => openMailTo({ patientCode })}>
              Rouvrir le mail pré-rempli
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <p className={styles.error}>⚠️ {error}</p>
            <button type="button" className="btn btn-primary" onClick={handleShare}>
              Réessayer
            </button>
          </>
        )}
      </div>

      <p className={styles.privacy}>
        Vos réponses sont conservées uniquement sur votre appareil. Elles ne quittent pas votre
        téléphone tant que vous n'envoyez pas le document.
      </p>
    </div>
  );
}
