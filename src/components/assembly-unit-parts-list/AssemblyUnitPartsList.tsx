import { AssemblyUnitPartsListUI } from '@components/ui/assembly-unit-ui/assembly-unit-parts-list-ui';
import { type FC } from 'react';
import type { TAssemblyUnitPartsListProps } from './type';

export const AssemblyUnitPartsList: FC<TAssemblyUnitPartsListProps> = ({
	parts,
}) => {
	return <AssemblyUnitPartsListUI parts={parts} />;
};
