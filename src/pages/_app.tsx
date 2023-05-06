import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { SSRProvider } from 'react-bootstrap'

function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} language="en">
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </GoogleReCaptchaProvider>
  )
}

export default appWithTranslation(App)
