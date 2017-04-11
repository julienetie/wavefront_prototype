(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};



















var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};



































var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/*           _.-~-.
           7''  Q..\
        _7         (_
      _7  _/    _q.  /
    _7 . ___  /VVvv-'_                                            .
   7/ / /~- \_\\      '-._     .-'                      /       //
  ./ ( /-~-/  ||'=.__  '::. '-~'' {             ___   /  //     ./{
 V   V-~-~|   ||   __''_   ':::.   ''~-~.___.-'' _/  // / {_   /  {  /
  VV/-~-~-|  / \ .'__'. '.  '::  ____               _ _ _        ''.
  / /~~~~||  VVV/ /  \ )  \     |  _ \ ___  ___(_)___(_) | | __ _   .::'
 / (~-~-~\\.-' /    \'   \::::. | |_) / _ \/ __| |_  / | | |/ _` | :::'
/..\    /..\__/      '     '::: |  _ <  __/\__ \ |/ /| | | | (_| | ::'
vVVv    vVVv                 ': |_| \_\___||___/_/___|_|_|_|\__,_| ''
*/
/*
 Version: 0.9.2
 Description: A Better Window Resize
 Author: Julien Etienne
 Repository: https://github.com/julienetie/resizilla
*/

/**
 * request-frame-modern - Optimal requestAnimationFrame & cancelAnimationFrame polyfill for modern development
 * @version v2.0.3
 * @license MIT
 * Copyright Julien Etienne 2015 All Rights Reserved.
 */
// Initial time of the timing lapse.
/**
 *  volve - Tiny, Performant Debounce and Throttle Functions,
 *     License:  MIT
 *      Copyright Julien Etienne 2016 All Rights Reserved.
 *        github:  https://github.com/julienetie/volve
 *‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
 */

/**
 * Date.now polyfill.
 * {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/now}
 */
if (!Date.now) {
    Date.now = function now() {
        return new Date().getTime();
    };
}

/**
 * Debounce a function call during repetiton.
 * @param {Function}  callback - Callback function.
 * @param {Number}    delay    - Delay in milliseconds.
 * @param {Boolean}   lead  - Leading or trailing.
 * @return {Function} - The debounce function. 
 */
function debounce(callback, delay, lead) {
    var debounceRange = 0;
    var currentTime;
    var lastCall;
    var setDelay;
    var timeoutId;

    var call = function call(parameters) {
        callback(parameters);
    };

    return function (parameters) {
        if (lead) {
            currentTime = Date.now();
            if (currentTime > debounceRange) {
                callback(parameters);
            }
            debounceRange = currentTime + delay;
        } else {
            /**
             * setTimeout is only used with the trail option.
             */
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function () {
                call(parameters);
            }, delay);
        }
    };
}

var objectAssignPolyfill = function objectAssignPolyfill() {
    if (typeof Object.assign != 'function') {
        (function () {
            Object.assign = function (target) {
                'use strict';
                // We must check against these specific cases.

                if (target === undefined || target === null) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var output = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var source = arguments[index];
                    if (source !== undefined && source !== null) {
                        for (var nextKey in source) {
                            if (source.hasOwnProperty(nextKey)) {
                                output[nextKey] = source[nextKey];
                            }
                        }
                    }
                }
                return output;
            };
        })();
    }
};

// Add the Object.assign polyfill.
objectAssignPolyfill();

// Obtains the window or global according to the environment.
var windowGlobal = typeof window !== 'undefined' ? window : (typeof self === 'undefined' ? 'undefined' : _typeof(self)) === 'object' && self.self === self && self || (typeof global === 'undefined' ? 'undefined' : _typeof(global)) === 'object' && global.global === global && global;

// A list of option names to make naming and renaming simple.
var optionNames = 'handler,delay,incept,useCapture,orientationchange'.split(',');

// Default options that correspond with the optionNames.
var defaults$$1 = [function () {}, 16, false, false, true];

/** 
 * Each option name is paired with the option value
 * @return {Object}
 */
var convertPairsToLiterals = function convertPairsToLiterals(value, i) {
    return defineProperty({}, optionNames[i], value);
};

/** 
 * Adds the window event with the provided options.
 * Returns the same handler for removeEventListeners.
 * @return {Function}
 */
var addWindowEvent = function addWindowEvent(handler, delay, incept, windowObject, useCapture) {
    var debounced = debounce(handler, delay, incept);
    windowObject.addEventListener('resize', debounced, useCapture);
    return debounced;
};

