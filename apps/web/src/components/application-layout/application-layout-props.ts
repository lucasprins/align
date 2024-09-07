import { IconComponentProps, IconProps } from '@align/ui'

export interface ApplicationLayoutProps {
  children?: React.ReactNode
  workspace: string
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
