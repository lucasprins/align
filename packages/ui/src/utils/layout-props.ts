import { LayoutProps } from '../types'

export const filterOutLayoutProps = <T extends LayoutProps>(props: T) => {
  const {
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    position,
    inset,
    top,
    right,
    bottom,
    left,
    overflow,
    overflowX,
    overflowY,
    flexShrink,
    translateX,
    translateXNeg,
    translateY,
    translateYNeg,
    ...rest
  } = props

  return {
    layoutProps: {
      p,
      px,
      py,
      pt,
      pr,
      pb,
      pl,
      width,
      minWidth,
      maxWidth,
      height,
      minHeight,
      maxHeight,
      position,
      inset,
      top,
      right,
      bottom,
      left,
      overflow,
      overflowX,
      overflowY,
      flexShrink,
      translateX,
      translateXNeg,
      translateY,
      translateYNeg,
    },
    rest,
  }
}
export const getLayoutClsxObject = (props: LayoutProps) => {
  const clsxObject: {
    [key: string]: boolean
  } = {}

  Object.entries(props).forEach(([k, v]) => {
    if (!!v) {
      clsxObject[`${k}-${v}`] = v
    }
  })

  return clsxObject
}
