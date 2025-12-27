import { Branch } from "./lib/branch"
import { Check } from "./lib/check"
import { Commit } from "./lib/commit"
import { Config } from "./lib/config"
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
  /**
   * Access Git configuration.
   *
   * @description
   * Supports get, set options at the repository or global level.
   *
   * @default "--local"
   */
  config: Config
  commit: Commit
  get: Get
  /**
   * Create an empty Git repository or reinitialize an existing one.
   *
   * {@link https://git-scm.com/docs/git-init}
   */
  init: Init

  constructor(
    opts: { cwd?: string; debug?: boolean } = {
      cwd: process.cwd(),
      debug: false,
    },
  ) {
    super(opts.cwd)

    if (opts.debug) process.env.DEBUG = "use-git"

    this.branch = new Branch(this)
    this.check = new Check(this)
    this.config = new Config(this)
    this.commit = new Commit(this)
    this.get = new Get(this)
    this.init = new Init(this)
  }
}

export const git: useGit = new useGit()
export default git
