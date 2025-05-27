import { useEffect } from 'react';

import { preloadFonts } from '@utils/constants';
import { preloadImages } from '@utils/images';

import RootNavigator from './src/navigation/RootNavigator';
import store, { persistor } from './src/redux/store';
import './src/localization';

import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

SplashScreen.preventAutoHideAsync();

export default function App() {
  // Preload images and fonts before rendering the app
  // This ensures that the app is ready to display content without a loading screen
  useEffect(() => {
    (async () => {
      await Promise.all([preloadImages(), preloadFonts()]);
      SplashScreen.hideAsync();
    })();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
}