var destroyPartial = function destroyPartial(directHandler, useCapture, windowObject) {
    var destroyAPI = function destroyAPI(type) {
        if (!type || type === 'all') {
            // Remove both event listeners.
            windowObject.removeEventListener('resize', directHandler, useCapture);
            windowObject.removeEventListener('orientationchange', directHandler, useCapture);
        } else {
            // Remove specific event listener.
            windowObject.removeEventListener(type, directHandler, useCapture);
        }
    };
    return destroyAPI;
};

/** 
 * Partially apply variables as defaults
 * @param {Array} defaults - Array of consecutive defaults.
 * @param {object} windowObject -  The window | global object.
 */
var resizillaPartial = function resizillaPartial(defaults$$1, windowObject) {

    /** 
     * The API
     * @param {Function} handler - The callback to execute on resize
     * @param {Number} delay - Debounce delay in milliseconds
     * @param {Boolean} incept - Debounce style
     * @param {Boolean} useCapture - Bubbling/ capture options for events
     * @param {Boolean} orientationChange - respond on orientation change
     */
    return function resizillaFinal() {
        for (var _len = arguments.length, APIParameters = Array(_len), _key = 0; _key < _len; _key++) {
            APIParameters[_key] = arguments[_key];
        }

        // The unchosen excess defaults.
        var excessDefaults = defaults$$1.slice(APIParameters.length, defaults$$1.length);

        // Concatenate the API options with the excess defaults.
        var optionValues = [].concat(APIParameters, toConsumableArray(excessDefaults));

        // Final options as an object.
        var mergedOptions = Object.assign.apply(Object, toConsumableArray(optionValues.map(convertPairsToLiterals)));

        // Destructured options.
        var handler = mergedOptions.handler,
            delay = mergedOptions.delay,
            incept = mergedOptions.incept,
            useCapture = mergedOptions.useCapture,
            orientationChange = mergedOptions.orientationChange;

        // A direct reference to the added handler.

        var directHandler = addWindowEvent(handler, delay, incept, windowObject, useCapture);

        // Adds orientationchange event if required.
        if (orientationChange) {
            windowObject.addEventListener('orientationchange', directHandler, useCapture);
        }

        // Returns an destroyAPI method to remove event listeners.
        return {
            destroy: destroyPartial(directHandler, useCapture, windowObject)
        };
    };
};

// Creates the Resizilla function.
var resizilla = resizillaPartial(defaults$$1, windowGlobal);

var objectAssignPolyfill$1 = function objectAssignPolyfill$1() {
    if (typeof Object.assign != 'function') {
        (function () {
            Object.assign = function (target) {
                'use strict';
                // We must check against these specific cases.

                if (target === undefined || target === null) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var output = Object(target);
                for (var index = 1; index < arguments.length; index++) {
                    var source = arguments[index];
                    if (source !== undefined && source !== null) {
                        for (var nextKey in source) {
                            if (source.hasOwnProperty(nextKey)) {
                                output[nextKey] = source[nextKey];
                            }
                        }
                    }
                }
                return output;
            };
        })();
    }
};

var objectFreezePolyfill = function objectFreezePolyfill() {
    /** 
     * Object.freeze polyfill
     * ES5 15.2.3.9
     * {@link http://es5.github.com/#x15.2.3.9}
     */
    if (!Object.freeze) {
        Object.freeze = function freeze(object) {
            if (Object(object) !== object) {
                throw new TypeError('Object.freeze can only be called on Objects.');
            }
            // this is misleading and breaks feature-detection, but
            // allows "securable" code to "gracefully" degrade to working
            // but insecure code.
            return object;
        };
    }
};

/** 
 * CSS Fixed units with pixel values.
 */
var CSSFixedUnits = [{
    unit: 'xx-small',
    // 9 / 16
    PXValue: 9
}, {
    unit: 'x-small',
    // 10 / 16
    PXValue: 10
}, {
    unit: 'small',
    // 13 / 16
    PXValue: 13
}, {
    unit: 'normal',
    // 16 / 16
    PXValue: 16
}, {
    unit: 'medium',
    // 16 / 16
    PXValue: 16
}, {
    unit: 'large',
    // 18 / 16
    PXValue: 18
}, {
    unit: 'x-large',
    // 24 / 16
    PXValue: 24
}, {
    unit: 'xx-large',
    // 32 / 16
    PXValue: 32
}];

/** 
 * CSS Units with pixel factor.
 */
