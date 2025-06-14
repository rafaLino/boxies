import { evalValue } from "@/lib/content-mapper";
import { describe, test, expect } from "vitest";


describe('content-mapper tests', () => {
    test('map to contents', () => {
        const obj = [
            { label: 'test', key: '$1', value: '', expression: '100' },
            { label: 'test', key: '$2', value: '', expression: '$1 + 2' },
        ]

        const result = evalValue(obj);

        expect(result).toHaveLength(2);

        expect(result[0].key).toBe('$1')
        expect(result[0].expression).toBe('100')
        expect(result[0].value).toBe('100')

        expect(result[1].key).toBe('$2')
        expect(result[1].expression).toBe('$1 + 2')
        expect(result[1].value).toBe('102')
    })

    test('check math content', () => {
        const obj = [
            { label: 'test', key: '$1', value: '', expression: '100' },
            { label: 'test', key: '$2', value: '', expression: '$1 + 20' },
            { label: 'test', key: '$3', value: '', expression: '$2 * 10' },
            { label: 'test', key: '$4', value: '', expression: '$3 / 2' },
        ]

        const result = evalValue(obj)

        expect(result[1].expression).toBe('$1 + 20')
        expect(result[1].value).toBe('120')

        expect(result[2].expression).toBe('$2 * 10')
        expect(result[2].value).toBe('1200')

        expect(result[3].expression).toBe('$3 / 2')
        expect(result[3].value).toBe('600')
    })

    test('map simple content', () => {
        const obj = [
            { label: 'test', key: '$1', value: '', expression: 'a simple large content with important information' },
        ]

        const result = evalValue(obj)
        expect(result).toBeDefined()
    })
})