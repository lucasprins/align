import { Flex, Logo, Text } from '@align/ui'
import { useTranslation } from 'react-i18next'

const PageNotFound: React.FC = () => {
  const { t } = useTranslation(['common'])

  return (
    <Flex className="AccessDenied" align="center" justify="center">
      <Flex direction="column" align="center" gap={5}>
        <Logo className="Logo" />
        <Text align="center">{t('common:404.message')}</Text>
      </Flex>
    </Flex>
  )
}

export default PageNotFound
