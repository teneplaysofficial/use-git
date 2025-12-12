import { exec } from "node:child_process";
import { Category } from "../types/Category";

export abstract class Base {
  cwd: string;

  constructor(cwd: string = process.cwd()) {
    this.cwd = cwd;
  }

  runCmd(
    categ: Category | "",
    args: string[] = [],
    opts: { graceful?: boolean } = {
      graceful: false,
    }
  ): Promise<string | boolean> {
    const cmd = ["git", categ, ...(args ?? [])].filter(Boolean).join(" ");

    return new Promise((resolve, reject) => {
      exec(
        cmd,
        {
          cwd: this.cwd,
        },
        (err, stdout, stderr) => {
          if (err) {
            if (opts.graceful) return resolve(false);

            return reject(
              new Error(
                `Error executing command:\n${cmd}\n${stderr || err.message}`
              )
            );
          }

          if (opts.graceful) {
            return resolve(true);
          }

          resolve(stdout.trim());
        }
      );
    });
  }
}
