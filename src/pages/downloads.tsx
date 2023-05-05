import Head from "next/head";
import { Quicksand } from "@next/font/google";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";

import styles from "@/styles/Home.module.css";
import Header from "@/components/Header";
import Link from "next/link";
import { Octokit } from "@octokit/rest";
import Image from "next/image";

const octokit = new Octokit();
const inter = Quicksand({ subsets: ["latin"] });

type ReleaseData = {
  url: string;
  name: string;
};

type Props = {
  locale: string;
  release: {
    rpm: ReleaseData | null;
    tar: ReleaseData | null;
    appImage: ReleaseData | null;
    deb: ReleaseData | null;
  };
};

export async function getStaticProps({ locale }: Props) {
  const {
    data: { assets },
  } = await octokit.repos.getLatestRelease({
    owner: "h3poteto",
    repo: "whalebird-desktop",
  });

  const assetPerPlatforms = {
    rpm: assets.find((asset) => asset.name.includes("rpm")),
    tar: assets.find((asset) => asset.name.includes("x64.tar.bz2")),
    appImage: assets.find((asset) => asset.name.includes("AppImage")),
    deb: assets.find((asset) => asset.name.includes("deb")),
  };

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      release: {
        rpm: assetPerPlatforms.rpm
          ? {
              url: assetPerPlatforms.rpm.browser_download_url,
              name: assetPerPlatforms.rpm.name,
            }
          : null,
        tar: assetPerPlatforms.tar
          ? {
              url: assetPerPlatforms.tar.browser_download_url,
              name: assetPerPlatforms.tar.name,
            }
          : null,
        appImage: assetPerPlatforms.appImage
          ? {
              url: assetPerPlatforms.appImage.browser_download_url,
              name: assetPerPlatforms.appImage.name,
            }
          : null,
        deb: assetPerPlatforms.deb
          ? {
              url: assetPerPlatforms.deb.browser_download_url,
              name: assetPerPlatforms.deb.name,
            }
          : null,
      },
    },
  };
}

export default function Downloads(props: Props) {
  const { t } = useTranslation();

  const copyClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <>
      <Head>
        <title>{t("downloads.title")}</title>
      </Head>
      <main className={inter.className}>
        <Header />
        <div className={styles.titleheader}>
          <h1>{t("downloads.title")}</h1>
        </div>
        <Container>
          <div style={{ marginTop: "8vh" }}>
            <h2 style={{ borderBottom: "1px solid #cfcfcf" }}>Windows</h2>
            <div style={{ margin: "8px 0" }}>
              <Link
                href="https://apps.microsoft.com/store/detail/whalebird/9NBW4CSDV5HC"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/windows_store.svg"
                  alt="Download from Microsoft Store"
                  width={133}
                  height={48}
                />
              </Link>
            </div>
          </div>
          <div style={{ marginTop: "2vh" }}>
            <h2 style={{ borderBottom: "1px solid #cfcfcf" }}>MacOS</h2>
            <div style={{ margin: "8px 0" }}>
              <div
                style={{
                  backgroundColor: "var(--bs-gray-dark)",
                  color: "var(--bs-gray-300)",
                  width: "540px",
                  padding: "8px 0 8px 12px",
                  borderRadius: "4px",
                  margin: "8px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>$ brew install --cask whalebird</span>
                <Button
                  variant="link"
                  onClick={() => copyClipboard("brew install --cask whalebird")}
                >
                  <FontAwesomeIcon
                    icon={faClipboard}
                    style={{ color: "gray" }}
                  />
                </Button>
              </div>
              <Link
                href="https://apps.apple.com/us/app/whalebird/id6445864587"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/app_store_link.svg"
                  alt="Download from Mac App Store"
                  width={187}
                  height={48}
                />
              </Link>
            </div>
          </div>
          <div style={{ marginTop: "2vh" }}>
            <h2 style={{ borderBottom: "1px solid #cfcfcf" }}>Linux</h2>
            <div style={{ margin: "8px 0" }}>
              <div
                style={{
                  backgroundColor: "var(--bs-gray-dark)",
                  color: "var(--bs-gray-300)",
                  width: "540px",
                  padding: "8px 0 8px 12px",
                  borderRadius: "4px",
                  margin: "8px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>$ yay -S whalebird</span>
                <Button
                  variant="link"
                  onClick={() => copyClipboard("yay -S fedistar-bin")}
                >
                  <FontAwesomeIcon
                    icon={faClipboard}
                    style={{ color: "gray" }}
                  />
                </Button>
              </div>
              <div
                style={{
                  backgroundColor: "var(--bs-gray-dark)",
                  color: "var(--bs-gray-300)",
                  width: "540px",
                  padding: "8px 0 8px 12px",
                  borderRadius: "4px",
                  margin: "8px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>
                  $ flatpak install flathub social.whalebird.WhalebirdDesktop
                </span>
                <Button
                  variant="link"
                  onClick={() =>
                    copyClipboard(
                      "flatpak install flathub social.whalebird.WhalebirdDesktop"
                    )
                  }
                >
                  <FontAwesomeIcon
                    icon={faClipboard}
                    style={{ color: "gray" }}
                  />
                </Button>
              </div>
              <Link
                href="https://snapcraft.io/whalebird"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/snap-store.svg"
                  alt="Download from Snap Store"
                  width={156}
                  height={48}
                />
              </Link>
              {props.release.appImage && (
                <div style={{ marginTop: "1vh" }}>
                  <Button href={props.release.appImage.url}>
                    {props.release.appImage.name}
                  </Button>
                </div>
              )}
              {props.release.deb && (
                <div style={{ marginTop: "1vh" }}>
                  <Button href={props.release.deb.url}>
                    {props.release.deb.name}
                  </Button>
                </div>
              )}
              {props.release.rpm && (
                <div style={{ marginTop: "1vh" }}>
                  <Button href={props.release.rpm.url}>
                    {props.release.rpm.name}
                  </Button>
                </div>
              )}
              {props.release.tar && (
                <div style={{ marginTop: "1vh" }}>
                  <Button href={props.release.tar.url}>
                    {props.release.tar.name}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
