# Effector alt api

## Install

Works with TS 5.x.x and above

```bash
npm i --save-dev effector-alt-api eslint-plugin-effector-alt-api
```

## effector-alt-api

This package contains alternative types for Effector operators. (atm only sample available).

See examples and explanation: **_[TS Playground](https://tsplay.dev/w6qrGW)_**

## eslint-plugin-effector-alt-api

This package constains eslint plugin that transforms original operators to alternative and vice verse.

### Plugin setup

- Add `"eslint-plugin-effector-alt-api"` to the "plugins" array in your `.eslintrc.*` file, and extend recommended config.
```json
{
    "extends": ["plugin:effector-alt-api/recommended"],
    "parser": "@typescript-eslint/parser",
    "plugins": ["effector-alt-api"]
}
```

- Enable code fixing on save in IDE.
VSCode example.

```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "always"
    },
}
```

### Transformation

To transform original operators to alternative and vice verse just add exclamation point to the end of the operator, then save the file and your code editor will have to transform the code.

```ts
    sample({
        clock: clock,
        source: source,
        target: target
    })!;

    // will transform to 

    ({} as import('effector-alt-api').Sample)
        .clock(clock)
        .source(source, target);
```
and
```ts
    ({} as import('effector-alt-api').Sample)
        .clock(clock)
        .source(source, target)!;
    
    // will transform to

       sample({
        clock: clock,
        source: source,
        target: target
    });
```
