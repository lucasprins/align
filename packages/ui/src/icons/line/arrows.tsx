import { IconComponentProps } from '../../types'
import { IconBase } from '../misc'

export const IconArrowRight: React.FC<IconComponentProps> = (props) => (
  <IconBase {...props}>
    <path
      d="M5 12H19M19 12L12 5M19 12L12 19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
)

export const IconChevronDown: React.FC<IconComponentProps> = (props) => (
  <IconBase {...props}>
    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </IconBase>
)

export const IconChevronRight: React.FC<IconComponentProps> = (props) => (
  <IconBase {...props}>
    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </IconBase>
)

export const IconChevronSelectorVertical: React.FC<IconComponentProps> = (props) => (
  <IconBase {...props}>
    <path
      d="M7 15L12 20L17 15M7 9L12 4L17 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </IconBase>
)
