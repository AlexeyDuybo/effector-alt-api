const RuleTester = require('@typescript-eslint/rule-tester').RuleTester;
const rule = require('./sample-to-alt-sample');
const {altApiPackageName} = require('../shared');

RuleTester.afterAll = afterAll;

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    }
});

ruleTester.run('sampleToAltSample', rule, {
    valid: [
        {
            code: `
                sample({
                    clock,
                    source,
                    filter,
                    fn,
                    target,
                })
            `
        },
        {
            code: `
                sample({})!
            `
        },
        {
            code: `
                pample({
                    clock,
                    source,
                    filter,
                    fn,
                    target,
                })!
            `
        },
        {
            code: `
                sample({ foo, bar })!
            `
        },
        {
            code: `
                sample({ fn, target })!
            `
        },
    ],
    invalid: [
        {
            code: `sample({
                    clock,
                    source,
                    filter,
                    fn,
                    target,
                })!`,
            errors: [{
                message: 'replace sample with alt sample'
            }],
            output: `({} as import('${altApiPackageName}').Sample)
    .clock(clock)
    .source(source)
    .filter(filter)
    .fn(
        fn,
        target
    )\n`
        },
        {
            code: `sample({
                    clock,
                    source,
                    filter,
                    fn,
                })!`,
            errors: [{
                message: 'replace sample with alt sample'
            }],
            output: `({} as import('${altApiPackageName}').Sample)
    .clock(clock)
    .source(source)
    .filter(filter)
    .fn(fn)\n`
        },
        {
            code: `sample({
                    clock,
                    source,
                    filter,
                })!`,
            errors: [{
                message: 'replace sample with alt sample'
            }],
            output: `({} as import('${altApiPackageName}').Sample)
    .clock(clock)
    .source(source)
    .filter(filter)
    .toTarget()\n`
        },
        {
            code: `sample({
                    clock,
                    source,
                    filter,
                })!`,
            errors: [{
                message: 'replace sample with alt sample'
            }],
            output: `({} as import('${altApiPackageName}').Sample)
    .clock(clock)
    .source(source)
    .filter(filter)
    .toTarget()\n`
        },
        {
            code: `sample({
                    clock,
                })!`,
            errors: [{
                message: 'replace sample with alt sample'
            }],
            output: `({} as import('${altApiPackageName}').Sample)
    .clock(clock)
    .toTarget()\n`
        },
        {
            code: `sample({
                    clock,
                    target
                })!`,
            errors: [{
                message: 'replace sample with alt sample'
            }],
            output: `({} as import('${altApiPackageName}').Sample)
    .clock(
        clock,
        target
    )\n`
        },
        {
            code: `sample({
                    clock,
                    fn
                })!`,
            errors: [{
                message: 'replace sample with alt sample'
            }],
            output: `({} as import('${altApiPackageName}').Sample)
    .clock(clock)
    .fn(fn)\n`
        },
        {
            code: `sample({
                    clock,
                    fn: (clock: string) => foo
                })!`,
            errors: [{
                message: 'replace sample with alt sample'
            }],
            output: `({} as import('${altApiPackageName}').Sample)
    .clock(clock)
    .fn((clock) => foo)\n`
        },
        {
            code: `sample({
                    clock,
                    source,
                    fn: (source, clock: string) => foo
                })!`,
            errors: [{
                message: 'replace sample with alt sample'
            }],
            output: `({} as import('${altApiPackageName}').Sample)
    .clock(clock)
    .source(source)
    .fn((source, clock) => foo)\n`
        },
        {
            code: `sample({
                    clock,
                    source,
                    fn: (source: string, clock) => foo
                })!`,
            errors: [{
                message: 'replace sample with alt sample'
            }],
            output: `({} as import('${altApiPackageName}').Sample)
    .clock(clock)
    .source(source)
    .fn((source, clock) => foo)\n`
        },
        {
            code: `sample({
                    clock,
                    source,
                    target: [store] as const
                })!`,
            errors: [{
                message: 'replace sample with alt sample'
            }],
            output: `({} as import('${altApiPackageName}').Sample)
    .clock(clock)
    .source(
        source,
        [store]
    )
`
        },
        {
            code: `sample({
                    clock: [event1] as const,
                    source,
                })!`,
            errors: [{
                message: 'replace sample with alt sample'
            }],
            output: `({} as import('${altApiPackageName}').Sample)
    .clock([event1])
    .source(source)
    .toTarget()
`
        },
        {
            code: `const target = sample({
                    clock: [event1] as const,
                    source,
                })!`,
            errors: [{
                message: 'replace sample with alt sample'
            }],
            output: `const target = ({} as import('${altApiPackageName}').Sample)
    .clock([event1])
    .source(source)
    .toTarget()
`
        },
    ]
});
