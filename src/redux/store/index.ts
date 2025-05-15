import { combineReducers, configureStore } from '@reduxjs/toolkit';
import CommonReducer from '../CommonReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { useDispatch, useSelector } from 'react-redux';
import ApiReducer from '../ApiReducer';

const reducers = combineReducers({
  common: CommonReducer,
  [ApiReducer.reducerPath]: ApiReducer.reducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['common'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(ApiReducer.middleware),
});
export const persistor = persistStore(store);
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export default store;
