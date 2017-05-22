import { o } from './wavefront'
const skeleton = {}


skeleton.todos = [] // [Completed, value, reference]


skeleton.view = 'all';


skeleton.hasCompleted = []  // Boolean

 
skeleton.itemsLeft = [] // Number


o.create(skeleton)
export default o