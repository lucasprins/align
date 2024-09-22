import { Flex, Logo, Text } from '@align/ui'
import { useTranslation } from 'react-i18next'

import './access-denied.css'

const AccessDenied: React.FC = () => {
  const { t } = useTranslation(['common'])

  return (
    <Flex className="AccessDenied" align="center" justify="center">
      <Flex direction="column" align="center" gap={5}>
        <Logo className="Logo" />
        <Text align="center" dangerouslySetInnerHTML={{ __html: t('common:accessDenied.message') }} />
      </Flex>
    </Flex>
  )
}

export default AccessDenied
