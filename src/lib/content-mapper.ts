import { TContent } from '@/types/box.type';
import Mexp from 'math-expression-evaluator'

const mexp = new Mexp();

function evalMathExpression(expression: string) {
    return mexp.eval(expression).toString();
}

function hasLabelKeyAndMathOperator(expression: string | undefined) {
    if (!expression) return false;

    const labelKeyRegex = /^\$\w+/;
    const operatorRegex = /[+\-*/]/;

    return labelKeyRegex.test(expression) && operatorRegex.test(expression);
}

function replaceValue(value: string) {
    const matchedValue = value.match(/[\d.,]+/g);
    return matchedValue ? matchedValue[0].replace(',', '.') : value;
}

function evaluateExpression(expression: string, map: Map<string, string>) {
    return expression.replace(/\$(\w+)/g, (match, key) => {
        const value = map.get(key)
        return value ? replaceValue(value) : match;
    });
}

function replaceContent(map: Map<string, string>): TContent[] {

    const contents = Array.from(map, (([key, value]) => {
        if (hasLabelKeyAndMathOperator(value)) {
            const expression = evaluateExpression(value, map);
            const displayValue = evalMathExpression(expression);
            return ({ key, value, displayValue })
        }
        return ({ key, value })
    }))

    return contents;
}


export const mapToContents = (map: Map<string, string>) => {
    const replacedContent = replaceContent(map)
    return replacedContent;
}

export const contentsToMap = (contents: TContent[]) => {
    return new Map(contents.map(({ key, value }) => [key, value]));
}