var CSSUnits = [{
    unit: 'px',
    //  1 / 16
    PXFactor: 1
}, {
    unit: 'pt',
    // 96 / 72 / 16
    PXFactor: 1.33333333328
}, {
    unit: 'em',
    // 1
    PXFactor: 16
}, {
    unit: 'rem',
    // 1
    PXFactor: 16
}, {
    unit: 'cm',
    // ???
    PXFactor: 16
}, {
    unit: 'q',
    // ???
    PXFactor: 16
}, {
    unit: 'in',
    // ???
    PXFactor: 16
}, {
    unit: 'pc',
    // 96 / 72 / 12 / 16
    PXFactor: 0.11111111104
}, {
    unit: 'ex',
    // ???
    PXFactor: 16
}, {
    unit: 'ch',
    // ???
    PXFactor: 16
}, {
    unit: 'vw',
    // Needs override.
    PXFactor: 16
}, {
    unit: 'vh',
    // Needs override.
    PXFactor: 16
}, {
    unit: 'vmin',
    // Needs override.
    PXFactor: 16
}, {
    unit: 'vmax',
    // Needs override.
    PXFactor: 16
}];

// Checks if string or number is a number.
var isNumber = function isNumber(value) {
    return Number(value) === value;
};

// A very simple compose function.
var basicCompose = function basicCompose(a, b) {
    return function (c) {
        return a(b(c));
    };
};

// converts pixels to REM values.
var pxToRem = function pxToRem(fontSizePx) {
    return parseInt(fontSizePx) / 16;
};

// Checks callback type.
var isCallBackDefined = function isCallBackDefined(callback) {
    return typeof callback === 'function';
};

// Gets the element's root font size.
var getFontSize = function getFontSize(element) {
    return window.getComputedStyle(element.documentElement, null).getPropertyValue('font-size');
};

// Gets the root element.
var getRootElement = function getRootElement(element) {
    var elements = {
        html: function html(parent) {
            return parent.documentElement;
        },
        body: function body(parent) {
            return parent.body;
        }
    };

    if (element instanceof Element) {
        if (element.nodeType === 1) {
            return element;
        } else {
            // @TODO Throw new error.
        }
    }
    return elements.hasOwnProperty(element) ? elements[element](document) : document.querySelector(element);
};

var aliasValueToPX = function aliasValueToPX(value) {
    return CSSFixedUnits.filter(function (metricInfo) {
        return value === metricInfo.unit;
    }).shift().PXValue;
};

var CSSUnitsToPixels = function CSSUnitsToPixels(value) {

    if (isNumber(value)) {
        return value;
    }

    var suffix = value.replace(/[^a-z]+/gi, '');
    var numberValue = value.replace(/[^\d\.]*/g, '');

    var metricInfo = CSSUnits.filter(function (metricInfo) {
        return suffix === metricInfo.unit;
    }).shift();

    var PXValue = metricInfo ? numberValue * metricInfo.PXFactor : aliasValueToPX(value);

    return parseInt(PXValue);
};

/**
 * Sets up intializeMimetic via partial application.
 * @param {Function} getRootElement - Gets the root font element.
 * @param {Function} getRootREMValue - Gets the root font-size in REM units.
 * @param {Function} CSSUnitsToPixels - Converts any CSS units to pixels.
 * @param {Function} setRootFontSize - Sets the new root font size.
 * @param {Function} resizilla - Calls handler on window resize and orientationchange events.
 */
