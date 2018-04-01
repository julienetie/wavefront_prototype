/**
 * Divides the seletor into it's components separated by combinators. 
 * @param {string} selectorUntrimmed - The remaining selector to be separated.
 * @param {Array} store - 
 */
const splitGroups = (selector, groupsTemp = []) => {
    const selectorTrimmed = selector.trim();
    const selectorLength = selectorTrimmed.length;
    // Records the state of passing though a set of brackets.
    let closedBracketIndex = -1;
    // The combinator index before being conditioned. 
    let postCombinatorIndex = -1;
    // Records the last space character
    let lastSpaceChar = -1;
    let lastChar;
    for (let i = 0; i < selectorLength; i++) {
        const char = selectorTrimmed[i];
        // Ignores escaped characters.
        switch (char) {
            case '[':
                closedBracketIndex = lastChar !== '\\' ? -1 : closedBracketIndex;
                break;
            case ']':
                closedBracketIndex = lastChar !== '\\' ? i : closedBracketIndex;
                break;
            case ' ':
                lastSpaceChar = i;
                if (closedBracketIndex > -1) {
                    lastSpaceChar = -1;
                    postCombinatorIndex = i;
                }
                break;
        }

        if (postCombinatorIndex > 0) {
            break;
        }

        lastChar = char;
    }
    // Determine the combinator and create group
    const combinatorIndexWitoutSpace = postCombinatorIndex === -1 ? selectorLength - 1 : postCombinatorIndex;
    const combinatorIndex = lastSpaceChar > -1 ? lastSpaceChar : combinatorIndexWitoutSpace;
    // The 2nd character from the start of the combinator.
    const combinatorNextChar = selectorTrimmed[combinatorIndex + 1];
    // Is it a non-descendant combinator.
    const isNonDescendant = combinatorNextChar === '>' || combinatorNextChar === '+' || combinatorNextChar === '~';
    const toSliceIndex = isNonDescendant === true ? combinatorIndex + 3 : combinatorIndex + 1;
    // A group is a set of simple selectors, pseudo selectors and a combinator. All parts are optional.
    const group = selectorTrimmed.slice(0, toSliceIndex);
    // The remaining selector string to be processed.
    const remainder = selectorTrimmed.slice(toSliceIndex);
    // A collection of groups.
    groupsTemp.push(group);

    if (remainder !== '') {
        splitGroups(remainder, groupsTemp);
    }

    return groupsTemp;
}

export default splitGroups;