import Head from "next/head";
import { Quicksand } from "@next/font/google";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Container } from "react-bootstrap";

import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import Link from "next/link";
import Footer from "@/components/Footer";

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

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("privacy_policy.title")}</title>
      </Head>
      <main className={inter.className}>
        <Header />
        <div className={styles.titleheader}>
          <h1>{t("privacy_policy.title")}</h1>
        </div>
        <Container>
          <div className="content" style={{ marginTop: "8vh" }}>
            <h1>Privacy Policy</h1>
            <p>
              We don't collect any data from you, but Whalebird needs to store
              some of it at local in order to enable certain features.{" "}
            </p>
            <hr />

            <h2>Information Collection</h2>
            <p>
              We don't collect your personal data, like email, password or
              cookie. Whalebird store some different types of information in
              your storage, but we don't collect these information.
            </p>
            <h3>Types of Data Stored</h3>
            <ul>
              <li>Access Token</li>
            </ul>
            <h4>Access Token</h4>
            <p>
              Whalebird stores Access Token in your storage to access Fediverse
              server. The Access Token does not include your personal data, but
              it can access your account of Fediverse.
            </p>
            <hr />
            <h2>Fediverse</h2>
            <p>
              Whalebird is a Fediverse client and as such it needs to make many
              requests to Fediverse servers. Please read your Fediverse server's
              privacy policy for more details on what they may do whith that
              data.
            </p>
            <hr />
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please{" "}
              <Link href="/contacts">Contact Us</Link>.
            </p>
          </div>
        </Container>
        <Footer />
      </main>
    </>
  );
}
