import { View, Text, SafeAreaView, KeyboardAvoidingView, ImageBackground } from 'react-native';
import React from 'react';
import { PrimaryBtn } from '@/components/buttons/standard/PrimaryBtn';
import { router } from 'expo-router';
import Heading from '@/components/typography/Heading';
import TopAppBar from '@/components/navigation/TopAppBar';
import StandardSafeLayout from '@/components/layout/StandardSafeLayout';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoginFormData } from '@/lib/types/auth/LoginFormData';

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const onSubmit: SubmitHandler<LoginFormData> = (data) => console.log(data);

  // TODO: Get correct copyright-free texture later
  const backgroundTexture = require('@/assets/textures/texture-16.png');
  return (
    <StandardSafeLayout bgTextureSrc={backgroundTexture}>
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

          <PrimaryBtn label="Log In" variant="stone" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </StandardSafeLayout>
  );
};

export default LoginScreen;
