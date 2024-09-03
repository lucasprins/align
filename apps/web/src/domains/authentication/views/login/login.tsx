import { FormState, Updater } from '@align/core'
import { FormField } from '@align/core-react'
import React from 'react'
import { Link } from 'wouter'

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

import { Authentication, AuthenticationView, LoginForm } from '../../authentication.domain'
import { AuthFullscreen } from '../../components/auth-full-screen/auth-full-screen'
import { DashedLines } from '../../components/dashed-lines/dashed-lines'

import './login.css'

export const Login: AuthenticationView = ({ context: { loginForm }, setState, foreignMutations }) => {
  const [rememberMe, setRememberMe] = React.useState<boolean>(false)

  const setFormState = (updater: Updater<FormState<LoginForm>>) =>
    setState(Authentication.Updaters.Core.loginForm(updater))

  // if (AsyncState.isLoading(context.user.response)) {
  //   return null
  // }

  // if (!AsyncState.isLoaded(context.user.response)) {
  //   return <Redirect href="register" />
  // }

  console.log(loginForm)
  return (
    <AuthFullscreen>
      <Box width="full" maxWidth="md">
        <Card>
          <DashedLines />
          <Logo className="LoginLogo" />

          <form
            onSubmit={(e) => {
              e.preventDefault()
              setState(Authentication.Updaters.Core.loginForm(FormState.Updaters.toSubmitting()))
            }}
          >
            <Flex direction="column" gap={6}>
              <Heading size={2}>Sign in</Heading>

              <Fieldset>
                <FieldGroup>
                  <FormField form={loginForm} field="email" setState={setFormState}>
                    {({ error, ...field }) => (
                      <Field>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" {...field} />
                        {error && <FieldError>{error}</FieldError>}
                      </Field>
                    )}
                  </FormField>

                  <FormField form={loginForm} field="password" setState={setFormState}>
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
                  <Switch id="remember-me" checked={rememberMe} onCheckedChange={setRememberMe} />
                  <Label className="RememberMeLabel">Remember me</Label>
                </Flex>

                <Link to="forgot-password" className="ForgotPasswordLink">
                  Forgot password?
                </Link>
              </Flex>

              <Stack rowGap={3}>
                <Button type="submit" variant="dark__white" fullWidth disabled={!loginForm.isDirty}>
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
