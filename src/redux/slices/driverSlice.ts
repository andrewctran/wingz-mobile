import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DriverState {
  location: {
    latitude: number;
    longitude: number;
  } | null;
}

const initialState: DriverState = {
  location: null,
};

const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {
    setDriverLocation(state, action: PayloadAction<{ latitude: number; longitude: number }>) {
      state.location = action.payload;
    },
  },
});

export const { setDriverLocation } = driverSlice.actions;
export default driverSlice.reducer;
