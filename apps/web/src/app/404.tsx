import { useTranslation } from 'react-i18next'

const PageNotFound: React.FC = () => {
  const { t } = useTranslation(['common'])

  return <main>{t('common:404.message')}</main>
}

export default PageNotFound
