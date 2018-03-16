/** 
 * Shared cache accessible between modules. 
 */
const cache = {
	vDOM: null,
	rootElement: null,
	fragment: document.createDocumentFragment(),
	beforeRenderCallbacks: {},
	afterRenderCallbacks: {}
};

export default cache;
