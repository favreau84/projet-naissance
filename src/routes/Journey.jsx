import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import StepLayout from '../components/StepLayout.jsx';
import ThemeIntro from '../components/ThemeIntro.jsx';
import VideoEmbed from '../components/VideoEmbed.jsx';
import ClosedQuestion from '../components/ClosedQuestion.jsx';
import OpenQuestion from '../components/OpenQuestion.jsx';
import { useBirthPlan } from '../state/BirthPlanContext.jsx';
import { JOURNEY_STEPS } from '../content/journey.js';
import { THEMES } from '../content/themes.js';

function isAnswered(question, value) {
  if (question.optional) return true;
  if (question.type === 'multi') return Array.isArray(value) && value.length > 0;
  if (question.type === 'open') return typeof value === 'string' && value.trim().length > 0;
  return value != null && value !== '';
}

export default function Journey() {
  const { step } = useParams();
  const navigate = useNavigate();
  const { answers, setAnswer } = useBirthPlan();

  const index = Number.parseInt(step, 10);
  const total = JOURNEY_STEPS.length;

  useEffect(() => {
    // Scroll top à chaque changement d'étape
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [index]);

  if (Number.isNaN(index) || index < 0 || index >= total) {
    return (
      <div className="container">
        <h2>Étape introuvable</h2>
        <button className="btn btn-primary" onClick={() => navigate('/journey/0')}>
          Reprendre au début
        </button>
      </div>
    );
  }

  const themeId = JOURNEY_STEPS[index];
  const theme = THEMES[themeId];

  const allAnswered = theme.questions.every((q) => isAnswered(q, answers[q.id]));
  const isLast = index === total - 1;

  const goNext = () => {
    if (isLast) navigate('/preview');
    else navigate(`/journey/${index + 1}`);
  };
  const goBack = () => {
    if (index === 0) navigate('/');
    else navigate(`/journey/${index - 1}`);
  };

  return (
    <StepLayout
      progress={{ current: index + 1, total }}
      onBack={goBack}
      onNext={goNext}
      nextDisabled={!allAnswered}
      nextLabel={isLast ? 'Voir mon projet' : 'Continuer'}
    >
      <ThemeIntro theme={theme} />

      {theme.video && (
        <div>
          <VideoEmbed youtubeId={theme.video.youtubeId} title={theme.video.title} />
          <p
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              margin: '8px 0 0',
              fontStyle: 'italic'
            }}
          >
            {theme.video.title} · {theme.video.source}
          </p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {theme.questions.map((q) =>
          q.type === 'open' ? (
            <OpenQuestion
              key={q.id}
              question={q}
              value={answers[q.id]}
              onChange={(v) => setAnswer(q.id, v)}
            />
          ) : (
            <ClosedQuestion
              key={q.id}
              question={q}
              value={answers[q.id]}
              onChange={(v) => setAnswer(q.id, v)}
            />
          )
        )}
      </div>
    </StepLayout>
  );
}
