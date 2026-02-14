import { combineSlices, configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import {
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from 'react-redux';
import userSlice from './userSlice';
import assemblySlice from './assemblySlice';
import insulationSlice from './insulationSlice';
import unitsSlice from './unitsSlice';

const rootReducer = combineSlices(
	userSlice,
	assemblySlice,
	insulationSlice,
	unitsSlice
);

const store = configureStore({
	reducer: rootReducer,
	devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
