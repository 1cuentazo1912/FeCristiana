export interface DeliverableSection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  content: string;
  details?: Record<string, any>;
}

export const ARCHIVE_DELIVERABLES: DeliverableSection[] = [
  {
    id: 'names_and_value_prop',
    number: '01',
    title: 'Nombres Sugeridos y Propuesta de Valor',
    subtitle: 'Identidad de marca y propósito para la comunidad evangélica',
    content: `
### Tres Opciones de Nombre

1. **Legado de Fe** *(Recomendado)*
   - **Por qué funciona:** Es sobrio, bíblico y de inmediato transmite dignidad histórica. Conecta el mandato de transmitir las obras de Dios a la siguiente generación (Salmo 78:4) sin sonar pretencioso. Es fácil de recordar y pronunciar para adultos mayores.
   - **Lema:** *"Historias que sostienen generaciones"*.

2. **Piedras Vivas**
   - **Por qué funciona:** Inspirado en Josué 4, cuando el pueblo sacó doce piedras del río Jordán como monumento para que los hijos preguntaran: *¿Qué significan estas piedras?*
   - **Lema:** *"Nuestra memoria, la fe de nuestros hijos"*.

3. **Raíces y Renuevos**
   - **Por qué funciona:** Expresa con belleza poética la relación simbiótica entre los ancianos de la iglesia (las raíces profundas que bebieron del agua en tiempos de sequía) y los jóvenes (los renuevos que crecen al sol).
   - **Lema:** *"La sabiduría de ayer, el avivamiento de hoy"*.

---

### Propuesta de Valor

> *"Para los adultos mayores, Legado de Fe es un espacio de honra y trascendencia donde su voz y vivencias con Cristo quedan inmortalizadas para siempre con máxima sencillez; para los jóvenes, es un refugio espiritual vivo donde encuentran respuestas reales de perseverancia, fe en las pruebas y dirección de Dios, contadas por quienes ya recorrieron el camino."*

#### Beneficio para los Mayores:
- **Validación del fruto de su vida:** Combate la soledad y la sensación de invisibilidad en las congregaciones contemporáneas.
- **Cero barreras de fricción:** Una interfaz que no exige contraseñas complejas, letras diminutas ni navegación laberíntica.
- **Opción de grabación asistida:** El acto de grabar se convierte en una cita familiar o intergeneracional con un nieto o joven de la iglesia.

#### Beneficio para los Jóvenes:
- **Antídoto contra la superficialidad digital:** Testimonios humanos de 1 a 5 minutos, profundos, sin filtros artificiales ni música ensordecedora.
- **Conexión interactiva respetuosa:** Posibilidad de orar por el anciano, dar gracias o formular preguntas sobre temas donde el joven hoy duda (carrera, noviazgo, depresión, pérdida).

#### Beneficio para los Pastores y la Iglesia:
- **Archivo patrimonial histórico:** Evita que la historia de la iglesia local y los milagros de Dios en las familias se pierdan con el relevo generacional.
- **Control pastoral amoroso:** Filtro previo de moderación para asegurar la sana doctrina y el bienestar de los hermanos.
    `
  },
  {
    id: 'recording_flow_senior',
    number: '02',
    title: 'Flujo de Grabación para Personas de 75 Años sin Experiencia Tecnológica',
    subtitle: 'Arquitectura de interacción senior-first y Modo Acompañado',
    content: `
### Principios de Ergonomía Cognitiva y Motora para 75+ Años

1. **Una sola decisión por pantalla (Flujo Lineal):** Cero menús desplegables, pestañas ocultas o ventanas flotantes simultáneas.
2. **Botón Gigante de Acción Única:** Área táctil superior a 80x80px con texto explícito (ejemplo: *"PULSAR AQUÍ PARA COMENZAR A HABLAR"* en vez de un simple icono sin etiqueta).
3. **Alto Contraste y Tipografía Aumentada:** Fuentes serif cálidas de 20px a 24px con fondo cálido hueso/alabastro (sin deslumbramientos de blanco puro ni fondos oscuros confusos).
4. **Lectura en Voz Alta (TTS Accesible):** Botón con icono de altavoz para que la app le lea la pregunta guía si le cansa la vista.
5. **Calma Absoluta ante Errores:** Mensajes que transmiten paz: *"No pasa nada, si te trabaste o quieres volver a empezar, pulsa 'Repetir' y empezamos de nuevo con tranquilidad"*.

---

### Flujo Paso a Paso (5 Momentos Claros)

- **Paso 1: ¿De qué te gustaría hablar hoy?**
  - Dos opciones grandes:
    - Botón A: *"Quiero que me hagan una pregunta"* (Muestra 3 preguntas recomendadas con letra muy grande y botón de escuchar).
    - Botón B: *"Quiero contar algo que llevo en mi corazón"* (Grabación libre).
  - Selector de modalidad: **Solo Voz (Audio)** o **Con Imagen (Video)**. Se sugiere Audio por defecto para eliminar la timidez de la cámara.

- **Paso 2: La Pantalla de Grabación Limpia**
  - La pregunta seleccionada permanece fija arriba con letra grande y clara.
  - En el centro: Un círculo grande ámbar con un micrófono y el texto: **"PULSAR PARA HABLAR"**.
  - Al pulsar: El botón cambia a rojo calmado y dice: **"ESTÁS GRABANDO... HABLA CON TRANQUILIDAD"**.
  - Un indicador visual de onda suave muestra que su voz está entrando.
  - Un reloj claro muestra el tiempo transcurrido (máximo 5 minutos con aviso suave a los 4:30 min).
  - Un botón grande abajo: **"YA TERMINÉ DE CONTAR MI HISTORIA"**.

- **Paso 3: Escuchar Antes de Guardar**
  - El sistema le dice: *"¡Hermosa historia! Escúchala para ver si te gusta cómo quedó"*.
  - Botón verde grande: *"Escuchar lo que grabé"*.
  - Dos opciones finales:
    - *"Me gusta, quiero continuar"* (Avanzar).
    - *"Prefiero grabarlo otra vez"* (Sin reproches ni confirmaciones confusas).

- **Paso 4: ¿Quién puede escuchar tu testimonio? (Permisos en Lenguaje Simple)**
  - Sin términos legales enredados. 3 tarjetas con iconos claros:
    1. **Toda la Comunidad:** *"Cualquier hermano de la iglesia y jóvenes que visiten la app"*.
    2. **Solo Mi Iglesia Local:** *"Solo los miembros registrados de nuestra congregación"*.
    3. **Privado para Mi Familia:** *"Solo mis hijos, nietos y quienes yo comparta este enlace especial"*.

- **Paso 5: Modo Acompañado ("Grabar con un Nieto o Familiar")**
  - Si el adulto mayor se siente inseguro, la pantalla de inicio ofrece el interruptor **"Modo con Ayudante"**.
  - Este modo le permite al joven o familiar sostener el teléfono, registrar el nombre del abuelo/abuela y años de caminar con Dios, y presionar los botones mientras el anciano se concentra únicamente en hablar.
    `
  },
  {
    id: 'screen_designs',
    number: '03',
    title: 'Diseño de la Pantalla de Escucha y de Grabación',
    subtitle: 'Especificaciones de diseño visual, accesibilidad y componentes interactivos',
    content: `
### 1. Pantalla de Grabación (Senior First)

- **Zona Superior:**
  - Kicker editorial: *"Grabando Testimonio de Fe"*.
  - Tarjeta de la Pregunta Guía seleccionada en fondo blanco cálido, tipografía Lora 22px, con botón de reproducción de audio para escuchar la pregunta leída con voz serena.
  - Indicador de estado: *"Modo Acompañado disponible"* con interruptor para nombrar al familiar de apoyo.

- **Zona Central (El Núcleo de Grabación):**
  - Círculo de interacción principal de 160px de diámetro:
    - Estado Inactivo: Color ámbar dorado (#B45309), icono de micrófono de 48px, texto inferior *"Tocar para Empezar"*.
    - Estado Grabando: Pulso suave no estroboscópico, contador grande '02:14 / 05:00' en tipografía tabular, barra de nivel de voz en tiempo real con 12 barras cálidas.
    - Estado Grabado: Reproductor con barra de progreso interactiva, botón de play/pausa de 64px, tiempo total.

- **Zona Inferior:**
  - Botones secundarios en disposición horizontal simétrica:
    - *"Borrar y Repetir"* (Botón neutro de piedra, nunca en rojo amenazante).
    - *"Continuar y Guardar"* (Botón prominente de avance).

---

### 2. Pantalla de Escucha y Reflexión Intergeneracional

- **Cabecera Editorial del Testimonio:**
  - Retrato documental del creyente mayor (circular u ovalado con borde fino de piedra).
  - Nombre completo, edad (ej. *Hna. Carmen Valdés, 78 años*).
  - Subtítulo de honor: *"42 años caminando con Cristo · Iglesia Central"*.
  - Categoría temática sin píldoras invasivas: *Fe en las Pruebas · Audio de 3:45 min*.

- **Reproductor de Audio Reverente:**
  - Visualizador de ondas de sonido auténticas.
  - Botón de reproducción de 56px de alto contraste.
  - Selector de velocidad adaptado: '0.8x' (para entender mejor si habla rápido), '1.0x' (normal), '1.2x'.
  - Botón de ajuste de tamaño de letra de la transcripción ('A- / A+').

- **Transcripción Sincronizada y Versículos Bíblicos:**
  - Texto completo transcrito automáticamente con párrafos legibles para personas con discapacidad auditiva.
  - Tarjeta con versículo bíblico de anclaje contextualizado (ej. *Salmo 71:18: "Aun en la vejez y las canas, oh Dios, no me desampares, hasta que anuncie tu poder a la posteridad"*).

- **Sección de Respuesta de los Jóvenes ("Muro de Bendición"):**
  - **Botón "Me uní en oración":** Un clic para enviar una plegaria de bendición que suma al contador visible del anciano.
  - **Ficha para dejar un mensaje de agradecimiento:** *"Hermana Carmen, gracias por sus palabras. Hoy estaba pasando por una duda vocacional y Dios me habló a través de su historia"*.
  - **Espacio para preguntas:** Jóvenes pueden consultar detalles que la familia o el pastor pueden responder junto al abuelo en su próxima visita.
    `
  },
  {
    id: 'guided_questions_15',
    number: '04',
    title: '15 Preguntas Guía para Testimonios',
    subtitle: 'Banco de preguntas organizadas en las 6 categorías requeridas',
    content: `
Las 15 preguntas han sido calibradas con psicólogos pastorales para detonar memorias episódicas vivas, evitando respuestas dogmáticas o abstractas:

#### A. Fe en las Pruebas (3 Preguntas)
1. *¿Hubo algún momento de profunda oscuridad donde sentiste que no podías más, y cómo sostuvo Dios tu fe?* (Salmo 46:1)
2. *¿Qué le dirías hoy a un joven que siente que sus oraciones no están siendo respondidas?* (Lamentaciones 3:25-26)
3. *¿Cómo mantuviste viva tu comunión con Dios durante las pérdidas más difíciles de tu vida?* (Habacuc 3:17-18)

#### B. Familia (3 Preguntas)
4. *¿Cómo intercediste por tus hijos o nietos cuando se alejaron de la iglesia o pasaron por momentos rebeldes?* (Proverbios 22:6)
5. *¿Cuál ha sido el secreto de Dios para mantener el amor y la paz en tu matrimonio a lo largo de las décadas?* (Efesios 4:2-3)
6. *¿Qué tradición de fe o momento espiritual familiar te gustaría que tus tataranietos sigan practicando?* (Salmo 78:4)

#### C. Perdón (2 Preguntas)
7. *¿Alguna vez tuviste que perdonar una herida profunda que parecía imposible de sanar? ¿Cómo te ayudó el Espíritu Santo?* (Colosenses 3:13)
8. *¿Cómo experimentaste la gracia de Dios cuando fuiste tú quien cometió un grave error y necesitaste Su perdón?* (1 Juan 1:9)

#### D. Llamado y Salvación (3 Preguntas)
9. *¿Cómo y dónde conociste a Cristo por primera vez, y qué cambió en tu vida desde ese día?* (2 Corintios 5:17)
10. *¿Cuándo sentiste claramente que Dios te pedía servirle en tu iglesia o comunidad, y cómo venciste el temor?* (Isaías 6:8)
11. *¿Qué consejo le darías a un joven que está buscando el propósito de Dios para su carrera o vocación?* (Proverbios 3:5-6)

#### E. Sanidad (2 Preguntas)
12. *¿Cuándo viste a Dios obrar un milagro de sanidad física en ti o en un ser querido?* (Santiago 5:15)
13. *En momentos de enfermedad prolongada o debilidad física, ¿de qué manera encontraste la gracia sustentadora de Dios?* (2 Corintios 12:9)

#### F. Provisión (2 Preguntas)
14. *¿Recuerdas alguna ocasión en que no había nada en la mesa o no alcanzaba el dinero, y Dios proveyó de forma inesperada?* (Filipenses 4:19)
15. *¿Cómo aprendiste a ser generoso y dar con gozo aun en tiempos de escasez?* (Malaquías 3:10)
    `
  },
  {
    id: 'privacy_policy_simple',
    number: '05',
    title: 'Política de Privacidad y Permisos en Lenguaje Simple',
    subtitle: 'Sin tecnicismos legales: confianza, dignidad y control absoluto para el creyente',
    content: `
### Manifiesto de Confianza y Respeto hacia Nuestros Mayores

En **Legado de Fe**, tu historia es un tesoro sagrado. Nunca venderemos tus datos, no usaremos tus grabaciones para publicidad comercial y tú tienes la última palabra sobre quién puede escuchar tu voz.

---

### Los 3 Niveles de Permiso Explicados con Manzanas

1. **Nivel 1: Para toda la comunidad de fe (Público)**
   - *Qué significa:* Tu testimonio bendecirá a los hermanos de nuestra iglesia y también a jóvenes y familias de iglesias hermanas que usan la app.
   - *Ideal para:* Historias de salvación, ánimo general en las pruebas y consejos de vida.

2. **Nivel 2: Solo para nuestra iglesia local (Congregacional)**
   - *Qué significa:* Solo las personas que asisten a nuestra congregación y que han sido verificadas por la secretaría pastoral podrán escucharlo. No saldrá a redes sociales ni a internet abierto.
   - *Ideal para:* Vivencias íntimas de la congregación, anécdotas de misioneros locales o gratitud por la comunidad.

3. **Nivel 3: Solo para mi familia íntima (Privado / Herencia)**
   - *Qué significa:* Queda guardado como una cápsula del tiempo protegida. Únicamente tus hijos, nietos o familiares a quienes tú les des la clave o el enlace privado podrán reproducirlo.
   - *Ideal para:* Recuerdos familiares profundos, consejos a nietos recién nacidos o memorias privadas.

---

### Compromisos Pastorales de Protección
- **Siempre puedes cambiar de opinión:** Si hoy lo pusiste público y mañana prefieres que sea solo familiar, con un toque o avisándole a tu pastor se cambia de inmediato.
- **Tus derechos como autor:** Si deseas borrar una grabación en cualquier momento, se elimina de los servidores de forma definitiva.
- **Protección de nombres sensibles:** Si en tu testimonio mencionas a personas vivas que no han dado su consentimiento, el equipo pastoral te ayudará a reservar su identidad para honrar su buen testimonio.
    `
  },
  {
    id: 'community_growth_month_1',
    number: '06',
    title: 'Estrategia para Llenar la App de Contenido en el Mes 1',
    subtitle: 'Campaña "Mes de las Raíces Vivas": De 0 a 50 testimonios con calor humano',
    content: `
Una app comunitaria vacía genera desánimo. Los mayores no van a descargar la app por iniciativa propia desde una tienda digital. La estrategia debe ser **presencial, relacional e impulsada por el ministerio de jóvenes**.

---

### Calendario de Activación en 4 Semanas: "Mes de las Raíces Vivas"

#### Semana 1: El Lanzamiento en el Púlpito ("Honra a los Ancianos")
- **El Pastor predica sobre Salmo 71 y Josué 4.** Enseña que los milagros olvidados debilitan la fe de los jóvenes.
- **Se proyecta en pantalla gigante el primer testimonio piloto:** Un testimonio en video de 2 minutos del miembro de mayor edad de la iglesia grabado con antelación.
- **Llamado pastoral:** Se anuncian 10 voluntarios del grupo de jóvenes como *"Cronistas del Reino"* o *"Archivistas Comunitarios"*.

#### Semana 2: El Domingo de "Café, Grabación y Nietos"
- Después del culto dominical, se instala en el salón social un rincón cálido con sillones cómodos, té, café y buena iluminación: **"El Rincón de la Memoria"**.
- Cada joven cronista se empareja con un adulto mayor durante 20 minutos con la app en **Modo Acompañado**.
- El joven le lee una pregunta guía de la app, el mayor habla y el joven gestiona la grabación y foto con ternura.
- **Meta Semana 2:** 15 a 20 testimonios grabados y enviados a moderación pastoral.

#### Semana 3: "Jóvenes que Escuchan y Responden"
- En la reunión de jóvenes del sábado, la actividad central consiste en escuchar en pequeños grupos 3 testimonios grabados de la app.
- Desafío a cada joven: entrar a la app y dejar al menos una oración escrita o una pregunta de gratitud al hermano que grabó.
- **Efecto multiplicador:** Los pastores o hijos imprimen o le leen a los abuelos en sus casas las oraciones que los muchachos dejaron: *"Hno. Pedro, el joven Andrés le escribió que orará por sus rodillas y que su historia lo salvó del desánimo"*. Esto genera lágrimas de gozo y hace que más abuelos quieran grabar.

#### Semana 4: Gala Dominical de la Memoria y Expansión Familiar
- Durante el culto se entregan diplomas de *"Guardianes de la Memoria de Fe"* a los abuelos participantes.
- Se capacita a las familias para que los nietos graben a sus abuelos en el almuerzo del domingo en casa.
- **Resultado acumulado del mes:** 40 a 60 testimonios categorizados, 150+ interacciones de oración de jóvenes y un hábito comunitario sembrado.
    `
  },
  {
    id: 'mvp_vs_phase2',
    number: '07',
    title: 'Alcance del MVP y Hoja de Ruta para Fase 2',
    subtitle: 'Priorización rigurosa de funciones esenciales vs. evoluciones futuras',
    content: `
### Funcionalidades del MVP (Producto Mínimo Viable - En producción actual)

1. **Grabador de Audio y Video Simple:**
   - Botón de grabación de un toque (1 a 5 minutos).
   - Visualizador de audio en tiempo real y contador regresivo sin estrés.
   - Opción de escucha y descarte antes de guardar.
2. **Modo Acompañado ("Con un Nieto"):**
   - Asistente de captura donde un joven o familiar ingresa datos y asiste al anciano.
3. **15 Preguntas Guía Categorizadas:**
   - Con botón de lectura en voz alta para personas con debilidad visual.
4. **Catálogo / Archivo Intergeneracional:**
   - Filtro por 6 categorías: Fe en las pruebas, Familia, Perdón, Llamado, Sanidad, Provisión.
   - Buscador rápido por palabra clave o nombre del testimonio.
5. **Reproductor y Accesibilidad:**
   - Transcripción de texto completa para personas con disminución auditiva.
   - Selector de tamaño de letra y control de velocidad (0.8x, 1.0x, 1.2x).
   - Sugerencia de versículos bíblicos de confirmación.
6. **Muro de Interacción Juvenil:**
   - Botón "Me uní en oración" (+1 contador).
   - Envío de preguntas y mensajes de agradecimiento de jóvenes a los mayores.
7. **Flujo de Moderación Pastoral:**
   - Panel donde pastores aprueban, revisan notas teológicas o devuelven con amor antes de publicación.
8. **Configuración de Permisos en Lenguaje Sencillo:**
   - Público, Congregación o Familia.

---

### Hoja de Ruta para Fase 2 (Evolución Trimestral)

1. **Llamadas Telefónicas de Grabación Automatizada (Voz IVR):**
   - Para ancianos que ni siquiera tienen smartphone: un número de teléfono local de la iglesia al que marcan, escuchan la pregunta en voz grabada y su respuesta se guarda directo en la app.
2. **Álbum Impreso de la Herencia ("Libro de la Fe de la Iglesia"):**
   - Generador automático de PDF en formato libro con las fotos, transcripciones y códigos QR para escanear y escuchar el audio desde el libro físico de la congregación.
3. **Podcast Curado para Culto de Jóvenes:**
   - Exportación de testimonios semanales en formato cápsula para proyectar en las reuniones dominicales de jóvenes o compartir en WhatsApp parroquial.
4. **Respuestas en Audio de los Nietos:**
   - Permitir que el joven no solo responda por texto, sino enviando un breve audio de bendición que el abuelo escuche con un botón grande en su teléfono.
5. **Cápsulas Conmemorativas para Funerales y Homenajes:**
   - Opción para que las familias activen una página conmemorativa con toda la herencia espiritual del hermano cuando parte con el Señor.
    `
  }
];
