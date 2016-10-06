


/**
 * Finds value in an array 
 * @param {Array} haystack - The array to search.
 * @param {*} needle - The value to look for
 */
const contains = (haystack, needle)=>{
	return haystack.indexOf(needle) === -1;
}

export default contains;