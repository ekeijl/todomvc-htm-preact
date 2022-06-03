import { useEffect, useState, subscribe, snapshot } from '../modules.mjs';
import { store } from './store.mjs';

export const useTodos = () => {
	const [, setTodos] = useState([]);

	useEffect(() => {
		setTodos(store.todos);
	}, []);

	useEffect(() => {
		subscribe(store, () => {
			setTodos(snapshot(store.todos));
		});
	}, []);

	return store;
};
