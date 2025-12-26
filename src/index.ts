import { Branch } from "./lib/branch"
import { Check } from "./lib/check"
import { Commit } from "./lib/commit"
import { Get } from "./lib/get"
import { Init } from "./lib/init"
import Base from "./utils/base"

export class useGit extends Base {
  /**
   * List, create, or delete branches.
   *
   * {@link https://git-scm.com/docs/git-branch}
   */
  branch: Branch
  check: Check
  commit: Commit
  get: Get
  /**
   * Create an empty Git repository or reinitialize an existing one.
   *
   * {@link https://git-scm.com/docs/git-init}
   */
  init: Init

  constructor(opts: { cwd?: string } = { cwd: process.cwd() }) {
    super(opts.cwd)

    this.branch = new Branch(this)
    this.check = new Check(this)
    this.commit = new Commit(this)
    this.get = new Get(this)
    this.init = new Init(this)
  }
}

export const git: useGit = new useGit()
export default git
