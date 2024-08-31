import { HTMLHeadingTag, TextAlignment } from '../../types'

export interface HeadingProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  as?: HTMLHeadingTag
  alignment?: TextAlignment
  size?: 1 | 2 | 3
}
