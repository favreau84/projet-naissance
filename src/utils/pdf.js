import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { createElement, Fragment } from 'react';
import { THEMES } from '../content/themes.js';
import { JOURNEY_STEPS } from '../content/journey.js';
import { CLINIC_NAME, DOCTOR_NAME } from '../content/config.js';

const styles = StyleSheet.create({
  page: {
    padding: 28,
    fontSize: 9.5,
    fontFamily: 'Helvetica',
    color: '#2A1F3D',
    backgroundColor: '#ffffff'
  },
  header: {
    borderBottom: '1pt solid #E8DFF3',
    paddingBottom: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  title: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: '#6B4E8C'
  },
  subtitle: {
    fontSize: 9,
    color: '#6F6585',
    marginTop: 2
  },
  meta: {
    fontSize: 8.5,
    color: '#6F6585',
    textAlign: 'right'
  },
  metaStrong: {
    color: '#2A1F3D',
    fontFamily: 'Helvetica-Bold'
  },
  section: {
    marginBottom: 8
  },
  sectionTitle: {
    fontSize: 10.5,
    fontFamily: 'Helvetica-Bold',
    color: '#6B4E8C',
    marginBottom: 3,
    borderBottom: '0.5pt dashed #B9A3D4',
    paddingBottom: 2
  },
  answerRow: {
    marginBottom: 3
  },
  q: {
    fontSize: 8,
    color: '#6F6585'
  },
  a: {
    fontSize: 9.5,
    color: '#2A1F3D',
    marginTop: 1
  },
  aEmpty: {
    color: '#B9A3D4',
    fontStyle: 'italic'
  },
  aOpen: {
    fontStyle: 'italic',
    color: '#55407A'
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 28,
    right: 28,
    borderTop: '1pt solid #E8DFF3',
    paddingTop: 6,
    fontSize: 7.5,
    color: '#6F6585'
  }
});

function formatAnswer(question, value) {
  if (value == null || value === '') return { text: 'Sans réponse', empty: true };
  if (question.type === 'open') return { text: `« ${value} »`, open: true };
  if (question.type === 'multi') {
    const labels = (value || [])
      .map((v) => question.options.find((o) => o.value === v)?.label)
      .filter(Boolean);
    return { text: labels.join(' · ') || 'Sans réponse', empty: labels.length === 0 };
  }
  const opt = question.options.find((o) => o.value === value);
  return { text: opt?.label ?? String(value) };
}

function BirthPlanDocument({ answers, patientCode }) {
  const dateStr = new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return createElement(
    Document,
    { title: 'Projet de naissance', author: DOCTOR_NAME },
    createElement(
      Page,
      { size: 'A4', style: styles.page },
      createElement(
        View,
        { style: styles.header },
        createElement(
          View,
          null,
          createElement(Text, { style: styles.title }, 'Projet de naissance'),
          createElement(Text, { style: styles.subtitle }, `${CLINIC_NAME} · ${DOCTOR_NAME}`)
        ),
        createElement(
          View,
          { style: styles.meta },
          createElement(
            Text,
            null,
            'Code : ',
            createElement(Text, { style: styles.metaStrong }, patientCode ?? '—')
          ),
          createElement(Text, null, `Édité le ${dateStr}`)
        )
      ),

      ...JOURNEY_STEPS.map((themeId) => {
        const theme = THEMES[themeId];
        if (!theme) return null;
        return createElement(
          View,
          { key: themeId, style: styles.section, wrap: false },
          createElement(
            Text,
            { style: styles.sectionTitle },
            `${theme.emoji ?? ''} ${theme.title}`.trim()
          ),
          ...theme.questions.map((q) => {
            const a = formatAnswer(q, answers[q.id]);
            return createElement(
              View,
              { key: q.id, style: styles.answerRow },
              createElement(Text, { style: styles.q }, q.prompt),
              createElement(
                Text,
                {
                  style: [styles.a, a.empty && styles.aEmpty, a.open && styles.aOpen].filter(
                    Boolean
                  )
                },
                a.text
              )
            );
          })
        );
      }),

      createElement(
        Text,
        { style: styles.footer, fixed: true },
        `Document généré depuis l'application Projet de naissance — ${DOCTOR_NAME}. Ce projet est une base de dialogue : l'équipe s'adapte en temps réel à votre situation le jour J.`
      )
    )
  );
}

export async function generateBirthPlanPdf({ answers, patientCode }) {
  const doc = createElement(BirthPlanDocument, { answers, patientCode });
  const blob = await pdf(doc).toBlob();
  return blob;
}

export function pdfFileName(patientCode) {
  const safe = (patientCode || 'sans-code').replace(/[^a-zA-Z0-9_-]/g, '');
  return `projet-naissance-${safe}.pdf`;
}
