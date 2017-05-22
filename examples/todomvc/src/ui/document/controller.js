import o from '../../skeleton';
import act from '../';

document.documentElement.addEventListener('click', (e)=>{
	const target = e.target;

	if(target.tagName !== 'LABEL'){
		console.log('nope')
	}
})