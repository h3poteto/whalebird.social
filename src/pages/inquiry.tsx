import Head from "next/head";
import { Quicksand } from "@next/font/google";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Button, Container, Form } from "react-bootstrap";

import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";

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

export default function Inquiry() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("inquiry.title")}</title>
      </Head>
      <main className={inter.className}>
        <Header />
        <div className={styles.titleheader}>
          <h1>{t("inquiry.title")}</h1>
        </div>
        <Container>
          <div style={{ marginTop: "4vh" }}>
            <Form>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>{t("inquiry.email")}</Form.Label>
                <Form.Control type="email" placeholder="contact@example.com" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="body">
                <Form.Label>{t("inquiry.body")}</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
              <Button type="submit">{t("inquiry.submit")}</Button>
            </Form>
          </div>
        </Container>
      </main>
    </>
  );
}
