import { useMemo, useState } from 'react';

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';

import Button from '@components/Button';
import Input from '@components/Input';
import ScreenWrapper from '@components/ScreenWrapper';
import useStyles from '@hooks/useStyles';
import { ROUTES } from '../../navigation/constants';
import { RootStackParamList } from '../../navigation/types';
import { loginUser } from '@redux/CommonReducer';
import { useSignupMutation } from '@redux/ApiReducer';
import { useAppDispatch } from '@redux/store';
import { FONT } from '@utils/constants';
import {
  isValidEmail,
  sanitizeEmail,
  sanitizeName,
  sanitizePassword,
  validatePassword,
} from '@utils/validation';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, ROUTES.SIGNUP>;

const SignupScreen = ({ navigation }: Props) => {
  const { dynamicStyles, Layout, Colors } = useStyles(styles);
  const dispatch = useAppDispatch();
  const [signup, { isLoading }] = useSignupMutation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);
  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
    password?: boolean;
    confirmPassword?: boolean;
  }>({});

  const nameError = useMemo(() => {
    if (!touched.name) return undefined;
    const n = sanitizeName(name);
    if (!n) return 'Name is required.';
    return undefined;
  }, [name, touched.name]);

  const emailError = useMemo(() => {
    if (!touched.email) return undefined;
    const e = sanitizeEmail(email);
    if (!e) return 'Email is required.';
    if (!isValidEmail(e)) return 'Enter a valid email.';
    return undefined;
  }, [email, touched.email]);

  const passwordError = useMemo(() => {
    if (!touched.password) return undefined;
    const p = sanitizePassword(password);
    if (!p) return 'Password is required.';
    return validatePassword(p);
  }, [password, touched.password]);

  const confirmPasswordError = useMemo(() => {
    if (!touched.confirmPassword) return undefined;
    const p = sanitizePassword(password);
    const c = sanitizePassword(confirmPassword);
    if (!c) return 'Confirm password is required.';
    if (p !== c) return 'Passwords do not match.';
    return undefined;
  }, [confirmPassword, password, touched.confirmPassword]);

  const canSubmit = useMemo(() => {
    const n = sanitizeName(name);
    const e = sanitizeEmail(email);
    const p = sanitizePassword(password);
    const c = sanitizePassword(confirmPassword);
    return (
      !!n &&
      !!e &&
      isValidEmail(e) &&
      !!p &&
      !validatePassword(p) &&
      !!c &&
      p === c
    );
  }, [confirmPassword, email, name, password]);

  const onSubmit = async () => {
    Keyboard.dismiss();
    setSubmitError(undefined);
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });
    if (!canSubmit || isLoading) return;

    const n = sanitizeName(name);
    const e = sanitizeEmail(email);
    const p = sanitizePassword(password);

    try {
      const res = await signup({ name: n, email: e, password: p }).unwrap();
      if (res?.token) {
        dispatch(loginUser({ token: res.token, user: res.user }));
        return;
      }
      navigation.navigate(ROUTES.LOGIN);
    } catch (err) {
      const message =
        (err as { message?: string })?.message ||
        'Unable to sign up. Please try again.';
      setSubmitError(message);
    }
  };

  return (
    <ScreenWrapper
      style={dynamicStyles.screen}
      headerProps={{ title: 'Sign up' }}
    >
      <Pressable
        style={Layout.flex}
        onPress={Keyboard.dismiss}
        accessible={false}
      >
        <KeyboardAvoidingView
          style={Layout.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={dynamicStyles.card}>
            <Text style={[dynamicStyles.title, { fontFamily: FONT.BOLD }]}>
              Create account
            </Text>
            <Text
              style={[dynamicStyles.subtitle, { fontFamily: FONT.REGULAR }]}
            >
              Sign up to get started
            </Text>

            <View style={dynamicStyles.form}>
              <Input
                accessibilityLabel="Name"
                label="Name"
                value={name}
                onChangeText={text => {
                  setName(text);
                  setSubmitError(undefined);
                }}
                onBlur={() => setTouched(t => ({ ...t, name: true }))}
                autoCapitalize="words"
                textContentType="name"
                returnKeyType="next"
                error={nameError}
                placeholder="Your name"
              />

              <Input
                accessibilityLabel="Email"
                label="Email"
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  setSubmitError(undefined);
                }}
                onBlur={() => setTouched(t => ({ ...t, email: true }))}
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoComplete="email"
                returnKeyType="next"
                error={emailError}
                placeholder="you@example.com"
              />

              <Input
                accessibilityLabel="Password"
                label="Password"
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  setSubmitError(undefined);
                }}
                onBlur={() => setTouched(t => ({ ...t, password: true }))}
                secureTextEntry
                textContentType="newPassword"
                autoComplete="password-new"
                returnKeyType="next"
                error={passwordError}
                placeholder="Create a password"
              />

              <Input
                accessibilityLabel="Confirm password"
                label="Confirm password"
                value={confirmPassword}
                onChangeText={text => {
                  setConfirmPassword(text);
                  setSubmitError(undefined);
                }}
                onBlur={() =>
                  setTouched(t => ({ ...t, confirmPassword: true }))
                }
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="done"
                error={confirmPasswordError}
                placeholder="Re-enter password"
              />

              {!!submitError && (
                <Text
                  accessibilityRole="alert"
                  style={[dynamicStyles.submitError, { color: Colors.error }]}
                >
                  {submitError}
                </Text>
              )}

              <Button
                title="Sign up"
                onPress={onSubmit}
                loading={isLoading}
                disabled={!canSubmit}
                accessibilityLabel="Sign up"
              />

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Back to login"
                onPress={() => navigation.navigate(ROUTES.LOGIN)}
                disabled={isLoading}
                style={dynamicStyles.bottomLink}
              >
                <Text style={[dynamicStyles.link, { fontFamily: FONT.MEDIUM }]}>
                  Already have an account? Login
                </Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Pressable>
    </ScreenWrapper>
  );
};

export default SignupScreen;
