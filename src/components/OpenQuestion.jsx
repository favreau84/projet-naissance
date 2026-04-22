import styles from './OpenQuestion.module.css';

export default function OpenQuestion({ question, value, onChange }) {
  return (
    <label className={styles.group}>
      <span className={styles.prompt}>
        {question.prompt}
        {question.optional && <span className={styles.optional}> (facultatif)</span>}
      </span>
      <textarea
        className={styles.textarea}
        rows={4}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder ?? 'Écrivez librement…'}
      />
    </label>
  );
}