function initializeMimeticPartial(getRootElement, getRootREMValue, CSSUnitsToPixels, setRootFontSize, resizilla) {
    // A resize object to store MIMETIC's resizilla's requirements.
    var resize = {};

    /**
     * The intializeMimetic function.
     * @param {object} config - The API parameters.
     */
    function initalizeMimeticFinal(config) {
        // Destructured API parameters.
        var loadEvent = config.loadEvent,
            mobileWidth = config.mobileWidth,
            rootSelector = config.rootSelector,
            scaleDelay = config.scaleDelay,
            cutOffWidth = config.cutOffWidth;

        // Store the scaleDelay for kill and revive.

        resize.scaleDelay = scaleDelay;

        // The root font element.
        var rootElement = getRootElement(rootSelector);

        // The intial root font size.
        var rootFontSize = getRootREMValue(document);

        // mobileWidth in pixels.
        var mobileWidthPX = CSSUnitsToPixels(mobileWidth);

        // Cut off width in pixels.
        var cutOffWidthPX = CSSUnitsToPixels(cutOffWidth);

        // Provide parameters to setRootFontSize. @TODO remove config, only use what is needed.
        var settings = Object.assign({
            initialOuterHeight: window.outerHeight,
            initialOuterWidth: window.outerWidth,
            rootFontSize: rootFontSize,
            rootElement: rootElement,
            mobileWidthPX: mobileWidthPX,
            cutOffWidthPX: cutOffWidthPX
        }, config);

        // Store the settings for kill and revive. 
        resize.settings = settings;

        // Immediately set the root font size according to MIMETIC.
        setRootFontSize(settings);

        // On window resize set the root font size according to MIMETIC.
        resize.resizilla = resizilla(function () {
            setRootFontSize(settings);
        }, scaleDelay, false);
    }

    /** 
     * Remove both event listeners set via resizilla.
     */
    initalizeMimeticFinal.prototype.kill = function () {
        resize.resizilla.destroy();
    };

    /** 
     * Re-instate resizilla.
     */
    initalizeMimeticFinal.prototype.revive = function () {
        resize.resizilla = resizilla(function () {
            setRootFontSize(resize.settings);
        }, resize.scaleDelay, false);
    };

    // Return as intializeMimetic.
    return initalizeMimeticFinal;
}

/** 
 * Set Root Font Size.
 */
var setRootFontSizePartial = function setRootFontSizePartial(resizeRootFontSize) {
    var requestId = void 0;
    var lastOuterWidth = void 0;
    var lastOuterHeight = void 0;
    var windowRef = window;
    var documentRef = windowRef.document;
    return function (_ref2) {
        var rootElement = _ref2.rootElement,
            rootFontSize = _ref2.rootFontSize,
            initialOuterHeight = _ref2.initialOuterHeight,
            initialOuterWidth = _ref2.initialOuterWidth,
            relativeDesignWidth = _ref2.relativeDesignWidth,
            mobileWidth = _ref2.mobileWidth,
            cutOffWidth = _ref2.cutOffWidth,
            enableScale = _ref2.enableScale,
            preserveDevicePixelRatio = _ref2.preserveDevicePixelRatio,
            onScale = _ref2.onScale,
            onZoom = _ref2.onZoom,
            onResize = _ref2.onResize,
            mobileWidthPX = _ref2.mobileWidthPX,
            cutOffWidthPX = _ref2.cutOffWidthPX;

        // Real time DOM measurments.
        var innerWidth = windowRef.innerWidth;
        var outerWidth = windowRef.outerWidth;
        var outerHeight = windowRef.outerHeight;
        var clientWidth = documentRef.documentElement.clientWidth;
        var DPR = windowRef.devicePixelRatio;

        // Ratio between the outer and client width.
        var outerClientRatio = outerWidth / clientWidth;

        // A calulated DPR within the proximity of 0.05. for devices (eg.safari) that have a fixed DPR.
        // @TODO check on large display devices with DPRs greater than 1. 
        var OCRProximity = outerClientRatio < 1.05 && outerClientRatio > 0.95 ? 1 : outerClientRatio;

        // A calculated DPR safe for safari browsers.
        var safariSafeDPR = Number(OCRProximity.toFixed(5));

        // Legacy internet explorer devicePixelRatio.
        var IEDPR = Number(screen.deviceXDPI / screen.logicalXDPI);

        // The devicePixelRatio with polyfilled support.
        var calculatedDPR = Math.abs(IEDPR ? IEDPR : DPR === 1 ? safariSafeDPR : DPR);

        // The real viewport width. 
        var viewportWidth = parseInt(clientWidth * calculatedDPR);

        // The default device pixel ratio. 
        var defaultDPR = Math.round(clientWidth * calculatedDPR / outerWidth);

        /** 
         * Set variable inital values if not yet set.
         */
        if (lastOuterWidth === undefined) {
            lastOuterWidth = initialOuterWidth;
            lastOuterHeight = initialOuterHeight;
        }

        /**
         * The window width compared to the design width.
         */
        var designWidthRatio = innerWidth / relativeDesignWidth;

        /**
         * Check to see if the window is at the default zoom level.
         */
        var isDevicePixelRatioDefault = defaultDPR === calculatedDPR;

        /** 
         * The minimum veiwport size to not react to.
         */
        var cutOff = cutOffWidthPX > mobileWidthPX ? cutOffWidthPX : mobileWidthPX;

        /**
         * Mutate on next available frame.
         */
        resizeRootFontSize({
            innerWidth: innerWidth,
            outerWidth: outerWidth,
            isDevicePixelRatioDefault: isDevicePixelRatioDefault,
            relativeDesignWidth: relativeDesignWidth,
            cutOff: cutOff,
            rootElement: rootElement,
            designWidthRatio: designWidthRatio,
            calculatedDPR: calculatedDPR,
            rootFontSize: rootFontSize,
            enableScale: enableScale,
            preserveDevicePixelRatio: preserveDevicePixelRatio,
            onScale: onScale,
            onZoom: onZoom,
            onResize: onResize,
            viewportWidth: viewportWidth,
            defaultDPR: defaultDPR
        });

        /**
         * Updated Outer browser dimensions.
         */
        lastOuterWidth = outerWidth;
        lastOuterHeight = outerWidth;
    };
};

