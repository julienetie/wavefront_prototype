const {
    abstract,
    assembly,
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


/* view.js */
const logEntry = ({ url, html_url, sha, message, name, date }) =>
    li({},
        a({ href: url, target: '_blank', class: 'commit' }, sha),
        ' - ',
        span({ class: 'message' }, message),
        br({}),
        ' by ',
        span({ class: 'author' },
            a({ href: html_url, target: '_blank' },
                ` ${name} `
            )
        ),
        ' at ',
        span({ class: 'date' },
            ` ${date} `
        )
    );

const listContainer = logs => ul({}, logs);



/* controller.js */
const wavefrontCommitsURL = 'https://api.github.com/repos/julienetie/wavefront/commits?per_page=3&sha=';
const vueCommitsURL = 'https://api.github.com/repos/vuejs/vue/commits?per_page=3&sha=';

const masterAttr = { type: 'radio', id: 'master', name: 'branch', value: 'master' };
const devAttr = { type: 'radio', id: 'dev', name: 'branch', value: 'dev' };

const abstracton = abstract('#root');
const container = document.querySelector('#root');
// console.log(render);
render(container, abstracton, true);


const loadView = (currentView, type) => {
    if (currentView === type) {
        return;
    }
    loadCommits(type);
}
const viewSwitchPrivate = () => {
    let currentView = 'master';
    return ({ target }) => {
        switch (target.id) {
            case 'master':
                loadView(currentView, 'master');
                currentView = 'master'
                return;
            case 'dev':
                loadView(currentView, 'dev')
                currentView = 'dev'
                break;
        }
    }
};

const viewSwitch = viewSwitchPrivate();

document.addEventListener('click', viewSwitch)

const loadCommits = (type) => {
    fetch(`${vueCommitsURL}${type}`)
        .then(results => results.json())
        .then(data => {
            console.log(data)
            const logs = data.map(commitInfo => {
                const { sha, url, commit } = commitInfo;
                const { message, author } = commit;
                const { html_url } = commitInfo.author;
                console.log('author.date', author.date)
                return logEntry({
                    url,
                    html_url,
                    sha: sha.slice(0, 7),
                    message,
                    name: author.name,
                    date: author.date
                });
            });
            console.log('listContainer(logs)', listContainer(logs))

            if (type === 'master') {
                masterAttr.checked = 'checked';
                devAttr.checked = null;
                delete devAttr.checked;
            } else {
                devAttr.checked = 'checked';
                masterAttr.checked = null;
                delete masterAttr.checked;
            }

            render(container,
                div({},
                    listContainer(logs),
                    input(masterAttr),
                    input(devAttr)
                )
            );

        });
}


// // Init master
loadCommits('master')