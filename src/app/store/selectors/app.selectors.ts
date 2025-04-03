import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../reducers/app.reducer';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectLanguage = createSelector(selectAppState, (state) => state.selectedLanguage);
export const selectLocation = createSelector(selectAppState, (state) => state.location);
export const selectLoadingState = createSelector(selectAppState, (state) => state.loadingState);
