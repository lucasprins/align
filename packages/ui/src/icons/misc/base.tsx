import { IconComponentProps } from '../../types'

export const IconBase: React.FC<IconComponentProps> = (props) => (
  <svg {...props} fill="none" viewBox="0 0 24 24">
    {props.children}
  </svg>
)
