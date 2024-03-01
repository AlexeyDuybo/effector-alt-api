const {altSampleTypeName, indent} = require('./shared');

const altSampleFields = {
    clock: 'clock',
    source: 'source',
    filter: 'filter',
    fn: 'fn',
    toTarget: 'toTarget'
};

const sampleFields = {
    clock: 'clock',
    source: 'source',
    filter: 'filter',
    fn: 'fn',
    target: 'target'
};

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'replace alt sample with sample'
        },
        fixable: 'code'
    },
    create: (context) => {
       return {
            TSNonNullExpression: (node) => {
                const foundFields = findAltSampleFields(node.expression);
                if (!foundFields || foundFields.length === 0) {
                    return;
                };
                const sampleFields = createSampleFields(context, foundFields);
                const builtSample = buildSample(sampleFields);
                context.report({
                    message: 'replace alt sample with sample',
                    node,
                    fix: (fixer) => {
                        return fixer.replaceText(node, builtSample);
                    }
                })
            }
       }
    }
}

const findAltSampleFields = (node, usedFields = []) => {
    if (!node) {
        return null;
    }
    if (node.type === 'CallExpression' && node.callee.type === 'MemberExpression') {
        const callee = node.callee;
        const propName = callee.property.name;
        if (!altSampleFields[propName]) {
            return null;
        };
        usedFields.unshift({
            key: propName,
            args: node.arguments
        });
        return findAltSampleFields(callee.object, usedFields)
    }
    if (
        node.type === 'TSAsExpression' &&
        node.typeAnnotation &&
        node.typeAnnotation.type === 'TSImportType' &&
        node.typeAnnotation.qualifier && 
        node.typeAnnotation.qualifier.name === altSampleTypeName
    ) {
        return usedFields;
    }
    return null;
};

const createSampleFields = (context, altFields) => {
    let filterPredicate = null;
    return altFields
        .filter(({ args }) => !!args[0])
        .map(({ key, args }) => {
            if (args.length === 2) {
                return [
                    { key, args: [args[0]] },
                    { key: sampleFields.target, args: [args[1]] },
                ]
            };
            return { key, args };
        })
        .flat(3)
        .map(({ key, args }) => {
            let fieldValueText = context.getSourceCode().getText(args[0]);
            if (filterPredicate && (key === 'fn')) {
                fieldValueText = insertFnParamTypeAnnotation(context, args[0], filterPredicate);
            }
            const value = (key === sampleFields.target && args[0].type === 'ArrayExpression')
                ? `${fieldValueText} as const`
                : fieldValueText
            if (key === altSampleFields.filter) {
                filterPredicate = parseFilterPredicate(context, args[0]);
            }
            return `${key}: ${value}`;
    });
};

const buildSample = (fields) => {
    return `sample({\n${fields.map((field) => indent + field).join(',\n')}\n})`;
}

const parseFilterPredicate = (context, node) => {
    if (
        !(
            node.type === 'ArrowFunctionExpression' &&
            node.returnType &&
            node.returnType.typeAnnotation.type === 'TSTypePredicate'
        )
    ) {
        return null;
    };

    const typedParamName = node.returnType.typeAnnotation.parameterName.name;
    const predicateType = node.returnType.typeAnnotation.typeAnnotation;
    const predicateTypeText = context.getSourceCode().getText(predicateType);
    const typedParamIndex = node.params.findIndex(
        ({ name }) => typedParamName === name
    );
    if (typeof typedParamIndex !== 'number') {
        return null;
    }
    return {
        paramIndex: typedParamIndex,
        predicateText: predicateTypeText
    }
}

const insertFnParamTypeAnnotation = (context, fnNode, filterPredicate) => {
    const fnText = context.getSourceCode().getText(fnNode);
    if (fnNode.type !== 'ArrowFunctionExpression') {
        return fnText;
    };
    const annotatedParam = fnNode.params[filterPredicate.paramIndex];
    if (!annotatedParam) {
        return fnText;
    };
    const paramText = getParamText(context, annotatedParam);
    const annotatedParamText = `${paramText}: ${filterPredicate.predicateText}`;
    return (
        fnText.slice(0, annotatedParam.range[0] - fnNode.range[0]) +
        annotatedParamText +
        fnText.slice(annotatedParam.range[1] - fnNode.range[0])
    )
}

const getParamText = (context, param) => {
    const fullText =  context.getSourceCode().getText(param);
    if (!param.typeAnnotation) {
        return fullText
    };
    const typeAnnotationRange = param.typeAnnotation.range;
    const typeAnnotationStartIndex = typeAnnotationRange[0] - param.range[0];
    return fullText.slice(0, typeAnnotationStartIndex);
}