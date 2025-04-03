import { createAction, props } from '@ngrx/store';

export const updateSelectedLanguage = createAction(
    '[App] Update Selected Language',
    props<{ language: string }>()
);

export const updateSelectedLocation = createAction(
    '[App] Update Selected Location',
    props<{ location: string }>()
);

export const setLoading = createAction(
    '[App] Set Loading',
    props<{ loading: boolean }>()
);


