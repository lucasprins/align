import { FormState } from '@align/core'
import { Form, FormField } from '@align/core-react'

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

import { useTheme } from '@/lib/theme'
import { Authentication, AuthenticationView } from '../../authentication.domain'
import { AuthFullscreen } from '../../components/auth-full-screen/auth-full-screen'
import { DashedLines } from '../../components/dashed-lines/dashed-lines'

import './create-workspace.css'

export const CreateWorkspace: AuthenticationView = ({ context: { createWorkspaceForm }, setState }) => {
  const { theme, setTheme } = useTheme()

  console.log(createWorkspaceForm)

  return (
    <AuthFullscreen>
      <Box maxWidth="md">
        <Card>
          <DashedLines />

          <Form
            form={createWorkspaceForm}
            setState={(updater) => setState(Authentication.Updaters.Core.createWorkspaceForm(updater))}
          >
            {({ fieldProps }) => (
              <form onSubmit={(e) => e.preventDefault()}>
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
                            <Input type="name" id="name" {...field} />
                            {error && <FieldError>{error}</FieldError>}
                          </Field>
                        )}
                      </FormField>

                      <FormField field="url" {...fieldProps}>
                        {({ error, ...field }) => (
                          <Field className="relative">
                            <Label htmlFor="url">Workspace URL</Label>

                            <Input id="url" className="pl-20" {...field} />
                            <span className="WorkspaceUrlPrefix">align.com/</span>

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
                    loading={FormState.Assert.isValidating(createWorkspaceForm)}
                    onClick={() => {
                      setState(Authentication.Updaters.Core.createWorkspaceForm(FormState.Updaters.toValidating()))

                      setTimeout(() => {
                        setState(Authentication.Updaters.Core.createWorkspaceForm(FormState.Updaters.toInvalid({})))
                      }, 2000)
                    }}
                  >
                    Create workspace
                  </Button>

                  <Button type="button" variant="dark__white" fullWidth onClick={() => setTheme('light')}>
                    Light
                  </Button>

                  <Button type="button" variant="dark__white" fullWidth onClick={() => setTheme('dark')}>
                    Dark
                  </Button>
                </Flex>
              </form>
            )}
          </Form>
        </Card>
      </Box>
    </AuthFullscreen>
  )
}
