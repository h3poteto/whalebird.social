import Head from "next/head";
import { Quicksand } from "@next/font/google";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Button, Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

import styles from "@/styles/Home.module.css";

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
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#">{t("title")}</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/downloads">{t("menu.downloads")}</Nav.Link>
              <Nav.Link href="/contacts">{t("menu.contacts")}</Nav.Link>
              <Nav.Link href="/privacy_policy">
                {t("menu.privacy_policy")}
              </Nav.Link>
              <Nav.Link href="https://github.com/h3poteto/whalebird-desktop">
                {t("menu.repository")}
              </Nav.Link>
              <NavDropdown
                title={t("menu.language.title")}
                id="language-dropdown"
              >
                <NavDropdown.Item href="/en">
                  {t("menu.language.english")}
                </NavDropdown.Item>
                <NavDropdown.Item href="/ja">
                  {t("menu.language.japanese")}
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar>

        <div className={styles.main}>
          <h1>{t("title")}</h1>
          <h4 style={{ padding: "2vh" }}>{t("index.description")}</h4>
          <Button href="/downloads">{t("index.downloads")}</Button>
        </div>
      </main>
    </>
  );
}
