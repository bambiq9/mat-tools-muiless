import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserApi } from '@utils/api';
import type { TUser } from '@utils/types';

export const getUser = createAsyncThunk(
	'getUser',
	async (userId: string) => await getUserApi(userId)
);

type UserState = {
	userData: TUser | null;
	isAuth: boolean;
	isLoading: boolean;
	error: string | undefined;
};

const initialState: UserState = {
	userData: null,
	isAuth: false,
	isLoading: false,
	error: undefined,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	selectors: {
		selectIsLoading: (state) => state.isLoading,
		selectIsAuth: (state) => state.isAuth,
		selectUser: (state) => state.userData,
	},
	extraReducers: () => {},
});

export const { selectIsLoading, selectIsAuth, selectUser } =
	userSlice.selectors;
export default userSlice;
