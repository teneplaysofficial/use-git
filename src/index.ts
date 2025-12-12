import { Commit } from "./lib/commit";
import { Init } from "./lib/init";
import { Base } from "./utils/base";

export class useGit extends Base {
  commit: Commit;
  /**
   * Create an empty Git repository or reinitialize an existing one.
   *
   * {@link https://git-scm.com/docs/git-init}
   */
  init: Init;

  constructor(opts: { cwd?: string } = { cwd: process.cwd() }) {
    super(opts.cwd);

    this.commit = new Commit(this);
    this.init = new Init(this);
  }
}

export const git = new useGit();
export default git;
