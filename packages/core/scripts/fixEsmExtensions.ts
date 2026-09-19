import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { configuration } from "../configuration";

const { dist } = configuration;

const target = resolve(dist, "es6");

const listJsFiles = (dir: string): string[] =>
    readdirSync(dir).flatMap((entry) => {
        const entryPath = resolve(dir, entry);
        if (statSync(entryPath).isDirectory()) {
            return listJsFiles(entryPath);
        }
        return entryPath.endsWith(".js") ? [entryPath] : [];
    });

const SPECIFIER_PATTERN = /((?:import|export)(?:[^'"]*?from)?\s*['"])(\.\.?\/[^'"]*)(['"])/g;

const resolveExtension = (fromFile: string, specifier: string): string => {
    const absolute = resolve(dirname(fromFile), specifier);

    if (existsSync(`${absolute}.js`)) {
        return `${specifier}.js`;
    }

    if (existsSync(resolve(absolute, "index.js"))) {
        return `${specifier}/index.js`;
    }

    return specifier;
};

const files = listJsFiles(target);

for (const file of files) {
    const source = readFileSync(file, "utf8");

    const fixed = source.replace(SPECIFIER_PATTERN, (match, prefix, specifier, suffix) => {
        if (/\.(js|json|less)$/.test(specifier)) {
            return match;
        }

        return `${prefix}${resolveExtension(file, specifier)}${suffix}`;
    });

    if (fixed !== source) {
        writeFileSync(file, fixed);
    }
}
