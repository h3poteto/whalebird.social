import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { SSRProvider } from 'react-bootstrap'

import '@/i18n'
import { detectLanguage } from '@/i18n'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    detectLanguage()
  }, [])

  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} language="en">
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </GoogleReCaptchaProvider>
  )
}
