import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { setLanguage } from "@/i18n";

export default function Header() {
  const { t } = useTranslation();

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">{t("title")}</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/downloads">{t("menu.downloads")}</Nav.Link>
          <Nav.Link href="/inquiry">{t("menu.contacts")}</Nav.Link>
          <Nav.Link href="/privacy_policy">{t("menu.privacy_policy")}</Nav.Link>
          <Nav.Link href="https://github.com/h3poteto/whalebird-desktop">
            {t("menu.repository")}
          </Nav.Link>
          <NavDropdown title={t("menu.language.title")} id="language-dropdown">
            <NavDropdown.Item onClick={() => setLanguage("en")}>
              {t("menu.language.english")}
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => setLanguage("ja")}>
              {t("menu.language.japanese")}
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
