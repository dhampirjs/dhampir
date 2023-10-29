import { PATH_SEPARATOR } from '../constants'
import { isRootRoute } from './isRootRoute'

export const stripPath = (path: string): string => {
  if (isRootRoute(path)) return PATH_SEPARATOR

  if (path === '') return path

  if (path.endsWith(`${PATH_SEPARATOR}*`)) {
    path = path.substring(0, path!.length - 2)
  }

  if (path.startsWith(PATH_SEPARATOR)) {
    path = path.substring(1, path.length)
  }

  return path
}
