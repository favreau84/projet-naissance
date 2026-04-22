import styles from './ThemeIntro.module.css';

export default function ThemeIntro({ theme }) {
  return (
    <section className={styles.intro}>
      {theme.emoji && <div className={styles.emoji} aria-hidden>{theme.emoji}</div>}
      <h1 className={styles.title}>{theme.title}</h1>
      <p className={styles.text}>{theme.intro}</p>
    </section>
  );
}
