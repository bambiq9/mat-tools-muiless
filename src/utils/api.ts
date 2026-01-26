import type {
	TAssemblyUnit,
	TAssemblyUnitPart,
	TInsulationGroup,
	TUser,
} from './types';

const API_URL = import.meta.env.VITE_API_URL;

const checkResponse = <T>(res: Response): Promise<T> =>
	res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

const fetchData = async <T>(
	path: string,
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
	data?: T | Partial<T>
): Promise<T> => {
	const options: RequestInit = {
		method,
		headers: {
			'Content-Type': 'application/json',
		},
	};

	if (data) options.body = JSON.stringify(data);

	const res = await fetch(`${API_URL}/${path}`, options);
	const resData = await checkResponse<T>(res);

	if (resData) return resData;
	return Promise.reject(resData);
};

// User
export const createNewUserApi = async (data: TUser) =>
	fetchData('users', 'POST', data);

// export const registerUserEmailApi = async (data: TRegisterData) => {}

// export const loginUserEmailApi = async (data: TUserCredData) => {}

// export const logoutUserApi = async () => {}

export const getUserApi = async (userId: string): Promise<TUser> =>
	fetchData(`users/${userId}`);

// Assembly units
export const getAssemblyUnitsListApi = async (): Promise<TAssemblyUnit[]> =>
	fetchData('assemblyUnits');

export const updateAssemblyUnitApi = async (
	unitId: string,
	data: Partial<TAssemblyUnit>
): Promise<TAssemblyUnit> =>
	fetchData(`assemblyUnits/${unitId}`, 'PATCH', data);

export const deleteAssemblyUnitApi = async (unitId: string): Promise<void> =>
	fetchData(`assemblyUnits/${unitId}`, 'DELETE');

// Assembly parts list
export const getAssemblyUnitPartsListApi = async (): Promise<
	TAssemblyUnitPart[]
> => fetchData('assemblyUnitParts');

// Assembly part single
export const getAssemblyUnitPartApi = async (
	partId: string
): Promise<TAssemblyUnitPart> => fetchData(`assemblyUnitParts/${partId}`);

export const addAssemblyUnitPartApi = async (
	data: TAssemblyUnitPart
): Promise<TAssemblyUnitPart> => fetchData('assemblyUnitParts', 'POST', data);

export const updateAssemblyUnitPartApi = async (
	partId: string,
	data: Partial<TAssemblyUnitPart>
): Promise<TAssemblyUnitPart> =>
	fetchData(`assemblyUnitParts/${partId}`, 'PATCH', data);

export const deleteAssemblyUnitPartApi = async (
	partId: string
): Promise<TAssemblyUnitPart> =>
	fetchData(`assemblyUnitParts/${partId}`, 'DELETE');

// Insulation group
export const getInsulationGroupsApi = async (): Promise<TInsulationGroup[]> =>
	fetchData('insulationGroups');

export const addInsulationGroupApi = async (
	data: TInsulationGroup
): Promise<TInsulationGroup> => fetchData('insulationGroups', 'POST', data);

export const updateInsulationGroupApi = async (
	groupId: string,
	data: Partial<TInsulationGroup>
): Promise<TInsulationGroup> =>
	fetchData(`insulationGroups/${groupId}`, 'PATCH', data);

export const deleteInsulationGroupApi = async (
	groupId: string
): Promise<TInsulationGroup> =>
	fetchData(`insulationGroups/${groupId}`, 'DELETE');
