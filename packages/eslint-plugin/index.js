module.exports = {
    rules: {
        'alt-sample-to-sample': require('./src/rules/alt-sample-to-sample'),
        'sample-to-alt-sample': require('./src/rules/sample-to-alt-sample')
    },
    configs: {
        recommended: {
            "effector-alt-api/alt-sample-to-sample": "warn",
            "effector-alt-api/sample-to-alt-sample": "warn"
        },
    }
}