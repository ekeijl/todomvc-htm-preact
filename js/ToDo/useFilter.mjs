import { useState, useEffect } from '../modules.mjs';

const getFilterFromHash = () => window.location.hash?.split('#/')[1];

export const useFilter = () => {
	const [filter, setFilter] = useState(() => getFilterFromHash());

	useEffect(() => {
		window.addEventListener('hashchange', () => {
			const value = getFilterFromHash();
			if (Object.values(Filters).includes(value)) {
				setFilter(value);
			}
		});
	}, []);

	return filter;
};
