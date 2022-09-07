export const ROUTE_TRAILING_WC_REGEXP = /\/\*+$/g;
export const cleanRoutePath = (path: string): string => {
    const result = path.replace(ROUTE_TRAILING_WC_REGEXP, "");
    return result;
}
