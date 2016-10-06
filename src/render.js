const Render = {
    method1: function() {
        this.tree = 'green';
    },
    method2: function() {
        console.log('i am ' + this.tree); 
    }
}


let _render = {};
    _render.static = Object.create(Render);
    _render.stateless = Object.create(Render);
    _render.dynamic = Object.create(Render);
///need to generate 

export function addInterfaceRenderMethod (interfaceName, interfaceType){
    if('interface is registered'){
        _render[interfaceType][interfaceName] = function(){
                this.method1();
                this.method2();
                console.log(interfaceName, interfaceType)
        }
    }
}

export let render = _render; 
 