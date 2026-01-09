import * as ug from "./lib/index"
import { setCwd } from "./state"

interface CreateGit {
  cwd?: string
  debug?: boolean
}

export function createGit({
  cwd = ".",
  debug = false,
}: CreateGit = {}): typeof ug {
  if (debug) process.env.DEBUG = "true"

  setCwd(cwd)

  return Object.assign(Object.create(ug))
}

export const git: typeof ug = createGit()
export default git
