import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface DialerState {
    phoneNumber: string;
    callStatus: "idle" | "calling" | "connected" | "disconnected";
}

const initialState: DialerState = {
    phoneNumber: "",
    callStatus: "idle",
};

const dialerSlice = createSlice({
    name: "dialer",
    initialState,
    reducers: {
        setPhoneNumber: (state, action: PayloadAction<string>) => {
            state.phoneNumber = action.payload;
        },
        setCallStatus: (
            state,
            action: PayloadAction<DialerState["callStatus"]>
        ) => {
            state.callStatus = action.payload;
        },
        resetDialer: (state) => {
            state.phoneNumber = "";
            state.callStatus = "idle";
        },
    },
});

export const { setPhoneNumber, setCallStatus, resetDialer } =
    dialerSlice.actions;

export default dialerSlice.reducer;