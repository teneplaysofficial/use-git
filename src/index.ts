import { Base } from "./utils/base";

export class useGit extends Base {
  constructor(opts: { cwd?: string } = {}) {
    const { cwd = process.cwd() } = opts;
    super(cwd);
  }
}

export const git = new useGit();
export default git;
