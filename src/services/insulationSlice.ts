import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getInsulationGroupsApi, getInsulationItemsApi } from '@utils/api'
import type { TInsulationGroup, TInsulationItem } from '@utils/types'

type TInsulationState = {
	isLoading: boolean
	error: string | undefined
	insulGroups: TInsulationGroup[]
	insulItems: TInsulationItem[]
	currentGroup: TInsulationGroup | null
	currentItem: TInsulationItem | null
}

const initialState: TInsulationState = {
	isLoading: false,
	error: undefined,
	insulGroups: [],
	insulItems: [],
	currentGroup: null,
	currentItem: null,
}

export const getInsulationItems = createAsyncThunk(
	'getInsulationItems',
	async () => getInsulationItemsApi()
)

export const getInsulationGroups = createAsyncThunk(
	'getInsulationGroups',
	async () => getInsulationGroupsApi()
)

const insulationSlice = createSlice({
	name: 'insulation',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getInsulationItems.fulfilled, (state, action) => {
			// state.insulItems = action.payload
			state.isLoading = false
		})
		builder.addCase(getInsulationGroups.fulfilled, (state, action) => {
			// state.insulGroups = action.payload
			state.isLoading = false
		})
	},
})

export default insulationSlice
