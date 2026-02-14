import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUnitApi, getUnitsApi } from '@utils/api';
import type { TUnit } from '@utils/types';

type TAssemblyState = {
	isLoading: boolean;
	error: string | undefined;
	currentUnit: TUnit | null;
	units: TUnit[] | [];
};

const initialState: TAssemblyState = {
	isLoading: false,
	error: undefined,
	currentUnit: null,
	units: [],
};

export const getUnit = createAsyncThunk('getUnit', async (unitId: string) =>
	getUnitApi(unitId)
);

export const getUnits = createAsyncThunk('getUnits', async () => getUnitsApi());

export const getInsulationGroups = createAsyncThunk(
	'getUnit',
	async (unitId: string) => getUnit(unitId)
);

const unitsSlice = createSlice({
	name: 'units',
	initialState,
	reducers: {
		clearCurrentUnit: (state) => {
			state.currentUnit = null;
		},
	},
	selectors: {
		selectUnit: (state) => state.currentUnit,
		selectUnits: (state) => state.units,
	},
	extraReducers: (builder) => {
		[getUnit, getUnits].forEach((thunk) => {
			builder.addCase(thunk.pending, (state) => {
				state.isLoading = true;
				state.error = undefined;
			});
			builder.addCase(thunk.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			});
		});
		builder.addCase(getUnit.fulfilled, (state, action) => {
			state.currentUnit = action.payload;
			state.isLoading = false;
		});
		builder.addCase(getUnits.fulfilled, (state, action) => {
			state.units = action.payload;
			state.isLoading = false;
		});
	},
});

export const { selectUnit, selectUnits } = unitsSlice.selectors;
export const { clearCurrentUnit } = unitsSlice.actions;
export default unitsSlice;
