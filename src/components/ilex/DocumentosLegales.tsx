import { FileText, Download, Briefcase, Scale, Building2, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Documento {
  nombre: string;
  descripcion: string;
  contenido: string;
  archivo: string;
}

interface Categoria {
  titulo: string;
  icon: React.ReactNode;
  documentos: Documento[];
}

const categorias: Categoria[] = [
  {
    titulo: "Contratos",
    icon: <FileText className="w-5 h-5" />,
    documentos: [
      {
        nombre: "Contrato de Arrendamiento",
        descripcion: "Plantilla de contrato de arrendamiento de inmueble conforme al Código Civil del Estado de SLP.",
        archivo: "contrato_arrendamiento_slp.txt",
        contenido: `CONTRATO DE ARRENDAMIENTO DE INMUEBLE
(Conforme al Código Civil del Estado de San Luis Potosí)

En la ciudad de San Luis Potosí, S.L.P., a ____ de __________ de 20__

COMPARECEN:

ARRENDADOR: ________________________________________________
Con domicilio en: ____________________________________________
Identificación oficial: _______________________________________

ARRENDATARIO: ______________________________________________
Con domicilio en: ____________________________________________
Identificación oficial: _______________________________________

CLÁUSULAS:

PRIMERA. OBJETO.- El ARRENDADOR da en arrendamiento al ARRENDATARIO el inmueble ubicado en: ________________________________________________, en la ciudad de San Luis Potosí, S.L.P.

SEGUNDA. PLAZO.- El presente contrato tendrá una duración de _____ meses/años, iniciando el día ____ de __________ de 20__ y terminando el día ____ de __________ de 20__.

TERCERA. RENTA.- La renta mensual será de $__________ (________________ PESOS 00/100 M.N.), que el ARRENDATARIO se obliga a pagar al ARRENDADOR los primeros cinco días de cada mes.

CUARTA. DEPÓSITO.- El ARRENDATARIO entrega la cantidad de $__________ como depósito en garantía, que le será devuelto al término del contrato, previo descuento de adeudos o daños.

QUINTA. USO.- El inmueble será destinado exclusivamente para uso ________________.

SEXTA. CONSERVACIÓN.- El ARRENDATARIO se obliga a conservar el inmueble en buen estado y a realizar las reparaciones menores que sean necesarias.

SÉPTIMA. PROHIBICIONES.- Queda prohibido al ARRENDATARIO subarrendar total o parcialmente el inmueble sin consentimiento escrito del ARRENDADOR.

OCTAVA. TERMINACIÓN ANTICIPADA.- En caso de terminación anticipada, la parte que la solicite deberá dar aviso por escrito con al menos 30 días de anticipación.

NOVENA. JURISDICCIÓN.- Para todo lo relacionado con la interpretación y cumplimiento del presente contrato, las partes se someten a la jurisdicción de los tribunales competentes de la ciudad de San Luis Potosí, S.L.P.

Leído que fue el presente contrato, lo firman las partes de conformidad.


________________________          ________________________
    ARRENDADOR                        ARRENDATARIO


________________________          ________________________
    TESTIGO 1                         TESTIGO 2

NOTA: Este es un documento ejemplo. Consulte a un abogado para su caso particular.`,
      },
      {
        nombre: "Contrato de Compraventa",
        descripcion: "Modelo de contrato de compraventa de bien mueble aplicable en SLP.",
        archivo: "contrato_compraventa_slp.txt",
        contenido: `CONTRATO DE COMPRAVENTA DE BIEN MUEBLE
(Conforme al Código Civil del Estado de San Luis Potosí)

En la ciudad de San Luis Potosí, S.L.P., a ____ de __________ de 20__

COMPARECEN:

VENDEDOR: __________________________________________________
Con domicilio en: ____________________________________________
RFC: ________________________________________________________

COMPRADOR: _________________________________________________
Con domicilio en: ____________________________________________
RFC: ________________________________________________________

CLÁUSULAS:

PRIMERA. OBJETO.- El VENDEDOR vende y el COMPRADOR adquiere el siguiente bien mueble:
Descripción: ________________________________________________
Estado de conservación: ______________________________________
Número de serie (si aplica): _________________________________

SEGUNDA. PRECIO.- El precio total de la compraventa es de $__________ (________________ PESOS 00/100 M.N.).

TERCERA. FORMA DE PAGO.- El pago se realizará de la siguiente forma: ________________________________________________

CUARTA. ENTREGA.- El VENDEDOR se obliga a entregar el bien en la fecha ________________ en el domicilio ________________________________________________.

QUINTA. VICIOS OCULTOS.- El VENDEDOR responde por los vicios ocultos del bien vendido conforme a lo dispuesto por el Código Civil del Estado de San Luis Potosí.

SEXTA. JURISDICCIÓN.- Las partes se someten a los tribunales de San Luis Potosí, S.L.P.


________________________          ________________________
     VENDEDOR                         COMPRADOR

NOTA: Este es un documento ejemplo. Consulte a un abogado para su caso particular.`,
      },
      {
        nombre: "Contrato de Prestación de Servicios",
        descripcion: "Formato de contrato de prestación de servicios profesionales.",
        archivo: "contrato_servicios_slp.txt",
        contenido: `CONTRATO DE PRESTACIÓN DE SERVICIOS PROFESIONALES
(Conforme a la legislación del Estado de San Luis Potosí)

En la ciudad de San Luis Potosí, S.L.P., a ____ de __________ de 20__

COMPARECEN:

CLIENTE: ____________________________________________________
Con domicilio en: ____________________________________________

PRESTADOR DE SERVICIOS: _____________________________________
Con domicilio en: ____________________________________________
Cédula Profesional No.: _____________________________________

CLÁUSULAS:

PRIMERA. OBJETO.- El PRESTADOR se obliga a proporcionar al CLIENTE los siguientes servicios profesionales: ________________________________________________

SEGUNDA. PLAZO.- Del ____ de __________ al ____ de __________ de 20__.

TERCERA. HONORARIOS.- Los honorarios totales serán de $__________ (________________ PESOS 00/100 M.N.), pagaderos de la siguiente forma: ________________________________________________

CUARTA. OBLIGACIONES DEL PRESTADOR.-
a) Realizar los servicios con la diligencia y calidad profesional requerida.
b) Informar periódicamente al CLIENTE sobre el avance de los servicios.
c) Guardar confidencialidad sobre la información proporcionada.

QUINTA. OBLIGACIONES DEL CLIENTE.-
a) Proporcionar la información y documentación necesaria.
b) Cubrir los honorarios en los términos pactados.

SEXTA. RELACIÓN JURÍDICA.- Las partes reconocen que no existe relación laboral entre ellas.

SÉPTIMA. JURISDICCIÓN.- Tribunales de San Luis Potosí, S.L.P.


________________________          ________________________
      CLIENTE                    PRESTADOR DE SERVICIOS

NOTA: Este es un documento ejemplo. Consulte a un abogado para su caso particular.`,
      },
    ],
  },
  {
    titulo: "Demandas y Escritos Judiciales",
    icon: <Scale className="w-5 h-5" />,
    documentos: [
      {
        nombre: "Demanda de Pensión Alimenticia",
        descripcion: "Formato de demanda de pensión alimenticia ante juzgados familiares de SLP.",
        archivo: "demanda_pension_alimenticia_slp.txt",
        contenido: `ESCRITO INICIAL DE DEMANDA DE PENSIÓN ALIMENTICIA
(Ante Juzgado Familiar del Estado de San Luis Potosí)

C. JUEZ FAMILIAR EN TURNO
SAN LUIS POTOSÍ, S.L.P.
P R E S E N T E

________________________________________________, por mi propio derecho y en representación de mi(s) menor(es) hijo(s) ________________________________________________, señalando como domicilio para oír y recibir notificaciones el ubicado en ________________________________________________, autorizando para tales efectos al Lic. ________________________________________________.

Comparezco ante este H. Juzgado para demandar en la VÍA DE CONTROVERSIA FAMILIAR al C. ________________________________________________, con domicilio en ________________________________________________, las siguientes:

PRESTACIONES:

a) El pago de una PENSIÓN ALIMENTICIA provisional y definitiva a favor de ________________________________________________.
b) El pago de gastos y costas del presente juicio.

HECHOS:

1.- El suscrito(a) y el(la) demandado(a) contrajimos matrimonio / somos concubinos / procreamos a los menores...

2.- De dicha relación nacieron los menores ________________________________________________, de _____ años de edad.

3.- El(la) demandado(a) ha incumplido con su obligación de proporcionar alimentos.

4.- Los menores requieren alimentación, vestido, educación, atención médica y habitación.

DERECHO:

Artículos 142, 143, 144, 145 y demás aplicables del Código Familiar para el Estado de San Luis Potosí.

PRUEBAS:
1.- Acta de nacimiento de los menores.
2.- Acta de matrimonio (si aplica).
3.- Constancia de ingresos del demandado.
4.- Recibos de gastos de los menores.

PUNTOS PETITORIOS:

PRIMERO.- Tenerme por presentado con la demanda.
SEGUNDO.- Fijar una PENSIÓN ALIMENTICIA PROVISIONAL.
TERCERO.- Emplazar al demandado.
CUARTO.- En sentencia definitiva, condenar al pago de pensión alimenticia definitiva.

PROTESTO LO NECESARIO

San Luis Potosí, S.L.P., a ____ de __________ de 20__


________________________
      PROMOVENTE

NOTA: Este es un documento ejemplo. Consulte a un abogado para su caso particular.`,
      },
      {
        nombre: "Escrito de Amparo Indirecto",
        descripcion: "Modelo de demanda de amparo indirecto ante Juzgado de Distrito en SLP.",
        archivo: "amparo_indirecto_slp.txt",
        contenido: `DEMANDA DE AMPARO INDIRECTO

C. JUEZ DE DISTRITO EN TURNO
EN EL ESTADO DE SAN LUIS POTOSÍ
P R E S E N T E

________________________________________________, por mi propio derecho, señalando como domicilio para oír y recibir notificaciones ________________________________________________, ante usted respetuosamente comparezco para solicitar el AMPARO Y PROTECCIÓN DE LA JUSTICIA FEDERAL, conforme a lo siguiente:

I. NOMBRE Y DOMICILIO DEL QUEJOSO:
________________________________________________

II. NOMBRE Y DOMICILIO DEL TERCERO INTERESADO:
________________________________________________

III. AUTORIDAD RESPONSABLE:
________________________________________________

IV. ACTO RECLAMADO:
________________________________________________

V. DERECHOS HUMANOS VIOLADOS:
Artículos __________ de la Constitución Política de los Estados Unidos Mexicanos.

VI. ANTECEDENTES DEL ACTO RECLAMADO:
1.- ________________________________________________
2.- ________________________________________________

VII. CONCEPTOS DE VIOLACIÓN:

PRIMERO.- ________________________________________________

SEGUNDO.- ________________________________________________

VIII. SUSPENSIÓN:
Solicito la suspensión provisional y en su oportunidad la definitiva del acto reclamado.

PRUEBAS:
1.- ________________________________________________

PUNTOS PETITORIOS:
PRIMERO.- Tenerme por presentado con la demanda de amparo.
SEGUNDO.- Conceder la suspensión provisional y definitiva.
TERCERO.- En la audiencia constitucional, conceder el amparo.

PROTESTO LO NECESARIO

San Luis Potosí, S.L.P., a ____ de __________ de 20__


________________________
       QUEJOSO

NOTA: Este es un documento ejemplo. Consulte a un abogado para su caso particular.`,
      },
    ],
  },
  {
    titulo: "Documentos Laborales",
    icon: <Briefcase className="w-5 h-5" />,
    documentos: [
      {
        nombre: "Carta de Renuncia Voluntaria",
        descripcion: "Formato de renuncia voluntaria conforme a la Ley Federal del Trabajo.",
        archivo: "carta_renuncia_slp.txt",
        contenido: `CARTA DE RENUNCIA VOLUNTARIA

San Luis Potosí, S.L.P., a ____ de __________ de 20__

C. ________________________________________________
REPRESENTANTE LEGAL / GERENTE GENERAL
________________________________________________ (nombre de la empresa)
P R E S E N T E

Por medio de la presente, yo ________________________________________________, con número de empleado __________, con puesto de ________________________________________________, hago de su conocimiento mi decisión de RENUNCIAR VOLUNTARIAMENTE a mi empleo en esta empresa, a partir del día ____ de __________ de 20__.

Manifiesto que durante el tiempo que laboré en esta empresa, recibí mi salario y prestaciones de ley de manera puntual y completa.

Solicito se me liquiden las prestaciones que por ley me corresponden:
- Salarios devengados no pagados
- Parte proporcional de aguinaldo
- Parte proporcional de vacaciones
- Prima vacacional proporcional
- Demás prestaciones que me correspondan

Agradezco las oportunidades brindadas durante mi estancia en la empresa.

Atentamente,


________________________
Nombre: ________________________________________________
CURP: ________________________________________________
Dirección: ________________________________________________

Recibí: ________________________
Fecha: ________________________

NOTA: Este es un documento ejemplo. Consulte a un abogado para su caso particular.`,
      },
      {
        nombre: "Convenio de Terminación Laboral",
        descripcion: "Modelo de convenio de terminación de relación laboral por mutuo acuerdo.",
        archivo: "convenio_laboral_slp.txt",
        contenido: `CONVENIO DE TERMINACIÓN DE RELACIÓN LABORAL POR MUTUO ACUERDO
(Conforme a la Ley Federal del Trabajo)

En la ciudad de San Luis Potosí, S.L.P., a ____ de __________ de 20__

COMPARECEN:

PATRÓN: ________________________________________________
Representado por: ________________________________________________
Con domicilio en: ________________________________________________

TRABAJADOR: ________________________________________________
Con domicilio en: ________________________________________________
CURP: ________________________________________________

DECLARAN:

1.- Que el TRABAJADOR ingresó a laborar el día ____ de __________ de 20__, con el puesto de ________________________________________________, percibiendo un salario diario de $__________.

2.- Que ambas partes han decidido, DE MUTUO ACUERDO, dar por terminada la relación laboral.

CLÁUSULAS:

PRIMERA.- Las partes convienen en dar por terminada la relación laboral a partir de esta fecha.

SEGUNDA.- El PATRÓN se obliga a pagar al TRABAJADOR las siguientes cantidades:

Concepto                                    Cantidad
Salarios devengados:                        $__________
Aguinaldo proporcional:                     $__________
Vacaciones proporcionales:                  $__________
Prima vacacional proporcional:              $__________
Prima de antigüedad:                        $__________
Gratificación por mutuo acuerdo:            $__________
TOTAL:                                      $__________

TERCERA.- El TRABAJADOR manifiesta que no tiene reclamación alguna que hacer al PATRÓN.

CUARTA.- Este convenio deberá ser ratificado ante la Junta Local de Conciliación y Arbitraje del Estado de San Luis Potosí o ante el Centro de Conciliación Laboral del Estado.


________________________          ________________________
       PATRÓN                         TRABAJADOR


________________________          ________________________
     TESTIGO 1                        TESTIGO 2

NOTA: Este es un documento ejemplo. Consulte a un abogado para su caso particular.`,
      },
    ],
  },
  {
    titulo: "Poderes y Actas Notariales",
    icon: <ScrollText className="w-5 h-5" />,
    documentos: [
      {
        nombre: "Carta Poder Simple",
        descripcion: "Formato de carta poder simple para trámites administrativos en SLP.",
        archivo: "carta_poder_slp.txt",
        contenido: `CARTA PODER SIMPLE

San Luis Potosí, S.L.P., a ____ de __________ de 20__

C. ________________________________________________
(Autoridad o dependencia ante quien se presenta)
P R E S E N T E

El(la) que suscribe, ________________________________________________, mexicano(a), mayor de edad, con domicilio en ________________________________________________, identificándome con ________________________________________________ No. ________________, por medio de la presente:

OTORGO PODER AMPLIO Y SUFICIENTE

Al C. ________________________________________________, mexicano(a), mayor de edad, con domicilio en ________________________________________________, quien se identifica con ________________________________________________ No. ________________.

Para que en mi nombre y representación realice el siguiente trámite:
________________________________________________
________________________________________________

Ante: ________________________________________________

Este poder es válido únicamente para el trámite antes señalado.


________________________
OTORGANTE
Nombre: ________________________________________________

________________________
APODERADO
Nombre: ________________________________________________

TESTIGOS:

________________________
Nombre: ________________________________________________
Domicilio: ________________________________________________

________________________
Nombre: ________________________________________________
Domicilio: ________________________________________________

NOTA: La carta poder simple no requiere notario público, pero es válida solo para trámites administrativos menores. Para actos jurídicos de mayor importancia, se requiere poder notarial. Consulte a un abogado.`,
      },
      {
        nombre: "Acta Constitutiva (Asociación Civil)",
        descripcion: "Modelo de acta constitutiva para asociación civil en el Estado de SLP.",
        archivo: "acta_constitutiva_ac_slp.txt",
        contenido: `ACTA CONSTITUTIVA DE ASOCIACIÓN CIVIL
(Conforme al Código Civil del Estado de San Luis Potosí)

En la ciudad de San Luis Potosí, S.L.P., siendo las _____ horas del día ____ de __________ de 20__, se reunieron las siguientes personas:

1.- ________________________________________________
2.- ________________________________________________
3.- ________________________________________________

Con el propósito de constituir una ASOCIACIÓN CIVIL, al tenor de las siguientes:

CLÁUSULAS:

PRIMERA. DENOMINACIÓN.- La asociación se denominará "________________________________________________, A.C."

SEGUNDA. DOMICILIO.- El domicilio social será en la ciudad de San Luis Potosí, S.L.P., en ________________________________________________.

TERCERA. OBJETO SOCIAL.-
a) ________________________________________________
b) ________________________________________________
c) ________________________________________________

CUARTA. DURACIÓN.- La duración será indefinida / de _____ años.

QUINTA. PATRIMONIO.- El patrimonio se integrará por:
a) Las cuotas de los asociados.
b) Donativos que reciba.
c) Los bienes que adquiera por cualquier título legal.

SEXTA. ASOCIADOS.- Son asociados fundadores los firmantes de la presente acta.

SÉPTIMA. ÓRGANOS DE GOBIERNO.-
a) Asamblea General de Asociados (órgano supremo)
b) Consejo Directivo
c) Comisión de Vigilancia

OCTAVA. CONSEJO DIRECTIVO.-
Presidente: ________________________________________________
Secretario: ________________________________________________
Tesorero: ________________________________________________

NOVENA. CUOTA.- La cuota mensual/anual de los asociados será de $__________.

DÉCIMA. DISOLUCIÓN.- La asociación podrá disolverse por acuerdo de la Asamblea General o por las causas previstas en el Código Civil del Estado de San Luis Potosí.

DÉCIMA PRIMERA. LIQUIDACIÓN.- En caso de disolución, los bienes remanentes se destinarán a ________________________________________________.

Sin más que tratar, se firma la presente acta.


________________________     ________________________     ________________________
    Asociado 1                   Asociado 2                   Asociado 3

NOTA: Este documento es un ejemplo. La constitución formal requiere escritura pública ante Notario. Consulte a un abogado y notario público.`,
      },
    ],
  },
];

const descargarDocumento = (doc: Documento) => {
  const blob = new Blob([doc.contenido], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = doc.archivo;
  a.click();
  URL.revokeObjectURL(url);
};

const DocumentosLegales = () => {
  return (
    <section id="documentos" className="py-16 md:py-24 bg-secondary">
      <div className="max-w-6xl mx-auto px-5">
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary font-display text-xs font-semibold px-3 py-1 rounded-full mb-3 tracking-wider uppercase">
            Recursos Gratuitos
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Documentos Legales de Ejemplo
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descarga plantillas de documentos legales vigentes y adaptados para el Estado de San Luis Potosí. 
            <strong className="text-foreground"> Estos son ejemplos orientativos</strong> — consulta siempre a un abogado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {categorias.map((cat) => (
            <div key={cat.titulo} className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  {cat.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">{cat.titulo}</h3>
              </div>
              <div className="space-y-4">
                {cat.documentos.map((doc) => (
                  <div key={doc.nombre} className="flex items-start justify-between gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm font-semibold text-foreground">{doc.nombre}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{doc.descripcion}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="shrink-0 gap-1.5 text-xs"
                      onClick={() => descargarDocumento(doc)}
                    >
                      <Download className="w-3.5 h-3.5" />
                      Descargar
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8 max-w-xl mx-auto">
          ⚠️ Estos documentos son plantillas de ejemplo con fines informativos. No sustituyen la asesoría legal profesional. 
          Verifique siempre la vigencia de las disposiciones legales aplicables.
        </p>
      </div>
    </section>
  );
};

export default DocumentosLegales;
