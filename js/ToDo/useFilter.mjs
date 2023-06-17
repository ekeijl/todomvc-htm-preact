import { useState, useEffect } from 'preact/compat';
import { Filters } from './Filters.mjs';
const getFilterFromHash = () => window.location.hash?.split('#/')[1];

export const useFilter = () => {
	const [filter, setFilter] = useState(() => getFilterFromHash());

	useEffect(() => {
		window.addEventListener('hashchange', () => {
			const filterValue = getFilterFromHash();
			if (Object.values(Filters).includes(filterValue)) {
				setFilter(filterValue);
			}
		});
	}, []);

	return filter;
};
