import {resolve} from 'path';

export default (
    {
        source,
        destination,
        moduleType,
        cwd,
    }
) => ({
    compilerOptions: {
        plugins: [
            [
                {
                    "transform": "typescript-plugin-styled-components",
                    "type": "config",
                    "minify": false,
                    "ssr": false
                }
            ]
        ],
        srcDir: source,
        outDir: destination,
        module: moduleType,
        sourceMap: true,
        noImplicitAny: false,
        target: "es6",
        lib: ["ES2016", "es6", "dom"],
        jsx: "react-jsx",
        moduleResolution: "node",
        typeRoots: [
            "node_modules/@types"
        ],
        paths: {
            "@core/*": ["./src/*"],
        },
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        declaration: true,
        declarationMap: true,
        noImplicitReturns: true,
        noImplicitThis: true,
        noUnusedLocals: false,
        noUnusedParameters: false,
        skipLibCheck: true,
        strict: true,
        strictNullChecks: true,
        downlevelIteration: true
    },
    exclude: [
        "node_modules",
    ],
    include: [
        "./src/**/*.ts",
        "./src/**/*.tsx",
    ],
    files: [
        resolve(cwd, "./build/types/less.d.ts"),
    ]
});
