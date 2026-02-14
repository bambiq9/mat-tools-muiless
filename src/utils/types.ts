// Insulation types

// Shapes
export type Rectangle = {
	width: number;
	height: number;
};

export type Point = {
	x: number;
	y: number;
};

export type Polygon = {
	segments: Point[];
};

export type Shape = Rectangle | Polygon;

// Single piece of insulation
export type TInsulationItem = {
	id: string;
	thickness: number;
	adhesive: boolean;
	shape: Shape;
	name?: string;
};

// Group of insulation pieces
export type TInsulationGroup = {
	id: string;
	name: string;
	items: TInsulationItem[];
	date: Date;
};

// The whole unit
export type TUnit = {
	id: string;
	name: string;
	insulation: TInsulationGroup[] | null;
	filter: null;
	date: string;
};

export type TBlueprint = {
	id: string;
};

export type TAssemblyUnitPart = {
	id: string;
	name: string;
	blueprint?: TBlueprint;
};

export type ISelectedPart = TAssemblyUnitPart & {
	quantity: number;
};

export type TAssemblyUnitPartsList = {
	partId: string;
	quantity: number;
};

export type TAssemblyUnit = {
	id: string;
	name: string;
	parts: TAssemblyUnitPartsList[];
	blueprint: TBlueprint;
	description?: string;
	active?: boolean;
};

export type TAssemblyUnitCardPart = TAssemblyUnitPartsList & { name: string };

export type TAssemblyUnitCard = Omit<TAssemblyUnit, 'parts'> & {
	partsList: TAssemblyUnitCardPart[];
};

//

export type UserRole = 'admin' | 'guest' | 'assembly' | 'electric' | 'refrig';

export type TUser = {
	id: string;
	name: string;
	email: string;
	role: UserRole[];
};

export type TUserCredData = {
	email: string;
	password: string;
};

export type TUserInfoData = {
	name: string;
	role: UserRole[];
};

export type TRegisterData = TUserCredData & TUserInfoData;
