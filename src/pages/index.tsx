import Head from "next/head";
import { Quicksand } from "@next/font/google";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Button } from "react-bootstrap";

import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";

const inter = Quicksand({ subsets: ["latin"] });

type Props = {
  locale: string;
};

export async function getStaticProps({ locale }: Props) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("title")}</title>
      </Head>
      <main className={inter.className}>
        <Header />
        <div className={styles.main}>
          <h1>{t("title")}</h1>
          <h4 style={{ padding: "2vh" }}>{t("index.description")}</h4>
          <Button href="/downloads">{t("index.downloads")}</Button>
        </div>
      </main>
    </>
  );
}
