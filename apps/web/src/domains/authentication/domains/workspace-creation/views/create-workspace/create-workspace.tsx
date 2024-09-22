import { AsyncState, Maybe } from '@align/core'
import { Form, FormField } from '@align/core-react'
import React from 'react'
import { Redirect } from 'wouter'

import {
  Box,
  Button,
  Card,
  Divider,
  Field,
  FieldError,
  FieldGroup,
  Fieldset,
  Flex,
  Heading,
  Icon,
  IconCheck,
  IconX,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Stack,
  Text,
} from '@align/ui'

import { AuthFullscreen } from '#/domains/authentication/components/auth-full-screen/auth-full-screen'
import { DashedLines } from '#/domains/authentication/components/dashed-lines/dashed-lines'
import { routes } from '#/lib/routes'
import { WorkspaceCreation, WorkspaceCreationView } from '../../domain'
import { WorkspaceUrlIndicatorProps } from './create-workspace-props'

import './create-workspace.css'

const CreateWorkspace: WorkspaceCreationView = ({ context, setState, foreignMutations }) => {
  if (
    AsyncState.isLoaded(context.result.sync) &&
    Maybe.isJust(context.result.sync.value) &&
    context.result.sync.value.value.isSuccess
  ) {
    const result = context.result.sync.value.value

    if (result.user) {
      foreignMutations.login(result.user)
      return <Redirect to={routes.workspace.inbox(result.workspace.url)} />
    } else {
      window.location.reload()
      return <Redirect to={routes.auth.login} />
    }
  }

  return <CreateWorkspaceView context={context} setState={setState} foreignMutations={foreignMutations} />
}

const CreateWorkspaceView: WorkspaceCreationView = ({ context, setState }) => {
  // const { theme, setTheme } = useTheme()

  const handleSubmitForm = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState(WorkspaceCreation.Updaters.Template.validateForm())
  }, [])

  return (
    <AuthFullscreen>
      <Box maxWidth="md">
        <Card>
          <DashedLines />

          <Form form={context.form} setState={(updater) => setState(WorkspaceCreation.Updaters.Core.form(updater))}>
            {({ fieldProps }) => (
              <form onSubmit={handleSubmitForm}>
                <Flex direction="column" gap={6}>
                  <Box position="absolute" top="-9" left="1/2" translateXNeg="1/2">
                    <Stack gap={3}>
                      <Heading>Create your workspace</Heading>
                    </Stack>
                  </Box>

                  <Text>Workspaces are collaborative spaces where teams can manage projects and issues together.</Text>

                  <Fieldset>
                    <FieldGroup>
                      <FormField field="name" {...fieldProps}>
                        {({ error, ...field }) => (
                          <Field>
                            <Label htmlFor="name">Workspace Name</Label>
                            <Input id="name" {...field} />

                            {error && <FieldError>{error}</FieldError>}
                          </Field>
                        )}
                      </FormField>

                      <FormField field="url" {...fieldProps}>
                        {({ error, value }) => (
                          <Field className="relative">
                            <Label htmlFor="url">Workspace URL</Label>
                            <Input
                              id="url"
                              className="WorkspaceUrlInput"
                              value={value.value}
                              onChange={(e) => {
                                setState(WorkspaceCreation.Updaters.Template.setWorkspaceFormUrl(e.target.value))
                              }}
                            />
                            <span className="WorkspaceUrlPrefix">align.com/</span>

                            <WorkspaceUrlIndicator
                              kind={WorkspaceCreation.Operations.getWorkspaceUrlAvailability(context)}
                            />

                            {WorkspaceCreation.Operations.isWorkspaceUrlTaken(context) && (
                              <FieldError>Workspace URL is already taken</FieldError>
                            )}

                            {error && <FieldError>{error}</FieldError>}
                          </Field>
                        )}
                      </FormField>

                      <Divider />

                      <FormField field="companySize" {...fieldProps}>
                        {({ error, value, onChange }) => (
                          <Field>
                            <Label htmlFor="companySize">How large is your company?</Label>

                            <Select value={value} onValueChange={onChange}>
                              <SelectTrigger id="companySize" className="">
                                <SelectValue placeholder="Select company size" />
                              </SelectTrigger>

                              <SelectContent>
                                <SelectItem value="justMe">Just me</SelectItem>
                                <SelectItem value="1-5">1-5</SelectItem>
                                <SelectItem value="5-25">5-25</SelectItem>
                                <SelectItem value="25-100">25-100</SelectItem>
                                <SelectItem value="100+">100+</SelectItem>
                                <SelectItem value="noShare">Prefer not to share</SelectItem>
                              </SelectContent>
                            </Select>

                            {error && <FieldError>{error}</FieldError>}
                          </Field>
                        )}
                      </FormField>

                      <FormField field="role" {...fieldProps}>
                        {({ error, value, onChange }) => (
                          <Field>
                            <Label htmlFor="role">What is your role?</Label>

                            <Select value={value} onValueChange={onChange}>
                              <SelectTrigger id="role" className="">
                                <SelectValue placeholder="Select your role" />
                              </SelectTrigger>

                              <SelectContent>
                                <SelectItem value="founder">Founder or leadership</SelectItem>
                                <SelectItem value="softwareEngineer">Software engineer</SelectItem>
                                <SelectItem value="designer">Designer</SelectItem>
                                <SelectItem value="5-25">Product manager</SelectItem>
                                <SelectItem value="operations">Operations</SelectItem>
                                <SelectItem value="freelancer">Freelancer</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                                <SelectItem value="noShare">Prefer not to share</SelectItem>
                              </SelectContent>
                            </Select>

                            {error && <FieldError>{error}</FieldError>}
                          </Field>
                        )}
                      </FormField>
                    </FieldGroup>
                  </Fieldset>

                  <Button
                    type="submit"
                    variant="dark__white"
                    fullWidth
                    disabled={!WorkspaceCreation.Operations.canSubmitForm(context)}
                    loading={WorkspaceCreation.Operations.isFormLoading(context)}
                  >
                    Create workspace
                  </Button>

                  {/* <Button type="button" variant="dark__white" fullWidth onClick={() => setTheme('light')}>
                    Light
                  </Button>

                  <Button type="button" variant="dark__white" fullWidth onClick={() => setTheme('dark')}>
                    Dark
                  </Button> */}
                </Flex>
              </form>
            )}
          </Form>
        </Card>
      </Box>
    </AuthFullscreen>
  )
}

const WorkspaceUrlIndicator: React.FC<WorkspaceUrlIndicatorProps> = ({ kind }) => {
  if (kind === 'unknown') return null

  return (
    <Flex className="WorkspaceUrlIndicator" align="center" justify="center" data-status={kind}>
      {kind === 'available' ? <Icon component={IconCheck} /> : kind === 'taken' && <Icon component={IconX} />}
    </Flex>
  )
}

export default CreateWorkspace
