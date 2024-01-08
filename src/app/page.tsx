import TestIncrementer from "./components/TestIncrementer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <TestIncrementer />
    </main>
  );
}
