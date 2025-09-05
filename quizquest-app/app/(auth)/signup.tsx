import { View, Text } from 'react-native';
import React, { useState } from 'react';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import { router } from 'expo-router';
import TopAppBar from '@/components/navigation/TopAppBar';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { SignUpFormData } from '@/lib/types/auth/SignUpFormData';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import { registerUser } from '@/services/authServices';
import { createUserInDb } from '@/services/userServices';
import { Timestamp } from 'firebase/firestore';

const SignupScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const password = watch('password');

  const onSubmit: SubmitHandler<SignUpFormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      await registerUser(data);
      console.log('Registration successful');
    } catch (error) {
      setError("We couldn't create your account. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // TODO: Get correct copyright-free texture later
  const backgroundTexture = require('@/assets/textures/texture-16.png');
  return (
    <StandardSafeLayout bgTextureSrc={backgroundTexture}>
      <TopAppBar
        title="Signup"
        leftButtonIcon="back"
        leftButtonPress={() => router.back()}
        titleCenter
      />
      <View className="flex-1 items-center justify-center">
        {error && <Text className="text-red-500">{error}</Text>}
        <View className="flex w-full flex-col gap-2">
          <Controller
            control={control}
            name="username"
            rules={{
              required: 'Username is required',
              minLength: { value: 3, message: 'Username must be at least 3 characters long' },
              maxLength: { value: 20, message: 'Username must be less than 20 characters long' },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Label>Username</Label>
                <Input
                  placeholder="Username"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                />
              </>
            )}
          />
          {errors.username && <Text className="text-red-500">{errors.username.message}</Text>}
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Label>Email</Label>
                <Input
                  placeholder="Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </>
            )}
          />
          {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}

          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters long' },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Label>Password</Label>
                <Input
                  placeholder="Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              </>
            )}
          />
          {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}

          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: 'Confirm password is required',
              validate: (value) => value === password || 'Passwords do not match',
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Label>Confirm Password</Label>
                <Input
                  placeholder="Confirm Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              </>
            )}
          />
          {errors.confirmPassword && (
            <Text className="text-red-500">{errors.confirmPassword.message}</Text>
          )}

          <PrimaryBtn
            label={isLoading ? 'Creating Account...' : 'Sign Up'}
            variant="stone"
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          />
        </View>
      </View>
    </StandardSafeLayout>
  );
};

export default SignupScreen;
