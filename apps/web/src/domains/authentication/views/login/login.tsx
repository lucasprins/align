import { AsyncState, FormState, Maybe } from '@align/core'
import { Form, FormField } from '@align/core-react'
import React from 'react'
import { Link, Redirect } from 'wouter'

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
  Logo,
  Stack,
  Switch,
} from '@align/ui'

import LoadingScreen from '@/components/loading-screen/loading-screen'
import { Authentication, AuthenticationView } from '../../authentication.domain'
import { AuthFullscreen } from '../../components/auth-full-screen/auth-full-screen'
import { DashedLines } from '../../components/dashed-lines/dashed-lines'

import { LoginForm } from '../../authentication.types'
import './login.css'

export const Login: AuthenticationView = ({ context, setState }) => {
  React.useEffect(() => {
    return () => {
      setState(Authentication.Updaters.Template.resetLoginForm())
    }
  }, [])

  if (AsyncState.isLoading(context.user.sync) && !FormState.Assert.isSubmitting(context.loginForm)) {
    return <LoadingScreen />
  }

  if (AsyncState.isLoaded(context.user.sync) && Maybe.isJust(context.user.sync.value)) {
    return <Redirect to={'/lucasprins/inbox'} />
  }

  console.log(context)

  return (
    <AuthFullscreen>
      <Box width="full" maxWidth="md">
        <Card>
          <DashedLines />
          <Logo className="LoginLogo" />

          <Form
            form={context.loginForm}
            setState={(updater) => setState(Authentication.Updaters.Core.loginForm(updater))}
          >
            {({ fieldProps }) => (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setState(Authentication.Updaters.Template.validateLoginForm())
                }}
              >
                <Flex direction="column" gap={6}>
                  <Heading size={2}>Sign in</Heading>

                  {Authentication.Operations.isLoginFailed(context) && (
                    <FieldError>
                      Please provide a valid email address and password. If you continue to have issues logging into
                      your account, contact our Support team.
                    </FieldError>
                  )}

                  <Fieldset>
                    <FieldGroup>
                      <FormField field="email" {...fieldProps}>
                        {({ error, ...field }) => (
                          <Field>
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" {...field} />
                            {error && <FieldError>{error}</FieldError>}
                          </Field>
                        )}
                      </FormField>

                      <FormField field="password" {...fieldProps}>
                        {({ error, ...field }) => (
                          <Field>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" autoComplete="off" {...field} />
                            {error && <FieldError>{error}</FieldError>}
                          </Field>
                        )}
                      </FormField>
                    </FieldGroup>
                  </Fieldset>

                  <Flex justify="between" align="center" wrap="wrap">
                    <Flex gap={2}>
                      <Switch
                        id="remember-me"
                        checked={context.loginForm.values.rememberMe}
                        onCheckedChange={(checked) => {
                          setState(
                            Authentication.Updaters.Core.loginForm(
                              FormState.Updaters.field<LoginForm>()('rememberMe', checked)
                            )
                          )
                        }}
                      />
                      <Label className="RememberMeLabel">Remember me</Label>
                    </Flex>

                    <Link to="forgot-password" className="ForgotPasswordLink">
                      Forgot password?
                    </Link>
                  </Flex>

                  <Stack rowGap={3}>
                    <Button
                      type="submit"
                      variant="dark__white"
                      fullWidth
                      disabled={!context.loginForm.isDirty}
                      loading={
                        FormState.Assert.isValidating(context.loginForm) ||
                        FormState.Assert.isSubmitting(context.loginForm)
                      }
                    >
                      Get started
                    </Button>

                    <Flex align="center" columnGap={3}>
                      <Divider />
                      <span className="AuthMethodsDividerLabel">OR</span>
                      <Divider />
                    </Flex>

                    <Button type="button" fullWidth variant="light" disabled>
                      Continue with passkey
                    </Button>
                  </Stack>
                </Flex>
              </form>
            )}
          </Form>
        </Card>
      </Box>

      <Box position="fixed" bottom="6" translateXNeg="1/2" left="1/2">
        <span className="SignupCTAText">Don't have an account?</span>{' '}
        <Link to="/sign-up" className="SignupCTALink">
          Sign up
        </Link>
      </Box>
    </AuthFullscreen>
  )
}
