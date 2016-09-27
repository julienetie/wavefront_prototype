let div = (attributes, ...args) => {
    var tagName = 'div';

    var childTree;
    var childElement;
    var childWavefrontNodes = [];

    var hasAttributes = typeof attributes === 'string' && !!attributes;

    // Check args to see 
    args.map((param, i) => {
        // Every param must be pushed to childWavefrontNodes

        // Wavefront Element Object.
        if (param.hasOwnProperty('node') && param.hasOwnProperty('tree')) {
            childWavefrontNodes.push(param);
        } else if (typeof param === 'string') {
            // Create text nodes from string.
            childWavefrontNodes.push({
                node: document.createTextNode(param),
                tree: {}
            })
        }

        // Parse DOM nodes.
        if (param.nodeType) {
            switch (param.nodeType) {
                // ELEMENT_NODE
                case 1:
                    // TEXT_NODE
                case 3:
                    // PROCESSING_INSTRUCTION_NODE
                case 7:
                    // COMMENT_NODE
                case 8:
                    // DOCUMENT_NODE
                case 9:
                    // DOCUMENT_TYPE_NODE
                case 10:
                    // DOCUMENT_FRAGMENT_NODE
                case 11:
                    childWavefrontNodes.push({
                        node: param,
                        tree: {}
                    })
                    break;
                default:
                    throw new Error(`${param.nodeType} is not supported.`);
            }
        }


    });

    //    el-fn('attributes')
    //    el-fn('attributes', function)
    //    el-fn('attributes', 'text')
    //    el-fn('attributes', 'text', function)

    // Attributes 
    // Every space separation is a pair, 
    // Every attribute should have an equals value as a delimiter


    function assignAttributes(element, strAttributes) {
        var splitAttributes = strAttributes.split('=');
        var separatedPairs = [];
        var sortedPairs = [];
        var last = 0;


        let splitOddPairs = (attributePair) => {
            var splitFromIndex = attributePair.lastIndexOf(' ');
            if (splitFromIndex >= 0) {
                return [
                    attributePair.slice(0, splitFromIndex),
                    attributePair.slice(splitFromIndex, attributePair.length)
                ];
            } else {
                return [attributePair];
            }
        }

        var oddPairs = splitAttributes.map(splitOddPairs);

        /**
         * Separate odd pairs 
         */
        for (var i = 0; i < oddPairs.length; i++) {
            oddPairs[i].forEach((oddPair) => {
                separatedPairs.push(oddPair);
            });
        }
        /**
         * Sort every concurrent pair
         */
        for (i = 0; i < Math.floor(separatedPairs.length / 2); i++) {
            sortedPairs[i] = [separatedPairs[last], separatedPairs[last += 1]];
            last += 1;
        }

        /**
         * Trim attributes and remove quotes from values.
         */
        var trimmed = sortedPairs.map((pair) => {
            let value = pair[1];
            let halfCleaned;
            let halfCleanedLength;
            let cleanedValue;
            if (value[0] === '"' || value[0] === '\'') {
                halfCleaned = value.substring(1);
                halfCleanedLength = halfCleaned.length - 1;
            }

            if (halfCleaned[halfCleanedLength] === '"' || value[0] === '\'') {
                cleanedValue = halfCleaned.substr(0, halfCleanedLength);
            }
            return [pair[0].trim(), cleanedValue];
        });

        /**
         * Assign attributes to element.  
         */
        trimmed.forEach((pair) => {
            element.setAttribute(pair[0], pair[1]);
        });
    }


    /**
     * Create new element. 
     */
    function createElement(tagName, attr, wavefrontNodes, hasAttributes) {
        var tree = {};
        let branch = {};
        var element = document.createElement(tagName);
        var innerTrees;
        var nodeDetails;
        console.log(wavefrontNodes)
            /**
             * Assign attributes to the new element. 
             */
        if (hasAttributes) {
            assignAttributes(element, attr);
        }
        // Dummy new element name system. 
        branch[tagName + parseFloat(Math.random(), 10)] = element;

        // Ensure an objest is merged.
        // innerTree = innerTree || {};
        nodeDetails = wavefrontNodes.map((nodeDetail) => {
            return nodeDetail.tree || {};
        });


        // New Tree from current branch and nested trees.
        tree = Object.assign(branch, ...nodeDetails);

        // Append the child element to the new element.
        wavefrontNodes.forEach((node) => {
            element.appendChild(node.node);
        })
        return {
            node: element,
            tree
        };
    }

    var wave = createElement(tagName, attributes, childWavefrontNodes, hasAttributes);

    return wave;
};

export default div;