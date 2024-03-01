module.exports = {
    rules: {
        'alt-sample-to-sample': require('./rules/alt-sample-to-sample'),
        'sample-to-alt-sample': require('./rules/sample-to-alt-sample')
    },
    configs: {
        recommended: {
            "effector-alt-api/alt-sample-to-sample": "warn",
            "effector-alt-api/sample-to-alt-sample": "warn"
        },
    }
}