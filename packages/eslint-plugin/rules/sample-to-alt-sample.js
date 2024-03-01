const {indent} = require('./shared');

const fieldsMap = {
    clock: 'clock',
    source: 'source',
    filter: 'filter',
    fn: 'fn',
    target: 'target'
};

const altFieldsOrder = [
    fieldsMap.clock,
    fieldsMap.source,
    fieldsMap.filter,
    fieldsMap.fn,
]

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'replace sample with alt sample'
        },
        fixable: 'code'
    },
    create: (context) => {
        return {
            TSNonNullExpression: (node) => {
                if (node.expression.callee.name !== 'sample') {
                    return;
                };
                const properties = 
                    (node?.expression?.arguments[0]?.properties || [])
                    .filter(({ key }) => !!fieldsMap[key.name]);
                if (properties.length === 0) {
                    return;
                };
                const sampleFieldMap = Object.fromEntries(
                    properties.map(({ key, value }) => {
                        if (value.type === 'TSAsExpression' && value.typeAnnotation.typeName.name === 'const') {
                            return [key.name, value.expression]
                        } 
                        return [key.name, value]
                    })
                );
                if (!sampleFieldMap[fieldsMap.clock]  && !sampleFieldMap[fieldsMap.source]) {
                    return;
                };
                context.report({
                    message: 'replace sample with alt sample',
                    node,
                    fix: (fixer) => {
                        const hasTarget = !!sampleFieldMap[fieldsMap.target];
                        const lastField = altFieldsOrder.slice().reverse().find((field) => !!sampleFieldMap[field]);
                        const replacedFields = altFieldsOrder
                            .filter((field) => !!sampleFieldMap[field])
                            .map((field) => {
                                const value = getAltFieldText(context, field, sampleFieldMap[field]);
                                const target = (hasTarget && (field === lastField)) &&
                                    (context.getSourceCode().getText(sampleFieldMap[fieldsMap.target]))

                                return target
                                    ? `${indent}.${field}(\n${indent.repeat(2)}${value},\n${indent.repeat(2)}${target}\n${indent})`
                                    : `${indent}.${field}(${value})`
                                    
                            })
                        const toTarget = (!hasTarget && (lastField !== fieldsMap.fn))
                            ? `\n${indent}.toTarget()`
                            : '';
                        const replacedSample = `({} as import('effector-alt-api').Sample)\n${replacedFields.join('\n')}${toTarget}\n`;
                        return fixer.replaceText(node, replacedSample)
                    }                    
                })
            }
        }
    }
}

function getAltFieldText (context, field, node) {
    if (field === fieldsMap.fn) {
        return getAltFnText(context, node);
    };
    return context.getSourceCode().getText(node);
}

function getAltFnText (context, fnNode) {
    let fnText = context.getSourceCode().getText(fnNode);
    if (!fnNode.params) return fnText;

    fnNode.params.forEach((param) => {
        if (!param.typeAnnotation) return;
        const fnRange = fnNode.range;
        const annotationRange = param.typeAnnotation.range;
        const beforeAnnotation = fnText.slice(0, annotationRange[0] - fnRange[0]);
        const afterAnnotation = fnText.slice(annotationRange[1] - fnRange[1]);
        fnText = beforeAnnotation + afterAnnotation;
    });

    return fnText;
}