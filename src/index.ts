import * as ug from "./lib/index"
import { setCwd } from "./state"
import type { Api } from "./types/api"

interface CreateGit {
  cwd?: string
  debug?: boolean
}

export function createGit({ cwd = ".", debug = false }: CreateGit = {}): Api {
  if (debug) process.env.DEBUG = "true"

  setCwd(cwd)

  return Object.assign(Object.create(ug))
}

export const git: Api = createGit()
export default git
