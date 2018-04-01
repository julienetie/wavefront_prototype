const {
    abstract,
    assembly,
    beforeRender,
    render,
    loop,
    or,
    a,
    li,
    span,
    br,
    ul,
    input,
    div,
} = wavefront;


const { collageAll } = abstract('#root');

// #wonderful div:nth-child(2):nth-child(2)
// console.log(collageAll('span[href*="http://yo.com" i ]:nth-child(bla) span:nth-child(4) > li > span > .something-else #blah ~ div + section + h1'));
console.log(collageAll('*[name=\'t"hi"ng\' i]div.one.[data-lang$="*\]\]**\[gb-EN" i  ]two.three[class i]#blah.zzzz.erfwe.egrge[data-lang~="***ru-RH" i] + *span#oifwef[type*=\'bla\' i].fsfvsd:nth-child(800) > *.howdy:target:not(#top)::before'));
    /**
        [name=\'t"hi"ng\']
        [data-lang="*\]\]**\[gb-EN"]
        [data-lang="**\[\]*zh-TW\["]
        [data-lang="***ru-RH"]
    */
// /* view.js */    
// const logEntry = ({ url, html_url, sha, message, name, date }) =>
//     li({},
//         a({ href: url, target: '_blank', class: 'commit' }, sha),
//         ' - ',
//         span({ class: 'message' }, message),
//         br({}),
//         ' by ',
//         span({ class: 'author' },
//             a({ href: html_url, target: '_blank' },
//                 ` ${name} `
//             )
//         ),
//         ' at ',
//         span({ class: 'date' },
//             ` ${date} `
//         )
//     );

// const listContainer = logs => ul({}, logs);




// // /* controller.js */
// // const wavefrontCommitsURL = 'https://api.github.com/repos/julienetie/wavefront/commits?per_page=3&sha=';
// const vueCommitsURL = 'https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha=';

// const masterAttr = { type: 'radio', id: 'master', name: 'branch', value: 'master' };
// const devAttr = { type: 'radio', id: 'dev', name: 'branch', value: 'dev' };

// const abstracton = abstract('#root');
// // const container = document.querySelector('#root');
// // // console.log(render);
// console.log('abstracton', abstracton)


// const loadCommits = (type) => {
//     fetch(`${vueCommitsURL}${type}`)
//         .then(results => results.json())
//         .then(data => {
//             console.log(data)
//             const logs = data.map(commitInfo => {
//                 const { sha, url, commit } = commitInfo;
//                 const { message, author } = commit;
//                 const { html_url } = commitInfo.author;
//                 console.log('author.date', author.date)
//                 return logEntry({
//                     url,
//                     html_url,
//                     sha: sha.slice(0, 7),
//                     message,
//                     name: author.name,
//                     date: author.date
//                 });
//             });


//             if (type === 'master') {
//                 masterAttr.checked = 'checked';
//                 devAttr.checked = null;
//                 delete devAttr.checked;
//             } else {
//                 devAttr.checked = 'checked';
//                 masterAttr.checked = null;
//                 delete masterAttr.checked;
//             }

//             render(container,
//                 div({},
//                     listContainer(logs),
//                     input(masterAttr),
//                     input(devAttr)
//                 ), true);

//         });
// }




// const act = (CMD, data) => {
//     const type = CMD === 'master' ? 'red' : 'blue';
//     const updateAbstraction = frame => {
//         const masterButton = frame.querySelector('#master');
//         const devButton = frame.querySelector('#dev');


//         fetch(`${vueCommitsURL}${CMD}`)
//             .then(results => results.json())
//             .then(data => {
//                 console.log(data)
//                 const logs = data.map(commitInfo => {
//                     const { sha, url, commit } = commitInfo;
//                     const { message, author } = commit;
//                     const { html_url } = commitInfo.author;
//                     // console.log('author.date', author.date)
//                     // return logEntry({
//                     //     url,
//                     //     html_url,
//                     //     sha: sha.slice(0, 7),
//                     //     message,
//                     //     name: author.name,
//                     //     date: author.date
//                     // });
//                 });

//                 masterButton.checked = CMD === 'master' ? 'checked' : null;
//                 devButton.checked = CMD === 'dev' ? 'checked' : null;


//             });

//         // Array.from(frame.querySelectorAll('*')).forEach(el => Object.assign(el.style, {
//         //     border: `1px solid ${color}`,
//         //     background: 'rgba(200,255,100,0.2)'
//         // }));


//     }

//     beforeRender(updateAbstraction, true);
//     render('#root', abstracton, true);
// }


// act('master');
// // const getNode = (waveNode, selector) => {
// //     const prefix = selector.substr(0,1);

// //     switch(prefix){
// //         case '.':
// //             // find by class
// //         break;
// //         case '#':
// //             // find by id
// //         break;
// //         case '@':
// //             // find by attribute
// //         break;
// //         case '~':
// //             // find by text
// //         break;
// //         default:
// //             // Find by tag 

// //     }

// // id
// // class
// // tag
// // attribute

// // }


// const loadView = (currentView, type) => {
//     if (currentView === type) {
//         return;
//     }
//     loadCommits(type);
// }
// const viewSwitchPrivate = () => {
//     let currentView = 'master';
//     return ({ target }) => {
//         switch (target.id) {
//             case 'master':
//                 // console.info('MASTER')
//                 // loadView(currentView, 'master');
//                 // currentView = 'master'
//                 act('master');
//                 return;
//             case 'dev':
//                 // console.log('DEV')
//                 // loadView(currentView, 'dev')
//                 // currentView = 'dev'
//                 act('dev');
//                 break;
//         }
//     }
// };

// const viewSwitch = viewSwitchPrivate();

// document.addEventListener('click', viewSwitch)

// // const loadCommits = (type) => {
// //     fetch(`${vueCommitsURL}${type}`)
// //         .then(results => results.json())
// //         .then(data => {
// //             console.log(data)
// //             const logs = data.map(commitInfo => {
// //                 const { sha, url, commit } = commitInfo;
// //                 const { message, author } = commit;
// //                 const { html_url } = commitInfo.author;
// //                 console.log('author.date', author.date)
// //                 return logEntry({
// //                     url,
// //                     html_url,
// //                     sha: sha.slice(0, 7),
// //                     message,
// //                     name: author.name,
// //                     date: author.date
// //                 });
// //             });

// //             if (type === 'master') {
// //                 masterAttr.checked = 'checked';
// //                 devAttr.checked = null;
// //                 delete devAttr.checked;
// //             } else {
// //                 devAttr.checked = 'checked';
// //                 masterAttr.checked = null;
// //                 delete masterAttr.checked;
// //             }

// //             render(container,
// //                 div({},
// //                     listContainer(logs),
// //                     input(masterAttr),
// //                     input(devAttr)
// //                 )
// //             ,true);

// //         });
// // }


// // // // Init master
// // loadCommits('master')