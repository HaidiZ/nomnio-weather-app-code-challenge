import { createReducer, on } from '@ngrx/store';
import { updateSelectedLanguage, updateSelectedLocation, setLoading } from '../actions/app.actions';

export interface AppState {
  selectedLanguage: string;
  location: string;
  loadingState: boolean;
}

export const initialState: AppState = {
  selectedLanguage: 'EN',
  location: 'SELECT_LOCATION',
  loadingState: false,
};

export const appReducer = createReducer (
  initialState,
  on(updateSelectedLanguage, (state, { language }) => ({
    ...state, 
    selectedLanguage: language,
  })),
  on(updateSelectedLocation, (state, { location }) => ({
    ...state,
    location: location,
  })),
  on(setLoading, (state, { loading }) => ({
    ...state,
    loadingState: loading,
  }))
);

