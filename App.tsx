import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/redux/store';
import ApplicationNavigator from './src/navigation/ApplicationNavigator';
import './src/localization';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ApplicationNavigator />
      </PersistGate>
    </Provider>
  );
}
