import { useCallback, useMemo, useState } from 'react';
import type { Polygon, Rectangle, Shape, TInsulationGroup } from './types';

export const calculateRectangleArea = (rect: Rectangle): number =>
	(rect.width * rect.height) / 1_000_000;

export const calculatePolygonArea = (poly: Polygon): number => {
	const n = poly.segments.length;
	if (n < 3) return 0;
	let area = 0;
	for (let i = 0; i < n; i++) {
		const j = (i + 1) % n;
		area += poly.segments[i].x * poly.segments[j].y;
		area -= poly.segments[j].x * poly.segments[i].y;
	}
	return Math.abs(area) / 2 / 1_000_000;
};

export const calculateArea = (shape: Shape): number => {
	if ('width' in shape && 'height' in shape) {
		return calculateRectangleArea(shape);
	} else if ('segments' in shape) {
		return calculatePolygonArea(shape);
	}
	return 0;
};

export const formatSize = (shape: Shape): string => {
	if ('width' in shape && 'height' in shape) {
		return `${shape.width}×${shape.height}`;
	}
	return `полигон (${shape.segments.length} углов)`;
};

export const formatDate = (dateString: string): string => {
	const d = new Date(dateString);
	return d.toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});
};

export const usePieceSelection = () => {
	const [selectedPieces, setSelectedPieces] = useState<Set<string>>(new Set());

	const togglePiece = useCallback((id: string) => {
		setSelectedPieces((prev) => {
			const next = new Set(prev);
			if (next.has(id)) {
				next.delete(id);
			} else {
				next.add(id);
			}
			return next;
		});
	}, []);

	const selectMany = useCallback((ids: string[]) => {
		setSelectedPieces((prev) => {
			const next = new Set(prev);
			ids.forEach((id) => next.add(id));
			return next;
		});
	}, []);

	const removeMany = useCallback((ids: string[]) => {
		setSelectedPieces((prev) => {
			const next = new Set(prev);
			ids.forEach((id) => next.delete(id));
			return next;
		});
	}, []);

	const resetSelection = useCallback(() => {
		setSelectedPieces(new Set());
	}, []);

	const isSelected = useCallback(
		(id: string) => selectedPieces.has(id),
		[selectedPieces]
	);

	return {
		selectedPieces,
		togglePiece,
		selectMany,
		removeMany,
		resetSelection,
		isSelected,
	};
};

export const useInsulationStats = (
	groups: TInsulationGroup[],
	selected: Set<string>
) => {
	return useMemo(() => {
		let totalArea = 0;
		const thicknessMap: Record<number, number> = {};

		groups.forEach((group) => {
			group.items.forEach((item) => {
				if (!selected.has(item.id)) return;

				const area = calculateArea(item.shape);
				totalArea += area;
				thicknessMap[item.thickness] =
					(thicknessMap[item.thickness] || 0) + area;
			});
		});

		return { totalArea, thicknessMap };
	}, [groups, selected]);
};
