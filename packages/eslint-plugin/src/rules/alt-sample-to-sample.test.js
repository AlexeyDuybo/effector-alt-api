const RuleTester = require('@typescript-eslint/rule-tester').RuleTester;
const rule = require('./alt-sample-to-sample');
const {altApiPackageName} = require('../shared');
RuleTester.afterAll = afterAll;

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    }
});

ruleTester.run('altSampleToSample', rule, {
    valid: [
        {
            code: `
                ({} as import('effector-alt-api').Sample)
                .clock(clock)
                .source(source)
                .filter(filter)
                .fn(
                    fn,
                    target
                )
            `
        },
        {
            code: `
                ({} as import('effector-alt-api').Sample)!
            `
        },
        {
            code: `
                ({} as import('effector-alt-api').Sample)
                    .clock!
            `
        },
        {
            code: `
                sample({
                    clock: createStore(''),
                    filter: filter,
                    target: target
                })!
            `
        },
    ],
    invalid: [
        {
            code: `({} as import('effector-alt-api').Sample)
                    .clock(clock)!`,
            errors: [{
                message: 'replace alt sample with sample'
            }],
            output: `sample({
    clock: clock
})`
        },
        {
            code: `({} as import('effector-alt-api').Sample)
                    .clock(clock)
                    .toTarget()!`,
            errors: [{
                message: 'replace alt sample with sample'
            }],
            output: `sample({
    clock: clock
})`
        },
        {
            code: `({} as import('effector-alt-api').Sample)
                    .clock(clock, target)!`,
            errors: [{
                message: 'replace alt sample with sample'
            }],
            output: `sample({
    clock: clock,
    target: target
})`
        },
        {
            code: `({} as import('effector-alt-api').Sample)
                    .clock(clock)
                    .source(source)
                    .filter(filter)
                    .fn(fn)!`,
            errors: [{
                message: 'replace alt sample with sample'
            }],
            output: `sample({
    clock: clock,
    source: source,
    filter: filter,
    fn: fn
})`
        },
        {
            code: `({} as import('effector-alt-api').Sample)
                    .clock(clock)
                    .source(source)
                    .filter(filter)
                    .toTarget()!`,
            errors: [{
                message: 'replace alt sample with sample'
            }],
            output: `sample({
    clock: clock,
    source: source,
    filter: filter
})`
        },
        {
            code: `({} as import('effector-alt-api').Sample)
                    .clock(clock)
                    .source(source)
                    .filter(filter)
                    .fn(fn, target)!`,
            errors: [{
                message: 'replace alt sample with sample'
            }],
            output: `sample({
    clock: clock,
    source: source,
    filter: filter,
    fn: fn,
    target: target
})`
        },
        {
            code: `({} as import('effector-alt-api').Sample)
                    .clock(clock, [s1, s2])!`,
            errors: [{
                message: 'replace alt sample with sample'
            }],
            output: `sample({
    clock: clock,
    target: [s1, s2] as const
})`
        },
        {
            code: `({} as import('effector-alt-api').Sample)
                    .clock(clock)
                    .filter((x): x is b => true)
                    .fn((x) => x)!`,
            errors: [{
                message: 'replace alt sample with sample'
            }],
            output: `sample({
    clock: clock,
    filter: (x): x is b => true,
    fn: (x: b) => x
})`
        },
        {
            code: `({} as import('effector-alt-api').Sample)
                    .clock(clock)
                    .filter((x): x is b => true)
                    .fn(({ a }) => a)!`,
            errors: [{
                message: 'replace alt sample with sample'
            }],
            output: `sample({
    clock: clock,
    filter: (x): x is b => true,
    fn: ({ a }: b) => a
})`
        },
        {
            code: `({} as import('effector-alt-api').Sample)
                    .clock(clock)
                    .filter((x, y): x is b => true)
                    .fn((x, y) => x)!`,
            errors: [{
                message: 'replace alt sample with sample'
            }],
            output: `sample({
    clock: clock,
    filter: (x, y): x is b => true,
    fn: (x: b, y) => x
})`
        },
        {
            code: `({} as import('effector-alt-api').Sample)
                    .clock(clock)
                    .filter((x, y): y is b => true)
                    .fn((x, y) => x)!`,
            errors: [{
                message: 'replace alt sample with sample'
            }],
            output: `sample({
    clock: clock,
    filter: (x, y): y is b => true,
    fn: (x, y: b) => x
})`
        },
        {
            code: `({} as import('effector-alt-api').Sample)
                    .clock(clock)
                    .filter((x, y): y is b => true)
                    .fn(fn)!`,
            errors: [{
                message: 'replace alt sample with sample'
            }],
            output: `sample({
    clock: clock,
    filter: (x, y): y is b => true,
    fn: fn
})`
        },
        {
            code: `({} as import('effector-alt-api').Sample)
                    .clock(clock)
                    .filter((x, y): y is b => true)
                    .fn((x, y: trash) => x)!`,
            errors: [{
                message: 'replace alt sample with sample'
            }],
            output: `sample({
    clock: clock,
    filter: (x, y): y is b => true,
    fn: (x, y: b) => x
})`
        },
        {
            code: `({} as import('effector-alt-api').Sample)
                    .clock(clock)
                    .fn((x, y: trash) => x)!`,
            errors: [{
                message: 'replace alt sample with sample'
            }],
            output: `sample({
    clock: clock,
    fn: (x, y: trash) => x
})`
        },
        
    ]
});