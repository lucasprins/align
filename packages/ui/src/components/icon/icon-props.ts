import { IconComponentProps } from '../../types'

export interface IconProps extends IconComponentProps {
  component: React.ElementType<IconComponentProps>
  // TODO : Add sizing and color constraints using pre-defined props
}
