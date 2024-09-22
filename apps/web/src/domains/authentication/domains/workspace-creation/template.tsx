import { Template } from '@align/core-react'

import {
  WorkspaceCreationForeignMutationsExpected,
  WorkspaceCreationReadOnlyContext,
  WorkspaceCreationView,
  WorkspaceCreationWriteableState,
} from './domain'

import {
  Authentication,
  AuthenticationReadOnlyContext,
  AuthenticationWriteableState,
} from '../../authentication.domain'

import {
  WorkspaceCreationCreateWorkspaceRunner,
  WorkspaceCreationSubmitFormRunner,
  WorkspaceCreationValidateFormRunner,
  WorkspaceCreationWorkspaceUrlValidationRunner,
} from './coroutines'

export const WorkspaceCreationTemplate = Template.Default<
  WorkspaceCreationReadOnlyContext,
  WorkspaceCreationWriteableState,
  WorkspaceCreationForeignMutationsExpected,
  WorkspaceCreationView
>((props) => {
  return <props.view {...props} />
}).any([
  WorkspaceCreationCreateWorkspaceRunner,
  WorkspaceCreationWorkspaceUrlValidationRunner,
  WorkspaceCreationValidateFormRunner,
  WorkspaceCreationSubmitFormRunner,
])

export const WorkspaceCreationTemplateEmbedded = WorkspaceCreationTemplate.mapContext<
  AuthenticationReadOnlyContext & AuthenticationWriteableState
>((a) => a.workspaceCreation).mapState(Authentication.Updaters.Core.workspaceCreation)
