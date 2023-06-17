import html from '../render.mjs';
import { List } from './List.mjs';
import { useTodos } from './useTodos.mjs';
import { useFilter } from './useFilter.mjs'

export const Todos = () => {
	const todos = useTodos();
	const filter = useFilter();

    return todos?.length > 0 && html`
        <${List} todos=${todos} filter=${filter} />
    `;
}
