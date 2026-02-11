import type { FC } from 'react';
import type { TAddAssemblyUnitUIProps } from './type';
import styles from './AddAssemblyUnitUI.module.scss';
import { Button } from '../button';

export const AddAssemblyUnitUI: FC<TAddAssemblyUnitUIProps> = ({
	name,
	blueprint,
	unit,
	date,
	description,
	error,
	onNameChange,
	onBlueprintChange,
	onUnitChange,
	onDateChange,
	onDescriptionChange,
	children,
	onSubmit,
}) => {
	return (
		<form onSubmit={onSubmit} className={styles.form}>
			<div className={styles.group}>
				<label htmlFor='assemblyName' className={styles.label}>
					Название
				</label>
				<input
					id='assemblyName'
					type='text'
					className={styles.input}
					placeholder='Введите название (не обязательно)'
					value={name}
					onChange={(e) => onNameChange(e.target.value)}
				/>
			</div>

			<div className={styles.group}>
				<label htmlFor='assemblyBlueprint' className={styles.label}>
					Чертёж
				</label>
				<input
					id='assemblyBlueprint'
					type='text'
					className={styles.input}
					placeholder='Введите номер чертежа (не обязательно)'
					value={blueprint}
					onChange={(e) => onBlueprintChange(e.target.value)}
				/>
			</div>

			<div className={styles.group}>
				<label htmlFor='unitInstallation' className={styles.label}>
					Установка
				</label>
				<select
					id='unitInstallation'
					className={styles.select}
					value={unit}
					onChange={(e) => onUnitChange(e.target.value)}
				>
					<option value=''>Выберите установку</option>
				</select>
			</div>

			<div className={styles.group}>
				<label htmlFor='assemblyDate' className={styles.label}>
					Дата ввода в эксплуатацию
				</label>
				<input
					id='assemblyDate'
					type='date'
					className={styles.input}
					value={date}
					onChange={(e) => onDateChange(e.target.value)}
				/>
			</div>

			<div className={styles.group}>
				<label htmlFor='assemblyDescription' className={styles.label}>
					Описание
				</label>
				<textarea
					id='assemblyDescription'
					className={styles.textarea}
					value={description}
					onChange={(e) => onDescriptionChange(e.target.value)}
				/>
			</div>

			{children}

			{error && <div className={styles.error}>{error}</div>}
			{onSubmit && (
				<div className={styles.actions}>
					<Button type='submit' className={styles.submitBtn}>
						Сохранить
					</Button>
				</div>
			)}
		</form>
	);
};
