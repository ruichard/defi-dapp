"use client";

import PerpsMarket from "./components/PerpsMarket";
import styles from "./page.module.css";

export default function Home() {
  return <main className={styles.main}>
    <PerpsMarket />
  </main>;
}
