import { FormState } from '@align/core'
import { Form, FormField } from '@align/core-react'

import {
  Box,
  Button,
  Card,
  Field,
  FieldError,
  FieldGroup,
  Fieldset,
  Flex,
  Heading,
  Input,
  Label,
  Stack,
  Text,
} from '@align/ui'

import { Authentication, AuthenticationView } from '../../authentication.domain'
import { AuthFullscreen } from '../../components/auth-full-screen/auth-full-screen'
import { DashedLines } from '../../components/dashed-lines/dashed-lines'

export const Register: AuthenticationView = ({ context: { registerForm }, setState }) => {
  return (
    <AuthFullscreen>
      <Box maxWidth="md">
        <Card>
          <DashedLines />

          <Form
            form={registerForm}
            setState={(updater) => setState(Authentication.Updaters.Core.registerForm(updater))}
          >
            {({ fieldProps }) => (
              <form onSubmit={(e) => e.preventDefault()}>
                <Flex direction="column" gap={6}>
                  <Box position="absolute" top="-9" left="1/2" translateXNeg="1/2">
                    <Stack gap={3}>
                      <Heading>Create an account</Heading>
                    </Stack>
                  </Box>

                  <Text>Making an account will allow you to join workspaces or create your own!</Text>

                  <Fieldset>
                    <FieldGroup>
                      <FormField field="email" {...fieldProps}>
                        {({ error, ...field }) => (
                          <Field className="relative">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" {...field} />

                            {error && <FieldError>{error}</FieldError>}
                          </Field>
                        )}
                      </FormField>

                      <FormField field="password" {...fieldProps}>
                        {({ error, ...field }) => (
                          <Field className="relative">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" {...field} />

                            {error && <FieldError>{error}</FieldError>}
                          </Field>
                        )}
                      </FormField>

                      <FormField field="confirmPassword" {...fieldProps}>
                        {({ error, ...field }) => (
                          <Field className="relative">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input id="confirmPassword" type="password" {...field} />

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
                    loading={FormState.Assert.isValidating(registerForm)}
                  >
                    Continue
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
