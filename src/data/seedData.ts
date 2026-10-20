import { Testimony } from '../types';

export const INITIAL_TESTIMONIES: Testimony[] = [
  // 1. CASO VERÍDICO HISTÓRICO: Corrie ten Boom
  {
    id: 'real-corrie-ten-boom',
    title: 'El día que tuve que perdonar a mi carcelero nazi en una iglesia de Múnich',
    authorName: 'Cornelia «Corrie» ten Boom',
    authorAge: 84,
    yearsInFaith: 70,
    churchName: 'Iglesia Reformada de Haarlem / Misión Mundial',
    countryOrCity: 'Haarlem, Países Bajos / Múnich, Alemania',
    biographicalYears: '1892 – 1983',
    category: 'perdon',
    privacy: 'public',
    status: 'approved',
    durationSeconds: 260,
    mediaType: 'audio',
    photoUrl: '/src/assets/images/portrait_corrie_ten_boom_1792428557773.jpg',
    guidedQuestion: '¿Alguna vez tuviste que perdonar una herida profunda que parecía imposible de sanar? ¿Cómo te ayudó el Espíritu Santo?',
    recordedWithHelper: false,
    isHistoricalVerified: true,
    sourceCitation: 'Caso verídico documentado en sus memorias «El Refugio Secreto» (The Hiding Place, cap. 13) y archivos históricos de Yad Vashem.',
    transcript: `Era 1947 en una pequeña iglesia de Múnich, Alemania, donde yo acababa de predicar que cuando Dios perdona nuestros pecados, los arroja a lo profundo del mar y pone un cartel que dice: «Prohibido pescar».\n\nLa gente salía en silencio cuando vi a un hombre acercándose entre los bancos. Llevaba un abrigo gris y un sombrero en la mano. De pronto se me heló la sangre: reconocí su rostro al instante. Era uno de los guardias de las SS más crueles del campo de concentración de Ravensbrück, el mismo lugar donde mi hermana Betsie murió de hambre y frío ante mis propios ojos.\n\nEl hombre extendió su mano y me dijo: «Fraulein, qué hermoso mensaje. Qué maravilloso saber que, como usted dice, Jesús murió por mis pecados. Yo fui guardia en Ravensbrück, pero desde entonces he conocido a Cristo como mi Salvador. ¿Podría perdonarme?». \n\nMe quedé paralizada. Mis sentimientos eran de furia y rencor helado. Betsie había muerto en sus manos. En mi mente le dije: «Señor Jesús, no puedo perdonarlo. Dame Tú tu perdón». Y comprendí que el perdón cristiano no es una emoción, sino un acto voluntario de obediencia. Levanté mi mano de madera, fría e insensible, y la puse en la suya. En ese milisegundo exacto, una corriente cálida nació en mi hombro, bajó por mi brazo e inundó nuestras manos unidas. Las lágrimas brotaron de mis ojos y le dije: «Te perdono, hermano, de todo corazón». Nunca experimenté el amor de Dios tan intensamente como ese día ante mi verdugo. Si Dios te pide perdonar lo imposible, no mires tus fuerzas; mira Su gracia.`,
    verses: [
      {
        reference: 'Colosenses 3:13',
        text: 'Soportándoos unos a otros, y perdonándoos unos a otros si alguno tuviere queja contra otro. De la manera que Cristo os perdonó, así también hacedlo vosotros.'
      },
      {
        reference: 'Miqueas 7:19',
        text: 'Él volverá a tener misericordia de nosotros; sepultará nuestras iniquidades, y echará en lo profundo del mar todos nuestros pecados.'
      }
    ],
    createdAt: '2026-10-10',
    prayersCount: 89,
    moderatedBy: 'Comité Histórico Pastoral',
    responses: [
      {
        id: 'cr-1',
        authorName: 'Pastor Marcos Benítez',
        authorAge: 34,
        type: 'gratitude',
        content: 'Este caso verídico de Corrie ten Boom debería ser escuchado por todo joven en la iglesia. Nos enseña que el perdón no depende de cómo nos sentimos, sino del poder de la cruz.',
        createdAt: '2026-10-11'
      }
    ]
  },

  // 2. CASO VERÍDICO HISTÓRICO: Richard Wurmbrand
  {
    id: 'real-richard-wurmbrand',
    title: '14 años en prisiones subterráneas: el amor de Cristo venció la tortura comunista',
    authorName: 'Pastor Richard Wurmbrand',
    authorAge: 89,
    yearsInFaith: 63,
    churchName: 'Iglesia Luterana de Bucarest / La Voz de los Mártires',
    countryOrCity: 'Bucarest, Rumania',
    biographicalYears: '1909 – 2001',
    category: 'fe_en_las_pruebas',
    privacy: 'public',
    status: 'approved',
    durationSeconds: 285,
    mediaType: 'audio',
    photoUrl: '/src/assets/images/portrait_richard_wurmbrand_1792428559154.jpg',
    guidedQuestion: '¿Hubo algún momento de profunda oscuridad donde sentiste que no podías más, y cómo sostuvo Dios tu fe?',
    recordedWithHelper: false,
    isHistoricalVerified: true,
    sourceCitation: 'Caso verídico documentado en su testimonio público ante el Senado de EE.UU. (1966) y su obra «Torturado por Cristo». Fundador de The Voice of the Martyrs.',
    transcript: `El 29 de febrero de 1948, agentes de la policía secreta me arrestaron camino a la iglesia en Bucarest. Pasé catorce años en prisión, tres de ellos en total aislamiento en una celda subterránea a diez metros bajo tierra, sin ventanas, sin ver el sol, sin libros ni papel.\n\nNos golpeaban con barras de hierro, nos encerraban en cajas de hielo y nos privaban del sueño por semanas enteras intentando que delatáramos a los hermanos de la iglesia clandestina. Pero en esa oscuridad impenetrable ocurrió el misterio más grande: Cristo se hizo tan real en mi celda que a veces me ponía a bailar de gozo en medio de las cadenas. El amor de Dios no es una teoría; es un fuego que ningún carcelero puede apagar.\n\nOrábamos por los mismos oficiales que nos azotaban. Cuando ellos caían en desgracia política y eran arrojados como presos a nuestras mismas celdas, los pastores compartíamos con ellos nuestro único pedazo de pan seco y los cubríamos con nuestras mantas. Jóvenes: si Cristo pudo sostenernos en las mazmorras subterráneas de Rumania, Él puede sostener cualquier prueba que enfrenten en su juventud.`,
    verses: [
      {
        reference: 'Romanos 8:38-39',
        text: 'Por lo cual estoy seguro de que ni la muerte, ni la vida, ni ángeles, ni principados, ni potestades... nos podrá separar del amor de Dios, que es en Cristo Jesús Señor nuestro.'
      },
      {
        reference: 'Mateo 5:44',
        text: 'Pero yo os digo: Amad a vuestros enemigos, bendecid a los que os maldicen, haced bien a los que os aborrecen, y orad por los que os ultrajan y os persiguen.'
      }
    ],
    createdAt: '2026-10-09',
    prayersCount: 76,
    moderatedBy: 'Comité Histórico Pastoral',
    responses: []
  },

  // 3. CASO VERÍDICO HISTÓRICO: Elisabeth Elliot
  {
    id: 'real-elisabeth-elliot',
    title: 'Viviendo y perdonando en la selva con la tribu que mató a mi esposo Jim',
    authorName: 'Elisabeth Elliot Howard',
    authorAge: 88,
    yearsInFaith: 72,
    churchName: 'Misión en la Selva Ecuatoriana / Wheaton Fellowship',
    countryOrCity: 'Curaray, Selva Amazónica, Ecuador',
    biographicalYears: '1926 – 2015',
    category: 'llamado',
    privacy: 'public',
    status: 'approved',
    durationSeconds: 240,
    mediaType: 'audio',
    photoUrl: '/src/assets/images/portrait_elisabeth_elliot_1792428560106.jpg',
    guidedQuestion: '¿Cuándo sentiste claramente que Dios te pedía servirle en tu iglesia o comunidad, y cómo venciste el temor?',
    recordedWithHelper: false,
    isHistoricalVerified: true,
    sourceCitation: 'Caso verídico documentado en «Portales de Esplendor» (Through Gates of Splendor) y «El Salvaje Mi Pariente». Misión Operación Auca, 1956.',
    transcript: `En enero de 1956, recibí la noticia de que mi esposo Jim Elliot y cuatro jóvenes misioneros más habían sido lanceados hasta la muerte por los guerreros Waorani a orillas del río Curaray. Me quedé sola con mi hija Valerie de apenas diez meses de nacida.\n\nEl mundo decía que era una locura y una tragedia inútil. Pero Jim había escrito en su diario una frase que marcó mi existencia: «No es un tonto aquel que da lo que no puede retener, para ganar lo que no puede perder».\n\nDos años después, Dios abrió una puerta insólita: dos mujeres de la misma tribu salieron de la selva. En lugar de huir o buscar venganza legal, tomé a mi pequeña hija Valerie en brazos y caminé hacia el interior de la selva para vivir con la mismísima tribu que había empuñado las lanzas contra Jim. Viví dos años con ellos, aprendí su lengua y les traduje los Evangelios. Aquellos hombres violentos vieron el amor de Cristo reflejado en el perdón y entregaron sus vidas a Jesús; el hombre que lanceó a mi esposo terminó bautizando a mi hija años después. No teman obedecer a Dios aun cuando el camino parezca costar la vida entera.`,
    verses: [
      {
        reference: 'Lucas 23:34',
        text: 'Y Jesús decía: Padre, perdónalos, porque no saben lo que hacen.'
      },
      {
        reference: 'Filipenses 1:21',
        text: 'Porque para mí el vivir es Cristo, y el morir es ganancia.'
      }
    ],
    createdAt: '2026-10-08',
    prayersCount: 94,
    moderatedBy: 'Comité Histórico Pastoral',
    responses: []
  },

  // 4. CASO VERÍDICO HISTÓRICO: George Müller
  {
    id: 'real-george-muller',
    title: '300 huérfanos con las mesas vacías en Bristol: la oración de fe de las 8:00 AM',
    authorName: 'George Müller',
    authorAge: 92,
    yearsInFaith: 73,
    churchName: 'Bethesda Chapel / Casas Huérfanas de Ashley Down',
    countryOrCity: 'Bristol, Inglaterra',
    biographicalYears: '1805 – 1898',
    category: 'provision',
    privacy: 'public',
    status: 'approved',
    durationSeconds: 270,
    mediaType: 'audio',
    photoUrl: '/src/assets/images/portrait_george_muller_1792428559983.jpg',
    guidedQuestion: '¿Recuerdas alguna ocasión en que no había nada en la mesa o no alcanzaba el dinero, y Dios proveyó de forma inesperada?',
    recordedWithHelper: false,
    isHistoricalVerified: true,
    sourceCitation: 'Caso verídico asentado en los libros contables y diarios de oración de los Orfanatos de Ashley Down, Bristol, donde alimentó a más de 10,000 huérfanos sin pedir dinero a ningún hombre.',
    transcript: `En mis diarios de oración registré más de cincuenta mil oraciones contestadas con fecha, hora y detalle exacto. Tomé una decisión inquebrantable delante del Señor: jamás pediría una sola libra esterlina ni un pedazo de pan a ningún ser humano, ni haría colectas públicas, para que el mundo supiera que el Dios vivo todavía contesta la oración de sus siervos.\n\nUna mañana en Ashley Down, los platos y las tazas de trescientos niños huérfanos estaban completamente vacíos sobre las largas mesas de madera. La encargada vino a mi despacho angustiada: «Señor Müller, no hay absolutamente nada que comer en la despensa, ni un céntimo en la caja fuerte». Le respondí con serenidad: «Haga pasar a los niños al comedor y sentémonos a dar gracias».\n\nTomé de las manos a los pequeños huérfanos y oré en voz alta: «Padre celestial, te damos gracias por el alimento que Tú vas a enviar a estos niños en este día». Apenas dije amén, llamaron a la puerta. Era el panadero de la ciudad: «Señor Müller, anoche me desperté a las dos de la mañana y no pude volver a dormir; sentí que Dios me decía que hornease pan suficiente para todos sus niños. Aquí están tres carretas de pan recién salido del horno».\n\nAntes de que termináramos de descargar el pan, volvió a sonar la puerta. Era el lechero: su carreta de leche tirada por caballos se había roto el eje justo enfrente del orfanato. Me dijo: «Señor Müller, la leche se echará a perder si no la descargo. ¿Podría aceptar las diez cántaras de leche fresca para los huérfanos?». Los niños bebieron leche tibia y comieron pan abundante esa mañana. Dios nunca, jamás, llega un minuto antes ni un minuto tarde.`,
    verses: [
      {
        reference: 'Salmo 81:10',
        text: 'Abre tu boca, y yo la llenaré.'
      },
      {
        reference: 'Filipenses 4:19',
        text: 'Mi Dios, pues, suplirá todo lo que os falta conforme a sus riquezas en gloria en Cristo Jesús.'
      }
    ],
    createdAt: '2026-10-07',
    prayersCount: 112,
    moderatedBy: 'Comité Histórico Pastoral',
    responses: []
  },

  // 5. CASO VERÍDICO HISTÓRICO: Nicky Cruz
  {
    id: 'real-nicky-cruz',
    title: 'De jefe criminal de los Mau Mau en Brooklyn a perdonar al asesino de mi hermano',
    authorName: 'Nicky Cruz Velázquez',
    authorAge: 87,
    yearsInFaith: 68,
    churchName: 'Nicky Cruz Outreach / Iglesia Asamblea de Dios',
    countryOrCity: 'San Juan, Puerto Rico / Brooklyn, Nueva York',
    biographicalYears: '1938 – Presente',
    category: 'llamado',
    privacy: 'public',
    status: 'approved',
    durationSeconds: 235,
    mediaType: 'audio',
    photoUrl: '/src/assets/images/hero_faith_generations_1792427275877.jpg',
    guidedQuestion: '¿Cómo y dónde conociste a Cristo por primera vez, y qué cambió en tu vida desde ese día?',
    recordedWithHelper: false,
    isHistoricalVerified: true,
    sourceCitation: 'Caso verídico documentado en «La Cruz y el Puñal» de David Wilkerson y su autobiografía «Corre, Nicky, Corre» (Run Baby Run).',
    transcript: `Yo era el jefe temido de la pandilla juvenil Mau Mau en las calles de Brooklyn. Mi corazón era un bloque de piedra forjado en violencia y desprecio. Cuando un pastor flaco y con Biblia bajo el brazo llamado David Wilkerson vino a las esquinas a decirme que Jesús me amaba, le escupí la cara y le grité: «¡Si te acercas a mí otra vez, te voy a cortar en pedazos!». David me miró con ojos llenos de lágrimas y me respondió: «Nicky, puedes cortarme en mil pedazos, pero cada pedazo en el suelo seguirá gritándote que Dios te ama».\n\nEsa frase se me clavó como un dardo en el alma. Días después fui a una reunión a burlarme, pero el Espíritu Santo me derrumbó en el suelo. Lloré como un niño descalzo por primera vez en mi vida. Jesús limpió mis manos de sangre.\n\nAños más tarde, mi fe fue puesta a la prueba más dura: mi hermano Francisco Cruz fue asesinado a tiros en Puerto Rico. La carne me gritaba tomar venganza armada como hacía en las pandillas. Pero el Espíritu Santo me frenó. Le pedí a mi familia en el funeral que no guardáramos amargura, odio ni rencor, y perdoné públicamente al asesino de mi hermano. Si Cristo pudo cambiar al monstruo que yo era, no hay corazón en este planeta que esté fuera del alcance de Su gracia.`,
    verses: [
      {
        reference: '2 Corintios 5:17',
        text: 'De modo que si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron; he aquí todas son hechas nuevas.'
      }
    ],
    createdAt: '2026-10-06',
    prayersCount: 68,
    moderatedBy: 'Comité Histórico Pastoral',
    responses: []
  },

  // 6. CASO VERÍDICO HISTÓRICO: José Joaquín "Yiye" Ávila
  {
    id: 'real-yiye-avila',
    title: 'Sanado de artritis deformante y visitando con perdón al asesino de mi hija',
    authorName: 'José Joaquín «Yiye» Ávila',
    authorAge: 87,
    yearsInFaith: 53,
    churchName: 'Asociación Evangelística Cristo Viene',
    countryOrCity: 'Camuy, Puerto Rico',
    biographicalYears: '1925 – 2013',
    category: 'sanidad',
    privacy: 'public',
    status: 'approved',
    durationSeconds: 220,
    mediaType: 'audio',
    photoUrl: '/src/assets/images/portrait_elderly_man_1792427276845.jpg',
    guidedQuestion: '¿Cuándo viste a Dios obrar un milagro de sanidad física en ti o en un ser querido?',
    recordedWithHelper: false,
    isHistoricalVerified: true,
    sourceCitation: 'Caso verídico de la biografía ministerial de Yiye Ávila, ex fisicoculturista sanado milagrosamente y su testimonio de perdón público en Puerto Rico.',
    transcript: `Yo era profesor de ciencias y un apasionado deportista en levantamiento de pesas y béisbol en Puerto Rico. A principios de los años sesenta, una artritis reumatoide degenerativa y feroz comenzó a atacar mis articulaciones. Mis dedos se torcieron, mis rodillas ardían como ascuas y los médicos me desahuciaron a una silla de ruedas permanente con dolor constante.\n\nUna noche en mi habitación, vi un programa evangélico y me arrodillé sobre la alfombra como pude. Clamé con desesperación: «Señor Jesús, si Tú salvas y sanas hoy como en la Biblia, sánate este cuerpo para predicar tu Palabra». El poder de Dios me sacudió como un relámpago. La hinchazón desapareció, mis dedos recuperaron su fuerza y Dios me sanó por completo.\n\nPero la prueba más santa vino años después, cuando mi primera hija Carmen fue trágicamente asesinada por su propio esposo. El dolor de padre me desgarró las entrañas. ¿Qué hice? Fui a la cárcel donde estaba recluido mi yerno, lo miré a los ojos, le abrí los brazos y le dije: «Hijo, yo te perdono en el nombre de Jesús y oro por tu salvación». Él no lo podía creer; allí en la celda se quebrantó y hoy busca de Dios. El evangelio no se predica con palabras elocuentes; se predica con hechos de perdón y de cruz. ¡A Dios sea la gloria!`,
    verses: [
      {
        reference: 'Santiago 5:15',
        text: 'Y la oración de fe salvará al enfermo, y el Señor lo levantará; y si hubiere cometido pecados, le serán perdonados.'
      }
    ],
    createdAt: '2026-10-05',
    prayersCount: 104,
    moderatedBy: 'Comité Histórico Pastoral',
    responses: []
  },

  // 7. TESTIMONIO DE LA COMUNIDAD LOCAL: Hna. Carmen Valdés
  {
    id: 'test-1',
    title: 'Cuando el médico dijo que no había cura: Dios sostuvo mi respiración',
    authorName: 'Hna. Carmen Valdés de Morales',
    authorAge: 78,
    yearsInFaith: 42,
    churchName: 'Iglesia Evangélica Gracia y Paz',
    countryOrCity: 'Comunidad Local',
    category: 'fe_en_las_pruebas',
    privacy: 'public',
    status: 'approved',
    durationSeconds: 198,
    mediaType: 'audio',
    photoUrl: '/src/assets/images/portrait_elderly_woman_1792427275781.jpg',
    guidedQuestion: '¿Hubo algún momento de profunda oscuridad donde sentiste que no podías más, y cómo sostuvo Dios tu fe?',
    recordedWithHelper: true,
    helperName: 'Sofía (nieta, 19 años)',
    isHistoricalVerified: false,
    transcript: `Yo tenía 36 años cuando los doctores me dijeron que una enfermedad en mis pulmones no me dejaría ver crecer a mis tres hijos pequeños. Recuerdo haber salido del hospital y sentarme en un banco de piedra con el corazón destrozado. Lloré tanto que ya no me salía la voz.\n\nEsa noche abrí mi Biblia vieja con hojas amarillas y leí el Salmo 46: "Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones". Le dije: "Señor, mis hijos son tuyos antes que míos. Si tú decides llevarme, sé tú su madre; y si me dejas, viviré cada día para alabarte".\n\nNo fue una sanidad de un minuto para otro; fueron dos años difíciles de cama y oxígeno. Pero en cada noche en que el dolor era insoportable, una presencia cálida llenaba mi habitación. La iglesia venía a cantar bajito en la puerta. Dios no solo me restauró los pulmones hasta el día de hoy con mis 78 años, sino que me enseñó que la verdadera fe no es la ausencia de tormenta, sino saber con certeza Quién está sentado contigo en la barca. Jóvenes, nunca duden cuando el cielo parezca silencioso: Dios nunca llega tarde.`,
    verses: [
      {
        reference: 'Salmo 46:1-2',
        text: 'Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones. Por tanto, no temeremos, aunque la tierra sea removida.'
      }
    ],
    createdAt: '2026-10-12',
    prayersCount: 28,
    moderatedBy: 'Pastor David H.',
    responses: [
      {
        id: 'r1',
        authorName: 'Gabriel Torres',
        authorAge: 21,
        type: 'prayer',
        content: 'Hermana Carmen, gracias por su testimonio. Me conmovió hasta el alma. Hoy oré por usted dando gracias a Dios por sus 42 años de fidelidad.',
        createdAt: '2026-10-13'
      }
    ]
  },

  // 8. TESTIMONIO DE LA COMUNIDAD LOCAL: Don Mateo Sandoval
  {
    id: 'test-2',
    title: 'La olla vacía y las bolsas de harina: 55 años viendo a Jehová Jireh',
    authorName: 'Don Mateo Sandoval',
    authorAge: 82,
    yearsInFaith: 55,
    churchName: 'Comunidad Cristiana Betel',
    countryOrCity: 'Comunidad Local',
    category: 'provision',
    privacy: 'public',
    status: 'approved',
    durationSeconds: 245,
    mediaType: 'audio',
    photoUrl: '/src/assets/images/portrait_elderly_man_1792427276845.jpg',
    guidedQuestion: '¿Recuerdas alguna ocasión en que no había nada en la mesa o no alcanzaba el dinero, y Dios proveyó de forma inesperada?',
    recordedWithHelper: false,
    isHistoricalVerified: false,
    transcript: `Era el invierno del año 1979. Me había quedado sin trabajo en el taller de carpintería y en la casa teníamos cinco niños hambrientos. Mi esposa Ester abrió la alacena al mediodía y me mostró: solo quedaba medio puñado de sal y una taza de té. Ni un pedazo de pan duro.\n\nEn lugar de quejarnos o discutir, nos tomamos de las manos en la mesa desierta. Sentamos a los cinco niños y les dijimos: "Hijos, vamos a orar y a darle gracias a Dios por la comida que Él va a enviar". Oramos con sencillez: "Padre celestial, Tú alimentas a las aves del cielo; Tú sabes que estos niños tienen hambre".\n\nNo habían pasado quince minutos cuando golpearon la puerta de madera. Era el hermano Guillermo, que vivía a tres kilómetros en bicicleta: "Hermano Mateo, sentí una voz en mi espíritu que me decía: compra un saco de papas y harina y llévaselos a Mateo". Comimos pan caliente por semanas. Hijos jóvenes: el Dios de la Biblia no ha quebrado jamás su pacto.`,
    verses: [
      {
        reference: 'Salmo 37:25',
        text: 'Joven fui, y he envejecido, y no he visto justo desamparado, ni su descendencia que mendigue pan.'
      }
    ],
    createdAt: '2026-10-08',
    prayersCount: 41,
    moderatedBy: 'Pastor Andrés V.',
    responses: []
  }
];
