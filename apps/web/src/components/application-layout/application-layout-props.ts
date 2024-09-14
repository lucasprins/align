import { User } from '@align/api-types'
import { IconComponentProps } from '@align/ui'

export interface ApplicationLayoutProps {
  children?: React.ReactNode
  workspace: string
  user: User
  handleLogout: () => void
}

export interface NavigationLinkProps {
  href: string
  children?: React.ReactNode
}

export type NavigationButtonProps = { as?: 'button' | 'span' } & (
  | {
      kind: 'icon'
      icon: React.ElementType<IconComponentProps>
    }
  | {
      kind: 'custom'
      children: React.ReactNode
    }
)

export interface NavigationAvatarProps {
  handleLogout: () => void
}