var wasLastBeyondMobileWidth = true;
var lastDevicePixelRatio = void 0;
var hasScaleCallback = false;
var hasZoomCallback = false;
var hasResizeCallback = false;
var APIParameters = void 0;
var callbacksRequireValidation = true;
var initalRenderOnce = true;

/** 
 * Calculate and apply the new font size to the root element.
 */
var resizeRootFontSize = function resizeRootFontSize(_ref3) {
    var innerWidth = _ref3.innerWidth,
        outerWidth = _ref3.outerWidth,
        isDevicePixelRatioDefault = _ref3.isDevicePixelRatioDefault,
        relativeDesignWidth = _ref3.relativeDesignWidth,
        cutOff = _ref3.cutOff,
        rootElement = _ref3.rootElement,
        designWidthRatio = _ref3.designWidthRatio,
        calculatedDPR = _ref3.calculatedDPR,
        rootFontSize = _ref3.rootFontSize,
        enableScale = _ref3.enableScale,
        preserveDevicePixelRatio = _ref3.preserveDevicePixelRatio,
        onScale = _ref3.onScale,
        onZoom = _ref3.onZoom,
        onResize = _ref3.onResize,
        viewportWidth = _ref3.viewportWidth,
        defaultDPR = _ref3.defaultDPR;

    // Calculates the devicePixelRatio as if the default was 1.
    var normalizedDPR = 1 / defaultDPR * calculatedDPR;

    // The preserved or non-preserved DPR via API settings.
    var evalDPR = preserveDevicePixelRatio ? calculatedDPR : normalizedDPR;

    // Truthy if the browser is resized without being zoomed.
    var resizeWithoutZoom = calculatedDPR === lastDevicePixelRatio;

    if (resizeWithoutZoom || isDevicePixelRatioDefault || initalRenderOnce) {
        if (initalRenderOnce) {
            initalRenderOnce = false;
        }
        var isAboveDesignWidth = innerWidth > relativeDesignWidth;

        if (innerWidth > cutOff) {
            /** 
             * Set the rootElement's font size.
             */
            if (enableScale) {
                rootElement.style.fontSize = (rootFontSize * designWidthRatio * evalDPR).toFixed(6) + 'rem';
            }

            /** 
             * Indicate that the viewport has exceeded the mobileWidth.
             */
            wasLastBeyondMobileWidth = true;
        } else if (wasLastBeyondMobileWidth) {
            /** 
             * Prevent odd behaviour when refreshed.
             * By removing the style attribute once when 
             * within the mobileWidth.
             */
            if (wasLastBeyondMobileWidth) {
                rootElement.removeAttribute("style");
            }
            /** 
             * Reset as within mobileWidth.
             */
            wasLastBeyondMobileWidth = false;
        }
    }

    // The parameters passed to each callback as an object.
    APIParameters = {
        viewportWidth: viewportWidth,
        innerWidth: innerWidth,
        evalDPR: evalDPR,
        calculatedDPR: calculatedDPR,
        normalizedDPR: normalizedDPR
    };

    // Validates callbacks once.
    if (callbacksRequireValidation && innerWidth > cutOff) {
        callbacksRequireValidation = false;
        hasScaleCallback = isCallBackDefined(onScale);
        hasZoomCallback = isCallBackDefined(onZoom);
        hasResizeCallback = isCallBackDefined(onResize);
    }

    // Action onScale during resize without zoom.    
    if (resizeWithoutZoom && hasScaleCallback) {
        onScale(APIParameters);
    }

    // Action onZoom during resize without scale.
    if (!resizeWithoutZoom && hasZoomCallback) {
        onZoom(APIParameters);
    }

    // Action onResize during either zoom or scale.
    if (hasResizeCallback) {
        onResize(APIParameters);
    }

    // Store the last device pixel ratio for future comparision.
    lastDevicePixelRatio = calculatedDPR;
};

