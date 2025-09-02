import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="welcome"
        options={{
          title: 'Welcome',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: 'Sign In',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: 'Sign Up',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="forgotPassEmail"
        options={{
          title: 'Forgot Password Email',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="forgotPassNew"
        options={{
          title: 'Create New Password',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
