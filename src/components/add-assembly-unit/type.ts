export type TAddAssemblyUnitState = {
	name: string;
	blueprint: string;
	unit: string;
	date: string;
	description: string;
};

export type TAddAssemblyUnitProps = {
	edit?: boolean;
};
