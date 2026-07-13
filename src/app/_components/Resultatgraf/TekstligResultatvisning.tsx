import { Table } from "@navikt/ds-react";
import { SpørsmålResultatDto } from "@/app/_types/SpørsmålResultatDto";
import styles from "./resultatgraf.module.css";

export default function TekstligResultatvisning({
  spørsmål,
  farge,
  somSkjermleseralternativ = false,
}: {
  spørsmål: SpørsmålResultatDto;
  farge: string;
  somSkjermleseralternativ?: boolean;
}) {
  const totaltAntallSvar = spørsmål.svarListe.reduce(
    (sum, svar) => sum + svar.antallSvar,
    0,
  );

  if (totaltAntallSvar === 0) {
    return (
      <div className={styles.tekstvisning}>
        {somSkjermleseralternativ ? (
          <p>{spørsmål.tekst}: Ikke nok svar mottatt.</p>
        ) : (
          <>
            <h4 style={{ color: farge }}>{spørsmål.tekst}</h4>
            Ikke nok svar mottatt.
          </>
        )}
      </div>
    );
  }

  return (
    <div className={styles.tekstvisning}>
      {!somSkjermleseralternativ && (
        <h4 style={{ color: farge }}>{spørsmål.tekst}</h4>
      )}
      <Table
        size="small"
        aria-label={somSkjermleseralternativ ? spørsmål.tekst : undefined}
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Svar</Table.HeaderCell>
            <Table.HeaderCell>Antall svar</Table.HeaderCell>
            <Table.HeaderCell>Prosent</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {spørsmål.svarListe.map((svar) => (
            <Table.Row key={svar.id}>
              <Table.DataCell>{svar.tekst}</Table.DataCell>
              <Table.DataCell>{svar.antallSvar}</Table.DataCell>
              <Table.DataCell>
                {((svar.antallSvar / totaltAntallSvar) * 100).toFixed(1)}%
              </Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
