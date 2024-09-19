import { AsyncState, Maybe } from '@align/core'
import { Form, FormField } from '@align/core-react'
import React from 'react'
import { Link } from 'wouter'

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

import { AuthFullscreen } from '@/domains/authentication/components/auth-full-screen/auth-full-screen'
import { DashedLines } from '@/domains/authentication/components/dashed-lines/dashed-lines'
import { RegistrationError } from '@align/api-types'
import { Registration, RegistrationView } from '../registration.domain'

import './sign-up.css'

export const SignUp: RegistrationView = ({ context, setState, foreignMutations }) => {
  React.useEffect(() => {
    return () => {
      setState(Registration.Updaters.Template.cleanup())
    }
  }, [])

  if (
    AsyncState.isLoaded(context.result.sync) &&
    Maybe.isJust(context.result.sync.value) &&
    context.result.sync.value.value.isSuccess
  ) {
    foreignMutations.login(context.result.sync.value.value.user)
  }

  return <SignUpView context={context} setState={setState} foreignMutations={foreignMutations} />
}

export const SignUpView: RegistrationView = ({ context, setState }) => {
  const handleSubmitForm = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState(Registration.Updaters.Template.validateForm())
  }, [])

  return (
    <AuthFullscreen>
      <Box width="full" maxWidth="md">
        <Card>
          <DashedLines />

          <Form form={context.form} setState={(updater) => setState(Registration.Updaters.Core.form(updater))}>
            {({ fieldProps }) => (
              <form onSubmit={handleSubmitForm}>
                <Flex direction="column" gap={6}>
                  <Box
                    className="SignUpHeader"
                    width="full"
                    maxWidth="sm"
                    position="absolute"
                    left="1/2"
                    translateXNeg="1/2"
                  >
                    <Stack gap={3}>
                      <Heading>Create an account</Heading>
                      <Text>Making an account will allow you to join workspaces or create your own!</Text>
                    </Stack>
                  </Box>

                  {AsyncState.isLoaded(context.result.sync) &&
                    Maybe.isJust(context.result.sync.value) &&
                    !context.result.sync.value.value.isSuccess && (
                      <RegistrationErrorMessage error={context.result.sync.value.value.error} />
                    )}

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
                    disabled={!Registration.Operations.canSubmitForm(context)}
                    loading={Registration.Operations.isFormLoading(context)}
                  >
                    Continue
                  </Button>
                </Flex>
              </form>
            )}
          </Form>
        </Card>
      </Box>

      <LoginCTA />
    </AuthFullscreen>
  )
}

const RegistrationErrorMessage = ({ error }: { error: RegistrationError }) => {
  const ErrorMessage: React.ReactNode = (() => {
    switch (error) {
      case 'DuplicateEmail': {
        return <>The email you provided has already been used to create an account. Please use a different one.</>
      }

      case 'InvalidEmail': {
        return <>The email address you provided is not valid.</>
      }

      default: {
        return <>An unknown error has occured, please try again later.</>
      }
    }
  })()

  return <FieldError>{ErrorMessage}</FieldError>
}

const LoginCTA = () => {
  return (
    <Box position="fixed" bottom="6" translateXNeg="1/2" left="1/2">
      <span className="SignupCTAText">Already have an account?</span>{' '}
      <Link to="/login" className="SignupCTALink">
        Sign in
      </Link>
    </Box>
  )
}
