import { useAppSelector } from '@redux/store';
import Home from '@screens/Home';
import OnboardingScreen from '@screens/Onboarding';

import { ROUTES } from './constants';
import { RootStackParamList } from './types';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const userToken = useAppSelector(state => state.common.userToken);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            {userToken ? (
              <Stack.Group>
                <Stack.Screen name={ROUTES.HOME} component={Home} />
              </Stack.Group>
            ) : (
              <Stack.Group>
                <Stack.Screen
                  name={ROUTES.ONBOARDING}
                  component={OnboardingScreen}
                />
              </Stack.Group>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
export default RootNavigator;
