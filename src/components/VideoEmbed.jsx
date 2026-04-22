import styles from './VideoEmbed.module.css';

export default function VideoEmbed({ youtubeId, title }) {
  if (!youtubeId) return null;
  // Domaine nocookie : meilleur respect RGPD, pas de cookies tant que la vidéo n'est pas lue.
  const src = `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`;
  return (
    <div className={styles.wrapper}>
      <iframe
        className={styles.iframe}
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
