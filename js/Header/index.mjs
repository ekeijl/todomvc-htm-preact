import html from '../render.mjs';
import { useState, useRef } from 'preact/hooks';
import { store } from '../ToDo/index.mjs';

export const Header = () => {
	const inputRef = useRef(null);
	const [value, setValue] = useState('');

	const handleKey = (e) => {
		const value = e.target.value?.trim();
		if (e.key === 'Enter' && value) {
			store.add(value);
			setValue('');
			e.preventDefault();
			e.stopPropagation()
		}

		if (e.key === 'Escape') {
			setValue('');
			inputRef.current?.blur();
			e.preventDefault();
			e.stopPropagation()
		}
	};

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	return html` <header class="header">
		<h1>todos</h1>
		<input
			class="new-todo"
			placeholder="What needs to be done?"
			autofocus
			onkeydown=${handleKey}
			value=${value}
			onInput=${handleChange}
		/>
	</header>`;
};
