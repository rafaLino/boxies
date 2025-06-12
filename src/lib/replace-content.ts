import Mexp from 'math-expression-evaluator'

const mexp = new Mexp();

function evalMathExpression(expression: string) {
    return mexp.eval(expression).toString();
}

function hasLabelKeyAndMathOperator(expression: string) {
    const labelKeyRegex = /^\$\w+/;
    const operatorRegex = /[+\-*/]/;

    return labelKeyRegex.test(expression) && operatorRegex.test(expression);
}

function replaceValue(value: string) {
    const matchedValue = value.match(/[\d.,]+/g);
    return matchedValue ? matchedValue[0].replace(',', '.') : value;
}

export function replaceContent(obj: Record<string, string>) {
    const newObj = { ...obj }

    function evaluateExpression(expression: string) {
        return expression.replace(/\$(\w+)/g, (match, key) => {
            const value = newObj[key]
            return value ? replaceValue(value) : match;
        });
    }


    for (const key in newObj) {
        if (typeof newObj[key] === 'string') {
            if (hasLabelKeyAndMathOperator(newObj[key])) {
                const newExpression = evaluateExpression(newObj[key]);
                newObj[key] = evalMathExpression(newExpression);
            }
        }
    }

    return newObj;
}