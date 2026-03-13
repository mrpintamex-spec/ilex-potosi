export interface KBEntry {
  keywords: string[];
  response: () => string;
}

export const KB: Record<string, KBEntry> = {
  usucapion: {
    keywords: ['usucapion','usucapión','prescripcion','adquisitiva','posesion','años viviendo','tiempo en','poseo','10 años','20 años','habito','ocupo','dueño por tiempo','muchos años','llevo viviendo'],
    response: () => `
<div class="stitle">🏠 USUCAPIÓN / PRESCRIPCIÓN ADQUISITIVA</div>
Derecho de quien posee un inmueble de forma continua, pública, pacífica y a título de dueño para convertirse en propietario legal.
<div class="wcost">⏱ Plazos en SLP: Buena fe con título: <b>5 años</b> · Sin título: <b>10 años</b> · Mala fe: <b>20 años</b></div>
<div class="stitle">REQUISITOS</div>
<div class="wstep"><div class="wnum">1</div><div>Posesión <b>continua</b> — sin abandonar el inmueble</div></div>
<div class="wstep"><div class="wnum">2</div><div>Posesión <b>pública</b> — servicios a tu nombre</div></div>
<div class="wstep"><div class="wnum">3</div><div>Posesión <b>pacífica</b> — sin violencia</div></div>
<div class="wstep"><div class="wnum">4</div><div><b>A título de dueño</b> — NO como inquilino ni prestado</div></div>
<div class="wtip">✅ Pruebas clave: recibos de luz/agua/predial a tu nombre, fotos con fecha, testigos vecinos.</div>
<div class="wcost">💰 Costos aprox: $21,000 — $68,000 pesos · Duración: 18 meses a 3 años</div>
<span class="wlaw">Arts. 1133-1145 CC-SLP</span>`
  },
  herencia_intestada: {
    keywords: ['herencia','sucesión','murio','falleció','sin testamento','heredar','bienes del difunto','repartir','quien hereda','a quien le toca','fallecio'],
    response: () => `
<div class="stitle">📜 HERENCIA SIN TESTAMENTO — SLP</div>
<div class="stitle">ORDEN DE HEREDEROS</div>
<div class="wstep"><div class="wnum">1°</div><div><b>Hijos</b> — partes iguales entre todos</div></div>
<div class="wstep"><div class="wnum">2°</div><div><b>Cónyuge</b> — hereda igual que cada hijo</div></div>
<div class="wstep"><div class="wnum">3°</div><div><b>Padres</b> del fallecido si no hay hijos ni cónyuge</div></div>
<div class="stitle">DOS VÍAS</div>
<b>Sucesión Notarial</b> (si hay acuerdo): 3-6 meses · $8,000-$25,000 pesos<br>
<b>Juicio Sucesorio</b> (si hay conflicto): 1-3 años · $20,000-$60,000 pesos
<div class="wtip">✅ La herencia no prescribe, pero entre más tiempo pase, más problemas surgen.</div>
<span class="wlaw">Arts. 1602-1800 CC-SLP</span>`
  },
  divorcio_tramite: {
    keywords: ['divorcio','separado','separada','terminar matrimonio','disolver','dejar esposo','dejar esposa','divorciada','divorciado','incausado','cuantos años separados','vivimos separados'],
    response: () => `
<div class="stitle">💔 DIVORCIO INCAUSADO EN SLP</div>
Desde 2012, cualquier cónyuge puede pedir divorcio <b>sin dar razón</b>. No necesitas demostrar culpa.
<div class="stitle">OPCIONES</div>
<div class="wstep"><div class="wnum">1</div><div><b>Divorcio voluntario</b> (ambos de acuerdo): ante Notario o Juez · 1-3 meses · $8,000-$20,000</div></div>
<div class="wstep"><div class="wnum">2</div><div><b>Divorcio incausado</b> (un solo cónyuge): ante Juez Familiar · 4-12 meses · $15,000-$40,000</div></div>
<div class="wcost">💰 Opción gratuita: Defensoría Pública Familiar · (444) 826-8500 ext. 1201</div>
<div class="wtip">✅ La separación de hecho NO es divorcio legal. Mientras no tramites, sigues casado/a legalmente.</div>
<span class="wlaw">Arts. 272-289 CC-SLP</span>`
  },
  pension_alimenticia: {
    keywords: ['pensión','alimenticia','alimentos','no pasa','manutención','hijos','gastos','cuánto','porcentaje'],
    response: () => `
<div class="stitle">👶 PENSIÓN ALIMENTICIA EN SLP</div>
<div class="stitle">¿CUÁNTO CORRESPONDE?</div>
<div class="wcost">No hay porcentaje fijo por ley. El juez decide según: ingresos del obligado, necesidades del menor, y nivel de vida acostumbrado. Rango común: <b>15% a 40%</b> del ingreso.</div>
<div class="stitle">CÓMO DEMANDAR</div>
<div class="wstep"><div class="wnum">1</div><div>Acta de nacimiento del menor (que acredite parentesco)</div></div>
<div class="wstep"><div class="wnum">2</div><div>Prueba de ingresos del obligado (nómina, negocio, etc.)</div></div>
<div class="wstep"><div class="wnum">3</div><div>Demanda ante Juzgado Familiar — puede pedir <b>pensión provisional</b> desde el primer día</div></div>
<div class="wtip">✅ GRATUITO: Defensoría Pública Familiar lleva estos casos sin costo · (444) 826-8500 ext. 1201</div>
<div class="wwarn">⚠ No pagar pensión es delito (Art. 336 bis CPF). Puede haber orden de arresto.</div>
<span class="wlaw">Arts. 303-323 CC-SLP</span>`
  },
  arrendamiento: {
    keywords: ['renta','inquilino','casero','arrendamiento','desalojo','deposito','contrato renta','no pago','me quieren sacar','cortar agua','cortar luz'],
    response: () => `
<div class="stitle">🔑 ARRENDAMIENTO — DERECHOS DEL INQUILINO EN SLP</div>
<div class="stitle">LO QUE EL CASERO NUNCA PUEDE HACER</div>
<div class="wwarn">⚠ ILEGAL aunque no hayas pagado: cortar agua/luz/gas, cambiar la chapa, sacar tus cosas, entrar sin permiso, amenazarte para que salgas.</div>
<div class="stitle">TUS DERECHOS</div>
<div class="wstep"><div class="wnum">•</div><div>Recibo de pago cada vez que pagues</div></div>
<div class="wstep"><div class="wnum">•</div><div>Privacidad — el casero debe avisar antes de visitar</div></div>
<div class="wstep"><div class="wnum">•</div><div>Devolución del depósito si entregas en buen estado</div></div>
<div class="wstep"><div class="wnum">•</div><div>No ser desalojado sin juicio legal previo</div></div>
<div class="wtip">✅ El desalojo SIEMPRE por vía judicial, nunca por fuerza. Duración: 2-8 meses · Honorarios: $6,000-$18,000</div>
<span class="wlaw">Arts. 2397-2490 CC-SLP</span>`
  },
  despojo: {
    keywords: ['despojo','invasión','me quitaron','me sacaron','me corrieron','se metio','invadio','tomó mi terreno','ya no me dejan entrar','cambió la chapa'],
    response: () => `
<div class="stitle">🚫 DESPOJO — DEFENSA URGENTE</div>
<div class="wwarn">🚨 Si están despojándote AHORA: llama al 911 inmediatamente.</div>
<div class="stitle">OPCIONES LEGALES</div>
<div class="wstep"><div class="wnum">1</div><div><b>Denuncia penal</b> por despojo (Art. 395 CPF) ante Fiscalía · (444) 826-5900</div></div>
<div class="wstep"><div class="wnum">2</div><div><b>Interdicto de recuperar posesión</b> ante Juzgado Civil — puede ordenar restitución en días</div></div>
<div class="wstep"><div class="wnum">3</div><div><b>Juicio reivindicatorio</b> si quieres demostrar propiedad plena</div></div>
<div class="wwarn">⚠ PLAZO CRÍTICO: Para el interdicto tienes <b>1 año</b> desde el despojo. Después se complica enormemente.</div>
<div class="wcost">💰 Interdicto: $8,000-$20,000 · Juicio reivindicatorio: $20,000-$60,000</div>
<span class="wlaw">Art. 395 CPF · Arts. 826-830 CPC-SLP</span>`
  },
  compraventa: {
    keywords: ['compraventa','comprar casa','vender terreno','escriturar','notario compra','trámites compra','precio','pagar impuesto','isai'],
    response: () => `
<div class="stitle">🤝 COMPRAVENTA DE INMUEBLES EN SLP</div>
<div class="wwarn">⚠ Una compraventa solo es válida si está protocolizada ante <b>Notario Público</b> e inscrita en el <b>Registro Público</b>. Un contrato privado NO transmite propiedad.</div>
<div class="stitle">VERIFICAR ANTES DE COMPRAR</div>
<div class="wstep"><div class="wnum">1</div><div>Certificado de No Gravamen en RPP — sin hipotecas ni embargos</div></div>
<div class="wstep"><div class="wnum">2</div><div>Quien vende aparece como dueño en las escrituras</div></div>
<div class="wstep"><div class="wnum">3</div><div>Predial y agua al corriente</div></div>
<div class="wcost">💰 Costos para el comprador: ISAI 2% + honorarios notariales 1-2% + RPP 0.6-1% = aprox 3-5% del precio</div>
<div class="wtip">✅ El vendedor puede estar exento de ISR si es su casa habitación y no ha vendido en 3 años.</div>
<span class="wlaw">Arts. 2248-2326 CC-SLP · Art. 115 CF-SLP</span>`
  },
  cobranza_judicial: {
    keywords: ['cobrar','me deben','no me pagan','cartera vencida','pagaré','juicio ejecutivo','recuperar deuda','deudor'],
    response: () => `
<div class="stitle">💰 COBRANZA JUDICIAL EN SLP</div>
<div class="stitle">LA VÍA MÁS RÁPIDA — PAGARÉ</div>
<div class="wtip">✅ Con un <b>pagaré firmado</b> puedes ir directo al Juzgado Mercantil. El juez puede ordenar embargo desde el <b>PRIMER DÍA</b>.</div>
<div class="stitle">PLAZOS DE PRESCRIPCIÓN — NO ESPERES</div>
<div class="wcost">Pagaré: <b>3 años</b> · Contrato civil: <b>10 años</b> · Honorarios: <b>2 años</b><br>Pasado el plazo, el deudor puede alegar prescripción y no pagar legalmente.</div>
<div class="stitle">CONSEJOS</div>
<div class="wstep"><div class="wnum">1</div><div>Siempre presta con <b>pagaré firmado</b></div></div>
<div class="wstep"><div class="wnum">2</div><div>Los mensajes de WhatsApp donde reconoce la deuda <b>SÍ son prueba válida</b></div></div>
<div class="wstep"><div class="wnum">3</div><div>Primero intenta <b>carta notarial</b> ($1,500-$3,000) — a veces basta</div></div>
<div class="wcost">💰 Solo vale la pena judicialmente si la deuda supera $15,000 pesos</div>
<span class="wlaw">Arts. 1391-1414 Código de Comercio</span>`
  },
  contratos_revision: {
    keywords: ['contrato','firmar','cláusulas','revisar','convenio','letra chiquita','abusivo','arrendamiento contrato'],
    response: () => `
<div class="stitle">📝 CONTRATOS — QUÉ REVISAR</div>
<div class="wwarn">⚠ Nunca firmes bajo presión. Un contrato firmado es obligatorio aunque no lo hayas entendido bien.</div>
<div class="stitle">CLÁUSULAS TRAMPA — RECHAZA ESTAS</div>
<div class="wstep"><div class="wnum">🚩</div><div>"Renueva automáticamente" sin avisarte</div></div>
<div class="wstep"><div class="wnum">🚩</div><div>Penalizaciones del 50-100% por incumplimiento menor</div></div>
<div class="wstep"><div class="wnum">🚩</div><div>Espacios en blanco — nunca firmes con ellos</div></div>
<div class="wstep"><div class="wnum">🚩</div><div>"En caso de conflicto la empresa tiene razón" — nulo por ley</div></div>
<div class="wtip">✅ CONSEJO: Pide el contrato ANTES de firmar para leerlo con calma. Si te presionan a firmar en el momento — señal de alerta.</div>
<div class="wcost">💰 Revisión por abogado: $500-$2,000 pesos · Vale la pena si el contrato es significativo</div>
<span class="wlaw">Arts. 1796-1859 CC-SLP</span>`
  },
  derecho_penal_admin: {
    keywords: ['penal','denuncia','acusado','imputado','preso','detenido','proceso penal','ministerio público','clausura','multa gobierno','sanción'],
    response: () => `
<div class="stitle">🚔 SI TE DENUNCIARON O DETUVIERON</div>
<div class="wwarn">⚠ LO MÁS IMPORTANTE: Tienes derecho a <b>NO declarar sin tu abogado presente</b>. Ejercerlo NO es señal de culpabilidad (Art. 20 CPEUM).</div>
<div class="wstep"><div class="wnum">1</div><div>Solicita <b>defensor público gratuito</b> inmediatamente</div></div>
<div class="wstep"><div class="wnum">2</div><div>No firmes nada sin que tu abogado lo revise</div></div>
<div class="wstep"><div class="wnum">3</div><div>Tienes derecho a llamar a familiar o abogado <b>de inmediato</b></div></div>
<div class="stitle">DERECHO ADMINISTRATIVO — MULTAS Y CLAUSURAS</div>
<div class="wstep"><div class="wnum">!</div><div>Tienes <b>15 días hábiles</b> para interponer recurso de revisión contra cualquier sanción</div></div>
<div class="wtip">✅ GRATUITO: Defensoría Pública SLP (penal) · Av. Carranza 1055 · (444) 826-8500 ext. 1201</div>
<span class="wlaw">Art. 20 CPEUM · CNPP</span>`
  },
  patria_potestad: {
    keywords: ['patria potestad','quitar hijos','custodia','padre violento','maltrato','abandono hijos','no los cuida'],
    response: () => `
<div class="stitle">⚖ PATRIA POTESTAD — PÉRDIDA EN SLP</div>
<div class="stitle">CAUSAS PARA PERDERLA</div>
<div class="wstep"><div class="wnum">•</div><div>Abandono injustificado más de <b>3 meses</b></div></div>
<div class="wstep"><div class="wnum">•</div><div>Violencia familiar grave contra el menor</div></div>
<div class="wstep"><div class="wnum">•</div><div>Incumplimiento reiterado de alimentos</div></div>
<div class="wstep"><div class="wnum">•</div><div>Maltrato físico o psicológico grave y comprobado</div></div>
<div class="wwarn">⚠ Si el menor está en peligro AHORA: llama al 911 o acude al DIF Municipal SLP · (444) 826-1000</div>
<div class="wtip">✅ GRATUITO: Defensoría Pública lleva estos casos sin costo · (444) 826-8500 ext. 1201</div>
<span class="wlaw">Arts. 444-448 CC-SLP</span>`
  },
  ejido: {
    keywords: ['ejido','ejidal','ejidatario','parcela','asamblea ejidal','dominio pleno','tierra agraria','ran','procuraduría agraria'],
    response: () => `
<div class="stitle">🌾 DERECHO AGRARIO Y EJIDOS</div>
<div class="wwarn">⚠ Las tierras ejidales van al <b>Tribunal Agrario</b>, NO al juzgado civil. Este error le cuesta años a la gente.</div>
<div class="stitle">¿SE PUEDE VENDER TIERRA EJIDAL?</div>
<div class="wstep"><div class="wnum">•</div><div>Parcelas: solo a otros ejidatarios del mismo ejido, SALVO que se adopte <b>dominio pleno</b></div></div>
<div class="wstep"><div class="wnum">•</div><div>Para vender a externos: requiere dominio pleno (acuerdo de Asamblea + trámite en RAN)</div></div>
<div class="wtip">✅ GRATUITO: Procuraduría Agraria SLP · Av. Industrias 3151 · (444) 825-3900<br>Tribunal Agrario Dist. 19 · Carranza 2075 · (444) 813-8600</div>
<span class="wlaw">Ley Agraria Federal · Art. 27 CPEUM</span>`
  },
  amparo: {
    keywords: ['amparo','autoridad abuso','gobierno me','recurso judicial','juzgado distrito','suspensión acto'],
    response: () => `
<div class="stitle">🛡 JUICIO DE AMPARO EN SLP</div>
Protege frente a actos de <b>autoridad</b> ilegales. NO sirve contra particulares (vecinos, familia).
<div class="stitle">CUÁNDO USARLO</div>
<div class="wstep"><div class="wnum">•</div><div>Autoridad amenaza despojo de tu propiedad</div></div>
<div class="wstep"><div class="wnum">•</div><div>Municipio quiere demoler sin procedimiento legal</div></div>
<div class="wstep"><div class="wnum">•</div><div>Contra sentencia judicial injusta</div></div>
<div class="wwarn">⚠ PLAZO CRÍTICO: <b>15 días hábiles</b> desde que conoces el acto. Después se sobresee.</div>
<div class="wcost">💰 El amparo no tiene costo judicial · Honorarios abogado: $8,000-$30,000</div>
<div class="wtip">✅ Juzgado de Distrito SLP · Othón Blanco 207 · (444) 812-7700</div>
<span class="wlaw">Arts. 103 y 107 CPEUM · Ley de Amparo</span>`
  },
  abogado_deshonesto: {
    keywords: ['abogado malo','abogado caro','me estafa abogado','no confío','abogado cobra','abogado desaparece','señales','como saber'],
    response: () => `
<div class="stitle">⚠ SEÑALES DE ABOGADO DESHONESTO</div>
<div class="wwarn">🚩 "El caso es muy complicado" sin explicar por qué<br>🚩 Cobra por trámites gratuitos<br>🚩 Pide dinero "para el juez o actuario"<br>🚩 No da presupuesto por escrito<br>🚩 No te muestra el número de expediente<br>🚩 Desaparece semanas sin informar<br>🚩 Solo te dice lo que quieres escuchar</div>
<div class="stitle">LO QUE DEBES EXIGIR SIEMPRE</div>
<div class="wstep"><div class="wnum">✓</div><div>Contrato de servicios por escrito con honorarios y alcance</div></div>
<div class="wstep"><div class="wnum">✓</div><div>Cédula profesional verificable en cedulaprofesional.sep.gob.mx</div></div>
<div class="wstep"><div class="wnum">✓</div><div>Copias de todo lo que se presente en tu nombre</div></div>
<div class="wtip">✅ Queja: Colegio de Abogados SLP · Carranza 1355 · (444) 812-6543</div>`
  }
};

