import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import { router } from 'expo-router';
import TopAppBar from '@/components/navigation/TopAppBar';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoginFormData } from '@/lib/types/auth/LoginFormData';
import { loginUser } from '@/services/authServices';

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      let user = await loginUser(data);
      console.log('Login successful');
    } catch (error) {
      setError("We couldn't log you in. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const backgroundTexture = require('@/assets/textures/bricks_castle.png');
  return (
    <StandardSafeLayout bgTexture={backgroundTexture} textureScale={4}>
      <TopAppBar
        title="Login"
        leftButtonIcon="back"
        leftButtonPress={() => router.back()}
        titleCenter
      />
      <View className="flex-1 items-center justify-center">
        <View className="flex w-full flex-col gap-2">
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

          <PrimaryBtn
            label={isLoading ? 'Logging In...' : 'Log In'}
            variant="stone"
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
          />
        </View>
      </View>
    </StandardSafeLayout>
  );
};

export default LoginScreen;
