
import type {
	TAssemblyUnit,
	TAssemblyUnitPart,
	TAssemblyUnitPartsList,
	TInsulationGroup,
	TRegisterData,
	TUser,
	TUserCredData,
} from './types'

const API_URL = import.meta.env.VITE_API_URL;

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

const fetchData = async <T>(path: string, method?: 'POST' | 'PUT', data?: T): Promise<T> => {
	const options: RequestInit = {
		method: method || 'GET',
		headers: {
      'Content-Type': 'application/json'
    }
	}

	if (data) options.body = JSON.stringify(data);

	const res = await fetch(`${API_URL}/${path}`, options);
	const resData = await checkResponse<T>(res);

	if (resData) return resData;
	return Promise.reject(resData);
}

// User

export const createNewUserApi = async (data: TUser) => fetchData('users', 'POST', data);

export const registerUserEmailApi = async (data: TRegisterData) => {}

export const loginUserEmailApi = async (data: TUserCredData) => {}

export const logoutUserApi = async () => {}

export const getUserApi = async (userId: string): Promise<TUser> => fetchData(`users/${userId}`);

// Assembly units

export const getAssemblyUnitsListApi = async (): Promise<TAssemblyUnit[]> => fetchData('assemblyUnits');

export const getAssemblyUnitPartsListApi = async (): Promise<TAssemblyUnitPart[]> => fetchData('assemblyUnitParts');

export const getAssemblyUnitPartApi = async (partId: string): Promise<TAssemblyUnitPartsList> => fetchData(`assemblyUnitParts/${partId}`);

// Insulation group

export const getInsulationGroupsApi = async (): Promise<TInsulationGroup[]> => fetchData('insulationGroups');

export const addInsulationGroupApi = async (data: TInsulationGroup): Promise<TInsulationGroup> => fetchData(`insulationGroups`, 'POST', data);

export const updateInsulationGroupApi = async (groupId: string, data: TInsulationGroup): Promise<TInsulationGroup> => fetchData(`insulationGroups/${groupId}`, 'PUT', data);
