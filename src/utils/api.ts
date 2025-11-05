
import type {
	TRegisterData,
	TUser,
	TUserCredData,
} from './types'

export const createNewUserApi = async (data: TUser) => {};

export const registerUserEmailApi = async (data: TRegisterData) => {}

export const loginUserEmailApi = async (data: TUserCredData) => {}

export const logoutUserApi = async () => {}

export const getUserApi = async (userId: string) => {};

export const getAssemblyUnitsListApi = async () => {};

export const getAssemblyUnitPartsListApi = async () => {};

export const getAssemblyUnitPartApi = async (partId: string) => {}

export const getInsulationItemsApi = async () => {};

export const getInsulationGroupsApi = async () => {};
