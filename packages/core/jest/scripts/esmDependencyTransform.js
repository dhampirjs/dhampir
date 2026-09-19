const babel = require('@babel/core');

const stripImportMeta = ({ types: t }) => ({
    visitor: {
        MetaProperty(path) {
            path.replaceWith(t.objectExpression([]));
        },
    },
});

module.exports = {
    process(sourceText, sourcePath) {
        const result = babel.transform(sourceText, {
            filename: sourcePath,
            sourceType: 'unambiguous',
            babelrc: false,
            configFile: false,
            presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
            plugins: [stripImportMeta],
        });
        return { code: result.code };
    },
};
