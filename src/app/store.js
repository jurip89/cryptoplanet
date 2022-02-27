import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../features/crytoAPI';
import { newsApi } from '../features/cryptoNewsAPI';

export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer    
  },
});
