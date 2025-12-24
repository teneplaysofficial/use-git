import { Branch } from "./branch";

export class NormalizedBranch {
  constructor(private branch: Branch) {}

  async all(): Promise<{
    local: string[];
    remote: string[];
    head?: string;
  }> {
    const branches = await this.branch.all();

    const local: string[] = [];
    const remote: string[] = [];
    let head: string | undefined;

    for (const b of branches) {
      if (b.startsWith("remotes/")) {
        const name = b.replace(/^remotes\//, "");

        if (name.includes("/HEAD ->")) {
          head = name.split("->")[1].trim();
        } else {
          remote.push(name);
        }
      } else {
        local.push(b);
      }
    }

    return { local, remote, head };
  }
}
