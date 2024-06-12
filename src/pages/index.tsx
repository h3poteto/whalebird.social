import Head from 'next/head'
import { Quicksand } from 'next/font/google'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { Button, Col, Container, Row } from 'react-bootstrap'

import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faComments, faGlobe } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const inter = Quicksand({ subsets: ['latin'] })

type Props = {
  locale: string
}

export async function getStaticProps({ locale }: Props) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}

export default function Home() {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{t('title')}</title>
      </Head>
      <main className={inter.className}>
        <Header />
        <div className={styles.main}>
          <h1>{t('title')}</h1>
          <h4 style={{ padding: '2vh' }}>{t('index.short_description')}</h4>
          <Button href={`/${router.locale}/downloads`}>{t('index.downloads')}</Button>
        </div>
        <div style={{ backgroundColor: '#ececec' }}>
          <Container>
            <Row>
              <Col>
                <div style={{ textAlign: 'center', padding: '4vh' }}>
                  <p style={{ fontSize: '64px' }}>
                    <FontAwesomeIcon icon={faBell} />
                  </p>
                  <h4>{t('index.features.desktop_notifications')}</h4>
                </div>
              </Col>
              <Col>
                <div style={{ textAlign: 'center', padding: '4vh' }}>
                  <p style={{ fontSize: '64px' }}>
                    <FontAwesomeIcon icon={faComments} />
                  </p>
                  <h4>{t('index.features.streamings')}</h4>
                </div>
              </Col>
              <Col>
                <div style={{ textAlign: 'center', padding: '4vh' }}>
                  <p style={{ fontSize: '64px' }}>
                    <FontAwesomeIcon icon={faGlobe} />
                  </p>
                  <h4>{t('index.features.many_sns')}</h4>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div>
          <Container>
            <Row style={{ margin: '4vh 0' }}>
              <Col>
                <h3>{t('index.description.supporting.title')}</h3>
                <ul style={{ margin: '2vh 0' }}>
                  <li>Mastodon</li>
                  <li>Pleroma</li>
                  <li>Friendica</li>
                  <li>Firefish</li>
                  <li>Gotosocial</li>
                </ul>
              </Col>
              <Col>
                <div style={{ position: 'relative', width: '600px', height: '360px' }}>
                  <Image src="/images/screenshot/home.png" alt="List" fill style={{ objectFit: 'contain' }} />
                </div>
              </Col>
            </Row>
            <Row style={{ margin: '4vh 0' }}>
              <Col>
                <div style={{ position: 'relative', width: '600px', height: '360px' }}>
                  <Image src="/images/screenshot/thread.png" alt="Home" fill style={{ objectFit: 'contain' }} />
                </div>
              </Col>
              <Col>
                <h3>{t('index.description.home.title')}</h3>
                <p style={{ margin: '2vh 0' }}>{t('index.description.home.body')}</p>
              </Col>
            </Row>
            <Row style={{ margin: '4vh 0' }}>
              <Col>
                <h3>{t('index.description.theme.title')}</h3>
                <p style={{ margin: '2vh 0' }}>{t('index.description.theme.body')}</p>
              </Col>
              <Col>
                <div style={{ position: 'relative', width: '600px', height: '360px' }}>
                  <Image src="/images/screenshot/dark.png" alt="Dark" fill style={{ objectFit: 'contain' }} />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className={styles.fedistar} style={{ padding: '8vh 0', borderTop: '1px solid #ececec', textAlign: 'center' }}>
          <h2>{t('index.fedistar.title')}</h2>
          <p>{t('index.fedistar.description')}</p>
          <Link href="https://fedistar.net">
            <div
              style={{
                border: '1px solid #ececec',
                borderRadius: '8px',
                display: 'flex',
                margin: '0 auto',
                textAlign: 'left',
                width: '380px'
              }}
            >
              <div className="icon">
                <Image src="/images/fedistar.png" alt="Fedistar" width={96} height={96} />
              </div>
              <div className="content" style={{ padding: '8px' }}>
                <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '0' }}>Fedistar</p>
                <p style={{ margin: '0' }}>Multi-column Fediverse client application for desktop</p>
              </div>
            </div>
          </Link>
        </div>
        <div style={{ backgroundColor: '#ececec', padding: '4vh 0' }}>
          <Container>
            <h3>{t('index.donate.title')}</h3>
            <p>{t('index.donate.description')}</p>
            <div>
              <Button href="https://github.com/sponsors/h3poteto">GitHub Sponsor</Button>
            </div>
            <div style={{ marginTop: '1vh' }}>
              <Button href="https://www.patreon.com/h3poteto" style={{ backgroundColor: '#FF424D', border: 'none', padding: '12px 24px' }}>
                <Image src="/images/patreon.png" alt="Patreon" width={108} height={22} />
              </Button>
            </div>
            <div style={{ marginTop: '1vh' }}>
              <Button href="https://liberapay.com/h3poteto" variant="link" style={{ padding: 0 }}>
                <Image src="/images/liberapay.png" alt="Liberapay" width={128} height={56} />
              </Button>
            </div>
          </Container>
        </div>
        <Footer />
      </main>
    </>
  )
}
