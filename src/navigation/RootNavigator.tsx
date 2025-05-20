import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Home from '../screens/Home';
import { RootStackParamList } from './types';
import { ROUTES } from './constants';
import { useAppSelector } from '../redux/store';
import OnboardingScreen from '../screens/Onboarding';

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