export const topicLabels: Record<string, string> = {
  usucapion: '¿Cómo funciona la usucapión?',
  herencia_intestada: '¿Cómo se tramita una herencia sin testamento?',
  divorcio_tramite: '¿Cómo tramitar un divorcio en SLP?',
  pension_alimenticia: '¿Cómo demandar pensión alimenticia?',
  arrendamiento: '¿Cuáles son mis derechos como inquilino?',
  despojo: 'Me están despojando, ¿qué hago?',
  compraventa: '¿Cómo es el proceso de compraventa en SLP?',
  cobranza_judicial: '¿Cómo cobrar una deuda por la vía legal?',
  contratos_revision: '¿Qué debo revisar en un contrato?',
  derecho_penal_admin: 'Me denunciaron, ¿qué hago?',
  patria_potestad: '¿Cuándo se puede perder la patria potestad?',
  ejido: '¿Cómo funciona el derecho agrario en SLP?',
  amparo: '¿Cuándo puedo usar el amparo?',
  abogado_deshonesto: '¿Cómo detectar un abogado deshonesto?',
};

const sinonimos: Record<string, string> = {
  'separado':'divorcio_tramite','separada':'divorcio_tramite','separados':'divorcio_tramite',
  'cuantos años separados':'divorcio_tramite','ya estoy divorciada':'divorcio_tramite',
  'me dejo':'divorcio_tramite','vivimos separados':'divorcio_tramite',
  'llevo viviendo':'usucapion','muchos años viviendo':'usucapion','años en la casa':'usucapion',
  'cuantos años para':'usucapion','ya es mio':'usucapion',
  'se murio':'herencia_intestada','se murió':'herencia_intestada','falleció':'herencia_intestada',
  'murió mi':'herencia_intestada','que heredamos':'herencia_intestada','repartir bienes':'herencia_intestada',
  'no pasa dinero':'pension_alimenticia','no da para los hijos':'pension_alimenticia',
  'padre irresponsable':'pension_alimenticia','no coopera':'pension_alimenticia',
  'me quitaron':'despojo','me sacaron':'despojo','invadio':'despojo','cambió la chapa':'despojo',
  'me estafaron':'cobranza_judicial','me engañaron':'cobranza_judicial',
  'me deben dinero':'cobranza_judicial','no me pagan':'cobranza_judicial',
  'casero':'arrendamiento','pago renta':'arrendamiento','corto el agua':'arrendamiento',
  'me denunciaron':'derecho_penal_admin','me acusaron':'derecho_penal_admin',
  'me van a meter preso':'derecho_penal_admin','me detuvieron':'derecho_penal_admin',
  'quitarle los hijos':'patria_potestad','padre violento':'patria_potestad',
  'tierra ejidal':'ejido','soy ejidatario':'ejido','mi parcela':'ejido',
  'abuso del gobierno':'amparo','la autoridad me':'amparo',
  'no tengo escrituras':'compraventa','sin papeles':'compraventa',
  'firmar contrato':'contratos_revision','me piden firmar':'contratos_revision',
};

