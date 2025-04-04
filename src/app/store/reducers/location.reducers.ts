import { createReducer, on } from '@ngrx/store';
import { setLocation } from '../actions/location.actions';

export interface LocationState {
  latitude: number | null;
  longitude: number | null;
}

export const initialState: LocationState = {
  latitude: null,
  longitude: null,
};

export const locationReducer = createReducer(
  initialState,
  on(setLocation, (state, { latitude, longitude }) => ({
    ...state,
    latitude,
    longitude,
  }))
);
