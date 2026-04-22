// Contenu médical — source de vérité éditable.
// Chaque thème = intro rassurante + vidéo (YouTube ID) + questions.
// Textes inspirés des recommandations HAS / pratiques HFME (Hospices Civils de Lyon).
// Les IDs vidéo sont des suggestions francophones publiques : à valider/remplacer par le médecin.

export const THEMES = {
  'voie-basse': {
    id: 'voie-basse',
    title: 'Accouchement par voie basse',
    emoji: '🌸',
    intro:
      "L'accouchement par voie basse est le mode d'accouchement le plus fréquent — environ 80 % des naissances en France. Lorsque la grossesse se déroule bien, l'équipe vous accompagne en respectant le rythme naturel du travail et le bien-être de votre bébé.",
    video: {
      youtubeId: 'Htw5UuAyrlY',
      title: 'Comment se passe un accouchement ?',
      source: 'Chaîne santé publique francophone',
      durationSec: 180
    },
    questions: [
      {
        id: 'voie-basse-souhait',
        type: 'closed',
        prompt: "Concernant le déroulé de l'accouchement, qu'est-ce qui vous ressemble le plus ?",
        options: [
          { value: 'naturel', label: "Je souhaite un accouchement le plus naturel possible" },
          { value: 'confiance', label: "Je fais confiance à l'équipe pour décider au bon moment" },
          { value: 'medicalise', label: "Je préfère un cadre médicalisé dès le départ" }
        ]
      },
      {
        id: 'voie-basse-libre',
        type: 'open',
        prompt: "Y a-t-il quelque chose de particulier que vous souhaiteriez que l'équipe sache ?",
        placeholder: 'Par exemple : une expérience précédente, une émotion, un rituel…',
        optional: true
      }
    ]
  },

  peridurale: {
    id: 'peridurale',
    title: 'Péridurale',
    emoji: '💆',
    intro:
      "La péridurale est l'analgésie la plus efficace pour soulager la douleur des contractions. Elle est posée par un anesthésiste à votre demande, à tout moment du travail. Avec les dosages actuels, vous continuez à sentir les contractions sans avoir mal, et vous pouvez souvent rester mobile.",
    video: {
      youtubeId: 'G3gY9iUPnuE',
      title: "La péridurale, comment ça se passe ?",
      source: 'Sage-femme / CHU',
      durationSec: 180
    },
    questions: [
      {
        id: 'peridurale-souhait',
        type: 'closed',
        prompt: 'Concernant la péridurale, aujourd\'hui vous diriez plutôt :',
        options: [
          { value: 'oui-debut', label: 'Je souhaite une péridurale dès que possible' },
          { value: 'essai-sans', label: "J'aimerais essayer sans, et la demander si j'en ai besoin" },
          { value: 'sans', label: 'Je souhaite accoucher sans péridurale' },
          { value: 'indecise', label: "Je déciderai le jour J selon comment je me sens" }
        ]
      }
    ]
  },

  'douleur-naturelle': {
    id: 'douleur-naturelle',
    title: 'Gestion naturelle de la douleur',
    emoji: '🌿',
    intro:
      "Plusieurs approches non médicamenteuses soulagent la douleur et l'anxiété : respiration, massages, douche ou bain chaud, ballon, position verticale, présence rassurante d'un proche. Elles peuvent être utilisées seules ou en complément de la péridurale.",
    video: {
      youtubeId: 'oNRfa8xQDG8',
      title: "Méthodes non médicamenteuses pour soulager la douleur",
      source: 'Sage-femme',
      durationSec: 180
    },
    questions: [
      {
        id: 'douleur-methodes',
        type: 'multi',
        prompt: 'Quelles approches aimeriez-vous essayer ? (plusieurs choix possibles)',
        options: [
          { value: 'respiration', label: 'Respiration / relaxation' },
          { value: 'massage', label: 'Massages du dos, des épaules' },
          { value: 'eau', label: 'Douche ou bain chaud' },
          { value: 'ballon', label: 'Ballon / position verticale' },
          { value: 'musique', label: 'Musique, ambiance tamisée' },
          { value: 'hypnose', label: "Hypnose / sophrologie (si j'ai été préparée)" }
        ]
      }
    ]
  },

  declenchement: {
    id: 'declenchement',
    title: 'Déclenchement et ocytocine',
    emoji: '⏱️',
    intro:
      "Le déclenchement consiste à provoquer le début du travail, par méthode mécanique ou médicamenteuse (ocytocine). Il est proposé pour des raisons médicales (terme dépassé, santé maternelle ou fœtale). L'équipe adapte le protocole à votre situation et surveille étroitement votre bébé.",
    video: {
      youtubeId: 'jP3FeWqKlyU',
      title: 'Le déclenchement du travail',
      source: 'CHU / sage-femme',
      durationSec: 180
    },
    questions: [
      {
        id: 'declenchement-info',
        type: 'closed',
        prompt: 'Si un déclenchement était nécessaire :',
        options: [
          { value: 'explique', label: "J'aimerais qu'on m'explique étape par étape ce qui se passe" },
          { value: 'confiance', label: "Je fais confiance à l'équipe, l'essentiel me suffit" },
          { value: 'reticence', label: "J'aimerais qu'on discute des alternatives avant" }
        ]
      }
    ]
  },

  episiotomie: {
    id: 'episiotomie',
    title: 'Épisiotomie',
    emoji: '🩺',
    intro:
      "L'épisiotomie est une petite incision du périnée, réalisée uniquement si elle est nécessaire. Depuis les recommandations de la HAS, elle n'est plus systématique : le taux national est passé sous 20 %. L'équipe privilégie la protection naturelle du périnée.",
    video: {
      youtubeId: 'n6kmCyVxAtU',
      title: "L'épisiotomie : pourquoi et dans quels cas ?",
      source: 'Sage-femme',
      durationSec: 180
    },
    questions: [
      {
        id: 'episiotomie-souhait',
        type: 'closed',
        prompt: "Concernant l'épisiotomie :",
        options: [
          { value: 'eviter', label: "Je souhaite qu'elle soit évitée autant que possible" },
          { value: 'confiance', label: "Je fais confiance au jugement médical du moment" },
          { value: 'info', label: "Je souhaite qu'on m'en parle avant, si elle est envisagée" }
        ]
      }
    ]
  },

  cesarienne: {
    id: 'cesarienne',
    title: 'Césarienne',
    emoji: '💗',
    intro:
      "La césarienne est une intervention chirurgicale qui permet de faire naître votre bébé par une incision de l'abdomen. Elle peut être programmée (raison médicale connue avant le terme) ou décidée pendant le travail si votre santé ou celle de votre bébé le nécessite. L'équipe peut vous proposer un peau à peau au bloc dès que possible.",
    video: {
      youtubeId: 'KaPzztBEIyI',
      title: 'Tout savoir sur la césarienne',
      source: 'CHU / obstétrique',
      durationSec: 180
    },
    questions: [
      {
        id: 'cesarienne-accompagnant',
        type: 'closed',
        prompt: 'En cas de césarienne, vous souhaiteriez :',
        options: [
          { value: 'accompagnant-bloc', label: 'Que mon accompagnant soit présent au bloc si possible' },
          { value: 'peau-a-peau-bloc', label: "Un peau à peau avec mon bébé dès le bloc, si c'est possible" },
          { value: 'equipe-decide', label: "Je laisse l'équipe organiser au mieux pour la sécurité" }
        ]
      },
      {
        id: 'cesarienne-libre',
        type: 'open',
        prompt: "Une appréhension ou un souhait particulier concernant la césarienne ?",
        optional: true
      }
    ]
  },

  accompagnant: {
    id: 'accompagnant',
    title: 'Place de l\'accompagnant',
    emoji: '🤝',
    intro:
      "Votre conjoint, votre co-parent ou une personne de confiance peut être présent(e) pendant le travail et l'accouchement. Cette présence est un soutien précieux : parole, massage, hydratation, premiers instants avec bébé. L'équipe s'organise pour lui permettre d'être associé(e) autant que possible.",
    video: {
      youtubeId: 'DK9JHkgMfnk',
      title: "Le rôle du co-parent à la naissance",
      source: 'Sage-femme',
      durationSec: 180
    },
    questions: [
      {
        id: 'accompagnant-presence',
        type: 'closed',
        prompt: 'Qui souhaitez-vous à vos côtés pendant le travail ?',
        options: [
          { value: 'partenaire', label: 'Mon/ma partenaire' },
          { value: 'proche', label: 'Un proche (mère, sœur, ami·e…)' },
          { value: 'personne', label: 'Je préfère être seule avec l\'équipe' },
          { value: 'indecise', label: 'Je ne sais pas encore' }
        ]
      },
      {
        id: 'accompagnant-role',
        type: 'open',
        prompt: "Y a-t-il un rôle particulier que vous aimeriez lui confier ?",
        placeholder: 'Couper le cordon, me masser, filmer, être près de moi…',
        optional: true
      }
    ]
  },

  'peau-a-peau': {
    id: 'peau-a-peau',
    title: 'Peau à peau et première tétée',
    emoji: '👶',
    intro:
      "Le peau à peau immédiat, pendant au moins une heure, aide votre bébé à se réchauffer, à réguler sa respiration et son rythme cardiaque, et favorise l'attachement comme l'allaitement. Il est proposé après une naissance par voie basse, et dès que possible après une césarienne.",
    video: {
      youtubeId: 'nEkrBHLjADQ',
      title: 'Les bénéfices du peau à peau',
      source: 'Santé publique / CHU',
      durationSec: 180
    },
    questions: [
      {
        id: 'peau-a-peau-souhait',
        type: 'closed',
        prompt: 'Le peau à peau, pour vous :',
        options: [
          { value: 'immediat', label: 'Je souhaite un peau à peau immédiat et prolongé' },
          { value: 'partage', label: "J'aimerais que mon/ma partenaire puisse aussi en faire" },
          { value: 'flexible', label: "Je verrai selon comment je me sens" }
        ]
      },
      {
        id: 'allaitement',
        type: 'closed',
        prompt: "Concernant l'alimentation de votre bébé :",
        options: [
          { value: 'allaitement', label: 'Je souhaite allaiter' },
          { value: 'biberon', label: 'Je souhaite donner le biberon' },
          { value: 'mixte', label: 'Je souhaite un allaitement mixte' },
          { value: 'indecise', label: 'Je ne suis pas encore décidée' }
        ]
      }
    ]
  },

  monitoring: {
    id: 'monitoring',
    title: 'Monitoring',
    emoji: '💓',
    intro:
      "Le monitoring enregistre le rythme cardiaque de votre bébé et vos contractions. Selon votre situation, il peut être continu ou intermittent. Les appareils modernes, souvent sans fil, vous permettent de garder une certaine mobilité pendant le travail.",
    video: {
      youtubeId: 'xkFQpQDjWSU',
      title: 'Le monitoring pendant le travail',
      source: 'Sage-femme',
      durationSec: 180
    },
    questions: [
      {
        id: 'monitoring-mobilite',
        type: 'closed',
        prompt: 'Pendant le travail, je souhaite :',
        options: [
          { value: 'mobile', label: 'Rester mobile autant que possible' },
          { value: 'allongee', label: "Rester allongée me rassure davantage" },
          { value: 'mixte', label: 'Alterner selon mon ressenti' }
        ]
      }
    ]
  },

  'parcours-essentiel': {
    id: 'parcours-essentiel',
    title: 'Pour finir',
    emoji: '💜',
    intro:
      "Dernières questions pour personnaliser votre projet. Elles aideront l'équipe à vous accueillir au mieux le jour J.",
    video: null,
    questions: [
      {
        id: 'peurs',
        type: 'open',
        prompt: 'Quelles sont vos principales peurs ou appréhensions ?',
        placeholder: "Ne les gardez pas pour vous : l'équipe est là pour vous rassurer.",
        optional: false
      },
      {
        id: 'souhaits-forts',
        type: 'open',
        prompt: "S'il y a UNE chose à retenir de votre projet, c'est…",
        placeholder: 'Un souhait fort, une valeur qui vous tient à cœur.',
        optional: false
      }
    ]
  }
};
