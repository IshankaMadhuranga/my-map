import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./reducers/locationSlice";
import { createEpicMiddleware } from "redux-observable";
import rootEpic from "./epics";

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    locations: locationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
