import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { projectApi } from "../services/projects";

const rootReducer = combineReducers({
  [projectApi.reducerPath]: projectApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(projectApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
