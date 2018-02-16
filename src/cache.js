/** 
 * Shared cache accessible between modules. 
 */
const cache = {
	vDOM: null,
	rootElement: null,
	fragment: document.createDocumentFragment()
};

export default cache;
