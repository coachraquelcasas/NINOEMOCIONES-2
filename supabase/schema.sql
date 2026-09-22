-- =====================================================================
-- ALBERTO EINSTEIN Y EL LABORATORIO DE LAS EMOCIONES
-- Script único: copiar y pegar completo en Supabase > SQL Editor > Run
-- Crea las tablas de contenido, activa la seguridad y precarga los
-- datos actuales (emociones, guardianes/misiones, escenas de la aventura).
-- =====================================================================

-- 1) TABLAS ------------------------------------------------------------

create table if not exists public.emotions (
  id text primary key,
  orden int not null,
  nombre text not null,
  color text not null,
  mensaje text not null,
  tecnica text not null,
  frase text not null
);

create table if not exists public.guardians (
  id text primary key,
  orden int not null,
  nombre text not null,
  poder text not null,
  color text not null,
  situacion text not null,
  opciones jsonb not null,
  correcta int not null,
  aprendizaje text not null
);

create table if not exists public.adventure_scenes (
  id text primary key,
  orden int not null,
  titulo text not null,
  texto text not null,
  pregunta text not null,
  opciones jsonb not null,
  correcta int not null,
  aprendizaje text not null
);

-- 2) SEGURIDAD -----------------------------------------------------------
-- Cualquier persona puede LEER el contenido (los niños no inician sesión).
-- Solo alguien con sesión iniciada (la administradora) puede EDITARLO.

alter table public.emotions enable row level security;
alter table public.guardians enable row level security;
alter table public.adventure_scenes enable row level security;

create policy "Lectura pública - emotions" on public.emotions
  for select using (true);
create policy "Escritura solo admin - emotions" on public.emotions
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Lectura pública - guardians" on public.guardians
  for select using (true);
create policy "Escritura solo admin - guardians" on public.guardians
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Lectura pública - adventure_scenes" on public.adventure_scenes
  for select using (true);
create policy "Escritura solo admin - adventure_scenes" on public.adventure_scenes
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- 3) CONTENIDO INICIAL (igual al que ya tiene la app) ---------------------

insert into public.emotions (id, orden, nombre, color, mensaje, tecnica, frase) values
('alegria', 1, 'Alegría', '#E6BE7E', 'Te muestra lo que disfrutas y quieres compartir.', 'Gratitud brillante: piensa en tres cosas bonitas de hoy y regala una sonrisa.', 'Mi alegría también puede iluminar a otros.'),
('tristeza', 2, 'Tristeza', '#7B8FC9', 'Te pide una pausa, consuelo y compañía.', 'Abrazo mariposa: cruza los brazos y da golpecitos suaves, alternando izquierda y derecha, mientras respiras cinco veces.', 'Puedo sentir tristeza y tratarme con ternura.'),
('enojo', 3, 'Enojo', '#E15B4F', 'Te avisa que algo necesita atención o un límite.', 'Respiración del león: inhala por la nariz y suelta lentamente el aire con un “haa”, sin lastimarte ni lastimar a nadie.', 'Mi enojo trae energía; yo elijo cómo usarla.'),
('miedo', 4, 'Miedo', '#6E3D72', 'Intenta protegerte y te invita a buscar seguridad.', 'Tres pasos valientes: nombra el miedo, busca un adulto seguro y elige un paso pequeño.', 'Ser valiente es avanzar incluso cuando siento miedo.'),
('verguenza', 5, 'Vergüenza', '#C97FA0', 'Te recuerda cuánto deseas sentirte aceptado.', 'Voz amable: coloca una mano sobre tu corazón y di: “Estoy aprendiendo. No tengo que ser perfecto”.', 'Merezco respeto incluso cuando me equivoco.'),
('calma', 6, 'Calma', '#2FA79B', 'Te permite escuchar, pensar y elegir con claridad.', 'Respiración globo: infla tu barriga al inhalar y desínflala lentamente al exhalar. Repite cuatro veces.', 'La calma vive dentro de mí.')
on conflict (id) do nothing;

insert into public.guardians (id, orden, nombre, poder, color, situacion, opciones, correcta, aprendizaje) values
('colibri', 1, 'Colibrí', 'Alegría', '#E6BE7E', 'Tu amiga logró algo importante. ¿Cómo puedes compartir su alegría?', '["Cambiar de tema para hablar de mí","Felicitarla y preguntarle cómo se siente","Decirle que no fue tan difícil"]', 1, 'Celebrar a otros hace crecer la alegría sin quitarte nada.'),
('leon', 2, 'León', 'Valentía', '#E15B4F', 'Te da miedo participar en clase aunque sabes la respuesta. ¿Cuál es un paso valiente?', '["Burlarme de alguien para distraer","Quedarme callado siempre","Respirar, levantar la mano y probar"]', 2, 'La valentía no elimina el miedo; te ayuda a dar un paso pequeño.'),
('dally', 3, 'Delfín Dally', 'Empatía', '#2FA79B', 'Ves a un compañero solo y con cara triste. ¿Qué haría un Guardián?', '["Acercarme y preguntarle si quiere compañía","Decirle que deje de estar triste","Ignorarlo porque no es mi problema"]', 0, 'La empatía comienza cuando escuchamos sin juzgar.'),
('buho', 4, 'Búho', 'Calma', '#6E3D72', 'Alguien toma tu lápiz sin permiso y sientes mucho enojo. ¿Qué haces primero?', '["Gritar y empujar","Respirar y decir con firmeza: “Devuélvemelo, por favor”","Romper su lápiz"]', 1, 'La calma te ayuda a poner límites claros sin lastimar.'),
('tortuga', 5, 'Tortuga', 'Paciencia', '#8A9A5B', 'Un dibujo no te sale como esperabas. ¿Cómo activas la paciencia?', '["Arrugarlo y decir que no puedo","Pedir que otra persona lo haga por mí","Hacer una pausa e intentarlo paso a paso"]', 2, 'Aprender toma tiempo. Cada intento entrena tu cerebro.')
on conflict (id) do nothing;

insert into public.adventure_scenes (id, orden, titulo, texto, pregunta, opciones, correcta, aprendizaje) values
('escena-1', 1, 'Una sombra en el recreo', 'Trueno se burla de las plumas de Alberto delante de todos. Alberto siente calor en la cara y su corazón late rápidamente.', '¿Qué debería hacer primero?', '["Insultar a Trueno más fuerte","Reconocer: “Estoy enojado y necesito respirar”","Fingir que no siente nada"]', 1, 'Nombrar la emoción ayuda al cerebro a recuperar la calma.'),
('escena-2', 2, 'Una voz firme', 'Alberto ya respiró, pero Trueno vuelve a molestarlo.', '¿Qué puede decir Alberto con seguridad?', '["“No me gusta. Detente”","“Tienes razón, mis plumas son horribles”","No decir nada aunque se sienta inseguro"]', 0, 'Un límite puede ser corto, claro y respetuoso.'),
('escena-3', 3, 'La red protectora', 'Trueno no se detiene. Alberto recuerda que pedir ayuda también es valentía.', '¿Cuál es la mejor decisión?', '["Quedarse solo con el problema","Buscar a un adulto de confianza y contar lo ocurrido","Planear una venganza"]', 1, 'Pedir ayuda frente al bullying es protegerte.')
on conflict (id) do nothing;

-- Fin del script. No se necesita nada más en Supabase aparte de crear
-- la usuaria administradora desde Authentication > Users (ver instrucciones).
