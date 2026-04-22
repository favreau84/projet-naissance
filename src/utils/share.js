import { CLINIC_EMAIL, CLINIC_NAME } from '../content/config.js';

const MAIL_SUBJECT = 'Projet de naissance';

function buildMailBody({ patientCode }) {
  return `Bonjour,

Vous trouverez ci-joint mon projet de naissance (code patiente ${patientCode ?? '—'}).

Merci de le transmettre à l'équipe de la salle de naissance.

Belle journée,`;
}

// Déclenche un téléchargement pour un Blob donné.
export function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Ouvre le client mail par défaut pré-rempli (fallback : la patiente attache le PDF elle-même).
export function openMailTo({ patientCode }) {
  const subject = encodeURIComponent(MAIL_SUBJECT);
  const body = encodeURIComponent(buildMailBody({ patientCode }));
  const href = `mailto:${CLINIC_EMAIL}?subject=${subject}&body=${body}`;
  window.location.href = href;
}

// Stratégie principale : Web Share API Level 2 avec fichier.
// Si indisponible ou échec → téléchargement + ouverture mailto en fallback.
export async function sharePdf({ blob, fileName, patientCode }) {
  const file = new File([blob], fileName, { type: 'application/pdf' });

  const shareData = {
    title: MAIL_SUBJECT,
    text: `Projet de naissance — ${CLINIC_NAME}`,
    files: [file]
  };

  if (navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return { method: 'web-share' };
    } catch (err) {
      if (err?.name === 'AbortError') return { method: 'cancelled' };
      // Sinon fallback
    }
  }

  downloadBlob(blob, fileName);
  openMailTo({ patientCode });
  return { method: 'download+mailto' };
}
