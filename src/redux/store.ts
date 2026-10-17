import { configureStore } from '@reduxjs/toolkit';
import { onboardingApi } from './api/onboardingApi';
import onboardingReducer from './slices/onboardingSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [onboardingApi.reducerPath]: onboardingApi.reducer,
      onboarding: onboardingReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore RTK Query actions or File/Blob payload checks if needed
          ignoredActions: [
            'onboardingApi/executeMutation/pending',
            'onboardingApi/executeMutation/fulfilled',
          ],
        },
      }).concat(onboardingApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
