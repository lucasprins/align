import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import authenticationEN from '../translations/en/authentication.en.json'
import commonEN from '../translations/en/common.en.json'

export const defaultNamespace = 'common'

export const resources = {
  en: {
    authentication: authenticationEN,
    common: commonEN,
  },
} as const

const namespaces = ['common'] as const

i18n.use(initReactI18next).init({
  defaultNS: defaultNamespace,
  ns: namespaces,
  resources,
  fallbackLng: 'en',
  react: {
    useSuspense: false,
  },
})
