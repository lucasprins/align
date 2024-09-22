import { StringifyWithNegatives } from '@align/utility-types'

export type SlottableComponent = { asChild?: boolean }

export type HTMLHeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type TextAlignment = 'left' | 'center' | 'right' | 'justify' | 'start' | 'end'

export interface IconComponentProps extends Omit<React.ComponentProps<'svg'>, 'viewBox'> {}

export type Spacing = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type SpacingStringWithNegative = StringifyWithNegatives<Spacing>

export type Width =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | 'full'
  | 'min'
  | 'max'
  | 'fit'

export type TextSize =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl'

export type Fraction = '1/2' | '1/3' | '2/3' | '1/4' | '2/4' | '3/4' | 'full'

export interface LayoutProps {
  p?: Spacing
  px?: Spacing
  py?: Spacing
  pt?: Spacing
  pr?: Spacing
  pb?: Spacing
  pl?: Spacing
  width?: Width
  minWidth?: Width
  maxWidth?: Width
  height?: string
  minHeight?: string
  maxHeight?: string
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
  inset?: SpacingStringWithNegative | Fraction
  top?: SpacingStringWithNegative | Fraction
  right?: SpacingStringWithNegative | Fraction
  bottom?: SpacingStringWithNegative | Fraction
  left?: SpacingStringWithNegative | Fraction
  overflow?: 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'
  overflowX?: 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'
  overflowY?: 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'
  flexShrink?: 0 | 1
  translateX?: Fraction
  translateXNeg?: Fraction
  translateY?: Fraction
  translateYNeg?: Fraction
}
