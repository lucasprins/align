import { User } from '@align/api-types'
import { IconComponentProps } from '@align/ui'

export interface ApplicationLayoutProps extends ApplicationLayoutApiProps {
  children?: React.ReactNode
  workspace: string
  user: User
}

export interface ApplicationLayoutApiProps {
  handleLogout: () => void
}

export interface WorkspaceSelectorProps {
  workspace: string
  user: User
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

export interface NavigationAvatarProps extends NavigationAvatarApiProps {
  workspace: string;
  user: User
}

export interface NavigationAvatarApiProps {
  handleLogout: () => void
}
