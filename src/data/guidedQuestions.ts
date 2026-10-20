import { GuidedQuestion } from '../types';

export const GUIDED_QUESTIONS: GuidedQuestion[] = [
  // 1. Fe en las pruebas (3 preguntas)
  {
    id: 'q1',
    category: 'fe_en_las_pruebas',
    categoryLabel: 'Fe en las Pruebas',
    question: '¿Hubo algún momento de profunda oscuridad donde sentiste que no podías más, y cómo sostuvo Dios tu fe?',
    gentleHint: 'Tómate un respiro. No necesitas contar todo el dolor; solo cuéntale a un joven cómo experimentaste la paz de Dios que sobrepasa todo entendimiento.',
    anchorVerse: {
      reference: 'Salmo 46:1',
      text: 'Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.'
    }
  },
  {
    id: 'q2',
    category: 'fe_en_las_pruebas',
    categoryLabel: 'Fe en las Pruebas',
    question: '¿Qué le dirías hoy a un joven que siente que sus oraciones no están siendo respondidas?',
    gentleHint: 'Háblale con el corazón de abuelo o abuela, recordando alguna ocasión en la que la espera valió la pena.',
    anchorVerse: {
      reference: 'Lamentaciones 3:25-26',
      text: 'Bueno es el Señor a los que en él esperan, al alma que le busca. Bueno es esperar en silencio la salvación del Señor.'
    }
  },
  {
    id: 'q3',
    category: 'fe_en_las_pruebas',
    categoryLabel: 'Fe en las Pruebas',
    question: '¿Cómo mantuviste viva tu comunión con Dios durante las pérdidas más difíciles de tu vida?',
    gentleHint: 'Comparte el versículo o el cántico que te acompañó en las noches de soledad.',
    anchorVerse: {
      reference: 'Habacuc 3:17-18',
      text: 'Aunque la higuera no florezca, ni en las vides haya frutos... con todo, yo me alegraré en el Señor, y me gozaré en el Dios de mi salvación.'
    }
  },

  // 2. Familia (3 preguntas)
  {
    id: 'q4',
    category: 'familia',
    categoryLabel: 'Familia',
    question: '¿Cómo intercediste por tus hijos o nietos cuando se alejaron de la iglesia o pasaron por momentos rebeldes?',
    gentleHint: 'Los padres jóvenes y los nietos necesitan escuchar la perseverancia de tus rodillas en oración.',
    anchorVerse: {
      reference: 'Proverbios 22:6',
      text: 'Instruye al niño en su camino, y aun cuando fuere viejo no se apartará de él.'
    }
  },
  {
    id: 'q5',
    category: 'familia',
    categoryLabel: 'Familia',
    question: '¿Cuál ha sido el secreto de Dios para mantener el amor y la paz en tu matrimonio a lo largo de las décadas?',
    gentleHint: 'Cuéntanos una lección sobre paciencia, conversación o humildad que aprendiste junto a tu cónyuge.',
    anchorVerse: {
      reference: 'Efesios 4:2-3',
      text: 'Con toda humildad y mansedumbre, soportándoos con paciencia los unos a los otros en amor, solícitos en guardar la unidad del Espíritu.'
    }
  },
  {
    id: 'q6',
    category: 'familia',
    categoryLabel: 'Familia',
    question: '¿Qué tradición de fe o momento espiritual familiar te gustaría que tus tataranietos sigan practicando?',
    gentleHint: 'Puede ser la bendición en la mesa, la lectura nocturna de la Biblia o el agradecimiento del domingo.',
    anchorVerse: {
      reference: 'Salmo 78:4',
      text: 'No los encubriremos a sus hijos, contando a la generación venidera las alabanzas del Señor, y su potencia, y las maravillas que hizo.'
    }
  },

  // 3. Perdón (2 preguntas)
  {
    id: 'q7',
    category: 'perdon',
    categoryLabel: 'Perdón',
    question: '¿Alguna vez tuviste que perdonar una herida profunda que parecía imposible de sanar? ¿Cómo te ayudó el Espíritu Santo?',
    gentleHint: 'El perdón no justifica lo ocurrido, pero rompe las cadenas. Comparte la libertad que experimentaste.',
    anchorVerse: {
      reference: 'Colosenses 3:13',
      text: 'Soportándoos unos a otros, y perdonándoos unos a otros si alguno tuviere queja contra otro. De la manera que Cristo os perdonó, así también hacedlo vosotros.'
    }
  },
  {
    id: 'q8',
    category: 'perdon',
    categoryLabel: 'Perdón',
    question: '¿Cómo experimentaste la gracia de Dios cuando fuiste tú quien cometió un grave error y necesitaste Su perdón?',
    gentleHint: 'Los jóvenes a menudo cargan culpa paralizante. Tu historia les mostrará que la misericordia de Dios es nueva cada mañana.',
    anchorVerse: {
      reference: '1 Juan 1:9',
      text: 'Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad.'
    }
  },

  // 4. Llamado y Salvación (3 preguntas)
  {
    id: 'q9',
    category: 'llamado',
    categoryLabel: 'Llamado y Salvación',
    question: '¿Cómo y dónde conociste a Cristo por primera vez, y qué cambió en tu vida desde ese día?',
    gentleHint: 'Recuerda el lugar, quién te habló de Jesús o el momento exacto en que tu corazón se rindió a su amor.',
    anchorVerse: {
      reference: '2 Corintios 5:17',
      text: 'De modo que si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron; he aquí todas son hechas nuevas.'
    }
  },
  {
    id: 'q10',
    category: 'llamado',
    categoryLabel: 'Llamado y Salvación',
    question: '¿Cuándo sentiste claramente que Dios te pedía servirle en tu iglesia o comunidad, y cómo venciste el temor?',
    gentleHint: 'Quizás empezaste limpiando bancas, enseñando a niños o visitando enfermos. Cuéntanos cómo Dios te respaldó.',
    anchorVerse: {
      reference: 'Isaías 6:8',
      text: 'Después oí la voz del Señor, que decía: ¿A quién enviaré, y quién irá por nosotros? Entonces respondí yo: Heme aquí, envíame a mí.'
    }
  },
  {
    id: 'q11',
    category: 'llamado',
    categoryLabel: 'Llamado y Salvación',
    question: '¿Qué consejo le darías a un joven que está buscando el propósito de Dios para su carrera o vocación?',
    gentleHint: 'Comparte cómo Dios usó tus dones cotidianos más allá de las cuatro paredes del templo.',
    anchorVerse: {
      reference: 'Proverbios 3:5-6',
      text: 'Fíate del Señor de todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.'
    }
  },

  // 5. Sanidad (2 preguntas)
  {
    id: 'q12',
    category: 'sanidad',
    categoryLabel: 'Sanidad Divina y Emocional',
    question: '¿Cuándo viste a Dios obrar un milagro de sanidad física en ti o en un ser querido?',
    gentleHint: 'Describe con sencillez lo que los médicos decían y cómo la iglesia y la familia oraron con fe.',
    anchorVerse: {
      reference: 'Santiago 5:15',
      text: 'Y la oración de fe salvará al enfermo, y el Señor lo levantará; y si hubiere cometido pecados, le serán perdonados.'
    }
  },
  {
    id: 'q13',
    category: 'sanidad',
    categoryLabel: 'Sanidad Divina y Emocional',
    question: 'En momentos de enfermedad prolongada o debilidad física, ¿de qué manera encontraste la gracia sustentadora de Dios?',
    gentleHint: 'Aun cuando la respuesta no fue inmediata, cuéntanos cómo el Señor fue tu fortaleza interior.',
    anchorVerse: {
      reference: '2 Corintios 12:9',
      text: 'Y me ha dicho: Bástate mi gracia; porque mi poder se perfecciona en la debilidad.'
    }
  },

  // 6. Provisión (2 preguntas)
  {
    id: 'q14',
    category: 'provision',
    categoryLabel: 'Provisión Milagrosa',
    question: '¿Recuerdas alguna ocasión en que no había nada en la mesa o no alcanzaba el dinero, y Dios proveyó de forma inesperada?',
    gentleHint: 'Los jóvenes hoy enfrentan mucha ansiedad económica. Tu memoria de la fidelidad de Dios les dará descanso.',
    anchorVerse: {
      reference: 'Filipenses 4:19',
      text: 'Mi Dios, pues, suplirá todo lo que os falta conforme a sus riquezas en gloria en Cristo Jesús.'
    }
  },
  {
    id: 'q15',
    category: 'provision',
    categoryLabel: 'Provisión Milagrosa',
    question: '¿Cómo aprendiste a ser generoso y dar con gozo aun en tiempos de escasez?',
    gentleHint: 'Comparte la alegría de haber visto cómo al sembrar en el reino de Dios nunca te faltó lo necesario.',
    anchorVerse: {
      reference: 'Malaquías 3:10',
      text: 'Probadme ahora en esto, dice el Señor de los ejércitos, si no os abriré las ventanas de los cielos, y derramaré sobre vosotros bendición hasta que sobreabunde.'
    }
  }
];

export const CATEGORY_LABELS: Record<string, string> = {
  all: 'Todos los Testimonios',
  fe_en_las_pruebas: 'Fe en las Pruebas',
  familia: 'Familia',
  perdon: 'Perdón',
  llamado: 'Llamado',
  sanidad: 'Sanidad',
  provision: 'Provisión'
};
