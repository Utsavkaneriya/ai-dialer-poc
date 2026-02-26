import { configureStore } from "@reduxjs/toolkit";
import dialerReducer from "../features/dialer/dialerSlice";

export const store = configureStore({
    reducer: {
        dialer: dialerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;