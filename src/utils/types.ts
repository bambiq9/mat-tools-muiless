// Insulation types

// Shapes
export type Rectangle = {
	width: number
	height: number
}

export type Point = {
	x: number
	y: number
}

export type Polygon = {
	segments: Point[]
}

export type Shape = Rectangle | Polygon

// Single piece of insulation
export type TInsulationItem = {
	id: string
	thickness: number
	adhesive: boolean
	shape: Shape
	name?: string
}

// Group of insulation pieces
export type TInsulationGroup = {
	id: string
	name: string
	items: TInsulationItem[]
	date: Date
}

// The whole unit
export type TUnit = {
	id: string
	name: string
	insulation: TInsulationGroup[] | null
	filter: null
	date: Date
}

export type TBlueprint = {
	id: string
	date?: Date
}

export type TAssemblyUnitPart = {
	id: string
	name: string
	blueprint?: TBlueprint
	date?: Date
}

export type TAssemblyUnitParts = {
	partId: string
	quantity: number
}

export type TAssemblyUnit = {
	id: string
	name: string
	parts: TAssemblyUnitParts[]
	blueprint: TBlueprint
	description?: string
	date?: Date
}

//

export type UserRole =
	| 'admin'
	| 'guest'
	| 'assembly'
	| 'electric'
	| 'refrigeration'

export type TUser = {
	id: string
	name: string
	email: string
	role: UserRole[]
}

export type TUserCredData = {
	email: string
	password: string
}

export type TUserInfoData = {
	name: string
	role: UserRole[]
}

export type TRegisterData = TUserCredData & TUserInfoData
