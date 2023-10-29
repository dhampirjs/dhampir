export const isRouteDynamic = (path?: string) => {
  return path && path.match(/:(\w+)/g)
}
