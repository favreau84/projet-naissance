import styles from './ClosedQuestion.module.css';

export default function ClosedQuestion({ question, value, onChange }) {
  const { prompt, options, type } = question;
  const multi = type === 'multi';

  const selected = multi ? (Array.isArray(value) ? value : []) : value;

  const handleSelect = (optValue) => {
    if (multi) {
      const next = selected.includes(optValue)
        ? selected.filter((v) => v !== optValue)
        : [...selected, optValue];
      onChange(next);
    } else {
      onChange(optValue);
    }
  };

  const isSelected = (v) => (multi ? selected.includes(v) : selected === v);

  return (
    <fieldset className={styles.group}>
      <legend className={styles.prompt}>{prompt}</legend>
      <div className={styles.options}>
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`${styles.option} ${isSelected(opt.value) ? styles.selected : ''}`}
            onClick={() => handleSelect(opt.value)}
            aria-pressed={isSelected(opt.value)}
          >
            <span className={styles.bullet} aria-hidden>
              {isSelected(opt.value) ? '●' : '○'}
            </span>
            <span>{opt.label}</span>
          </button>
        ))}
      </div>
      {multi && (
        <p className={styles.hint}>Vous pouvez sélectionner plusieurs réponses.</p>
      )}
    </fieldset>
  );
}
