import {PATH_SEPARATOR} from "../constants";

export const isRootRoute = (routePath: string) => {
    return routePath && routePath === PATH_SEPARATOR || routePath === `${PATH_SEPARATOR}*`;
}