function norm(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[¿¡.,;:!?""]/g, ' ').trim();
}

export function findBestAnswer(query: string): string {
  const q = norm(query);
  let qExp = q;
  for (const [frase, tema] of Object.entries(sinonimos)) {
    if (q.includes(norm(frase))) qExp += ' ' + tema.replace('_', ' ');
  }
  let best: string | null = null;
  let bestScore = 0;
  for (const [topic, data] of Object.entries(KB)) {
    let score = 0;
    for (const kw of data.keywords) {
      const kwn = norm(kw);
      if (qExp.includes(kwn)) score += kwn.length > 10 ? 4 : kwn.length > 7 ? 3 : kwn.length > 4 ? 2 : 1;
    }
    if (score > bestScore) { bestScore = score; best = topic; }
  }
  if (bestScore < 0.5 || !best) return noAnswer(query);
  return KB[best].response();
}

function noAnswer(q: string) {
  return `<div class="stitle">🤔 CUÉNTAME MÁS</div>
No encontré una respuesta exacta para: "<b>${q}</b>"<br><br>
Prueba describir tu situación con más detalle, por ejemplo:<br>
<div class="wtip">
"Llevo 15 años viviendo en un terreno que no es mío"<br>
"Mi mamá murió sin testamento, somos 4 hijos"<br>
"Mi casero me cortó el agua porque no pagué"<br>
"Me separé hace años ¿ya estoy divorciada?"
</div>
O toca un tema del menú de arriba. Para dudas urgentes:<br>
<div class="wcost">📞 Defensoría Pública SLP (GRATIS): (444) 826-8500 ext. 1201<br>📞 PROFECO: 800-468-8722</div>`;
}
