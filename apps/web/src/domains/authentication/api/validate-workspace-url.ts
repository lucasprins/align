import { Http } from '@align/core-react'
import { ApiResultStatus, apiResultStatuses } from '@align/core'

export const validateWorkspaceUrl = () =>
  Http.mock<boolean, ApiResultStatus>(
    () => false,
    () => apiResultStatuses[1],
    0.9,
    0.1
  )
