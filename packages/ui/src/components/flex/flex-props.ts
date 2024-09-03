import { SlottableComponent, Spacing } from '../../types'

export interface FlexProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    SlottableComponent {
  display?: 'none' | 'flex' | 'inline-flex'
  direction?: 'row' | 'column'
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between'
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
  gap?: Spacing
  rowGap?: Spacing
  columnGap?: Spacing
}
