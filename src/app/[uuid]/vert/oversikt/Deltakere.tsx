import { PersonGroupIcon } from "@navikt/aksel-icons";
import styles from "./oversikt.module.css";
export default function Deltakere({ deltakere }: { deltakere: number }) {
  return (
    <div className={styles["tekst"]}>
      <PersonGroupIcon title="a11y-title" fontSize={"3rem"} />
      {deltakere}
    </div>
  );
}
