import { html } from '../modules.mjs';
import { useState, useRef } from '../modules.mjs';
import { store } from '../ToDo/index.mjs';

export const Header = () => {
	const inputRef = useRef(null);
	const [value, setValue] = useState('');

	const handleKey = ({ key, target }) => {
		const value = target.value?.trim();
		if (key === 'Enter' && value) {
			store.add(value);
			setValue('');
		}

		if (key === 'Escape') {
			setValue('');
			inputRef.current?.blur();
		}
	};

	const handleChange = ({ target }) => setValue(target.value);

	return html` <header class="header">
		<h1>todos</h1>
		<input
			class="new-todo"
			placeholder="What needs to be done?"
			autofocus
			onkeydown=${handleKey}
			value=${value}
			onChange=${handleChange}
		/>
	</header>`;
};