/**
 * Sets up mimetic via partial application.
 * @param {Function} initializeMimetic - Initalizes MIMETIC function.
 */
var mimeticPartial = function mimeticPartial(initializeMimetic, defaults$$1) {
    return function (configurationObj) {
        // Assing configuration as an object.
        var configuration = configurationObj ? configurationObj : {};

        // Merge configuration into defaults.
        var overriddenDefaults = Object.assign(defaults$$1, configuration);

        // Prevent config mutations.
        var config = Object.freeze(overriddenDefaults);

        // Default load to DOMContentLoaded if not opted.
        var loadEventOption = config.loadEvent === 'load' ? 'load' : 'DOMContentLoaded';

        // Initalize mimetic on load.
        window.addEventListener(loadEventOption, function () {
            return initializeMimetic(config);
        });

        // Return kill and revive methods.
        return {
            kill: function kill() {
                initializeMimetic.prototype.kill();
            },
            revive: function revive() {
                initializeMimetic.prototype.revive();
            }
        };
    };
};

/** 
 * Default config properties if not defined.
 */
var defaults$1 = {
    loadEvent: 'DOMContentLoaded', // Load type
    mobileWidth: 640, // Width before disabling for mobile phone devices.
    scaleDelay: 16, // Miliseconds between calls on resize.
    preserveDevicePixelRatio: false, // Preserve the device pixel ratio on zoom.
    rootSelector: 'html', // Use the HTML element as the root element. 
    onScale: undefined,
    onZoom: undefined,
    onResize: undefined,
    cutOffWidth: 0, // The minimum width to disable resizing.
    relativeDesignWidth: 1024, // The width relative to the font size.
    enableScale: true
};

//Object Assign polyfill.
objectAssignPolyfill$1();

//Object Freeze polyfill.
objectFreezePolyfill();

/*
 initializeMimetic initalizes resizilla 
 (A window resize plugin) to call setRootFontSize 
 on window resize.

 setRootFontSize -> resizeRootFontSize which does 
 `rootElement.style.fontSize = 'xrem';`

 This function is initally called on resize.
*/
var setRootFontSize = setRootFontSizePartial(resizeRootFontSize);

// Gets the root element value in REM units.
var getRootREMValue = basicCompose(pxToRem, getFontSize);

/* 
 Called initally and on prototype.revivie() to 
 setup and implement resizilla's event listeners.

 initalizeMimetic contains a kill method to remove 
 resizilla's event listeners and a revive method to 
 restart Mimetic's initalization.
*/
var initializeMimetic = initializeMimeticPartial(getRootElement, getRootREMValue, CSSUnitsToPixels, setRootFontSize, resizilla);

// The MIMETIC API. 
var mimetic = mimeticPartial(initializeMimetic, defaults$1);

// For Scalable Web Design: 
mimetic();

// import { init } from 'snabbdom';
// import { classModule } from 'snabbdom/modules/class';
// import { heroModule } from 'snabbdom/modules/hero';
// import { styleModule } from 'snabbdom/modules/style';
// import eventListenersModule from '../libs/eventlisteners';
// import { a, h1, h2, div, span } from '../dist/hypertext.es.js';

// const patch = init([
//     classModule,
//     heroModule,
//     styleModule,
//     eventListenersModule
// ]);


// window.addEventListener('DOMContentLoaded', () => {
//     const container = document.getElementById('container');

//     var vnode = div({ id: 'container', class: 'two classes', event: { click: () => { console.log('yo') } } }, [
//         span({ style: { fontWeight: 'bold' } }, 'This is bold'),
//         ' and this is just normal text',
//         a({ props: { href: '/foo' } }, 'I\'ll take you places!')
//     ]);
//     // Patch into empty DOM element – this modifies the DOM as a side effect
//     patch(container, vnode);

//     var newVnode = div({ id: 'container', class: '.two.classes', event: { click: () => { console.log('yo') } } }, [
//         span({ style: { fontWeight: 'normal', fontStyle: 'italic' } }, 'This is now italic type'),
//         ' and this is still just normal text',
//         a({ props: { href: '/bar' } }, 'I\'ll take you places!')
//     ]);
//     // Second `patch` invocation
//     patch(vnode, newVnode); // Snabbdom efficiently updates the old view to the new state

// });

})));
