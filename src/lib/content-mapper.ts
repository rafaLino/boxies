import { TContent } from '@/types/box.type';
import Mexp from 'math-expression-evaluator'
import { keyRegex, operatorRegex, valueRegex } from './regex';

const mexp = new Mexp();

function evalMathExpression(expression: string) {
    return mexp.eval(expression).toString();
}

function hasKeyAndMathOperator(expression: string | undefined) {
    if (!expression) return false;

    return keyRegex.test(expression) && operatorRegex.test(expression);
}

function replaceValue(value: string) {
    const matchedValue = value.match(valueRegex);
    return matchedValue ? matchedValue[0].replace(',', '.') : value;
}

function transformExpression(expression: string, contents: TContent[]): string {
    const formattedExpression = expression.replace(keyRegex, (match, key) => {
        const content = contents.find(x => x.key === key)
        if (!content) return match

        if (hasKeyAndMathOperator(content.expression)) {
            return transformExpression(content.expression, contents)
        }
        return replaceValue(content.expression)
    });
    return evalMathExpression(formattedExpression)
}

export function evalValue(input: TContent[]): TContent[] {
    const contents = input.map(({ key, expression, label }) => {
        if (hasKeyAndMathOperator(expression)) {
            const value = transformExpression(expression, input);
            return ({ label, key, value, expression })
        }
        return ({ label, key, value: expression, expression })
    })

    return contents;
}
