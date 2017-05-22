import interfaces from './interfaces';

const act = (cmd, data) => {
    interfaces(cmd, data);
}

export default act;
