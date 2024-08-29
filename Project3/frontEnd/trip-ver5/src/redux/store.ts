import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { AuthReducer } from './loginReducer';
import { VacationReducer } from './VacationReducer';
import { FavoriteReducer } from './FavoriteReducer';

const rootReducer = combineReducers({
  login: AuthReducer,
  vacation: VacationReducer,
  favorites: FavoriteReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({ serializableCheck: false }),
});
