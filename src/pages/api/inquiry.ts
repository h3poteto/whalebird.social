// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { SMTPClient } from 'emailjs'

type Data = {}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // ReCaptcha
  const serverSecretKey = `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body.token}`
  const recaptchaRequest = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: serverSecretKey
  })
  // failed: "{\n  \"success\": false,\n  \"error-codes\": [\n    \"missing-input-response\"\n  ]\n}"
  // success: "{\n  \"success\": true,\n  \"challenge_ts\": \"2020-06-16T14:17:18Z\",\n  \"hostname\": \"localhost\",\n  \"score\": 0.9,\n  \"action\": \"contact\"\n}"
  const recaptchaResponse = await recaptchaRequest.json()
  if (!recaptchaResponse.success) {
    console.warn(recaptchaResponse['error-codes'])
    res.status(500).json({})
    return
  }

  if (recaptchaResponse.score < 0.5) {
    console.warn(`recaptcha score: ${recaptchaResponse.score}`)
    res.status(500).json({})
    return
  }

  const client = new SMTPClient({
    user: process.env.EMAIL,
    password: process.env.PASSWORD,
    host: 'smtp.gmail.com',
    ssl: true
  })

  try {
    const message = await client.sendAsync({
      text: `Body: ${req.body.message}\n\nEmail: ${req.body.email}`,
      from: process.env.EMAIL as string,
      to: process.env.TO_EMAIL as string,
      subject: 'Receive inquiry'
    })
    console.debug(message)
    res.status(200).json({})
    return
  } catch (err) {
    console.error(err)
    res.status(500).json({})
    return
  }
}
