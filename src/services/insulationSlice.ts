import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getInsulationGroupsApi } from '@utils/api'
import type { TInsulationGroup, TInsulationItem } from '@utils/types'

type TInsulationState = {
	isLoading: boolean
	error: string | undefined
	insulGroups: TInsulationGroup[]
	currentGroup: TInsulationGroup | null
	currentItem: TInsulationItem | null
}

const initialState: TInsulationState = {
	isLoading: false,
	error: undefined,
	insulGroups: [],
	currentGroup: null,
	currentItem: null,
}

export const getInsulationGroups = createAsyncThunk(
	'getInsulationGroups',
	async () => getInsulationGroupsApi()
)

const insulationSlice = createSlice({
	name: 'insulation',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getInsulationGroups.fulfilled, (state, action) => {
			state.insulGroups = action.payload
			state.isLoading = false
		})
	},
})

export default insulationSlice
