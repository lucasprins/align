import { Flex, Logo } from '@align/ui'
import React from 'react'

import './loading-screen.css'

const LoadingScreen: React.FC = () => {
  const [showLogo, setShowLogo] = React.useState(false)

  React.useEffect(() => {
    const logoTimeoutId = setTimeout(() => {
      setShowLogo(true)
    }, 1000)

    return () => {
      clearTimeout(logoTimeoutId)
    }
  }, [])

  return (
    <Flex className="LoadingScreen" align="center" justify="center">
      <Flex direction="column" align="center" gap={5}>
        {showLogo && <Logo className="LoadingLogo" />}
      </Flex>
    </Flex>
  )
}

export default LoadingScreen
