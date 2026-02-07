import { ModalUI } from '@components/ui/modal-ui';
import { useEffect, type FC } from 'react';
import { createPortal } from 'react-dom';
import type { TModalProps } from './type';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = ({ title, children, onClose }) => {
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEsc);
		return () => {
			document.removeEventListener('keydown', handleEsc);
		};
	}, [onClose]);

	return createPortal(
		<ModalUI title={title} onClose={onClose}>
			{children}
		</ModalUI>,
		modalRoot as HTMLDivElement
	);
};
