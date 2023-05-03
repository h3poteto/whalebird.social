import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export default function Header() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">{t("title")}</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href={`/${router.locale}/downloads`}>
            {t("menu.downloads")}
          </Nav.Link>
          <Nav.Link href={`/${router.locale}/contacts`}>
            {t("menu.contacts")}
          </Nav.Link>
          <Nav.Link href={`/${router.locale}/privacy_policy`}>
            {t("menu.privacy_policy")}
          </Nav.Link>
          <Nav.Link href="https://github.com/h3poteto/whalebird-desktop">
            {t("menu.repository")}
          </Nav.Link>
          <NavDropdown title={t("menu.language.title")} id="language-dropdown">
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
  );
}
