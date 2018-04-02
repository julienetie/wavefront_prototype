const setEach = group => {
    // Non-descendant combinators.
    const nonDescendants = [' > ', ' + ', ' ~ '];
    // Attribute methods.
    const compoundAttributes = {
        '~': [],
        '$': [],
        '*': [],
        '|': [],
        '^': [],
    };

    // Get non-descendant combinator
    let nonDescendant = nonDescendants.filter(combinator => {
        return group.endsWith(combinator);
    });

    const noNonDescendants = nonDescendant.length === 0;
    // The combinator of the group wrapped in an array.
    const combinator = noNonDescendants ? (group.endsWith(' ') ? nonDescendant = [' '] : ['']) : nonDescendant;
    // The pseudo-selector sub string. 
    const pseudoDefinition = noNonDescendants ? (group.substring(0, group.length)) : group.substring(0, group.length - 3);
    // Separates the pseudo-selector from a simple-selector set containing an attribute selector.
    const attributePsuedoIndex = pseudoDefinition.lastIndexOf(']:');
    // Separates the pseudo-selector from a simple-selector set that has no attribute selector.
    const basicPseudoIndex = pseudoDefinition.indexOf(':');
    const simpleSelector = attributePsuedoIndex >= 0 ? pseudoDefinition.slice(0, attributePsuedoIndex + 1) : basicPseudoIndex >= 0 ? pseudoDefinition.slice(0, basicPseudoIndex) : pseudoDefinition;
    const pseudoSelectors = attributePsuedoIndex >= 0 ? pseudoDefinition.slice(attributePsuedoIndex + 1) : basicPseudoIndex >= 0 ? pseudoDefinition.slice(basicPseudoIndex) : '';
    // Array of psuedo-selectors                    
    const pseudoList = pseudoSelectors.split(':').filter(value => value !== '');
    const compoundPsuedo = pseudoList.map(pseudoSelector => {
        const parts = pseudoSelector.split('(');
        const pseudoSelctorType = parts[0];
        const value = parts.length === 2 ? parts[1].substr(0, parts[1].length - 1) : null;
        return [pseudoSelctorType, value];
    });

    // Determine if the simple-selector is a universal selector.
    const trimmedSimpleSelector = simpleSelector.trim();
    const universal = trimmedSimpleSelector.length === 1 && trimmedSimpleSelector === '*' ? true : false

    // let cleanedSimpleSelector;
    let type = null;
    let typeSplitIndex = 0;
    let compoundClasses;
    let id;


    if (universal === false) {
        // Remove first intance of * 
        const cleanedSimpleSelector = simpleSelector.replace(/\*/, '');
        const cleanedSimpleSelectorLength = cleanedSimpleSelector.length;
        const firstChar = cleanedSimpleSelector[0];
        // Check if the first character identifies as a selector type
        const isType = firstChar !== '.' && firstChar !== '#' && firstChar !== '[';
        console.log('isType', isType)
        // The type selector string to be built. 
        let typeSelector = '';

        if (isType === true) {
            for (let i = 0; i < cleanedSimpleSelectorLength; i++) {
                const char = cleanedSimpleSelector[i];
                const isEndofPart = i === cleanedSimpleSelectorLength - 1;
                console.log('isEndofPart', isEndofPart)
                const typeEnd = i > 0 && ((char === '.' || char === '#' || char === '[') || isEndofPart);
                // console.log('typeEnd', i, char, typeEnd)
                if (typeEnd === true) {
                    console.log('typeENDDD:', typeSelector)
                    type = typeSelector;
                    typeSplitIndex = isEndofPart ? cleanedSimpleSelectorLength  : i;
                    break;
                }

                typeSelector += char;
            }
        }

        const simpleSelectorNoType = isType ? cleanedSimpleSelector.slice(typeSplitIndex) : cleanedSimpleSelector;
        const simpleSelectorNoTypeLength = simpleSelectorNoType.length;
        let lastChar;
        const slicePoints = [];

        let openiingMark;
        let isDouble = false;
        let isSingle = false;
        let doubleIndex = -1;
        let singleIndex = -1;

        for (let i = 0; i < simpleSelectorNoTypeLength; i++) {
            const char = simpleSelectorNoType[i];
            switch (char) {
                case '[':
                    if (isDouble === false && isSingle === false) {
                        slicePoints.push([i + 1, -1]);
                    }
                    break;
                case ']':
                    if (isDouble === false && isSingle === false) {
                        slicePoints[slicePoints.length - 1][1] = i;
                    }
                    break;
                case '\'':
                    isSingle = !isSingle;
                    singleIndex = i;
                    break;
                case '\"':
                    isDouble = !isDouble;
                    doubleIndex = i;
                    break;
            }
        }

        const attributeTokens = [];
        const slicePointsLength = slicePoints.length;
        for (let i = 0; i < slicePointsLength; i++) {
            const slicePoint = slicePoints[i];
            const token = simpleSelectorNoType.slice(...slicePoint);
            attributeTokens.push(token);
        }

        let nonAttributeSelector = simpleSelectorNoType;
        attributeTokens.forEach(token => nonAttributeSelector = nonAttributeSelector.replace(`[${token}]`, ''));


        const idIndex = nonAttributeSelector.indexOf('#');
        const simpleSel = nonAttributeSelector.split('#');
        const first = simpleSel[0].split('.');
        const second = simpleSel[1] === undefined ? [] : simpleSel[1].split('.');
        const idArr = second.splice(0, 1);
        id = idArr.length > 0 ? idArr[0] : null;
        compoundClasses = [...first, ...second].filter(value => !!value);


        attributeTokens.map(token => {
            const tokenTrimmed = token.trim();
            const insensitiveIndex = tokenTrimmed.lastIndexOf(' i');
            const isInsensitive = insensitiveIndex === tokenTrimmed.length - 2;
            const mainToken = isInsensitive ? tokenTrimmed.slice(0, insensitiveIndex) : tokenTrimmed;


            const tokenArr = mainToken.split('=');
            const cleanValue = tokenArr[1] ? tokenArr[1].slice(0, -1).substring(1) : [];
            const cleanKey = tokenArr[0] ? tokenArr[0] : tokenArr[0]; // @TODO I had to clean something here I have no idea what 
            const type = cleanKey[cleanKey.length - 1];
            const symbol = ['*', '^', '$', '|', '~'].filter(value => type === value).find(a => a);

            if (symbol !== undefined) {
                const v = [cleanKey.slice(0, -1), cleanValue];
                const vx = isInsensitive ? [...v, '_$$$_insensitive_'] : v;
                compoundAttributes[symbol].push(vx);
            } else {
                if (!Array.isArray(compoundAttributes)) {
                    compoundAttributes['='] = [];
                }
                // const isInsensitive = null
                const entry = cleanValue.length === 0 ? [cleanKey] : [cleanKey, cleanValue];
                // console.log('ENTRY', isInsensitive)
                const entry2 = isInsensitive ? [...entry, '_$$$_insensitive_'] : entry;
                compoundAttributes['='].push(entry2);
            }
        });
    }
    return {
        universal,
        combinator: combinator[0],
        compoundPsuedo,
        compoundClasses,
        id,
        type,
        compoundAttributes
    };
}


export default (collection) => {
    const setCollection = collection.map(setEach);
    return setCollection;
}