import keypad from '../view';
import BigNumber from 'bignumber.js';
import exprEval from 'expr-eval';
import ui from '../../';
import inputs from './inputs';
import { isFloat, isInt } from '../../../utilities';


const displayInput = (inputs, textContent, display, equation) => {
    const displayClone = Array.from(display);
    const equationClone = Array.from(equation);

    const textContentDisplay = inputs[textContent][0];
    const textContentEquation = inputs[textContent][1];
    const lastChar = display[display.length - 1];

    const isClosingAndOpeningBrace = lastChar === ')' && textContentDisplay === '(';
    const isClosingAndOpeningBrace2 = textContentDisplay === ')' || textContentDisplay === '(';
    const lastEntryIsAnNumber = isInt(lastChar);
    const currentInputIsAnOperator = !(isInt(textContentDisplay) || textContentDisplay === '.' || isClosingAndOpeningBrace2) && textContentEquation.trim() !== '-';
    const currentInputIsAFnOperator = currentInputIsAnOperator && !['√', '(', ')', 'sin(', 'cos(', 'tan(', 'log('].includes(textContentDisplay.trim());
    const currentInputIsBasicOperator = ['+', '*', '/'].includes(textContentEquation.trim());
    const currentInputIsNotBraces = textContentDisplay !== ')' || textContentDisplay !== '(';

    const initalZeroDisplay = displayClone.length === 1 && displayClone[0] === 0;

    console.log(currentInputIsBasicOperator)
    if (initalZeroDisplay && currentInputIsBasicOperator) {
        displayClone.push(textContentDisplay);
        equationClone.push(textContentEquation);
    } else if (initalZeroDisplay) {
        displayClone[0] = textContentDisplay;
        equationClone[0] = textContentEquation;
    } else if (!lastEntryIsAnNumber && currentInputIsAFnOperator) {
        console.log('no')
    } else {
        displayClone.push(textContentDisplay);
        equationClone.push(isClosingAndOpeningBrace ? ' * ' + textContentEquation : textContentEquation);
    }

    return {
        display: displayClone,
        equation: equationClone,
    };
}


const removeLastPartOrDigit = sessionType => {
    const results = sessionType.length === 1 ? [0] : sessionType.slice(0, -1);
    return results;

};


const evaluate = (entry) => {
    let evaluated;

    try {
        evaluated = parser.evaluate(entry.join(''));
    } catch (e) {
        console.error(entry);
        return ['Error'];
    }

    const resultsLength = evaluated.toString().length;
    const floatResults = resultsLength <= 14 ? evaluated : parseFloat(evaluated).toPrecision(9);
    const intResults = evaluated = resultsLength <= 14 ? evaluated : evaluated.toPrecision(9);
    const results = isFloat(evaluated) ? floatResults : intResults;
    console.log('results', results)
        // return [(results).toString()];
    return ('' + results).split('');
}


const parser = exprEval.Parser;
let AC = false;
let results;
let display = [0];
let equation = [0];

const keyPadSensors = (e) => {
    const target = e.target;
    const isKey = target.closest('.keys') && !target.classList.contains('keys');
    const textContent = target.textContent || 0;
    const CE = textContent === 'CE' || textContent === 'AC';
    const equals = textContent === '=';

    const isKeyNumberOrOperator = !CE && !equals;
    const isKeyClearEntry = CE && !equals && !AC;
    const isKeyClearAll = isKey && CE && AC;
    const showResults = equals && display.length >= 1;

    if (isKey) {
        if (isKeyNumberOrOperator) {
            const newEntry = displayInput(inputs, textContent, display, equation);
            display = newEntry.display;
            equation = newEntry.equation;
        }


        if (isKeyClearEntry) {
            display = removeLastPartOrDigit(display, equation);
            equation = removeLastPartOrDigit(equation);
        } else if (isKeyClearAll) {
            display = [0];
            equation = [0];
        }


        // AC is invalid if other key is pressed after =.
        if (!equals) {
            AC = false;
        }


        // Show results via =. 
        if (showResults) {
            const results = evaluate(equation);
            display = results;
            equation = results;
            AC = true;
        }



        // Join expression parts and numbers.
        const displayContent = display.join('');


        // Render Clear Button.
        if (AC) {
            ui('CHANGE_CE_TO_AC');
        } else {
            ui('CHANGE_AC_TO_CE');
        }


        // Render Display Content.
        return ui('PRINT_CHARS', displayContent);
    }
}

const ClearAllByACHold = (e) => {
    const target = e.target;
    console.log(target)
}

document.addEventListener('click', keyPadSensors);


// document.addEventListener('DOMContentLoaded', () => {
//     const clearEl = document.querySelector('.clear');
//     console.log(clearEl)
//     clearEl.addEventListener('mousedown', ClearAllByACHold);
// })


const controller = (clearButton) => keypad(clearButton);

export default controller;


// PI should be treated like a number.