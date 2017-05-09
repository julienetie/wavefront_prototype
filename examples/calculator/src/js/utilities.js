export function isFloat(x) {
    return x - x === 0 && x.toString(32).indexOf('.') !== -1;
}

export function isInt(x) {
    return x - x === 0 && x.toString(32).indexOf('.') === -1;
}