import { TextAlignment } from '../../types'

export interface TextProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {
  align?: TextAlignment
}
