import { DashedLineProps } from './dashed-lines-props'

import './dashed-lines.css'

export function DashedLines() {
  return (
    <>
      <DashedLine className="DashedLineHorizontal DashedLineHorizontalTop" />
      <DashedLine className="DashedLineHorizontal DashedLineHorizontalBottom" />
      <DashedLineVertical className="DashedLineVertical DashedLineVertical-1" />
      <DashedLineVertical className="DashedLineVertical DashedLineVertical-2" />
      <DashedLineVertical className="DashedLineVertical DashedLineVertical-3" />
      <DashedLineVertical className="DashedLineVertical DashedLineVertical-4" />
    </>
  )
}

export function DashedLine({ className }: DashedLineProps) {
  return (
    <svg className={className} fill="none">
      <defs>
        <pattern id=":S1:" patternUnits="userSpaceOnUse" width="16" height="1">
          <line
            className="DashedLine"
            x1="0"
            x2="16"
            y1="0.5"
            y2="0.5"
            strokeDasharray="2 2"
            strokeWidth="1.5"
            strokeOpacity="0.1"
            strokeLinejoin="round"
          ></line>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#:S1:)"></rect>
    </svg>
  )
}

export function DashedLineVertical({ className }: { className: string }) {
  return (
    <svg className={className} fill="none">
      <defs>
        <pattern id=":Sb:" patternUnits="userSpaceOnUse" width="1" height="16">
          <line
            className="DashedLine"
            x1="0.5"
            x2="0.5"
            y1="0"
            y2="16"
            strokeDasharray="2 2"
            strokeWidth="1.5"
            strokeOpacity="0.1"
            strokeLinejoin="round"
          ></line>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#:Sb:)"></rect>
    </svg>
  )
}
