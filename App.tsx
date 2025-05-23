import RootNavigator from './src/navigation/RootNavigator';
import store, { persistor } from './src/redux/store';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './src/localization';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
}
