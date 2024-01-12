import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Arbeidsgiverkartlegging - Testsider:</h1>
      <ol>
        <li>
          <a href="/karglegging-id/deltaker/ferdig">Deltaker/Ferdig</a>
        </li>
        <li>
          <a href="/karglegging-id/deltaker/sporsmal">Deltaker/Sporsmal</a>
        </li>
        <li>
          <a href="/karglegging-id/deltaker/landing">Deltaker/landing</a>
        </li>
        <li>
          <a href="/karglegging-id/vert/ferdig">Vert/Ferdig</a>
        </li>
        <li>
          <a href="/karglegging-id/vert/oversikt">Vert/Oversikt</a>
        </li>
        <li>
          <a href="/karglegging-id/vert/sporsmal">Vert/Sporsmal</a>
        </li>
        <li>
          <a href="/karglegging-id/vert/start">Vert/Start</a>
        </li>
      </ol>
    </main>
  );
}
