import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useAppDispatch } from '../../redux/store';
import { loginUser } from '../../redux/CommonReducer';

const OnboardingScreen = () => {
  const dispatch = useAppDispatch();
  const login = () => {
    dispatch(loginUser({ token: 'sjkdfkdjfkj' }));
  };
  return (
    <View
      style={{
        display: 'flex',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>OnboardingScreen</Text>
      <Pressable onPress={login}>
        <Text>Login</Text>
      </Pressable>
    </View>
  );
};

export default OnboardingScreen;
