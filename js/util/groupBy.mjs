/**
 * Groups object by a given attribute.
 * @param {Array<Object>} arr Array of objects 
 * @param {string} key The key attribute to group objects by.
 * @returns {Object} Object mapping of key to an array of objects with the same attribute value for key.
 */
function groupBy(arr, key) {
	return arr.reduce(function (acc, el) {
		(acc[el[key]] = acc[el[key]] || []).push(el);
		return acc;
	}, {});
}

export { groupBy };
