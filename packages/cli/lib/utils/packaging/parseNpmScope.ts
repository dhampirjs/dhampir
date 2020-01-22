import { Package } from './api';

function parseNpmScope(json: Package): string | undefined {
    const packageName = json.name;

    const parts = packageName.split("/");

    if(parts.length === 0 || parts.length === 1) {
        return;
    }

    return parts[0].substr(1);

}

export {
    parseNpmScope,
}
