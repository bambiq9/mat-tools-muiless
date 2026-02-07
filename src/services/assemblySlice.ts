import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';
import {
	getAssemblyUnitPartApi,
	getAssemblyUnitPartsListApi,
	getAssemblyUnitsListApi,
	updateAssemblyUnitApi,
	deleteAssemblyUnitApi,
	addAssemblyUnitApi,
	getAssemblyUnitApi,
} from '@utils/api';
import type { TAssemblyUnit, TAssemblyUnitPart } from '@utils/types';
import type { RootState } from './store';

export const addAssemblyUnit = createAsyncThunk(
	'addAssemblyUnit',
	async (data: Omit<TAssemblyUnit, 'id'>, { dispatch }) => {
		const newUnit = await addAssemblyUnitApi(data);
		dispatch(getAssemblyUnitsList());
		return newUnit;
	}
);

export const getAssemblyUnitsList = createAsyncThunk(
	'getAssmblyUnitsList',
	async () => await getAssemblyUnitsListApi()
);

export const getAssemblyUnit = createAsyncThunk(
	'getAssmblyUnit',
	async (unitId: string) => await getAssemblyUnitApi(unitId)
);

export const updateAssemblyUnit = createAsyncThunk(
	'updateAssemblyUnit',
	async (
		{ id, data }: { id: string; data: Partial<TAssemblyUnit> },
		{ dispatch }
	) => {
		const updatedUnit = await updateAssemblyUnitApi(id, data);
		dispatch(getAssemblyUnitsList());
		return updatedUnit;
	}
);

export const getAssemblyUnitPartsList = createAsyncThunk(
	'getAssemblyUnitPartsList',
	async () => await getAssemblyUnitPartsListApi()
);

export const getAssemblyUnitPart = createAsyncThunk(
	'getAssemblyUnitPart',
	async (partId: string) => await getAssemblyUnitPartApi(partId)
);

export const toggleArchiveAssemblyUnits = createAsyncThunk(
	'toggleArchiveAssemblyUnits',
	async (unitIds: string[], { dispatch, getState }) => {
		const state = getState() as RootState;
		const units = selectUnitsList(state);

		await Promise.all(
			unitIds.map((id) => {
				const unit = units.find((u) => u.id === id);
				const newActiveStatus = !unit?.active;
				return updateAssemblyUnitApi(id, { active: newActiveStatus });
			})
		);

		dispatch(getAssemblyUnitsList());
	}
);

export const deleteAssemblyUnits = createAsyncThunk(
	'deleteAssemblyUnits',
	async (unitIds: string[], { dispatch }) => {
		await Promise.all(unitIds.map((id) => deleteAssemblyUnitApi(id)));
		dispatch(getAssemblyUnitsList());
	}
);

type TAssemblyState = {
	isLoading: boolean;
	error: string | undefined;
	assemblyUnit: TAssemblyUnit | null;
	assemblyUnitsList: TAssemblyUnit[] | [];
	assemblyUnitPart: TAssemblyUnitPart | null;
	assemblyUnitPartsList: TAssemblyUnitPart[] | [];
};

const initialState: TAssemblyState = {
	isLoading: false,
	error: undefined,
	assemblyUnit: null,
	assemblyUnitsList: [],
	assemblyUnitPart: null,
	assemblyUnitPartsList: [],
};

const assemblySlice = createSlice({
	name: 'assembly',
	initialState,
	reducers: {
		setUnit: (state, action: PayloadAction<string>) => {
			const unit = state.assemblyUnitsList.find(
				(unit) => unit.id === action.payload
			);
			if (unit) state.assemblyUnit = unit;
		},
	},
	selectors: {
		selectUnitPartsList: (state) => state.assemblyUnitPartsList,
		selectUnitPart: (state) => state.assemblyUnitPart,
		selectUnitsList: (state) => state.assemblyUnitsList,
		selectUnit: (state) => state.assemblyUnit,
		selectIsLoading: (state) => state.isLoading,
	},
	extraReducers: (builder) => {
		[
			getAssemblyUnitsList,
			getAssemblyUnit,
			updateAssemblyUnit,
			getAssemblyUnitPartsList,
			getAssemblyUnitPart,
			toggleArchiveAssemblyUnits,
			addAssemblyUnit,
			deleteAssemblyUnits,
		].forEach((thunk) => {
			builder.addCase(thunk.pending, (state) => {
				state.isLoading = true;
				state.error = undefined;
			});
			builder.addCase(thunk.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			});
		});
		builder
			.addCase(getAssemblyUnitsList.fulfilled, (state, action) => {
				state.assemblyUnitsList = action.payload;
				state.isLoading = false;
			})
			.addCase(getAssemblyUnit.fulfilled, (state, action) => {
				state.assemblyUnit = action.payload;
				state.isLoading = false;
			})
			.addCase(updateAssemblyUnit.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(getAssemblyUnitPartsList.fulfilled, (state, action) => {
				state.isLoading = false;
				state.assemblyUnitPartsList = action.payload;
			})
			.addCase(getAssemblyUnitPart.fulfilled, (state, action) => {
				state.isLoading = false;
				state.assemblyUnitPart = action.payload;
			})
			.addCase(toggleArchiveAssemblyUnits.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(deleteAssemblyUnits.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(addAssemblyUnit.fulfilled, (state) => {
				state.isLoading = false;
			});
	},
});

export const { setUnit } = assemblySlice.actions;
export const {
	selectUnitPartsList,
	selectUnitPart,
	selectUnit,
	selectUnitsList,
	selectIsLoading,
} = assemblySlice.selectors;
export default assemblySlice;
