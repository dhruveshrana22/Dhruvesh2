// store.js
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import {thunk} from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from '../rootreducer/rootreducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // Add any additional configuration options for redux-persist as needed
};

const persistedReducer = persistReducer(persistConfig, rootReducer );

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
);

const persistor = persistStore(store);

export { store, persistor };
