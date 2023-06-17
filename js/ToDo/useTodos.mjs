import { useSnapshot } from 'valtio';
import { store } from './store.mjs';

export const useTodos = () => {
	const snap = useSnapshot(store);

	return snap.todos;
};
