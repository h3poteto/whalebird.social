import Head from 'next/head'
import { Quicksand } from 'next/font/google'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { Button, Container, Form, Toast, ToastContainer } from 'react-bootstrap'

import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'
import { useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

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

export default function Inquiry() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [body, setBody] = useState('')
  const [error, setError] = useState<string | null>(null)

  const { t } = useTranslation()
  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (loading) return false
    if (executeRecaptcha === undefined) return false

    setLoading(true)
    try {
      const token = await executeRecaptcha('Contact')

      const formValue = {
        email: email,
        message: body
      }
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          Object.assign({}, formValue, {
            token: token
          })
        )
      }

      const response = await fetch('/api/inquiry', options)
      const result = await response.json()
      if (response.status === 200) {
        console.debug(result)
        clear()
      } else {
        setError('Failed to send message')
      }
    } catch (err) {
      console.error(err)
      setError('Failed to send message')
    } finally {
      setLoading(false)
    }
    return false
  }

  const clear = () => {
    setEmail('')
    setBody('')
    setError(null)
  }

  return (
    <>
      <Head>
        <title>{t('inquiry.title')}</title>
      </Head>
      <main className={inter.className}>
        <Header />
        <ToastContainer position="top-center">
          <Toast show={error !== null} bg="danger">
            <Toast.Body>{error}</Toast.Body>
          </Toast>
        </ToastContainer>
        <div className={styles.titleheader}>
          <h1>{t('inquiry.title')}</h1>
        </div>
        <Container>
          <div style={{ marginTop: '4vh' }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>{t('inquiry.email')}</Form.Label>
                <Form.Control type="email" placeholder="contact@example.com" value={email} onChange={e => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="body">
                <Form.Label>{t('inquiry.body')}</Form.Label>
                <Form.Control as="textarea" rows={3} value={body} onChange={e => setBody(e.target.value)} />
              </Form.Group>
              <Button type="submit" disabled={loading}>
                {t('inquiry.submit')}
              </Button>
            </Form>
          </div>
        </Container>
      </main>
    </>
  )
}
