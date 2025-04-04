import { createAction, props } from '@ngrx/store';

export const fetchCurrentLocation = createAction(
  '[Location] Fetch Current Location'
);

export const setLocation = createAction(
  '[Location] Set Location',
  props<{ latitude: number | null, longitude: number | null }>()
);
