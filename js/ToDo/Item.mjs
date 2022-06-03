import { html, useState, useRef } from '../modules.mjs';
import { store, Filters } from './index.mjs';

/**
 * Concatenates an array of classnames.
 * @param {Array<string|boolean>} classes 
 * @returns {string}
 */
const classnames = (classes) => classes.filter(Boolean).join(' ');

/**
 * Shows a single todo item.
 * @param {string} id
 * @param {string} status
 * @param {string} name 
 */
export const Item = ({ id, status, name }) => {
	const inputRef = useRef(null);
	const [value, setValue] = useState(name);
	const [isEditing, setEditing] = useState(false);

	const handleEdit = () => {
		setEditing(true);
		setTimeout(() => {
			inputRef.current?.focus();
		});
	};

	const handleBlur = () => {
		setEditing(false);
		let name = value.trim();
		if (name) {
			store.updateItem(id, { name });
		}
	};

	const handleKey = (e) => {
		if (e.key === 'Enter') {
			handleBlur(value);
			e.stopPropagation();
		}

		if (e.key === 'Escape') {
			setValue(name);
			inputRef.current?.blur();
			e.stopPropagation();
		}
	};

    const isCompleted = status === Filters.COMPLETED;

	return html` <li class=${classnames([isCompleted && 'completed', isEditing && 'editing'])} ondblclick=${handleEdit}>
		<div class="view">
			<input
				class="toggle"
				type="checkbox"
				checked=${isCompleted ? 'checked' : ''}
				onChange=${() => store.toggle(id)}
			/>
			<label>${value}</label>
			<button class="destroy" onClick=${() => store.remove(id)}></button>
		</div>
		<input
			class="edit"
			value=${value}
			onChange=${(e) => setValue(e.target.value)}
			onblur=${handleBlur}
			onkeydown=${handleKey}
			ref=${inputRef}
		/>
	</li>`;
};
