import { EmailMessage } from 'cloudflare:email'
import { createMimeMessage } from 'mimetext'

interface Env {
  ASSETS: Fetcher
  EMAIL: SendEmail
  FROM_EMAIL: string
  TO_EMAIL: string
  RECAPTCHA_SECRET_KEY: string
}

const LOCALE_PREFIX = /^\/(en|ja)(\/.*)?$/

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (request.method == 'POST' && url.pathname == '/api/inquiry') {
      return handleInquiry(request, env)
    }

    // Legacy redirect from the old desktop app routes.
    if (url.pathname == '/desktop' || url.pathname.startsWith('/desktop/')) {
      return Response.redirect(`${url.origin}/`, 301)
    }

    // Redirect old locale-prefixed URLs (handled by next-i18next before the
    // migration) to the unprefixed path, carrying the language as a query param.
    const localeMatch = url.pathname.match(LOCALE_PREFIX)
    if (localeMatch) {
      const lng = localeMatch[1]
      const rest = localeMatch[2] ?? '/'
      return Response.redirect(`${url.origin}${rest}?lng=${lng}`, 301)
    }

    return env.ASSETS.fetch(request)
  }
} satisfies ExportedHandler<Env>

async function handleInquiry(request: Request, env: Env): Promise<Response> {
  const { email, message, token } = await request.json<{ email: string; message: string; token: string }>()

  // Verify reCAPTCHA.
  const recaptchaRequest = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `secret=${env.RECAPTCHA_SECRET_KEY}&response=${token}`
  })
  const recaptchaResponse = await recaptchaRequest.json<{ success: boolean; score: number; 'error-codes'?: string[] }>()
  if (!recaptchaResponse.success) {
    console.warn(recaptchaResponse['error-codes'])
    return new Response(JSON.stringify({}), { status: 500 })
  }
  if (recaptchaResponse.score < 0.5) {
    console.warn(`recaptcha score: ${recaptchaResponse.score}`)
    return new Response(JSON.stringify({}), { status: 500 })
  }

  const msg = createMimeMessage()
  const fromAddr = env.FROM_EMAIL.trim()
  const toAddr = env.TO_EMAIL.trim()

  msg.setSender({ name: 'Whalebird Inquiry', addr: fromAddr })
  msg.setRecipient(toAddr)
  msg.setSubject('Receive inquiry')
  msg.addMessage({
    contentType: 'text/plain',
    data: `Body: ${message}\n\nEmail: ${email}`
  })

  const emailMessage = new EmailMessage(fromAddr, toAddr, msg.asRaw())

  try {
    await env.EMAIL.send(emailMessage)
    return new Response(JSON.stringify({}), { status: 200 })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({}), { status: 500 })
  }
}
