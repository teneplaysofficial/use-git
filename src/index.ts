import { Commit } from "./lib/commit";
import { Base } from "./utils/base";

export class useGit extends Base {
  commit: Commit;

  constructor(opts: { cwd?: string } = { cwd: process.cwd() }) {
    super(opts.cwd);

    this.commit = new Commit(this);
  }
}

export const git = new useGit();
export default git;
