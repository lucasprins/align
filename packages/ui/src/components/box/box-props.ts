import { LayoutProps } from '../../types'

export interface BoxProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, LayoutProps {
  as?: 'div' | 'span' | 'ul' | 'li'
  display?: 'none' | 'inline' | 'inline-block' | 'block'
}
