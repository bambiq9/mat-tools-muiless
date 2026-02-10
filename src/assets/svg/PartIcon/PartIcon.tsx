import type { FC } from 'react';

export const PartIcon: FC<{ className?: string }> = ({ className }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill='none'
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth='1.5'
			viewBox='0 0 24 24'
			className={className ? className : ''}
		>
			<path stroke='none' d='M0 0h24v24H0z' />
			<path d='M8 9a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V9M3 8h1M3 16h1M8 3v1M16 3v1M20 8h1M20 16h1M8 20v1M16 20v1' />
		</svg>
	);
};
