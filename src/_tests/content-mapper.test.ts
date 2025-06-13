import { contentsToMap, mapToContents } from "@/lib/content-mapper";
import { describe, test, expect } from "vitest";


describe('content-mapper tests', () => {
    test('map to contents', () => {
        const map = new Map([
            ['keyOne', '100'],
            ['keyTwo', '$keyOne * 2']
        ])

        const result = mapToContents(map);

        expect(result).toHaveLength(2);

        expect(result[0].key).toBe('keyOne')
        expect(result[0].value).toBe('100')
        expect(result[0].displayValue).toBeUndefined()

        expect(result[1].key).toBe('keyTwo')
        expect(result[1].value).toBe('$keyOne * 2')
        expect(result[1].displayValue).toBe('200')
    })

    test('contents to map', () => {
        const contents = [
            { key: 'goal', value: '1000' },
            { key: 'amount', value: '$goal * 2' }
        ]

        const map = contentsToMap(contents);
        expect(map.get('goal')).toBe('1000');
        expect(map.get('amount')).toBe('$goal * 2')
    })
})