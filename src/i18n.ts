import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from '@/locales/en/common.json'
import ja from '@/locales/ja/common.json'

export const supportedLngs = ['en', 'ja'] as const
const STORAGE_KEY = 'i18nextLng'

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        en: { common: en },
        ja: { common: ja }
      },
      lng: 'en',
      fallbackLng: 'en',
      supportedLngs: [...supportedLngs],
      load: 'languageOnly',
      ns: ['common'],
      defaultNS: 'common',
      detection: {
        order: ['querystring', 'localStorage', 'navigator'],
        lookupLocalStorage: STORAGE_KEY,
        caches: []
      },
      interpolation: {
        escapeValue: false
      },
      react: {
        useSuspense: false
      }
    })
}

function isSupported(lng: string): lng is (typeof supportedLngs)[number] {
  return (supportedLngs as readonly string[]).includes(lng)
}

function resolveDetected(): (typeof supportedLngs)[number] | undefined {
  const detected = i18n.services.languageDetector?.detect()
  const list = Array.isArray(detected) ? detected : detected ? [detected] : []
  return list.map(l => l.split('-')[0]).find(isSupported)
}

function persist(lng: string): void {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, lng)
  }
}

export function detectLanguage(): void {
  const lng = resolveDetected()
  if (lng) {
    if (lng !== i18n.language) i18n.changeLanguage(lng)
    persist(lng)
  }
}

export function setLanguage(lng: string): void {
  if (!isSupported(lng)) return
  i18n.changeLanguage(lng)
  persist(lng)
}

export default i18n
